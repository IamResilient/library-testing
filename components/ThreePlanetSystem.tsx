'use client';

import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from '@/widgets/RealityModel/Scene';
import { ZoomHandler } from '@/widgets/RealityModel/ZoomHandler';
import { generatePlanetTree } from '@/utils/treeUtils';
import { getUserNeeds } from '@/utils/api/userNeedsData/userNeedsData';
import { PlanetNode, RawNode } from '@/types/types';

export function ThreePlanetSystem() {
    const [userNeeds, setUserNeeds] = useState<null | PlanetNode[]>(null);

    const fetchUserNeeds = async () => {
        const data: RawNode[] = await getUserNeeds();
        const rootTree = generatePlanetTree(data);
        setUserNeeds(rootTree);
    }

    useEffect(() => {
        fetchUserNeeds();
    }, [])

    return (
        <Canvas
            orthographic
            camera={{
                zoom: 1,
                position: [0, 0, 100],
            }}
            style={{ width: '100vw', height: '100vh', background: 'black' }}
        >
            <ambientLight intensity={1} />
            <ZoomHandler />
            {
                userNeeds && (
                    <Scene
                        nodes={userNeeds}
                    />
                )
            }
        </Canvas>
    );
}
