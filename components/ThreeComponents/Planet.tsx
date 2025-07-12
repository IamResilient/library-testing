import { useRef } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetNode } from '@/types/types';

export function Planet({
    data,
    onClick,
    activeId,
}: {
    data: PlanetNode;
    onClick: (planet: PlanetNode) => void;
    activeId: string;
}) {
    const ref = useRef<THREE.Mesh>(null!);
    const hasChildren = data.children.length > 0;

    const color = data.id === activeId
        ? 'orange'
        : hasChildren
            ? 'lightgreen'
            : 'skyblue';

    return (
        <>
            <mesh
                ref={ref}
                position={data.position}
                onClick={(e) => {
                    if (hasChildren) {
                        e.stopPropagation();
                        onClick(data);
                    }
                }}
            >
                <sphereGeometry args={[2.2, 32, 32]} />
                <meshStandardMaterial color={color} />
            </mesh>

            <Text
                fontSize={1}
                color="white"
                anchorX="center"
                anchorY="middle"
                position={[
                    data.position[0],
                    data.position[1],
                    data.position[2] + 2.4,
                ]}
                renderOrder={1}
            >
                {data.name}
            </Text>

        </>
    );
}
