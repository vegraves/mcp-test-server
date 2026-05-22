# MCP Test Server

A simple MCP server with three test tools: `echo`, `add`, and `get_time`.

## Setup

```bash
cd c:\sampleproject
npm install
```

## Test with MCP Inspector

```bash
npx @modelcontextprotocol/inspector node index.js
```

This opens a browser UI where you can call each tool interactively.

## Add to Claude Desktop

In `%APPDATA%\Claude\claude_desktop_config.json`, add:

```json
{
  "mcpServers": {
    "test-server": {
      "command": "node",
      "args": ["c:\\sampleproject\\index.js"]
    }
  }
}
```

Then restart Claude Desktop.

## Tools

| Tool       | Description                    | Inputs          |
|------------|--------------------------------|-----------------|
| `echo`     | Echoes back a message          | `message` (str) |
| `add`      | Adds two numbers               | `a`, `b` (num)  |
| `get_time` | Returns current ISO timestamp  | _(none)_        |
