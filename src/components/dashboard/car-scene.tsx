import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Grid, OrbitControls, Sparkles } from '@react-three/drei'
import { useRef } from 'react'
import type { Mesh } from 'three'

function CarModel() {
  const bodyRef = useRef<Mesh>(null)
  useFrame((_, delta) => {
    if (bodyRef.current) {
      bodyRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
      <mesh ref={bodyRef} position={[0, 0, 0]}>
        <boxGeometry args={[3.2, 0.8, 1.6]} />
        <meshStandardMaterial color="#7b2f8b" metalness={0.4} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[1.8, 0.6, 1.4]} />
        <meshStandardMaterial color="#b678c2" metalness={0.2} roughness={0.4} />
      </mesh>
      {[
        [-1.1, -0.5, -0.9],
        [1.1, -0.5, -0.9],
        [-1.1, -0.5, 0.9],
        [1.1, -0.5, 0.9],
      ].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]}>
          <cylinderGeometry args={[0.35, 0.35, 0.35, 32]} />
          <meshStandardMaterial color="#111827" />
        </mesh>
      ))}
      </group>
    </Float>
  )
}

export function CarScene() {
  return (
    <div className="glass-surface h-[380px] w-full rounded-3xl">
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
        <Environment preset="city" environmentIntensity={0.5} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[3, 3, 2]} color="#60176f" intensity={2} />
        <CarModel />
        <Grid
          args={[10, 10]}
          cellSize={0.5}
          cellThickness={0.5}
          cellColor="#b883c5"
          sectionSize={2}
          sectionThickness={1}
          sectionColor="#60176f"
          fadeDistance={14}
          fadeStrength={1}
          infiniteGrid
          position={[0, -1, 0]}
        />
        <Sparkles count={60} scale={8} size={1.4} speed={0.3} color="#9f5eae" opacity={0.4} />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  )
}
