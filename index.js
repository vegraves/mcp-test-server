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
server.registerTool(
  "register_user",
  {
    description: "Validates and registers a new user",
    inputSchema: {
      name: z.string().trim().min(2).max(50).describe("Full name (2-50 characters)"),
      email: z.string().trim().email().describe("Valid email address"),
      password: z.string().min(8).regex(/[A-Z]/, "Must contain uppercase").regex(/[0-9]/, "Must contain a number").describe("Password (min 8 chars, 1 uppercase, 1 number)"),
      age: z.number().int().min(18).max(120).describe("Age (must be 18 or older)"),
    },
  },
  async ({ name, email, password, age }) => ({
    content: [{ type: "text", text: `User registered successfully: ${name} (${email}), age ${age}` }],
  })
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("MCP test server running on stdio");
