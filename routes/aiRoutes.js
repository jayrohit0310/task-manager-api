
const express = require("express");
const OpenAI = require("openai");

const router = express.Router();

// Initialize the client only when a key is configured.
const client = process.env.OPENAI_API_KEY
    ? new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        timeout: 15000,
        maxRetries: 0
    })
    : null;

// POST /api/ai/generate-description
router.post("/generate-description", async (req, res) => {
    const { title } = req.body || {};

    if (typeof title !== "string" || !title.trim()) {
        return res.status(400).json({
            description: "",
            fallback: true,
            message: "Please enter a task title first."
        });
    }

    if (title.trim().length > 200) {
        return res.status(400).json({
            description: "",
            fallback: true,
            message: "Task title must be 200 characters or fewer."
        });
    }

    // Graceful degradation if the key is missing.
    if (!client) {
        return res.status(503).json({
            description: "",
            fallback: true,
            message: "AI is currently unavailable. You can write the description manually."
        });
    }

    try {
        const response = await client.responses.create({
            model: "gpt-4o-mini",
            instructions:
                "You help users manage tasks. Write a clear, practical task description in 2 to 4 sentences. Do not invent personal or confidential details.",
            input: `Generate a task description for this task title: ${title.trim()}`
        });

        const description = response.output_text.trim();

        if (!description) {
            throw new Error("The AI returned an empty response.");
        }

        return res.json({
            description,
            fallback: false
        });
    } catch (error) {
        console.error("AI description generation failed:", error.message);

        return res.status(503).json({
            description: "",
            fallback: true,
            message: "AI suggestions are temporarily unavailable. Please write your description manually."
        });
    }
});

module.exports = router;
