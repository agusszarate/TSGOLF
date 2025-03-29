import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/cannon'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Suspense, useState, useRef } from 'react'
import { Vector3 } from 'three'
import { Ball, BallApi } from './components/Ball'
import { Course } from './components/Course'
import { Controls } from './components/Controls'
import { Level } from './types/game'

const levels: Level[] = [
    {
        id: 1,
        name: "Beginner's Luck",
        par: 3,
        startPosition: new Vector3(-5, 0, 0),
        holePosition: new Vector3(5, 0, 0),
    },
    // Add more levels here
]

function App() {
    const [currentLevel, setCurrentLevel] = useState<Level>(levels[0])
    const [strokes, setStrokes] = useState(0)
    const ballRef = useRef<BallApi>(null)
    const [angle, setAngle] = useState(0)
    const [power, setPower] = useState(0)

    const handleShoot = (direction: Vector3, power: number) => {
        if (!ballRef.current) {
            console.warn('Ball reference is null')
            return
        }

        if (power <= 0) {
            console.warn('Power is too low, increasing...')
            power = 0.01
        }

        setStrokes((prev) => prev + 1)

        console.log('Direction:', direction)
        console.log('Power:', power)
        console.log('Ball Ref:', ballRef.current)

        const forceMagnitude = power * 500
        const normalizedDirection = direction.clone().normalize()

        const impulse: [number, number, number] = [
            normalizedDirection.x * forceMagnitude,
            0,
            normalizedDirection.z * forceMagnitude,
        ]

        ballRef.current.velocity.set(0, 0, 0)
        ballRef.current.angularVelocity.set(0, 0, 0)
        ballRef.current.applyImpulse(impulse, [0, 0, 0])
    }

    return (
        <div className="w-full h-screen relative">
            <div className="absolute top-4 left-4 p-4 bg-black/50 rounded-lg text-white z-50">
                <h2 className="text-xl font-bold mb-2">{currentLevel.name}</h2>
                <p>Par: {currentLevel.par}</p>
                <p>Strokes: {strokes}</p>
            </div>

            <Canvas className="absolute inset-0" shadows>
                <PerspectiveCamera makeDefault position={[0, 10, 10]} />
                <OrbitControls target={[0, 0, 0]} maxPolarAngle={Math.PI / 2.5} />

                <ambientLight intensity={0.5} />
                <directionalLight
                    position={[10, 10, 5]}
                    intensity={1}
                    castShadow
                    shadow-mapSize={[2048, 2048]}
                />

                <Physics
                    gravity={[0, -9.81, 0]}
                    defaultContactMaterial={{
                        friction: 0.5,
                        restitution: 0.7,
                    }}
                >
                    <Suspense fallback={null}>
                        <Ball
                            position={[
                                currentLevel.startPosition.x,
                                0.2,
                                currentLevel.startPosition.z,
                            ]}
                            ref={ballRef}
                        />
                        <Course level={currentLevel} />
                    </Suspense>
                </Physics>
            </Canvas>

            <Controls onShoot={handleShoot} />
        </div>
    )
}

export default App
