'use client';

import { Canvas } from '@react-three/fiber';
import { Scene } from '@/widgets/RealityModel/Scene';
import { ZoomHandler } from '@/widgets/RealityModel/ZoomHandler';
import { rawData } from '@/utils/planetData';
import { generatePlanetTree } from '@/utils/treeUtils';

const rootTree = generatePlanetTree(rawData);

export function ThreePlanetSystem() {
    return (
        <Canvas
            orthographic
            camera={{
                zoom: 1.2,
                position: [0, 0, 100],
            }}
            style={{ width: '100vw', height: '100vh', background: 'black' }}
        >
            <ambientLight intensity={1} />
            <ZoomHandler />
            <Scene
                nodes={rootTree}
            />
        </Canvas>
    );
}
