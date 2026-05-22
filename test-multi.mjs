import { spawn } from "child_process";

const server = spawn("node", ["index.js"], { cwd: "c:\\sampleproject", shell: true });
const calls = [
  { jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "test", version: "1.0" } } },
  { jsonrpc: "2.0", method: "notifications/initialized", params: {} },
  { jsonrpc: "2.0", id: 2, method: "tools/list", params: {} },
];
let buf = "";
server.stdout.on("data", (c) => {
  buf += c.toString();
  const lines = buf.split("\n"); buf = lines.pop();
  for (const line of lines) {
    if (!line.trim()) continue;
    const msg = JSON.parse(line);
    if (msg.id === 1) {
      server.stdin.write(JSON.stringify(calls[1]) + "\n");
      server.stdin.write(JSON.stringify(calls[2]) + "\n");
    }
    if (msg.id === 2) {
      msg.result.tools.forEach(t => console.log(`- ${t.name}: ${t.description}`));
      server.kill();
    }
  }
});
server.stderr.on("data", (d) => process.stderr.write(d));
server.stdin.write(JSON.stringify(calls[0]) + "\n");
