import React from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ArrowProps {
    angle: number
    power: number
}

const Arrow: React.FC<ArrowProps> = ({ angle, power }) => {
    const arrowRef = React.useRef<THREE.Mesh>(null)

    useFrame(() => {
        if (arrowRef.current) {
            arrowRef.current.rotation.z = THREE.MathUtils.degToRad(angle)
            arrowRef.current.scale.set(power / 100, 1, 1)
        }
    })

    return (
        <mesh ref={arrowRef} position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 1, 32]} />
            <meshStandardMaterial color="red" />
        </mesh>
    )
}

export default Arrow
