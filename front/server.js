const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const pty = require("node-pty");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

let ptyProcess;

io.on("connection", (socket) => {
    const shell = process.platform === "win32" ? "cmd.exe" : "bash";

    ptyProcess = pty.spawn(shell, [], {
        name: "xterm-color",
        cols: 200,
        rows: 24,
        cwd: process.env.HOME,
        env: process.env,
    });

    ptyProcess.onData((data) => socket.emit("output", data));
    socket.on("input", (data) => ptyProcess.write(data));
    socket.on("resize", (size) => ptyProcess.resize(size.cols, size.rows));
    socket.on("disconnect", () => ptyProcess.kill());
});

server.listen(3001, () => {
    console.log("PTY server running on http://localhost:3001");
});
