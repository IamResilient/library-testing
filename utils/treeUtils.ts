import { RawNode, PlanetNode, Vec3 } from '@/types/types';

let nodeIdCounter = 0;
const LEVEL_Y_GAP = 220;
const NODE_X_GAP = 150;

export function generatePlanetTree(rawNodes: RawNode[]): PlanetNode[] {
    const rootCount = rawNodes.length;
    const centerX = 0;
    const rootSpacing = NODE_X_GAP * 2;
    const startX = centerX - ((rootCount - 1) * rootSpacing) / 2;

    const result: PlanetNode[] = [];

    rawNodes.forEach((root, i) => {
        const rootX = startX + i * rootSpacing;
        const rootY = 0;
        const direction = i % 2 === 0 ? 1 : -1;
        const node = walk(root, rootX, rootY, direction);
        result.push(node);
    });

    return result;

    function walk(node: RawNode, x: number, y: number, direction: 1 | -1): PlanetNode {
        const id = `node-${nodeIdCounter++}`;
        const position: Vec3 = [x, y, 0];

        const childrenRaw = node.children || [];
        const count = childrenRaw.length;
        const totalWidth = (count - 1) * NODE_X_GAP;
        const startX = x - totalWidth / 2;

        const children: PlanetNode[] = childrenRaw.map((child, index) => {
            const childX = startX + index * NODE_X_GAP;
            const childY = y + direction * LEVEL_Y_GAP;
            return walk(child, childX, childY, direction);
        });

        return {
            id,
            name: node.name,
            description: node.description,
            position,
            color: getColorByScore(node.fulfillment_level_score ?? node.overall_fulfillment_score),
            radius: node.radius,
            score: node.fulfillment_level_score ?? node.overall_fulfillment_score,
            children,
        };
    }
}

export function flattenTree(nodes: PlanetNode[], levelLimit = Infinity, currentLevel = 0): PlanetNode[] {
    let result: PlanetNode[] = [];
    for (const node of nodes) {
        result.push(node);
        if (currentLevel < levelLimit && node.children.length > 0) {
            result = result.concat(flattenTree(node.children, levelLimit, currentLevel + 1));
        }
    }
    return result;
}

export function getColorByScore(score?: number): string {
    if (score === undefined || score === null) return "#95a5a6"; // серый по умолчанию

    if (score >= 0 && score <= 0.39) return "#e74c3c"; // красный (низкий уровень)
    if (score >= 0.4 && score <= 0.69) return "#f39c12"; // жёлтый (средний уровень)
    if (score >= 0.7 && score <= 1) return "#27ae60"; // зелёный (высокий уровень)

    return "#95a5a6"; // fallback
}

