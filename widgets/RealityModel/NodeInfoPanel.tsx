import { PlanetNode } from '@/types/types';

type NodeInfoPanelProps = {
    node: PlanetNode | null;
};

export function NodeInfoPanel({ node }: NodeInfoPanelProps) {
    if (!node) return null;

    return (
        <div style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            background: 'rgba(0,0,0,0.75)',
            padding: 16,
            color: 'white',
            borderRadius: 8,
            maxWidth: 300,
            fontSize: 14
        }}>
            <h4>{node.name}</h4>
            <p>{node.description}</p>
            {node.score !== undefined && (
                <p>Уровень удовлетворенности: {(node.score * 100).toFixed(0)}%</p>
            )}
        </div>
    );
}
