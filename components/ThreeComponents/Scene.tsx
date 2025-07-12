'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';
import { PlanetGroup } from './PlanetGroup';
import { PlanetNode } from '@/types/types';

export function Scene({ root }: { root: PlanetNode }) {
    const [viewStack, setViewStack] = useState<PlanetNode[]>([root]);
    const viewRoot = viewStack[viewStack.length - 1];

    const groupRef = useRef<THREE.Group>(null);
    const targetOffset = useRef(new THREE.Vector3(...viewRoot.position));

    // Плавное смещение всей сцены
    useFrame((state) => {
        const cam = state.camera;
        cam.lookAt(0, 0, 0); // всегда в центр
        cam.updateProjectionMatrix();

        // Плавное перемещение всей группы планет
        if (groupRef.current) {
            const current = groupRef.current.position;
            const target = targetOffset.current.clone().multiplyScalar(-1);
            current.lerp(target, 0.03);
        }
    });

    const handleClick = (clicked: PlanetNode) => {
        if (clicked.id === viewRoot.id && viewStack.length > 1) {
            const newStack = [...viewStack];
            newStack.pop();
            const newRoot = newStack[newStack.length - 1];
            setViewStack(newStack);
            targetOffset.current = new THREE.Vector3(...newRoot.position);
        } else if (clicked.children.length > 0) {
            setViewStack([...viewStack, clicked]);
            targetOffset.current = new THREE.Vector3(...clicked.position);
        }
    };

    return (
        <>
            <ambientLight intensity={1} />
            <group ref={groupRef}>
                <PlanetGroup viewRoot={viewRoot} onClick={handleClick} />
            </group>
        </>
    );
}
