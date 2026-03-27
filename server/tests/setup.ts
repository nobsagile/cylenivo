// Set before any module loads - db/index.ts reads this env var on first import
process.env.DB_PATH = ':memory:'
