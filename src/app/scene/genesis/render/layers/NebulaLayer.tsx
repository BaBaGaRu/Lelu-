import { useGenesis } from "../../GenesisCore";

export default function NebulaLayer() {
  const genesis = useGenesis();
  const state = genesis.current;

  return (
    <group name="NebulaLayer">
      <mesh position={[0, 0, -2]}>
        <sphereGeometry args={[2.2, 16, 16]} />
        <meshBasicMaterial color={state.energy > 0.5 ? "#60a5fa" : "#0f172a"} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}
