export default function DustLayer() {
  return (
    <group name="DustLayer">
      <points>
        <bufferGeometry />
        <pointsMaterial color="#818cf8" size={0.008} sizeAttenuation />
      </points>
    </group>
  );
}
