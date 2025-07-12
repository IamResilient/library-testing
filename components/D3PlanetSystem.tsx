'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { PlanetNode } from '@/types/types';

interface D3PlanetSystemProps {
    root: PlanetNode;
    width?: number;
    height?: number;
}

export function D3PlanetSystem({ root, width = 800, height = 800 }: D3PlanetSystemProps) {
    const svgRef = useRef<SVGSVGElement>(null);
    const [viewStack, setViewStack] = useState<PlanetNode[]>([root]);
    const viewRoot = viewStack[viewStack.length - 1];

    const center = { x: width / 2, y: height / 2 };
    const radius = 260;

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll('*').remove(); // очистка

        const g = svg.append('g').attr('transform', `translate(${center.x}, ${center.y})`);

        const current = viewRoot;

        const angleStep = (2 * Math.PI) / Math.max(current.children.length, 1);
        const positions = current.children.map((child, i) => {
            const angle = i * angleStep;
            return {
                node: child,
                x: radius * Math.cos(angle),
                y: radius * Math.sin(angle),
            };
        });

        // Линии от центра к детям
        g.selectAll('line')
            .data(positions)
            .enter()
            .append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', 0)
            .attr('stroke', 'white')
            .transition()
            .duration(600)
            .attr('x2', d => d.x)
            .attr('y2', d => d.y);

        // Планеты (включая центральную)
        const allPlanets = [{ node: current, x: 0, y: 0 }, ...positions];

        const planetGroup = g.selectAll('circle')
            .data(allPlanets)
            .enter()
            .append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 0)
            .attr('fill', d =>
                d.node.children.length > 0
                    ? d.node.id === current.id
                        ? 'orange'
                        : 'lightgreen'
                    : 'skyblue'
            )
            .style('cursor', d => (d.node.children.length > 0 ? 'pointer' : 'default'))
            .on('click', (_, d) => {
                if (d.node.id === current.id && viewStack.length > 1) {
                    const newStack = [...viewStack];
                    newStack.pop();
                    setViewStack(newStack);
                } else if (d.node.children.length > 0) {
                    setViewStack([...viewStack, d.node]);
                }
            });

        planetGroup
            .transition()
            .duration(600)
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', d => (d.node.id === current.id ? 36 : 24));

        // Подписи
        g.selectAll('text')
            .data(allPlanets)
            .enter()
            .append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('fill', 'white')
            .attr('text-anchor', 'middle')
            .style('font-size', '14px')
            .style('pointer-events', 'none')
            .transition()
            .duration(600)
            .attr('x', d => d.x)
            .attr('y', d => d.y + 4)
            .text(d => d.node.name);
    }, [viewRoot]);

    return (
        <svg
            ref={svgRef}
            width={width}
            height={height}
            style={{ background: 'black', borderRadius: '12px', display: 'block', margin: '0 auto' }}
        />
    );
}
