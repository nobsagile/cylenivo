use std::sync::Mutex;
use tauri::Manager;
use tauri_plugin_shell::{process::CommandChild, ShellExt};

struct ServerChild(Mutex<Option<CommandChild>>);

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            if cfg!(debug_assertions) {
                app.handle().plugin(
                    tauri_plugin_log::Builder::default()
                        .level(log::LevelFilter::Info)
                        .build(),
                )?;
            }

            // Resolve OS-appropriate data directory for the SQLite file
            let app_data_dir = app.path().app_data_dir()?;
            std::fs::create_dir_all(&app_data_dir)?;
            let db_path = app_data_dir.join("cylenivo.db");

            // Spawn the Hono server sidecar (production only — dev uses tsx via beforeDevCommand)
            #[cfg(not(debug_assertions))]
            {
                let (_rx, child) = app
                    .shell()
                    .sidecar("cylenivo-server")
                    .expect("flow-analyzer-server sidecar not configured")
                    .env("DB_PATH", db_path.to_string_lossy().as_ref())
                    .env("SERVER_PORT", "8765")
                    .spawn()
                    .expect("failed to spawn server sidecar");

                app.manage(ServerChild(Mutex::new(Some(child))));
            }

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
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
