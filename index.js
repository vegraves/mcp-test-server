import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "mcp-test-server",
  version: "1.0.0",
});

server.registerTool(
  "echo",
  {
    description: "Echoes back the message you send",
    inputSchema: {
      message: z.string().describe("The message to echo"),
    },
  },
  async ({ message }) => ({
    content: [{ type: "text", text: message }],
  })
);

server.registerTool(
  "add",
  {
    description: "Adds two numbers together",
    inputSchema: {
      a: z.number().describe("First number"),
      b: z.number().describe("Second number"),
    },
  },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }],
  })
);

server.registerTool(
  "hello_world",
  {
    description: "Returns a hello world greeting",
    inputSchema: {},
  },
  async () => ({
    content: [{ type: "text", text: "Hello, World!" }],
  })
);

server.registerTool(
  "get_time",
  {
    description: "Returns the current date and time",
    inputSchema: {},
  },
  async () => ({
    content: [{ type: "text", text: new Date().toISOString() }],
  })
);

server.registerTool(
  "greet",
  {
    description: "Returns a greeting for a given name",
    inputSchema: {
      name: z.string().describe("Name to greet"),
    },
  },
  async ({ name }) => ({
    content: [{ type: "text", text: `Hello, ${name}!` }],
  })
);
const transport = new StdioServerTransport();
await server.connect(transport);
console.error("MCP test server running on stdio");
