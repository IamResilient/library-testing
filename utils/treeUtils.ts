import { RawNode, PlanetNode, Vec3 } from '@/types/types';

const ANGLE_OFFSET = Math.PI / 6; // 30 градусов в радианах
const DISTANCE_BASE = 200;

let nodeIdCounter = 0;

export function generatePlanetTree(rawNodes: RawNode[]): PlanetNode[] {
    nodeIdCounter = 0;

    const root: PlanetNode = {
        id: `node-${nodeIdCounter++}`,
        name: 'Интегративное чувство жизни',
        description: 'Целостное переживание жизни как связной и осмысленной',
        position: [0, 0, 0],
        color: getColorByScore(1),
        radius: 100,
        score: 1,
        children: [],
    };

    const firstLevelCount = rawNodes.length;
    const angleStep = (2 * Math.PI) / firstLevelCount;

    root.children = rawNodes.map((rawNode, i) => {
        const angle = i * angleStep;
        const x = Math.cos(angle) * DISTANCE_BASE;
        const y = Math.sin(angle) * DISTANCE_BASE;
        const position: Vec3 = [x, y, 0];
        const direction = normalize([x, y]); // направление от центра
        return walk(rawNode, position, root.position, direction, 1);
    });

    return [root];
}

function walk(
    node: RawNode,
    position: Vec3,
    parentPosition: Vec3,
    direction: [number, number],
    level: number
): PlanetNode {
    const id = `node-${nodeIdCounter++}`;

    const childrenRaw = node.children || [];
    const count = childrenRaw.length;

    const nodeDirection = normalize([
        position[0] - parentPosition[0],
        position[1] - parentPosition[1],
    ]);

    const distance = DISTANCE_BASE * Math.max(0.8, 1 - level * 0.1);

    const angleShift = (count > 1 ? ANGLE_OFFSET : 0);

    const children: PlanetNode[] = childrenRaw.map((child, index) => {
        const middle = Math.floor(count / 2);
        const shiftIndex = index - middle;
        const angle = shiftIndex * angleShift;

        const rotated = rotateVec2(nodeDirection, angle);
        const childX = position[0] + rotated[0] * distance;
        const childY = position[1] + rotated[1] * distance;
        const childPos: Vec3 = [childX, childY, 0];

        return walk(child, childPos, position, rotated, level + 1);
    });

    return {
        id,
        name: node.name,
        description: node.description,
        position,
        color: getColorByScore(node.fulfillment_level_score ?? node.overall_fulfillment_score),
        radius: 100 - level * 15,
        score: node.fulfillment_level_score ?? node.overall_fulfillment_score,
        children,
    };
}

function normalize([x, y]: [number, number]): [number, number] {
    const length = Math.sqrt(x * x + y * y);
    return length === 0 ? [1, 0] : [x / length, y / length];
}

function rotateVec2([x, y]: [number, number], angle: number): [number, number] {
    return [
        x * Math.cos(angle) - y * Math.sin(angle),
        x * Math.sin(angle) + y * Math.cos(angle),
    ];
}

export function flattenTree(
    nodes: PlanetNode[],
    levelLimit = Infinity,
    currentLevel = 0
): PlanetNode[] {
    let result: PlanetNode[] = [];

    for (const node of nodes) {
        result.push(node);
        if (currentLevel < levelLimit && node.children.length > 0) {
            result = result.concat(flattenTree(node.children, levelLimit, currentLevel + 1));
        }
    }

    return result;
}

function getColorByScore(score?: number): string {
    if (score === undefined || score === null) return "#95a5a6"; // серый по умолчанию
    if (score >= 0 && score <= 0.39) return "#e74c3c"; // красный
    if (score >= 0.4 && score <= 0.69) return "#f39c12"; // жёлтый
    if (score >= 0.7 && score <= 1) return "#27ae60"; // зелёный
    return "#95a5a6";
}
