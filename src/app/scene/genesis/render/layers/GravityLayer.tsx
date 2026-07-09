export default function GravityLayer() {
  return (
    <group name="GravityLayer">
      <mesh>
        <torusGeometry args={[2.4, 0.007, 16, 80]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
    </group>
  );
}
