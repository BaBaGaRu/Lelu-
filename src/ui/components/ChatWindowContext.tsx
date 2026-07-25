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
  | "ONLINE"
  | "THINKING"
  | "LISTENING";

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
    useState<Status>("ONLINE");

  const [typingId, setTypingId] =
    useState<string | null>(null);

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
    return () => {
      assistant.voice.dispose();
    };
  }, [assistant]);

  function statusColor() {
    switch (status) {
      case "ONLINE":
        return "#22c55e";

      case "THINKING":
        return "#facc15";

      case "LISTENING":
        return "#38bdf8";

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

    assistant.voice.speak(text);

    setStatus("ONLINE");
  }

  async function sendMessage(
    value: string,
  ) {
    const text =
      value.trim();

    if (!text) {
      return;
    }

    setMessages((current) => [
      ...current,
      {
        id:
          `${Date.now()}-user`,
        role: "user",
        text,
      },
    ]);

    setDraft("");

    setStatus("THINKING");

    const reply =
      mode === "engineering"
        ? await assistant.respondEngineering(
            text,
          )
        : await assistant.respond(
            text,
          );
              await typeReply(reply.text);
  }

  function toggleListening() {
    if (status === "LISTENING") {
      assistant.voice.stopListening();
      setStatus("ONLINE");
      return;
    }

    setStatus("LISTENING");

    assistant.voice.startListening(
      (transcript) => {
        setStatus("ONLINE");

        if (!transcript) {
          return;
        }

        setDraft(transcript);

        void sendMessage(
          transcript,
        );
      },
    );
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

      </header>

      <div
        ref={logRef}
        className="chat-console-log"
      >
        {messages.map(
          (message) => (
            <div
              key={
                message.id
              }
              className={`console-line ${message.role}`}
            >
              <span className="console-speaker">
                {message.role ===
                "assistant"
                  ? "Lélu"
                  : "You"}
                {" > "}
              </span>

              <span className="console-text">
                {message.text}

                {typingId ===
                  message.id && (
                  <span className="console-cursor">
                    ▋
                  </span>
                )}
              </span>
            </div>
          ),
        )}
      </div>

      <form
        className="chat-console-input"
        onSubmit={(
          event,
        ) => {
          event.preventDefault();
          void sendMessage(
            draft,
          );
        }}
      >
        <input
          value={draft}
          onChange={(
            event,
          ) =>
            setDraft(
              event.target
                .value,
            )
          }
          placeholder={
            mode ===
            "engineering"
              ? "Ask an engineering question..."
              : "Type a message..."
          }
          autoComplete="off"
          spellCheck={
            false
          }
        />

        <button
          type="button"
          onClick={
            toggleListening
          }
        >
          {status ===
          "LISTENING"
            ? "■"
            : "🎤"}
        </button>

        <button
          type="submit"
        >
          ➜
        </button>

      </form>

    </section>
  );
}