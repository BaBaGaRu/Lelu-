export default function LightningLayer() {
  return (
    <group name="LightningLayer">
      <mesh>
        <tubeGeometry args={[null as never, 20, 0.01, 8, false]} />
        <meshBasicMaterial color="#f0abfc" />
      </mesh>
    </group>
  );
}
