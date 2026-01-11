'use client';

import { useRef, useState, useMemo, useEffect, memo, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Modern metallic palette - each face completely distinct
const FACE_COLORS = {
  front: '#00E5FF',   // Electric Cyan (+Z)
  back: '#E8A87C',    // Rose Gold (-Z)
  top: '#FFFFFF',     // Pure White (+Y)
  bottom: '#7C3AED',  // Deep Violet (-Y)
  right: '#10B981',   // Emerald Green (+X)
  left: '#1F4FD8',    // Sapphire Blue (-X)
};

const FACE_MATERIALS = {
  front: { color: FACE_COLORS.front, metalness: 0.9, roughness: 0.15, envMapIntensity: 2.0 },
  back: { color: FACE_COLORS.back, metalness: 0.95, roughness: 0.1, envMapIntensity: 2.2 },
  top: { color: FACE_COLORS.top, metalness: 0.7, roughness: 0.2, envMapIntensity: 1.8 },
  bottom: { color: FACE_COLORS.bottom, metalness: 0.85, roughness: 0.2, envMapIntensity: 1.5 },
  right: { color: FACE_COLORS.right, metalness: 0.9, roughness: 0.15, envMapIntensity: 1.8 },
  left: { color: FACE_COLORS.left, metalness: 0.9, roughness: 0.15, envMapIntensity: 1.6 },
};

const CUBIE_BASE = {
  color: '#1a1a1f',
  metalness: 0.85,
  roughness: 0.25,
  envMapIntensity: 0.6,
};

// Direction vectors for each face
const FACE_NORMALS = {
  right: new THREE.Vector3(1, 0, 0),
  left: new THREE.Vector3(-1, 0, 0),
  top: new THREE.Vector3(0, 1, 0),
  bottom: new THREE.Vector3(0, -1, 0),
  front: new THREE.Vector3(0, 0, 1),
  back: new THREE.Vector3(0, 0, -1),
};

type FaceName = 'right' | 'left' | 'top' | 'bottom' | 'front' | 'back';

// Cubie state with position and orientation
interface CubieState {
  id: string;
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
}

// Initialize all 27 cubies
function createInitialCubies(): CubieState[] {
  const cubies: CubieState[] = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubies.push({
          id: `${x},${y},${z}`,
          position: new THREE.Vector3(x, y, z),
          quaternion: new THREE.Quaternion(),
        });
      }
    }
  }
  return cubies;
}

// Get which face a direction vector points to after rotation
function getVisibleFace(localNormal: THREE.Vector3, quaternion: THREE.Quaternion): FaceName | null {
  const worldNormal = localNormal.clone().applyQuaternion(quaternion);
  
  let maxDot = -Infinity;
  let face: FaceName | null = null;
  
  for (const [name, normal] of Object.entries(FACE_NORMALS)) {
    const dot = worldNormal.dot(normal);
    if (dot > maxDot && dot > 0.9) {
      maxDot = dot;
      face = name as FaceName;
    }
  }
  
  return face;
}

// Get the original face colors for a cubie based on its initial position
function getOriginalFaceColors(id: string): Record<FaceName, string | null> {
  const [x, y, z] = id.split(',').map(Number);
  return {
    right: x === 1 ? FACE_COLORS.right : null,
    left: x === -1 ? FACE_COLORS.left : null,
    top: y === 1 ? FACE_COLORS.top : null,
    bottom: y === -1 ? FACE_COLORS.bottom : null,
    front: z === 1 ? FACE_COLORS.front : null,
    back: z === -1 ? FACE_COLORS.back : null,
  };
}

// Check if cubie is on a specific face
function isOnFace(position: THREE.Vector3, face: 'R' | 'L' | 'U' | 'D' | 'F' | 'B'): boolean {
  const rounded = (n: number) => Math.round(n);
  switch (face) {
    case 'R': return rounded(position.x) === 1;
    case 'L': return rounded(position.x) === -1;
    case 'U': return rounded(position.y) === 1;
    case 'D': return rounded(position.y) === -1;
    case 'F': return rounded(position.z) === 1;
    case 'B': return rounded(position.z) === -1;
  }
}

// Get rotation axis for a face move
function getFaceAxis(face: 'R' | 'L' | 'U' | 'D' | 'F' | 'B'): THREE.Vector3 {
  switch (face) {
    case 'R': return new THREE.Vector3(1, 0, 0);
    case 'L': return new THREE.Vector3(-1, 0, 0);
    case 'U': return new THREE.Vector3(0, 1, 0);
    case 'D': return new THREE.Vector3(0, -1, 0);
    case 'F': return new THREE.Vector3(0, 0, 1);
    case 'B': return new THREE.Vector3(0, 0, -1);
  }
}

