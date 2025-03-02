const express = require('express');
const { Server } = require('ws');
const axios = require('axios');
require('dotenv').config();

const app = express();
const server = require('http').createServer(app);
const wss = new Server({ server });

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const D_ID_API_KEY = process.env.D_ID_API_KEY;

wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
        try {
            console.log(`User input: ${message}`);

            // 1️⃣ Get AI Response from Gemini
            const geminiResponse = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
                { contents: [{ role: "user", parts: [{ text: message }] }] },
                { headers: { "Content-Type": "application/json" } }
            );

            const aiResponse = geminiResponse.data.candidates[0].content.parts[0].text;
            console.log(`Gemini AI Response: ${aiResponse}`);

            // 2️⃣ Generate Real-Time AI Video with D-ID
            const dIdResponse = await axios.post(
                'https://api.d-id.com/talks/streaming',
                { script: { type: "text", input: aiResponse } },
                { headers: { Authorization: `Bearer ${D_ID_API_KEY}` } }
            );

            const videoUrl = dIdResponse.data.result_url;
            console.log(`D-ID Video URL: ${videoUrl}`);

            // 3️⃣ Send AI Video Response Back to Chatbot
            ws.send(JSON.stringify({ videoUrl }));

        } catch (error) {
            console.error("Error:", error);
            ws.send(JSON.stringify({ error: "Failed to generate AI response" }));
        }
    });
});

server.listen(3000, () => console.log('WebSocket Server running on port 3000'));
