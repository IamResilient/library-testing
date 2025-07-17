
export type Vec3 = [number, number, number];

export interface RawNode {
    name: string;
    description?: string;
    overall_fulfillment_score?: number;
    fulfillment_level_score?: number;
    children?: RawNode[];
}

export interface PlanetNode {
    id: string;
    name: string;
    description?: string;
    position: Vec3;
    color: string;
    radius: number;
    score?: number;
    children: PlanetNode[];
}