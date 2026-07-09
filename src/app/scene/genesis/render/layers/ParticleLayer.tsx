export default function ParticleLayer() {
  return (
    <group name="ParticleLayer">
      <points>
        <bufferGeometry />
        <pointsMaterial color="#38bdf8" size={0.015} sizeAttenuation />
      </points>
    </group>
  );
}
