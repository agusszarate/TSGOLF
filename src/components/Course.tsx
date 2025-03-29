import { useMemo } from 'react'
import { usePlane, useBox } from '@react-three/cannon'
import { Level } from '../types/game'
import * as THREE from 'three'

interface CourseProps {
    level: Level
}

export const Course = ({ level }: CourseProps) => {
    const [groundRef] = usePlane(() => ({
        rotation: [-Math.PI / 2, 0, 0],
        position: [0, -0.1, 0],
        material: { friction: 0.5 },
    }))

    const obstacles = useMemo(() => {
        // Different obstacles based on level
        const levelObstacles = []

        if (level.id === 1) {
            levelObstacles.push({
                position: [2, 0.5, 0],
                size: [0.5, 1, 4],
                rotation: [0, 0, 0],
            })
        }

        return levelObstacles
    }, [level])

    return (
        <group>
            {/* Ground */}
            <mesh ref={groundRef as React.RefObject<THREE.Mesh>} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#4a9" />
            </mesh>

            {/* Hole */}
            <mesh position={[level.holePosition.x, -0.09, level.holePosition.z]}>
                <cylinderGeometry args={[0.25, 0.25, 0.1, 32]} />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Obstacles */}
            {obstacles.map((obstacle, index) => (
                <Box key={index} {...obstacle} />
            ))}
        </group>
    )
}

const Box = ({ position, size, rotation }: any) => {
    const [ref] = useBox(() => ({
        position,
        args: size,
        rotation,
        type: 'Static',
    }))

    return (
        <mesh ref={ref as React.RefObject<THREE.Mesh>} castShadow>
            <boxGeometry args={size} />
            <meshStandardMaterial color="#666" />
        </mesh>
    )
}
