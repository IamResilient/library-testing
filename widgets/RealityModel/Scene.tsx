import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Planet } from './Planet';
import { Line } from './Line';
import { PlanetNode } from '@/types/types';
import { flattenTree } from '@/utils/treeUtils';

type SceneProps = {
    nodes: PlanetNode[];
};

export function Scene({ nodes }: SceneProps) {
    const [visibleIds, setVisibleIds] = useState<Set<string>>(() =>
        new Set(flattenTree(nodes, 1).map(n => n.id))
    );
    const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
    const [targetCameraPosition, setTargetCameraPosition] = useState<THREE.Vector3 | null>(null);
    const groupRef = useRef<THREE.Group>(null);
    const { camera } = useThree();

    const handleClick = (node: PlanetNode) => {
        const newPath: PlanetNode[] = [];

        function findPath(current: PlanetNode, targetId: string, path: PlanetNode[]): boolean {
            path.push(current);
            if (current.id === targetId) return true;
            for (const child of current.children) {
                if (findPath(child, targetId, path)) return true;
            }
            path.pop();
            return false;
        }

        for (const root of nodes) {
            const path: PlanetNode[] = [];
            if (findPath(root, node.id, path)) {
                newPath.push(...path);
                break;
            }
        }

        const newVisibleIds = new Set<string>();
        for (const pathNode of newPath) {
            newVisibleIds.add(pathNode.id);
            pathNode.children.forEach(child => newVisibleIds.add(child.id));
        }
        flattenTree(nodes, 1).forEach(n => newVisibleIds.add(n.id));

        setVisibleIds(newVisibleIds);
        setSelectedNodeId(node.id);
        setTargetCameraPosition(new THREE.Vector3(node.position[0], node.position[1], camera.position.z));
    };

    useEffect(() => {
        if (!targetCameraPosition) return;

        let animationFrameId: number;
        let interruptedByUser = false;

        const handleUserInteraction = () => {
            interruptedByUser = true;
        };

        // Слушаем колесо мыши и перемещения
        window.addEventListener('wheel', handleUserInteraction, { passive: true });
        window.addEventListener('mousedown', handleUserInteraction);

        const animate = () => {
            if (interruptedByUser) {
                setTargetCameraPosition(null);
                return;
            }

            const current = camera.position.clone();
            const target = targetCameraPosition.clone();

            current.lerp(target, 0.03);
            camera.position.copy(current);
            camera.updateProjectionMatrix();

            if (camera.position.distanceTo(target) > 0.5) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                camera.position.copy(target);
                camera.updateProjectionMatrix();
                setTargetCameraPosition(null);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('wheel', handleUserInteraction);
            window.removeEventListener('mousedown', handleUserInteraction);
        };
    }, [targetCameraPosition, camera]);



    const visibleNodes = useMemo(() => {
        const flat: PlanetNode[] = [];
        const walk = (node: PlanetNode) => {
            if (visibleIds.has(node.id)) {
                flat.push(node);
                node.children.forEach(walk);
            }
        };
        nodes.forEach(walk);
        return flat;
    }, [nodes, visibleIds]);

    const topLevelNodes = useMemo(() => {
        return visibleNodes.filter(
            node => !visibleNodes.some(other =>
                other.children.some(child => child.id === node.id)
            )
        );
    }, [visibleNodes]);

    return (
        <group ref={groupRef}>
            {visibleNodes.map(node => (
                <Planet
                    key={node.id}
                    node={node}
                    isSelected={selectedNodeId === node.id}
                    onClick={() => handleClick(node)}
                />
            ))}

            {topLevelNodes.map((node, i) => {
                const next = topLevelNodes[i + 1];
                return next ? (
                    <Line
                        key={`top-${node.id}-${next.id}`}
                        start={node.position}
                        end={next.position}
                    />
                ) : null;
            })}

            {visibleNodes.map(parent =>
                parent.children.map(child =>
                    visibleIds.has(child.id) ? (
                        <Line
                            key={`child-${parent.id}-${child.id}`}
                            start={parent.position}
                            end={child.position}
                        />
                    ) : null
                )
            )}
        </group>
    );
}
