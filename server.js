const express = require("express");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Replace with your Zeno.fm stream ID
const ZENO_STREAM_URL = "https://stream.zeno.fm/fohqqtzdb9ztv";

// 📡 Fetch Metadata
async function getStreamMetadata() {
    try {
        const response = await axios.get(ZENO_STREAM_URL, { headers: { 'Icy-MetaData': '1' } });
        const metadata = response.headers["icy-metaint"] ? response.headers["icy-metaint"] : "Unknown Stream";

        return { song: metadata };
    } catch (error) {
        return { error: "Failed to fetch stream data" };
    }
}

// 🌐 API Endpoint
app.get("/nowplaying", async (req, res) => {
    const data = await getStreamMetadata();
    res.json(data);
});

app.listen(PORT, () => console.log(`🎵 Server running on port ${PORT}`));
