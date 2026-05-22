import { spawn } from "child_process";

const server = spawn("node", ["index.js"], { cwd: "c:\\sampleproject" });

const messages = [
  { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "test", version: "1.0" } } },
  { jsonrpc: "2.0", method: "notifications/initialized", params: {} },
  { jsonrpc: "2.0", id: 2, method: "tools/call", params: { name: "greet", arguments: { name: "Victor" } } },
];

let buffer = "";

server.stdout.on("data", (chunk) => {
  buffer += chunk.toString();
  const lines = buffer.split("\n");
  buffer = lines.pop();
  for (const line of lines) {
    if (!line.trim()) continue;
    const msg = JSON.parse(line);
    if (msg.id === 1) {
      server.stdin.write(JSON.stringify(messages[1]) + "\n");
      server.stdin.write(JSON.stringify(messages[2]) + "\n");
    } else if (msg.id === 2) {
      console.log("greet result:", msg.result.content[0].text);
      server.kill();
    }
  }
});

server.stderr.on("data", (d) => process.stderr.write(d));
server.stdin.write(JSON.stringify(messages[0]) + "\n");
