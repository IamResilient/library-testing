'use client';

import { useState } from 'react';
import { ThreePlanetSystem } from './ThreePlanetSystem';
import { planetData } from '@/utils/planetData';
import { D3PlanetSystem } from './D3PlanetSystem';

export function PlanetSystemTabs() {
    const [activeTab, setActiveTab] = useState<'three' | 'd3'>('three');

    return (
        <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '12px',
                gap: '16px',
                background: '#111',
                color: 'white'
            }}>
                <button
                    style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        background: activeTab === 'three' ? '#444' : '#222',
                        border: '1px solid #555',
                        cursor: 'pointer'
                    }}
                    onClick={() => setActiveTab('three')}
                >
                    Three.js
                </button>
                <button
                    style={{
                        padding: '8px 16px',
                        borderRadius: '6px',
                        background: activeTab === 'd3' ? '#444' : '#222',
                        border: '1px solid #555',
                        cursor: 'pointer'
                    }}
                    onClick={() => setActiveTab('d3')}
                >
                    D3.js
                </button>
            </div>

            <div style={{ width: '100%', height: 'calc(100% - 60px)' }}>
                {activeTab === 'three' && <ThreePlanetSystem root={planetData} />}
                {activeTab === 'd3' && <D3PlanetSystem root={planetData} />}
            </div>
        </div>
    );
}
