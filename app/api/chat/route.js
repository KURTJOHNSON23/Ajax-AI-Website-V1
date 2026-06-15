import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "../../../lib/chatbot-config";

// Fast, low-cost model — ideal for an FAQ bot.
// For deeper answers you could switch to "claude-opus-4-8".
const MODEL = "claude-haiku-4-5";

export async function POST(request) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return Response.json(
        { error: "Chatbot is not configured yet." },
        { status: 500 }
      );
    }

    // Created per-request, on the server, so the key never reaches the browser.
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const { messages } = await request.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "No messages provided." }, { status: 400 });
    }

    // Keep only the last 20 turns so the request stays small and cheap.
    const trimmed = messages.slice(-20).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: String(m.content || "").slice(0, 2000),
    }));

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: trimmed,
    });

    const reply = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n")
      .trim();

    return Response.json({
      reply: reply || "Sorry, I didn't catch that. Could you rephrase?",
    });
  } catch (err) {
    console.error("Chatbot error:", err);
    return Response.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
