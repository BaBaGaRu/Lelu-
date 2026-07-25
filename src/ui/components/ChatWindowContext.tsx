/**
 * ==========================================================
 * LÉLUVERSE
 * CHAT WINDOW CONTEXT
 * ==========================================================
 */

import {
  useEffect,
  useRef,
  useState,
} from "react";

import LeluAssistant from "../../abilities/assistant/LeluAssistant";

interface Message {
  id: string;
  role: "user" | "assistant";
  text: string;
}

interface ChatWindowContextProps {
  assistant: LeluAssistant;
}

type Status =
  | "IDLE"
  | "LISTENING"
  | "THINKING"
  | "SPEAKING"
  | "ERROR"
  | "RECONNECTING"
  | "PAUSED"
  | "STOPPED"
  | "CANCELED"
  | "READY";

export default function ChatWindowContext({
  assistant,
}: ChatWindowContextProps) {
  const [messages, setMessages] = useState<
    Message[]
  >([
    {
      id: "welcome",
      role: "assistant",
      text: "Lélu online.",
    },
  ]);

  const [draft, setDraft] =
    useState("");

  const [mode, setMode] =
    useState<
      "chat" | "engineering"
    >("chat");

  const [status, setStatus] =
    useState<Status>("IDLE");

  const [voiceActive, setVoiceActive] =
    useState(assistant.state.voiceEnabled);

  const [typingId, setTypingId] =
    useState<string | null>(null);
  const [activeRequestId, setActiveRequestId] =
    useState<string | null>(null);
  const [isPaused, setIsPaused] =
    useState(false);
  const [isMuted, setIsMuted] =
    useState(false);
  const [lastUserPrompt, setLastUserPrompt] =
    useState("");
  const [conversationId, setConversationId] =
    useState(`conv-${Date.now()}`);

  const logRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    logRef.current?.scrollTo({
      top:
        logRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    assistant.setMode(mode);
  }, [assistant, mode]);

  useEffect(() => {
    assistant.setVoiceEnabled(voiceActive);
  }, [assistant, voiceActive]);

  useEffect(() => {
    const unsubscribe = assistant.voice.subscribe((state) => {
      setStatus(state.toUpperCase() as Status);
    });

    return () => {
      unsubscribe();
    };
  }, [assistant]);

  function statusColor() {
    switch (status) {
      case "LISTENING":
        return "#38bdf8";

      case "THINKING":
        return "#facc15";

      case "SPEAKING":
        return "#a78bfa";

      case "ERROR":
        return "#f87171";

      case "RECONNECTING":
        return "#fb923c";

      case "IDLE":
      default:
        return "#22c55e";
    }
  }

  async function typeReply(
    text: string,
  ) {
    const id =
      `${Date.now()}-assistant`;

    setTypingId(id);

    setMessages((current) => [
      ...current,
      {
        id,
        role: "assistant",
        text: "",
      },
    ]);

    for (
      let i = 0;
      i <= text.length;
      i++
    ) {
      if (!typingId) {
        // allow interruption by user controls
      }
      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            18,
          ),
      );

      setMessages((current) =>
        current.map((message) =>
          message.id === id
            ? {
                ...message,
                text: text.slice(
                  0,
                  i,
                ),
              }
            : message,
        ),
      );
    }

    setTypingId(null);

    setStatus("SPEAKING");
    assistant.voice.speak(text);
  }

  async function sendMessage(
    value: string,
    isRegeneration = false,
  ) {
    const text =
      value.trim();

    if (!text) {
      return;
    }

    if (!isRegeneration) {
      setMessages((current) => [
        ...current,
        {
          id:
            `${Date.now()}-user`,
          role: "user",
          text,
        },
      ]);
    }

    setDraft("");
    setLastUserPrompt(text);
    setStatus("THINKING");

    const requestId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    setActiveRequestId(requestId);

    try {
      const reply =
        mode === "engineering"
          ? await assistant.respondEngineering(text, requestId)
          : await assistant.respond(text, requestId);

      setActiveRequestId(reply.requestId ?? requestId);
      await typeReply(reply.text);
    }
    catch (error) {
      setStatus("ERROR");
      const message = error instanceof Error ? error.message : "An error occurred.";
      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-assistant-error`,
          role: "assistant",
          text: `[${message}]`,
        },
      ]);
    }
    finally {
      setActiveRequestId(null);
      if (!assistant.voice.getState() || assistant.voice.getState() === "idle") {
        setStatus("IDLE");
      }
    }
  }

  async function toggleListening() {
    if (voiceActive) {
      assistant.voice.stopListening();
      setVoiceActive(false);
      if (!isPaused) setStatus("IDLE");
      return;
    }

    setVoiceActive(true);
    setStatus("LISTENING");

    await assistant.voice.startListening((transcript) => {
      setVoiceActive(true);
      if (!transcript) {
        return;
      }

      setDraft(transcript);
      setStatus("THINKING");
      void sendMessage(transcript);
    });
  }

  return (
    <section className="chat-console">

      <header className="chat-console-header">

        <div className="chat-console-title">
          ◎ LÉLU
        </div>

        <div className="chat-console-modes">

          <button
            type="button"
            className={
              mode === "chat"
                ? "active"
                : ""
            }
            onClick={() =>
              setMode("chat")
            }
          >
            Chat
          </button>

          <button
            type="button"
            className={
              mode === "engineering"
                ? "active"
                : ""
            }
            onClick={() =>
              setMode(
                "engineering",
              )
            }
          >
            Engineering
          </button>

        </div>

        <div
          className="chat-console-status"
          style={{
            color:
              statusColor(),
          }}
        >
          ● {status}
        </div>

      <div className="chat-console-controls">
        <button type="button" onClick={() => void sendMessage(draft)}>
          ▶ Send
        </button>
        <button type="button" onClick={() => {
          if (isPaused) {
            assistant.orchestrator.resume();
            setIsPaused(false);
            setStatus("IDLE");
          }
          else {
            assistant.orchestrator.pause();
            assistant.voice.stopSpeaking();
            setIsPaused(true);
            setStatus("PAUSED");
          }
        }}>
          {isPaused ? "▶ Resume" : "⏸ Pause"}
        </button>
        <button type="button" onClick={() => {
          assistant.orchestrator.stopCurrent();
          assistant.voice.stopSpeaking();
          assistant.voice.stopListening();
          setStatus("IDLE");
        }}>
          ⏹ Stop
        </button>
        <button type="button" onClick={() => {
          if (activeRequestId) {
            assistant.orchestrator.cancel(activeRequestId);
            assistant.voice.stopSpeaking();
            assistant.voice.stopListening();
            setStatus("CANCELED");
          }
        }}>
          ✖ Cancel
        </button>
        <button type="button" onClick={() => {
          if (lastUserPrompt) {
            assistant.orchestrator.stopCurrent();
            void sendMessage(lastUserPrompt, true);
          }
        }}>
          🔄 Regenerate
        </button>
        <button type="button" onClick={() => void toggleListening()}>
          {voiceActive ? "🎤 Listening" : "🎤 Voice"}
        </button>
        <button type="button" onClick={() => {
          assistant.voice.toggleMute();
          setIsMuted(!isMuted);
        }}>
          {isMuted ? "🔊 Unmute" : "🔇 Mute"}
        </button>
        <button type="button" onClick={() => {
          setMessages([
            {
              id: "welcome",
              role: "assistant",
              text: "Lélu online.",
            },
          ]);
          setDraft("");
          setLastUserPrompt("");
          setActiveRequestId(null);
          setStatus("READY");
        }}>
          🧹 Clear Chat
        </button>
        <button type="button" onClick={() => {
          setMessages([
            {
              id: "welcome",
              role: "assistant",
              text: "Conversation deleted. Start a new one.",
            },
          ]);
          setDraft("");
          setLastUserPrompt("");
          setActiveRequestId(null);
          setConversationId(`conv-${Date.now()}`);
          assistant.orchestrator.stopCurrent();
          setStatus("READY");
        }}>
          🗑 Delete Conversation
        </button>
      </div>
      </header>

      <div
        ref={logRef}
        className="chat-console-log"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`console-line ${message.role}`}
          >
            <span className="console-speaker">
              {message.role === "assistant" ? "Lélu" : "You"}
              {" > "}
            </span>

            <span className="console-text">
              {message.text}

              {typingId === message.id && (
                <span className="console-cursor">
                  ▋
                </span>
              )}
            </span>
          </div>
        ))}
      </div>

      <form
        className="chat-console-input"
        onSubmit={(event) => {
          event.preventDefault();
          void sendMessage(draft);
        }}
      >
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={
            mode === "engineering"
              ? "Ask an engineering question..."
              : "Type a message..."
          }
          autoComplete="off"
          spellCheck={false}
        />

        <button
          type="button"
          onClick={() => {
            void toggleListening();
          }}
        >
          {voiceActive ? "■" : "🎤"}
        </button>

        <button type="submit">➜</button>
      </form>
    </section>
  );
}
