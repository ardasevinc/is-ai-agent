export const AGENTS = {
  claude: 'CLAUDECODE',
  cursor: 'CURSOR_AGENT',
  gemini: 'GEMINI_CLI',
  codex: 'CODEX_CI',
  opencode: 'OPENCODE',
} as const

export type AgentName = keyof typeof AGENTS

export function isAgent(): AgentName | null {
  if (typeof process === 'undefined' || !process.env) return null
  for (const name of Object.keys(AGENTS) as AgentName[]) {
    if (process.env[AGENTS[name]] === '1') return name
  }
  return null
}

export const isClaudeCode = (): boolean => isAgent() === 'claude'
export const isCursor = (): boolean => isAgent() === 'cursor'
export const isGeminiCli = (): boolean => isAgent() === 'gemini'
export const isCodex = (): boolean => isAgent() === 'codex'
export const isOpenCode = (): boolean => isAgent() === 'opencode'
