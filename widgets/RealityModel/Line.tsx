'use client';

import { Line as DreiLine } from '@react-three/drei';
import { Vec3 } from '@/types/types';

interface LineProps {
  start: Vec3;
  end: Vec3;
}

export function Line({ start, end }: LineProps) {
  return (
    <DreiLine
      points={[start, end]}
      color="#aaaaaa"
      lineWidth={1}
      dashed={false}
      transparent={true}
      opacity={0.3} // 👈 Добавляем полупрозрачность
      depthWrite={false} // чтобы не перекрывали текст
    />
  );
}
