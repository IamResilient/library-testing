import { PlanetNode } from "@/types/types";

export const planetData: PlanetNode = {
    id: 'core',
    name: 'Core',
    position: [0, 0, 0],
    color: '#ffffff',
    children: [
        {
            id: 'planet1',
            name: 'Planet 1',
            position: [25, 12, 0],
            color: '#ff6347',
            children: [
                {
                    id: 'planet1-1',
                    name: 'Planet 1.1',
                    position: [40, 20, 0],
                    color: '#ffd700',
                    children: [
                        {
                            id: 'planet1-1-1',
                            name: 'Planet 1.1.1',
                            position: [55, 30, 0],
                            color: '#adff2f',
                            children: [],
                        },
                        {
                            id: 'planet1-1-2',
                            name: 'Planet 1.1.2',
                            position: [50, 10, 0],
                            color: '#00ced1',
                            children: [],
                        },
                    ],
                },
                {
                    id: 'planet1-2',
                    name: 'Planet 1.2',
                    position: [35, 8, 0],
                    color: '#dda0dd',
                    children: [],
                },
            ],
        },
        {
            id: 'planet2',
            name: 'Planet 2',
            position: [-25, -12, 0],
            color: '#1e90ff',
            children: [
                {
                    id: 'planet2-1',
                    name: 'Planet 2.1',
                    position: [-40, -22, 0],
                    color: '#7fffd4',
                    children: [],
                },
                {
                    id: 'planet2-2',
                    name: 'Planet 2.2',
                    position: [-38, -10, 0],
                    color: '#f08080',
                    children: [],
                },
            ],
        },
        {
            id: 'planet3',
            name: 'Planet 3',
            position: [0, -30, 0],
            color: '#ba55d3',
            children: [
                {
                    id: 'planet3-1',
                    name: 'Planet 3.1',
                    position: [10, -45, 0],
                    color: '#20b2aa',
                    children: [],
                },
                {
                    id: 'planet3-2',
                    name: 'Planet 3.2',
                    position: [-10, -43, 0],
                    color: '#ff69b4',
                    children: [],
                },
            ],
        },
    ],
};
