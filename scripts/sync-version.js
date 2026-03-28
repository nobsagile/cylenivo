#!/usr/bin/env node
// Syncs version from package.json → tauri.conf.json + src-tauri/Cargo.toml
// Runs automatically via npm version lifecycle hook

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const version = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version

// tauri.conf.json
const tauriConfPath = join(root, 'src-tauri', 'tauri.conf.json')
const tauriConf = JSON.parse(readFileSync(tauriConfPath, 'utf8'))
tauriConf.version = version
writeFileSync(tauriConfPath, JSON.stringify(tauriConf, null, 2) + '\n')

// Cargo.toml — replace version = "x.y.z" in [package] section
const cargoPath = join(root, 'src-tauri', 'Cargo.toml')
const cargo = readFileSync(cargoPath, 'utf8')
const updated = cargo.replace(/^(version\s*=\s*)"[^"]+"/m, `$1"${version}"`)
writeFileSync(cargoPath, updated)

console.log(`Synced version ${version} → tauri.conf.json + Cargo.toml`)
