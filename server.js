const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));

const RAPID_API_KEY = "PASTE_YOUR_RAPIDAPI_KEY_HERE";

app.get("/song", async (req, res) => {
    const spotifyLink = req.query.link;

    if (!spotifyLink) {
        return res.json({ error: "Please enter Spotify link" });
    }

    try {
        const response = await axios.get("https://spotify23.p.rapidapi.com/tracks/", {
            params: {
                ids: getTrackId(spotifyLink)
            },
            headers: {
                "X-RapidAPI-Key": RAPID_API_KEY,
                "X-RapidAPI-Host": "spotify23.p.rapidapi.com"
            }
        });

        const song = response.data.tracks[0];

        res.json({
            name: song.name,
            artist: song.artists[0].name,
            image: song.album.images[0].url,
            preview: song.preview_url,
            spotify: song.external_urls.spotify
        });

    } catch (error) {
        res.json({ error: "Song not found" });
    }
});

function getTrackId(link) {
    return link.split("track/")[1].split("?")[0];
}

app.listen(3000, () => {
    console.log("Server started: http://localhost:3000");
});