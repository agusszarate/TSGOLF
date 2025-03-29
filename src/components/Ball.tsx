import { forwardRef, useImperativeHandle, useState } from 'react'
import { ThreeEvent } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import { useSphere, SphereProps, WorkerApi } from '@react-three/cannon'
import Arrow from './Arrow'
import * as THREE from 'three'

interface BallProps {
    position: [number, number, number]
}

export interface BallApi {
    position: WorkerApi['position']
    velocity: WorkerApi['velocity']
    angularVelocity: WorkerApi['angularVelocity']
    rotation: WorkerApi['rotation']
    applyImpulse: WorkerApi['applyImpulse']
}

export const Ball = forwardRef<BallApi, BallProps>(({ position }, ref) => {
    const [sphereRef, api] = useSphere(
        () =>
            ({
                mass: 1,
                position,
                args: [0.2],
                material: {
                    restitution: 0.7,
                    friction: 0.5,
                },
                linearDamping: 0.3,
                angularDamping: 0.3,
                allowSleep: false,
            } as SphereProps)
    )

    const [angle, setAngle] = useState(0)
    const [power, setPower] = useState(0)

    useImperativeHandle(
        ref,
        () => ({
            position: api.position,
            velocity: api.velocity,
            angularVelocity: api.angularVelocity,
            rotation: api.rotation,
            applyImpulse: api.applyImpulse,
        }),
        [api]
    )

    const handleMouseMove = (event: ThreeEvent<PointerEvent>) => {
        if (event.currentTarget) {
            const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            const newAngle = Math.atan2(y - rect.height / 2, x - rect.width / 2) * (180 / Math.PI)
            setAngle(newAngle)
            setPower(
                Math.min(Math.sqrt((x - rect.width / 2) ** 2 + (y - rect.height / 2) ** 2), 100)
            )
        }
    }

    return (
        <group onPointerMove={handleMouseMove}>
            <Sphere ref={sphereRef as React.RefObject<THREE.Mesh>} args={[0.2]} castShadow>
                <meshStandardMaterial color="white" />
            </Sphere>
            <Arrow angle={angle} power={power} />
        </group>
    )
})

Ball.displayName = 'Ball'
