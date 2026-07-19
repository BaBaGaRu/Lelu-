/**
 * ==========================================================
 * LÉLUVERSE
 * APPLICATION
 * ==========================================================
 */

import { useMemo } from "react";

import GenesisScene
  from "./app/scene/genesis/GenesisScene";

import LeluAssistant
  from "./abilities/assistant/LeluAssistant";

import LeluAssistantPanel
  from "./ui/components/LeluAssistantPanel";

export default function App() {

  const assistant =
    useMemo(
      () => new LeluAssistant(),
      [],
    );

  return (

    <>

      <GenesisScene />

      <LeluAssistantPanel
        assistant={assistant}
      />

    </>

  );

}