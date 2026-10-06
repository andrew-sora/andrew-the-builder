# Workspace Rules

## Forbidden Tools
- **DO NOT USE BROWSER SUBAGENT (`browser_subagent`)**: Never invoke `browser_subagent`. It consumes excessive tokens and is slow. To verify server status or local web pages, inspect terminal log outputs, use standard commands, or test scripts.
