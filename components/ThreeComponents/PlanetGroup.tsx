import { Planet } from "./Planet";
import { Line } from "./Line";
import { PlanetNode } from "@/types/types";

export function PlanetGroup({
    viewRoot,
    onClick,
}: {
    viewRoot: PlanetNode;
    onClick: (p: PlanetNode) => void;
}) {
    return (
        <>
            <Planet data={viewRoot} onClick={onClick} activeId={viewRoot.id} />
            {viewRoot.children.map((child) => (
                <group key={child.id}>
                    <Line start={viewRoot.position} end={child.position} />
                    <Planet data={child} onClick={onClick} activeId={viewRoot.id} />
                </group>
            ))}
        </>
    );
}

