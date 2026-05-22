# MCP Starter Server

A simple MCP server with three test tools: `echo`, `add`, and `get_time`.

## Quickstart

1. **Install dependencies**
   ```bash
   cd c:\sampleproject
   npm install
   ```

2. **Start the server**
   ```bash
   node index.js
   ```

3. **Test a tool**
   ```bash
   node test-echo.mjs
   ```

4. **Add to Claude Desktop** — edit `%APPDATA%\Claude\claude_desktop_config.json`:
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
   Then restart Claude Desktop and ask it to use any tool.

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

| Tool          | Description                    | Inputs          |
|---------------|--------------------------------|-----------------|
| `echo`        | Echoes back a message          | `message` (str) |
| `add`         | Adds two numbers               | `a`, `b` (num)  |
| `get_time`    | Returns current ISO timestamp  | _(none)_        |
| `hello_world` | Returns "Hello, World!"        | _(none)_        |
| `greet`       | Returns a personalized greeting| `name` (str)    |
