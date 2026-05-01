# is-ai-agent

Detect if your code is running under an AI coding agent.

## Install

```bash
bun add is-ai-agent
```

## Usage

```ts
import { isAgent, isClaudeCode, isCursor, isGeminiCli, isCodex, isOpenCode } from 'is-ai-agent'

// Check which agent (if any)
const agent = isAgent()
// Returns: 'claude' | 'cursor' | 'gemini' | 'codex' | 'opencode' | null

if (agent) {
  console.log(`Running under ${agent}`)
}

// Or use individual boolean checks
if (isClaudeCode()) {
  // Claude Code specific behavior
}
```

## Supported Agents

| Agent | Env Var |
|-------|---------|
| [Claude Code](https://github.com/anthropics/claude-code) | `CLAUDECODE=1` |
| [Cursor](https://github.com/cursor/cursor) | `CURSOR_AGENT=1` |
| [Gemini CLI](https://github.com/google-gemini/gemini-cli) | `GEMINI_CLI=1` |
| [Codex CLI](https://github.com/openai/codex) | `CODEX_CI=1` |
| [OpenCode](https://github.com/sst/opencode) | `OPENCODE=1` |

## Contributing

Want to add support for another agent? PRs welcome! Just add an entry to the agents map in `index.ts`.

## License

MIT
