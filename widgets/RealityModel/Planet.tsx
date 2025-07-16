import { Text } from '@react-three/drei';
import * as THREE from 'three';
import '@/materials/GlowSphereMaterial';
import { PlanetNode } from '@/types/types';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

type PlanetProps = {
    node: PlanetNode;
    onClick: () => void;
    isSelected?: boolean;
};

export function Planet({ node, onClick, isSelected }: PlanetProps) {
    const { children, color, name, position, radius } = node;
    const [x, y] = position;
    const meshRef = useRef<THREE.Mesh>(null!);

    const direction = children.length > 0
        ? Math.sign(children[0].position[1] - y)
        : 1;

    const labelOffsetY = direction > 0 ? -radius - 20 : radius + 20;

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.scale.set(1, 1, 1); // Без увеличения
        }
    });

    return (
        <group position={position}>
            {/* Внешний glow только если выбрана */}
            {isSelected && (
                <mesh>
                    <sphereGeometry args={[radius * 1.2, 64, 64]} />
                    {/* @ts-ignore */}
                    <glowSphereMaterial
                        uColor={color}
                        uGlowIntensity={0.6}
                        uHighlightStrength={0.2}
                        transparent
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            )}

            {/* Основная сфера */}
            <mesh ref={meshRef} onClick={onClick} renderOrder={1}>
                <sphereGeometry args={[radius, 64, 64]} />
                {/* @ts-ignore */}
                <glowSphereMaterial
                    uColor={color}
                    uGlowIntensity={0.8}
                    uHighlightStrength={0.6}
                    transparent
                    depthWrite={true}
                    depthTest={true}
                />
            </mesh>

            {/* Текст, только если не выбран */}
            {!isSelected && (
                <Text
                    position={[0, labelOffsetY, 0.1]}
                    fontSize={10}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={140}
                    textAlign="center"
                    lineHeight={1.2}
                    renderOrder={10}
                >
                    {name}
                    <meshBasicMaterial attach="material" depthTest={false} />
                </Text>
            )}
        </group>
    );
}
