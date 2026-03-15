'use client';
import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useTheme } from '@/components/ThemeProvider';

/* ── Vertex + Fragment Shaders ── */
const orbVertexShader = `
  uniform float uTime;
  uniform float uNoiseScale;
  uniform float uNoiseStrength;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vDisplacement;

  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    float noise = snoise(position * uNoiseScale + uTime * 0.15);
    float displacement = noise * uNoiseStrength;
    vDisplacement = displacement;
    vec3 newPosition = position + normal * displacement;
    vPosition = newPosition;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
  }
`;

const orbFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;
  uniform vec3 uColor4;
  uniform vec3 uColor5;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vDisplacement;

  void main() {
    float t = uTime * 0.07;
    float phase = fract(t);
    int idx = int(mod(t, 5.0));
    vec3 c;
    if (idx == 0) c = mix(uColor1, uColor2, phase);
    else if (idx == 1) c = mix(uColor2, uColor3, phase);
    else if (idx == 2) c = mix(uColor3, uColor4, phase);
    else if (idx == 3) c = mix(uColor4, uColor5, phase);
    else c = mix(uColor5, uColor1, phase);

    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);
    c += fresnel * 0.4;
    c = mix(c, uColor1, vDisplacement * 0.3);

    float alpha = 0.85 + fresnel * 0.15;
    gl_FragColor = vec4(c, alpha);
  }
`;

/* ── Mesh Gradient Orb ── */
function MeshGradientOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uNoiseScale: { value: 1.2 },
      uNoiseStrength: { value: 0.35 },
      uColor1: { value: new THREE.Color('#4338CA') },
      uColor2: { value: new THREE.Color('#6366F1') },
      uColor3: { value: new THREE.Color('#818CF8') },
      uColor4: { value: new THREE.Color('#FF6B2C') },
      uColor5: { value: new THREE.Color('#FF4500') },
    }),
    []
  );

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
      meshRef.current.rotation.x += delta * 0.008;
    }
  });

  useMemo(() => {
    if (!isDark) {
      uniforms.uColor1.value.set('#6366F1');
      uniforms.uColor2.value.set('#818CF8');
      uniforms.uColor3.value.set('#A5B4FC');
      uniforms.uColor4.value.set('#FF8F5C');
      uniforms.uColor5.value.set('#FFB088');
    } else {
      uniforms.uColor1.value.set('#4338CA');
      uniforms.uColor2.value.set('#6366F1');
      uniforms.uColor3.value.set('#818CF8');
      uniforms.uColor4.value.set('#FF6B2C');
      uniforms.uColor5.value.set('#FF4500');
    }
  }, [isDark, uniforms]);

  return (
    <mesh ref={meshRef} scale={2.5} position={[0, -0.5, 0]}>
      <icosahedronGeometry args={[1, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={orbVertexShader}
        fragmentShader={orbFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

/* ── Floating Particles ── */
function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const { theme } = useTheme();

  const positions = useMemo(() => {
    const pos = new Float32Array(80 * 3);
    for (let i = 0; i < 80; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < 80; i++) {
      arr[i * 3 + 1] += delta * (0.03 + Math.random() * 0.02);
      if (arr[i * 3 + 1] > 5) arr[i * 3 + 1] = -5;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={80}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={theme === 'dark' ? '#FF6B2C' : '#E55A1B'}
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Scene wrapper ── */
function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useMousePosition();

  useFrame(() => {
    if (!groupRef.current) return;
    const targetX = mouse.normalizedY * 0.08;
    const targetY = mouse.normalizedX * 0.08;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <MeshGradientOrb />
      <FloatingParticles />
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#FF6B2C" />
    </group>
  );
}

/* ── Exported HeroScene ── */
export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      {/* Glass blur overlay */}
      <div
        className="absolute inset-0 pointer-events-none backdrop-blur-xl"
        style={{
          WebkitBackdropFilter: 'blur(24px)',
          backdropFilter: 'blur(24px)',
        }}
      />
      {/* Vignette overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, var(--bg-primary) 80%)',
        }}
      />
    </div>
  );
}
