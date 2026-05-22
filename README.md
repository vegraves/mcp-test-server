# MCP Test Server

A Node.js MCP server with 9 tools for testing MCP integrations with Claude Desktop.

## Requirements

- [Node.js](https://nodejs.org) v18 or higher
- [Claude Desktop](https://claude.ai/download) (for MCP integration)

## Installation

1. **Clone the repo**
   ```bash
   git clone https://github.com/vegraves/mcp-test-server.git
   cd mcp-test-server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

## Quickstart

1. **Run the tests**
   ```bash
   npm test
   ```

2. **Test a tool manually**
   ```bash
   node test-echo.mjs
   ```

3. **Add to Claude Desktop** — edit `%APPDATA%\Claude\claude_desktop_config.json`:
   ```json
   {
     "mcpServers": {
       "test-server": {
         "command": "node",
         "args": ["c:\\mcp-test-server\\index.js"]
       }
     }
   }
   ```
   Then restart Claude Desktop and ask it to use any tool.

## Test with MCP Inspector

```bash
npx @modelcontextprotocol/inspector node index.js
```

This opens a browser UI where you can call each tool interactively.

## Tools

| Tool            | Description                         | Inputs                                  |
|-----------------|-------------------------------------|-----------------------------------------|
| `echo`          | Echoes back a message               | `message` (str)                         |
| `add`           | Adds two numbers                    | `a`, `b` (num)                          |
| `subtract`      | Subtracts b from a                  | `a`, `b` (num)                          |
| `multiply`      | Multiplies two numbers              | `a`, `b` (num)                          |
| `divide`        | Divides a by b                      | `a`, `b` (num)                          |
| `get_time`      | Returns current ISO timestamp       | _(none)_                                |
| `hello_world`   | Returns "Hello, World!"             | _(none)_                                |
| `greet`         | Returns a personalized greeting     | `name` (str)                            |
| `register_user` | Validates and registers a new user  | `name`, `email`, `password`, `age`      |
