# Changelog

## v0.57.0 — 2026-04-03

### Auto-updater
- App checks for updates silently on startup
- "Update available" dialog with Install & Restart / Later actions
- Signed updater artifacts published alongside each GitHub release

## v0.56.0 — 2026-04-03

### About page
- New Settings → About section with version, tagline, links (website, GitHub, Mastodon, Report a Bug)
- Version number in the sidebar now navigates to About instead of showing a hidden dialog

### Settings cleanup
- Fixed all hardcoded English strings in confirmation dialogs and error messages — now use translation keys

## v0.55.0 — 2026-04-02

### UI polish
- **App icon** — new dark violet/teal gradient icon designed in IconKitchen; generated for all platforms with `npx tauri icon`
- **shadcn consistency** — all buttons, inputs, and form elements now use shadcn components throughout
- **Info popovers** — every form label in the wizard, Config editor, Dataset editor, and Connection dialog now has a `?` help icon
- **PopoverContent** — removed browser focus ring (blue outline on open)

### Wizard improvements
- Connect step: live "Test connection" on submit with typed error messages (unauthorized, not found, unreachable, timeout)
- Fetch step: cleaned up connection badge layout and Completed Between date pickers
- Measure step: replaced native radio inputs with shadcn Select dropdowns; added `last_last` measurement mode
- Lead time: configurable lead time start status; default note explains Jira `created_at` fallback

### Settings
- Refresh button moved from Data Sources to Datasets (only shown for datasets with a connected source)
- Settings nav: "Overview" group header added for consistency
- Data source descriptions made source-neutral (not Jira-specific)

## v0.54.x — earlier

See git log for individual patch changes.
