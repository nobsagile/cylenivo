/**
 * Every @radix-ui package must exist exactly once in the dependency tree.
 *
 * Radix primitives keep state in module scope: DismissableLayer holds the stack
 * of open layers and the <body>'s original `pointer-events` value in module
 * variables. When package-lock.json nests a second copy — e.g.
 * `@radix-ui/react-menu/node_modules/@radix-ui/react-dismissable-layer` next to
 * the hoisted one — a DropdownMenu and a Dialog run on two stacks that never see
 * each other. Each believes it is the only open layer.
 *
 * Shipped in v1.5.14: Sidebar → dataset menu → "Refresh data". The menu set
 * `pointer-events: none` on <body>, the dialog opened on top and remembered
 * "none" as the value to restore. When it closed, the whole app ignored clicks
 * until restart. Sidebar.test.tsx pins that symptom; this test pins the cause.
 *
 * How the split happens: Radix pins its internals to exact versions, and
 * Dependabot's patch group bumps every Radix package except those whose next
 * release is a minor (react-select, react-slider). npm keeps the old internals
 * hoisted for them and nests the new ones under everything else.
 *
 * Fix when this fails: bump the lagging @radix-ui packages to their latest
 * version so all of them pin the same internals, then run `npm dedupe`.
 */
/// <reference types="node" />
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

interface Lockfile {
  packages: Record<string, { version: string }>
}

// vitest runs from the project root, which is also where CI runs `npm ci`.
const lock = JSON.parse(readFileSync(resolve(process.cwd(), 'package-lock.json'), 'utf-8')) as Lockfile

describe('Radix dependency tree', () => {
  it('has exactly one copy of every @radix-ui package', () => {
    const nested = Object.entries(lock.packages)
      .filter(([path]) => /node_modules\/@radix-ui\/[^/]+$/.test(path))
      .filter(([path]) => path.split('node_modules/').length > 2)
      .map(([path, { version }]) => `${path}@${version}`)

    expect(nested, 'nested Radix copies — bump lagging @radix-ui/* to latest, then `npm dedupe`').toEqual([])
  })
})
