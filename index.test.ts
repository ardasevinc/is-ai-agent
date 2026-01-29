import { test, expect, beforeEach, afterEach } from 'bun:test'
import { isAgent, isClaudeCode, isGeminiCli, isCodex, isOpenCode, AGENTS, type AgentName } from './index'

const envVars = Object.values(AGENTS)
let savedEnv: Record<string, string | undefined> = {}

beforeEach(() => {
  savedEnv = {}
  for (const v of envVars) {
    savedEnv[v] = process.env[v]
    delete process.env[v]
  }
})

afterEach(() => {
  for (const v of envVars) {
    if (savedEnv[v] !== undefined) {
      process.env[v] = savedEnv[v]
    } else {
      delete process.env[v]
    }
  }
})

test('isAgent returns null when no agent env vars set', () => {
  expect(isAgent()).toBeNull()
})

test('isAgent detects claude', () => {
  process.env.CLAUDECODE = '1'
  expect(isAgent()).toBe('claude')
})

test('isAgent detects gemini', () => {
  process.env.GEMINI_CLI = '1'
  expect(isAgent()).toBe('gemini')
})

test('isAgent detects codex', () => {
  process.env.CODEX_CI = '1'
  expect(isAgent()).toBe('codex')
})

test('isAgent detects opencode', () => {
  process.env.OPENCODE = '1'
  expect(isAgent()).toBe('opencode')
})

test('isClaudeCode returns true only for claude', () => {
  expect(isClaudeCode()).toBe(false)
  process.env.CLAUDECODE = '1'
  expect(isClaudeCode()).toBe(true)
})

test('isGeminiCli returns true only for gemini', () => {
  expect(isGeminiCli()).toBe(false)
  process.env.GEMINI_CLI = '1'
  expect(isGeminiCli()).toBe(true)
})

test('isCodex returns true only for codex', () => {
  expect(isCodex()).toBe(false)
  process.env.CODEX_CI = '1'
  expect(isCodex()).toBe(true)
})

test('isOpenCode returns true only for opencode', () => {
  expect(isOpenCode()).toBe(false)
  process.env.OPENCODE = '1'
  expect(isOpenCode()).toBe(true)
})

// Edge cases

test('isAgent ignores non-"1" values', () => {
  process.env.CLAUDECODE = 'true'
  expect(isAgent()).toBeNull()
  process.env.CLAUDECODE = 'yes'
  expect(isAgent()).toBeNull()
  process.env.CLAUDECODE = '0'
  expect(isAgent()).toBeNull()
  process.env.CLAUDECODE = ''
  expect(isAgent()).toBeNull()
})

test('multiple env vars set returns first match (priority order)', () => {
  // Priority: claude > gemini > codex > opencode (object key order)
  process.env.CLAUDECODE = '1'
  process.env.GEMINI_CLI = '1'
  expect(isAgent()).toBe('claude')

  delete process.env.CLAUDECODE
  expect(isAgent()).toBe('gemini')
})

test('AGENTS export contains all supported agents', () => {
  const expected: AgentName[] = ['claude', 'gemini', 'codex', 'opencode']
  expect(Object.keys(AGENTS).sort()).toEqual(expected.sort())
})
