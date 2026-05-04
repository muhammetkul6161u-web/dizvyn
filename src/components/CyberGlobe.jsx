import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 4000;

const FloatingSphere = () => {
  const outerRef = useRef();
  const innerRef = useRef();
  const glowRef = useRef();
  const materialRef = useRef();
  const mouseTarget = useRef(new THREE.Vector3(0, 0, 0));
  const mouseSmooth = useRef(new THREE.Vector3(0, 0, 0));

  // Vertex positions for particle sphere
  const [positions, sizes, offsets] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const siz = new Float32Array(PARTICLE_COUNT);
    const off = new Float32Array(PARTICLE_COUNT);
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Fibonacci sphere distribution for even particle spread
      const phi = Math.acos(1 - 2 * (i + 0.5) / PARTICLE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = 3.2 + (Math.random() - 0.5) * 0.3;
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
      
      siz[i] = Math.random() * 0.5 + 0.3;
      off[i] = Math.random() * Math.PI * 2;
    }
    return [pos, siz, off];
  }, []);

  // Custom shader for animated particle sphere
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector3(0, 0, 0) },
    },
    vertexShader: `
      uniform float uTime;
      uniform vec3 uMouse;
      attribute float aSize;
      attribute float aOffset;
      varying float vAlpha;
      varying float vDist;
      
      void main() {
        vec3 pos = position;
        float radius = length(pos);
        vec3 dir = normalize(pos);
        
        // Wave displacement on surface
        float wave1 = sin(pos.x * 2.0 + uTime * 0.8 + aOffset) * 0.15;
        float wave2 = sin(pos.y * 3.0 + uTime * 0.6 + aOffset * 1.3) * 0.12;
        float wave3 = cos(pos.z * 2.5 + uTime * 0.7 + aOffset * 0.7) * 0.1;
        
        pos += dir * (wave1 + wave2 + wave3);
        
        // Mouse interaction — particles react to mouse
        float mouseDist = distance(pos, uMouse);
        float mouseForce = smoothstep(4.0, 0.0, mouseDist);
        
        if (mouseForce > 0.0) {
          vec3 pushDir = normalize(pos - uMouse);
          pos += pushDir * mouseForce * 1.2;
        }
        
        vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = aSize * (6.0 / -mvPosition.z) * (1.0 + mouseForce * 2.0);
        gl_Position = projectionMatrix * mvPosition;
        
        vAlpha = 0.4 + mouseForce * 0.6;
        vDist = mouseDist;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      varying float vDist;
      
      void main() {
        float d = distance(gl_PointCoord, vec2(0.5));
        if (d > 0.5) discard;
        
        float strength = 1.0 - (d * 2.0);
        strength = pow(strength, 1.5);
        
        // Color: cyan core with blue edges, warmer near mouse
        vec3 baseColor = mix(vec3(0.0, 0.6, 0.8), vec3(0.0, 0.95, 1.0), strength);
        vec3 warmColor = mix(baseColor, vec3(0.5, 0.3, 1.0), smoothstep(4.0, 0.0, vDist) * 0.5);
        
        gl_FragColor = vec4(warmColor, strength * vAlpha);
      }
    `
  }), []);

  // Wireframe icosahedron geometry (cached)
  const icoGeo = useMemo(() => new THREE.IcosahedronGeometry(3, 2), []);
  const innerIcoGeo = useMemo(() => new THREE.IcosahedronGeometry(2.2, 1), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Calculate mouse 3D position
    const vector = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5);
    vector.unproject(state.camera);
    const dir = vector.sub(state.camera.position).normalize();
    const distance = -state.camera.position.z / dir.z;
    const mousePos = state.camera.position.clone().add(dir.multiplyScalar(distance));
    mouseTarget.current.copy(mousePos);
    
    // Smooth mouse following
    mouseSmooth.current.lerp(mouseTarget.current, 0.06);
    
    // Update particle shader
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
      materialRef.current.uniforms.uMouse.value.copy(mouseSmooth.current);
    }
    
    // Rotate outer wireframe — follows mouse subtly
    if (outerRef.current) {
      outerRef.current.rotation.x = Math.sin(time * 0.15) * 0.3 + mouseSmooth.current.y * 0.05;
      outerRef.current.rotation.y = time * 0.08 + mouseSmooth.current.x * 0.05;
      outerRef.current.rotation.z = Math.cos(time * 0.1) * 0.1;
    }
    
    // Rotate inner wireframe — counter-rotation for depth
    if (innerRef.current) {
      innerRef.current.rotation.x = -time * 0.12;
      innerRef.current.rotation.y = Math.sin(time * 0.2) * 0.4;
      innerRef.current.rotation.z = time * 0.06;
    }
    
    // Glow pulse
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.05);
    }
  });

  return (
    <group position={[3.5, 0, 0]}>
      {/* Inner glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color="#00f3ff"
          transparent={true}
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Inner wireframe mesh — depth layer */}
      <mesh ref={innerRef}>
        <primitive object={innerIcoGeo} attach="geometry" />
        <meshBasicMaterial
          color="#00f3ff"
          wireframe={true}
          transparent={true}
          opacity={0.08}
        />
      </mesh>
      
      {/* Outer wireframe mesh */}
      <mesh ref={outerRef}>
        <primitive object={icoGeo} attach="geometry" />
        <meshBasicMaterial
          color="#00f3ff"
          wireframe={true}
          transparent={true}
          opacity={0.15}
        />
      </mesh>
      
      {/* Particle sphere */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={PARTICLE_COUNT}
            array={sizes}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-aOffset"
            count={PARTICLE_COUNT}
            array={offsets}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          attach="material"
          args={[shaderArgs]}
          transparent={true}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
};

export default function CyberGlobeScene() {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}>
      <div style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
        <Canvas camera={{ position: [0, 0, 12], fov: 50 }} gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <FloatingSphere />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}