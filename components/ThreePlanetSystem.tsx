'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Scene } from './ThreeComponents/Scene';
import { PlanetNode } from '@/types/types';

interface ThreePlanetSystemProps {
    root: PlanetNode;
    width?: number;
    height?: number;
}

export function ThreePlanetSystem({ root, width = 800, height = 800 }: ThreePlanetSystemProps) {
    return (
        <Canvas
            orthographic
            camera={{ zoom: 6, position: [0, 0, 100] }}
            style={{ width: '100%', height: '100%' }}
        >
            <OrbitControls enableZoom enableRotate={false} />
            <group scale={[2.5, 2.5, 1]}>
                <Scene root={root} />
            </group>
        </Canvas>
    );
}
