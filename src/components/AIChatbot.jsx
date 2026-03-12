import { useState, useRef, useEffect } from "react";
import portfolioData from "../data/portfolioData";
import { GoogleGenerativeAI } from "@google/generative-ai";

import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Chip,
  CircularProgress,
  IconButton,
  Tooltip,
} from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";

// Gemini setup
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export default function AIChatbot() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [chat, setChat] = useState(() => {
    const saved = localStorage.getItem("arpit_chat_history");
    return saved ? JSON.parse(saved) : [];
  });

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("arpit_chat_history", JSON.stringify(chat));
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const suggestions = [
    "What are Arpit Panwar's top skills?",
    "Tell me about Arpit's experience",
    "Show Arpit's recent projects",
    "What technologies does Arpit specialize in?",
    "Explain Arpit's IoT monitoring dashboard project",
    "Is Arpit currently pursuing higher studies?",
    "How can I contact Arpit?",
  ];

  const sendMessage = async (text = message) => {
    const query = typeof text === "string" ? text : message;

    if (!query.trim() || loading) return;

    const userMsg = { role: "user", text: query };
    setChat((prev) => [...prev, userMsg]);
    setMessage("");
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

      const prompt = `
You are Arpit Panwar's AI portfolio assistant.

Portfolio Data:
${JSON.stringify(portfolioData)}

Instructions:
- Answer questions only about Arpit.
- Be professional and concise.

User Question:
${query}
`;

      const result = await model.generateContent(prompt);
      const response = result.response.text();

      setChat((prev) => [...prev, { role: "bot", text: response }]);
    } catch (error) {
      console.error("Gemini Error:", error);

      setChat((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ AI connection Busy. Please try again after sometime.",
        },
      ]);
    }

    setLoading(false);

    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const clearChat = () => {
    if (window.confirm("Delete all chat history?")) {
      setChat([]);
      localStorage.removeItem("arpit_chat_history");
    }
  };

  return (
    <>
      {/* Floating Bot Button */}
      {!open && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{
            position: "fixed",
            bottom: 30,
            right: 50,
            bgcolor: "#1976d2",
            color: "white",
            width: 80,
            height: 80,
            boxShadow: 6,
            "&:hover": { bgcolor: "#1565c0" },
            zIndex: 9999,
          }}
        >
          <SmartToyIcon />
          <span className="text-sm">AI Bot</span>
        </IconButton>
      )}

      {/* Chat Window */}
      {open && (
        <Paper
          elevation={15}
          sx={{
            position: "fixed",
            bottom: 20,
            right: { xs: 10, sm: 20 },
            width: { xs: "calc(100% - 20px)", sm: 380 },
            borderRadius: 4,
            overflow: "hidden",
            bgcolor: "#121212",
            border: "1px solid #333",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              p: 2,
              bgcolor: "#1976d2",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              fontWeight="700"
              color="white"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <SmartToyIcon fontSize="small" />
              Arpit's AI Guide
            </Typography>

            <Box>
              <Tooltip title="Clear History">
                <IconButton
                  size="small"
                  onClick={clearChat}
                  sx={{ color: "white" }}
                >
                  <DeleteOutlineIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <IconButton
                size="small"
                onClick={() => setOpen(false)}
                sx={{ color: "white" }}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Chat Messages */}
          <Box
            sx={{
              height: 320,
              overflowY: "auto",
              p: 2,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              bgcolor: "#0a0a0a",
              /* Scrollbar styling */
              "&::-webkit-scrollbar": {
                height: "6px",
              },

              "&::-webkit-scrollbar-track": {
                background: "#1a1a1a",
                borderRadius: "10px",
              },

              "&::-webkit-scrollbar-thumb": {
                background: "#444",
                borderRadius: "10px",
              },

              "&::-webkit-scrollbar-thumb:hover": {
                background: "#666",
              },
            }}
          >
            {chat.length === 0 && (
              <Box sx={{ textAlign: "center", mt: 6, opacity: 0.4 }}>
                <Typography variant="body2" color="white">
                  👋 Ask me anything about Arpit
                </Typography>
              </Box>
            )}

            {chat.map((c, i) => (
              <Box
                key={i}
                sx={{
                  alignSelf: c.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    p: 1.5,
                    borderRadius:
                      c.role === "user"
                        ? "18px 18px 0 18px"
                        : "18px 18px 18px 0",
                    bgcolor: c.role === "user" ? "#1976d2" : "#262626",
                    color: "white",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {c.text}
                </Typography>
              </Box>
            ))}

            {loading && (
              <Box
                sx={{
                  alignSelf: "flex-start",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <CircularProgress size={14} sx={{ color: "#1976d2" }} />
                <Typography variant="caption" color="gray">
                  AI is thinking...
                </Typography>
              </Box>
            )}

            <div ref={chatEndRef} />
          </Box>

          {/* Suggestions */}
          <Box
            sx={{
              px: 2,
              py: 1,
              display: "flex",
              gap: 1,
              overflowX: "auto",
              bgcolor: "#0a0a0a",

              /* Scrollbar styling */
              "&::-webkit-scrollbar": {
                height: "6px",
              },

              "&::-webkit-scrollbar-track": {
                background: "#1a1a1a",
                borderRadius: "10px",
              },

              "&::-webkit-scrollbar-thumb": {
                background: "#444",
                borderRadius: "10px",
              },

              "&::-webkit-scrollbar-thumb:hover": {
                background: "#666",
              },
            }}
          >
            {suggestions.map((s, i) => (
              <Chip
                key={i}
                label={s}
                onClick={() => sendMessage(s)}
                disabled={loading}
                size="small"
                sx={{
                  bgcolor: "#1e1e1e",
                  color: "#aaa",
                  "&:hover": { bgcolor: "#333", color: "white" },
                }}
              />
            ))}
          </Box>

          {/* Input */}
          <Box
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            sx={{
              p: 2,
              borderTop: "1px solid #333",
              display: "flex",
              gap: 1,
              bgcolor: "#121212",
            }}
          >
            <TextField
              inputRef={inputRef}
              fullWidth
              size="small"
              placeholder="Ask about Arpit..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  bgcolor: "#1e1e1e",
                  "& fieldset": { borderColor: "transparent" },
                },
              }}
            />

            <Button
              variant="contained"
              type="submit"
              disabled={loading || !message.trim()}
              sx={{ borderRadius: 2 }}
            >
              Send
            </Button>
          </Box>
        </Paper>
      )}
    </>
  );
}
