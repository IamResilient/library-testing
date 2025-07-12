export type Vec3 = [number, number, number];

export interface PlanetNode {
    id: string;
    name: string;
    position: Vec3;
    color?: string;
    children: PlanetNode[];
}