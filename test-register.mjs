import { spawn } from "child_process";

const server = spawn("node", ["index.js"], { cwd: "c:\\sampleproject" });

const init = [
  { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "test", version: "1.0" } } },
  { jsonrpc: "2.0", method: "notifications/initialized", params: {} },
];

const tests = [
  { id: 2, label: "valid user",       args: { name: "Victor Graves", email: "victorgraves@verizon.net", password: "Secret123", age: 30 } },
  { id: 3, label: "too young",        args: { name: "Victor Graves", email: "victorgraves@verizon.net", password: "Secret123", age: 16 } },
  { id: 4, label: "bad email",        args: { name: "Victor Graves", email: "not-an-email",             password: "Secret123", age: 30 } },
  { id: 5, label: "weak password",    args: { name: "Victor Graves", email: "victorgraves@verizon.net", password: "password",  age: 30 } },
  { id: 6, label: "name too short",   args: { name: "V",             email: "victorgraves@verizon.net", password: "Secret123", age: 30 } },
];

let buffer = "";
let testIndex = 0;

server.stdout.on("data", (chunk) => {
  buffer += chunk.toString();
  const lines = buffer.split("\n");
  buffer = lines.pop();
  for (const line of lines) {
    if (!line.trim()) continue;
    const msg = JSON.parse(line);
    if (msg.id === 1) {
      server.stdin.write(JSON.stringify(init[1]) + "\n");
      for (const t of tests)
        server.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: t.id, method: "tools/call", params: { name: "register_user", arguments: t.args } }) + "\n");
    } else if (msg.id >= 2) {
      const t = tests[msg.id - 2];
      const result = msg.result?.content?.[0]?.text ?? msg.error?.message ?? JSON.stringify(msg.error ?? msg.result);
      console.log(`[${t.label}] ${result}`);
      if (msg.id === tests.at(-1).id) server.kill();
    }
  }
});

server.stderr.on("data", (d) => process.stderr.write(d));
server.stdin.write(JSON.stringify(init[0]) + "\n");
