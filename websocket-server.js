const WebSocket = require("ws");

const myPort = 8099;

const wss = new WebSocket.Server({ port: myPort });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    const { username, audioData } = JSON.parse(message);

    console.log("Received audio data from:", username);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({ username: username, audioData: audioData })
        );
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log(`WebSocket server started on port ${myPort}`);
