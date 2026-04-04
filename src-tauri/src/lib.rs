use std::sync::Mutex;
use tauri::Manager;
use tauri_plugin_shell::process::CommandChild;

struct ServerChild(Mutex<Option<CommandChild>>);
struct ServerPort(u16);

#[cfg(not(debug_assertions))]
fn find_free_port(preferred: u16) -> u16 {
    use std::net::TcpListener;
    for port in preferred..preferred + 10 {
        if TcpListener::bind(("127.0.0.1", port)).is_ok() {
            return port;
        }
    }
    preferred
}

#[tauri::command]
fn get_server_port(state: tauri::State<ServerPort>) -> u16 {
    state.0
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_process::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            // Spawn the Hono server sidecar (production only — dev uses tsx via beforeDevCommand)
            #[cfg(not(debug_assertions))]
            {
                use tauri::Emitter;
                use tauri_plugin_shell::ShellExt;

                let app_data_dir = app.path().app_data_dir()?;
                std::fs::create_dir_all(&app_data_dir)?;
                let db_path = app_data_dir.join("cylenivo.db");
                let plugins_dir = app_data_dir.join("plugins");

                let port = find_free_port(8765);
                app.manage(ServerPort(port));

                let (rx, child) = app
                    .shell()
                    .sidecar("cylenivo-server")
                    .expect("cylenivo-server sidecar not configured")
                    .env("DB_PATH", db_path.to_string_lossy().as_ref())
                    .env("SERVER_PORT", port.to_string())
                    .env("PLUGINS_DIR", plugins_dir.to_string_lossy().as_ref())
                    .spawn()
                    .expect("failed to spawn server sidecar");

                app.manage(ServerChild(Mutex::new(Some(child))));

                let handle = app.handle().clone();
                tauri::async_runtime::spawn(async move {
                    use tauri_plugin_shell::process::CommandEvent;
                    let mut rx = rx;
                    while let Some(event) = rx.recv().await {
                        match event {
                            CommandEvent::Stderr(line) => {
                                log::error!("[server] {}", String::from_utf8_lossy(&line));
                            }
                            CommandEvent::Stdout(line) => {
                                log::info!("[server] {}", String::from_utf8_lossy(&line));
                            }
                            CommandEvent::Error(e) => {
                                let _ = handle.emit("server-crashed", e);
                            }
                            CommandEvent::Terminated(status) => {
                                log::error!("[server] terminated: {:?}", status);
                                let _ = handle.emit("server-crashed", "Server process terminated unexpectedly");
                            }
                            _ => {}
                        }
                    }
                });
            }

            // Dev: server runs via beforeDevCommand on fixed port
            #[cfg(debug_assertions)]
            app.manage(ServerPort(8765));

            Ok(())
        })
        .on_window_event(|window, event| {
            if let tauri::WindowEvent::Destroyed = event {
                if let Some(state) = window.app_handle().try_state::<ServerChild>() {
                    if let Some(child) = state.0.lock().unwrap().take() {
                        let _ = child.kill();
                    }
                }
            }
        })
        .invoke_handler(tauri::generate_handler![get_server_port])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
