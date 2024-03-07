require("dotenv").config();

const WebSocket = require("ws");

const myPort = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: myPort });

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.on("message", (message) => {
    const { metadata, audioData } = JSON.parse(message);

    console.log("Received audio data from:", metadata);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({ metadata: metadata, audioData: audioData })
        );
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

wss.on("error", (error) => {
  console.error("WebSocket server error:", error);
});

console.log(`WebSocket server started on port ${myPort}`);
