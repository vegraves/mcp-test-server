import { z } from "zod";
import { add, subtract, multiply, divide } from "../calculator.js";

export function registerCalculatorTools(server) {
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
      content: [{ type: "text", text: String(add(a, b)) }],
    })
  );

  server.registerTool(
    "subtract",
    {
      description: "Subtracts b from a",
      inputSchema: {
        a: z.number().describe("First number"),
        b: z.number().describe("Second number"),
      },
    },
    async ({ a, b }) => ({
      content: [{ type: "text", text: String(subtract(a, b)) }],
    })
  );

  server.registerTool(
    "multiply",
    {
      description: "Multiplies two numbers",
      inputSchema: {
        a: z.number().describe("First number"),
        b: z.number().describe("Second number"),
      },
    },
    async ({ a, b }) => ({
      content: [{ type: "text", text: String(multiply(a, b)) }],
    })
  );

  server.registerTool(
    "divide",
    {
      description: "Divides a by b",
      inputSchema: {
        a: z.number().describe("Dividend"),
        b: z.number().refine((b) => b !== 0, "Cannot be zero").describe("Divisor (cannot be zero)"),
      },
    },
    async ({ a, b }) => ({
      content: [{ type: "text", text: String(divide(a, b)) }],
    })
  );
}