// Apply rotation to cubies on a face
function rotateFace(
  cubies: CubieState[],
  face: 'R' | 'L' | 'U' | 'D' | 'F' | 'B',
  angle: number
): CubieState[] {
  const axis = getFaceAxis(face);
  const rotationQuat = new THREE.Quaternion().setFromAxisAngle(axis, angle);
  
  return cubies.map(cubie => {
    if (isOnFace(cubie.position, face)) {
      // Rotate position around axis
      const newPosition = cubie.position.clone().applyQuaternion(rotationQuat);
      // Round to avoid floating point errors
      newPosition.x = Math.round(newPosition.x);
      newPosition.y = Math.round(newPosition.y);
      newPosition.z = Math.round(newPosition.z);
      
      // Compose rotations
      const newQuaternion = rotationQuat.clone().multiply(cubie.quaternion);
      
      return {
        ...cubie,
        position: newPosition,
        quaternion: newQuaternion,
      };
    }
    return cubie;
  });
}

// Face panel component
function FacePanel({ 
  position, 
  rotation, 
  color,
  materialKey,
}: { 
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  materialKey: FaceName;
}) {
  const mat = FACE_MATERIALS[materialKey];
  
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[0.88, 0.88]} />
      <meshStandardMaterial 
        color={color}
        roughness={mat.roughness}
        metalness={mat.metalness}
        envMapIntensity={mat.envMapIntensity}
      />
    </mesh>
  );
}

