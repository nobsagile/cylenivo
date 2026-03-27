use tauri::Manager;
use tauri_plugin_shell::ShellExt;

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
            let db_path = app_data_dir.join("flow-analyzer.db");

            // Spawn the Hono server sidecar
            let (_rx, _child) = app
                .shell()
                .sidecar("flow-analyzer-server")
                .expect("flow-analyzer-server sidecar not configured")
                .env("DB_PATH", db_path.to_string_lossy().as_ref())
                .env("SERVER_PORT", "8765")
                .spawn()
                .expect("failed to spawn server sidecar");

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
