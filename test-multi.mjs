import { spawn } from "child_process";

const server = spawn("node", ["index.js"], { cwd: "c:\\sampleproject", shell: true });

const init = [
  { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "test", version: "1.0" } } },
  { jsonrpc: "2.0", method: "notifications/initialized", params: {} },
];

const tests = [
  { id: 2,  name: "tools/list",  method: "tools/list",  params: {} },
  { id: 3,  label: "add(7,5)",       method: "tools/call", params: { name: "add",      arguments: { a: 7, b: 5 } } },
  { id: 4,  label: "subtract(10,3)", method: "tools/call", params: { name: "subtract", arguments: { a: 10, b: 3 } } },
  { id: 5,  label: "multiply(4,6)",  method: "tools/call", params: { name: "multiply", arguments: { a: 4, b: 6 } } },
  { id: 6,  label: "divide(9,3)",    method: "tools/call", params: { name: "divide",   arguments: { a: 9, b: 3 } } },
  { id: 7,  label: "divide by zero", method: "tools/call", params: { name: "divide",   arguments: { a: 5, b: 0 } } },
  { id: 8,  label: "greet(Victor)",  method: "tools/call", params: { name: "greet",    arguments: { name: "Victor" } } },
  { id: 9,  label: "greet(empty)",   method: "tools/call", params: { name: "greet",    arguments: { name: "   " } } },
];

let buf = "";
server.stdout.on("data", (c) => {
  buf += c.toString();
  const lines = buf.split("\n"); buf = lines.pop();
  for (const line of lines) {
    if (!line.trim()) continue;
    const msg = JSON.parse(line);
    if (msg.id === 1) {
      server.stdin.write(JSON.stringify(init[1]) + "\n");
      for (const t of tests)
        server.stdin.write(JSON.stringify({ jsonrpc: "2.0", id: t.id, method: t.method, params: t.params }) + "\n");
    } else if (msg.id === 2) {
      console.log("Tools:", msg.result.tools.map((t) => t.name).join(", "));
    } else {
      const t = tests.find((x) => x.id === msg.id);
      const result = msg.result?.content?.[0]?.text ?? msg.error?.message ?? "error";
      const status = msg.error || msg.result?.isError ? "✗" : "✓";
      console.log(`${status} ${t.label}: ${result}`);
      if (msg.id === tests.at(-1).id) server.kill();
    }
  }
});

server.stderr.on("data", (d) => process.stderr.write(d));
server.stdin.write(JSON.stringify(init[0]) + "\n");
