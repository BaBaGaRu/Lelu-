/**
 * ==========================================================
 * LÉLUVERSE
 * STAR FIELD TEST
 *
 * Minimal visibility test.
 *
 * Used to verify:
 * - Canvas
 * - Camera
 * - Genesis renderer path
 * ==========================================================
 */


export default function StarField() {


  return (

    <group>


      <mesh

        position={[

          0,

          0,

          0,

        ]}

      >


        <sphereGeometry

          args={[

            0.08,

            16,

            16,

          ]}

        />


        <meshBasicMaterial

          color="white"

        />


      </mesh>


    </group>

  );

}