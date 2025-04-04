const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS for ALL Origins (Temporary for Testing)
app.use(cors({
    origin: "*",  // Allow all origins (You can restrict this later)
    methods: ["GET"],  // Only allow GET requests
    allowedHeaders: ["Content-Type"]
}));

// Serve static files (like index.html) from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// 🔹 Replace with your Zeno.fm stream ID
const ZENO_STREAM_URL = "https://stream.zeno.fm/fohqqtzdb9ztv";

// 🎵 Serve the Zeno.fm stream as-is
app.get("/stream", (req, res) => {
    axios({
        method: "get",
        url: ZENO_STREAM_URL,
        responseType: "stream",
    }).then((response) => {
        // Pipe the stream to the client
        response.data.pipe(res);
    }).catch((error) => {
        res.status(500).send("Error streaming audio");
    });
});

// 🏠 Serve index.html on the root URL
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => console.log(`🎵 Server running on port ${PORT}`));
