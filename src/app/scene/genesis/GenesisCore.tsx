/**
 * ==========================================================
 * LÉLUVERSE
 * GENESIS CORE
 *
 * The living heart of Lélu.
 * Every Genesis system registers here.
 * ==========================================================
 */

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type GenesisMode =
  | "chat"
  | "engineering"
  | "creative"
  | "research";

export interface GenesisMessage {

  id: string;

  role:
    | "user"
    | "assistant";

  text: string;

  timestamp: number;

  source:
    | "ai"
    | "local";

  provider?: string;

  confidence?: number;

}

export interface GenesisNotification {

  id: string;

  title: string;

  description?: string;

  created: number;

}

export interface GenesisState {

  initialized: boolean;

  thinking: boolean;

  speaking: boolean;

  listening: boolean;

  online: boolean;

  mode: GenesisMode;

  messages: GenesisMessage[];

  notifications: GenesisNotification[];

}

export interface GenesisContextValue {

  state: GenesisState;

  setMode(
    mode: GenesisMode,
  ): void;

  addMessage(
    message: GenesisMessage,
  ): void;

  clearConversation(): void;

  setThinking(
    value: boolean,
  ): void;

  setSpeaking(
    value: boolean,
  ): void;

  setListening(
    value: boolean,
  ): void;

  notify(
    title: string,
    description?: string,
  ): void;

}

const GenesisContext =
  createContext<GenesisContextValue | null>(
    null,
  );

export function useGenesis() {

  const context =
    useContext(
      GenesisContext,
    );

  if (!context) {

    throw new Error(
      "useGenesis must be used inside GenesisCore.",
    );

  }

  return context;

}

interface GenesisCoreProps {

  children?: ReactNode;

}

export default function GenesisCore({

  children,

}: GenesisCoreProps) {

  const [state, setState] =
    useState<GenesisState>({

      initialized: true,

      thinking: false,

      speaking: false,

      listening: false,

      online: true,

      mode: "chat",

      messages: [],

      notifications: [],

    });

  const value =
    useMemo<GenesisContextValue>(

      () => ({

        state,

        setMode(mode) {

          setState(current => ({

            ...current,

            mode,

          }));

        },

        addMessage(message) {

          setState(current => ({

            ...current,

            messages: [

              ...current.messages,

              message,

            ],

          }));

        },

        clearConversation() {

          setState(current => ({

            ...current,

            messages: [],

          }));

        },

        setThinking(value) {

          setState(current => ({

            ...current,

            thinking: value,

          }));

        },

        setSpeaking(value) {

          setState(current => ({

            ...current,

            speaking: value,

          }));

        },

        setListening(value) {

          setState(current => ({

            ...current,

            listening: value,

          }));

        },

        notify(

          title,

          description,

        ) {

          setState(current => ({

            ...current,

            notifications: [

              ...current.notifications,

              {

                id: crypto.randomUUID(),

                title,

                description,

                created: Date.now(),

              },

            ],

          }));

        },

      }),

      [state],

    );

  return (

    <GenesisContext.Provider
      value={value}
    >

      {children}

    </GenesisContext.Provider>

  );

}