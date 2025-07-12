import { useMemo } from "react";
import * as THREE from 'three';
import { Vec3 } from "@/types/types";

export function Line({ start, end }: { start: Vec3; end: Vec3 }) {
    const line = useMemo(() => {
        const geometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(...start),
            new THREE.Vector3(...end),
        ]);
        const material = new THREE.LineBasicMaterial({ color: 'white' });
        const line = new THREE.Line(geometry, material);
        line.renderOrder = -1; // ← ключевая строка
        return line;
    }, [start, end]);

    return <primitive object={line} />;
}
