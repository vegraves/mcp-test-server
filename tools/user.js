import { z } from "zod";

const users = [];

export function registerUserTools(server) {
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
    async ({ name, email, password, age }) => {
      if (users.find((u) => u.email === email)) {
        return { content: [{ type: "text", text: `Email already registered: ${email}` }], isError: true };
      }
      users.push({ name, email, age });
      return { content: [{ type: "text", text: `User registered successfully: ${name} (${email}), age ${age}` }] };
    }
  );
}
