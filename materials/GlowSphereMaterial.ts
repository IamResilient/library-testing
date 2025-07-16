import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const GlowSphereMaterial = shaderMaterial(
  {
    uColor: new THREE.Color('#ffffff'),
    uGlowIntensity: 0.5,         // немного ярче
    uHighlightStrength: 0.2,     // мягкий highlight
  },
  // vertex
  `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment
  `
    uniform vec3 uColor;
    uniform float uGlowIntensity;
    uniform float uHighlightStrength;
    varying vec3 vNormal;

    void main() {
      // glow теперь мягкий и ШИРОКИЙ
      float angle = dot(vNormal, vec3(0.0, 0.0, 1.0));
      float glow = pow(1.0 - angle, 1.0);  // меньше степень => шире свечение
      glow = clamp(glow * 1.5, 0.0, 1.0);  // растягиваем его

      float highlight = pow(dot(vNormal, normalize(vec3(1.0, 1.0, 1.0))), 2.0);

      vec3 color = uColor * (uGlowIntensity * glow + uHighlightStrength * highlight);

      gl_FragColor = vec4(color, 0.85); // ← толще (чуть меньше прозрачность)
    }
  `
);

extend({ GlowSphereMaterial });