// Single cubie component
function Cubie({ 
  cubie,
  animationRotation,
  isAnimating,
  animatingFace,
}: { 
  cubie: CubieState;
  animationRotation: THREE.Quaternion;
  isAnimating: boolean;
  animatingFace: 'R' | 'L' | 'U' | 'D' | 'F' | 'B';
}) {
  const panelOffset = 0.49;
  const originalColors = useMemo(() => getOriginalFaceColors(cubie.id), [cubie.id]);
  
  // Calculate current world quaternion (including animation if applicable)
  const worldQuaternion = useMemo(() => {
    if (isAnimating && isOnFace(cubie.position, animatingFace)) {
      return animationRotation.clone().multiply(cubie.quaternion);
    }
    return cubie.quaternion.clone();
  }, [cubie.quaternion, cubie.position, isAnimating, animatingFace, animationRotation]);
  
  // Calculate position (with animation offset if applicable)
  const worldPosition = useMemo(() => {
    if (isAnimating && isOnFace(cubie.position, animatingFace)) {
      return cubie.position.clone().applyQuaternion(animationRotation);
    }
    return cubie.position.clone();
  }, [cubie.position, isAnimating, animatingFace, animationRotation]);
  
  // Determine which colors show on which world faces
  const visibleColors = useMemo(() => {
    const colors: Record<FaceName, string | null> = {
      right: null, left: null, top: null, bottom: null, front: null, back: null
    };
    
    // For each original face that had a color, find where it's now pointing
    const localFaces: { name: FaceName; normal: THREE.Vector3 }[] = [
      { name: 'right', normal: new THREE.Vector3(1, 0, 0) },
      { name: 'left', normal: new THREE.Vector3(-1, 0, 0) },
      { name: 'top', normal: new THREE.Vector3(0, 1, 0) },
      { name: 'bottom', normal: new THREE.Vector3(0, -1, 0) },
      { name: 'front', normal: new THREE.Vector3(0, 0, 1) },
      { name: 'back', normal: new THREE.Vector3(0, 0, -1) },
    ];
    
    for (const { name, normal } of localFaces) {
      const originalColor = originalColors[name];
      if (originalColor) {
        const worldFace = getVisibleFace(normal, worldQuaternion);
        if (worldFace) {
          colors[worldFace] = originalColor;
        }
      }
    }
    
    return colors;
  }, [originalColors, worldQuaternion]);

  return (
    <group position={[worldPosition.x, worldPosition.y, worldPosition.z]}>
      {/* Base cubie */}
      <RoundedBox args={[0.96, 0.96, 0.96]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          color={CUBIE_BASE.color}
          roughness={CUBIE_BASE.roughness}
          metalness={CUBIE_BASE.metalness}
          envMapIntensity={CUBIE_BASE.envMapIntensity}
        />
      </RoundedBox>
      
      {/* Colored face panels */}
      {visibleColors.right && (
        <FacePanel 
          position={[panelOffset, 0, 0]} 
          rotation={[0, Math.PI / 2, 0]} 
          color={visibleColors.right}
          materialKey="right"
        />
      )}
      {visibleColors.left && (
        <FacePanel 
          position={[-panelOffset, 0, 0]} 
          rotation={[0, -Math.PI / 2, 0]} 
          color={visibleColors.left}
          materialKey="left"
        />
      )}
      {visibleColors.top && (
        <FacePanel 
          position={[0, panelOffset, 0]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          color={visibleColors.top}
          materialKey="top"
        />
      )}
      {visibleColors.bottom && (
        <FacePanel 
          position={[0, -panelOffset, 0]} 
          rotation={[Math.PI / 2, 0, 0]} 
          color={visibleColors.bottom}
          materialKey="bottom"
        />
      )}
      {visibleColors.front && (
        <FacePanel 
          position={[0, 0, panelOffset]} 
          rotation={[0, 0, 0]} 
          color={visibleColors.front}
          materialKey="front"
        />
      )}
      {visibleColors.back && (
        <FacePanel 
          position={[0, 0, -panelOffset]} 
          rotation={[0, Math.PI, 0]} 
          color={visibleColors.back}
          materialKey="back"
        />
      )}
    </group>
  );
}

type MoveType = {
  face: 'R' | 'L' | 'U' | 'D' | 'F' | 'B';
  amount: number;
};

const MOVE_SEQUENCE: MoveType[] = [
  { face: 'R', amount: Math.PI / 2 },
  { face: 'U', amount: Math.PI / 2 },
  { face: 'F', amount: Math.PI / 2 },
  { face: 'L', amount: -Math.PI / 2 },
  { face: 'D', amount: Math.PI / 2 },
  { face: 'B', amount: Math.PI / 2 },
  { face: 'U', amount: -Math.PI / 2 },
  { face: 'R', amount: -Math.PI / 2 },
  { face: 'F', amount: -Math.PI / 2 },
];

function ModernCubeModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  
  // True state tracking - cubies persist their positions
  const [cubies, setCubies] = useState<CubieState[]>(() => createInitialCubies());
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationProgress = useRef(0);
  const [animationRotation, setAnimationRotation] = useState(new THREE.Quaternion());
  
  const currentMove = MOVE_SEQUENCE[currentMoveIndex];
  
  // Apply move after animation completes
  const applyMove = useCallback(() => {
    setCubies(prev => rotateFace(prev, currentMove.face, currentMove.amount));
  }, [currentMove]);
  
  // Start new move periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMoveIndex(prev => (prev + 1) % MOVE_SEQUENCE.length);
      setIsAnimating(true);
      animationProgress.current = 0;
      setAnimationRotation(new THREE.Quaternion());
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Animation frame
  useFrame((state, delta) => {
    // Overall cube rotation
    if (groupRef.current) {
      const speed = isHovered ? 0.25 : 0.08;
      groupRef.current.rotation.y += delta * speed;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08 + 0.3;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.03;
    }
    
    // Face rotation animation
    if (isAnimating) {
      const animSpeed = 2.5;
      animationProgress.current += delta * animSpeed;
      
      const progress = Math.min(animationProgress.current, 1);
      const eased = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      const axis = getFaceAxis(currentMove.face);
      const angle = currentMove.amount * eased;
      const rotation = new THREE.Quaternion().setFromAxisAngle(axis, angle);
      setAnimationRotation(rotation);
      
      if (progress >= 1) {
        setIsAnimating(false);
        applyMove();
        setAnimationRotation(new THREE.Quaternion());
      }
    }
  });
  
  return (
    <group ref={groupRef}>
      {cubies.map(cubie => (
        <Cubie
          key={cubie.id}
          cubie={cubie}
          animationRotation={animationRotation}
          isAnimating={isAnimating}
          animatingFace={currentMove.face}
        />
      ))}
    </group>
  );
}

function Scene({ isHovered }: { isHovered: boolean }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[8, 12, 8]} intensity={1.5} color="#fff5e6" />
      <directionalLight position={[-8, 6, -8]} intensity={0.8} color="#a8c8ff" />
      <directionalLight position={[0, -5, 10]} intensity={0.6} color="#ffffff" />
      <pointLight position={[5, 8, 5]} intensity={0.8} color="#4DA3FF" distance={20} />
      <Environment preset="studio" background={false} />
      
      <group position={[0, 0.5, 0]}>
        <ModernCubeModel isHovered={isHovered} />
      </group>
      
      {/* Soft contact shadow - positioned higher to stay in view */}
      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.35}
        scale={6}
        blur={2}
        far={3}
        color="#1a1a2e"
      />
    </>
  );
}

function RubiksCube3DInner() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const glRef = useRef<THREE.WebGLRenderer | null>(null);
  
  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleCreated = ({ gl }: { gl: THREE.WebGLRenderer }) => {
    glRef.current = gl;
    gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault());
  };

  useEffect(() => {
    return () => {
      if (glRef.current) {
        glRef.current.dispose();
        glRef.current = null;
      }
    };
  }, []);
  
  // Responsive sizing
  const containerHeight = isMobile ? 280 : 400;
  const cameraPosition: [number, number, number] = isMobile ? [6, 4, 6] : [5, 3.5, 5];
  const cameraFov = isMobile ? 48 : 42;
  
  return (
    <div
      style={{ width: '100%', height: containerHeight, overflow: 'visible' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: cameraPosition, fov: cameraFov }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
        }}
        dpr={[1, 2]}
        frameloop="always"
        onCreated={handleCreated}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <Scene isHovered={isHovered} />
      </Canvas>
    </div>
  );
}

export const RubiksCube3D = memo(RubiksCube3DInner);
export default RubiksCube3D;
