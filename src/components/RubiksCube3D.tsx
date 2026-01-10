'use client';

import { useRef, useState, useMemo, useEffect, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Blue theme colors from the application
const COLORS = {
  // Primary Metallic Blue shades
  metallic: '#1F4FD8',      // Primary metallic blue
  electric: '#4DA3FF',       // Electric blue (accent/hover)
  steel: '#3A6EA5',          // Steel blue (secondary)
  navy: '#0A1A3F',           // Deep navy
  lightBlue: '#80AFFF',      // Light blue
  white: '#E8F0FF',          // Off-white with blue tint
  black: '#0A1220',          // Dark base for cubies
};

// Face directions for each cubie position
type FaceColors = {
  px?: string; // +X (right)
  nx?: string; // -X (left)
  py?: string; // +Y (top)
  ny?: string; // -Y (bottom)
  pz?: string; // +Z (front)
  nz?: string; // -Z (back)
};

// Get face colors for a cubie at position (x, y, z) - Blue theme
function getCubieColors(x: number, y: number, z: number): FaceColors {
  const colors: FaceColors = {};
  
  // Right face (+X) - Electric Blue
  if (x === 1) colors.px = COLORS.electric;
  // Left face (-X) - Steel Blue
  if (x === -1) colors.nx = COLORS.steel;
  // Top face (+Y) - White/Light
  if (y === 1) colors.py = COLORS.white;
  // Bottom face (-Y) - Deep Navy
  if (y === -1) colors.ny = COLORS.navy;
  // Front face (+Z) - Primary Metallic Blue
  if (z === 1) colors.pz = COLORS.metallic;
  // Back face (-Z) - Light Blue
  if (z === -1) colors.nz = COLORS.lightBlue;
  
  return colors;
}

// Individual sticker component
function Sticker({ 
  position, 
  rotation, 
  color 
}: { 
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[0.85, 0.85]} />
      <meshStandardMaterial 
        color={color}
        roughness={0.3}
        metalness={0.05}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

// Individual cubie (small cube piece)
function Cubie({ 
  position, 
  colors 
}: { 
  position: [number, number, number];
  colors: FaceColors;
}) {
  const stickerOffset = 0.501; // Slightly above the cubie surface
  
  return (
    <group position={position}>
      {/* Base cubie - black rounded box */}
      <RoundedBox
        args={[0.95, 0.95, 0.95]}
        radius={0.08}
        smoothness={4}
      >
        <meshStandardMaterial
          color={COLORS.black}
          roughness={0.4}
          metalness={0.1}
          envMapIntensity={0.6}
        />
      </RoundedBox>
      
      {/* Stickers on each visible face */}
      {colors.px && (
        <Sticker 
          position={[stickerOffset, 0, 0]} 
          rotation={[0, Math.PI / 2, 0]} 
          color={colors.px} 
        />
      )}
      {colors.nx && (
        <Sticker 
          position={[-stickerOffset, 0, 0]} 
          rotation={[0, -Math.PI / 2, 0]} 
          color={colors.nx} 
        />
      )}
      {colors.py && (
        <Sticker 
          position={[0, stickerOffset, 0]} 
          rotation={[-Math.PI / 2, 0, 0]} 
          color={colors.py} 
        />
      )}
      {colors.ny && (
        <Sticker 
          position={[0, -stickerOffset, 0]} 
          rotation={[Math.PI / 2, 0, 0]} 
          color={colors.ny} 
        />
      )}
      {colors.pz && (
        <Sticker 
          position={[0, 0, stickerOffset]} 
          rotation={[0, 0, 0]} 
          color={colors.pz} 
        />
      )}
      {colors.nz && (
        <Sticker 
          position={[0, 0, -stickerOffset]} 
          rotation={[0, Math.PI, 0]} 
          color={colors.nz} 
        />
      )}
    </group>
  );
}

// Move types: face, axis, and rotation amount
type MoveType = {
  face: 'R' | 'L' | 'U' | 'D' | 'F' | 'B'; // Right, Left, Up, Down, Front, Back
  amount: number; // Math.PI / 2 for quarter, Math.PI for half
};

// Sequence of moves to cycle through
const MOVE_SEQUENCE: MoveType[] = [
  { face: 'R', amount: Math.PI / 2 },   // Quarter turn right
  { face: 'U', amount: Math.PI },        // Half turn top
  { face: 'F', amount: Math.PI / 2 },   // Quarter turn front
  { face: 'L', amount: -Math.PI / 2 },  // Quarter turn left (reverse)
  { face: 'D', amount: Math.PI / 2 },   // Quarter turn bottom
  { face: 'B', amount: Math.PI },        // Half turn back
  { face: 'U', amount: -Math.PI / 2 },  // Quarter turn top (reverse)
  { face: 'R', amount: Math.PI },        // Half turn right
  { face: 'F', amount: -Math.PI / 2 },  // Quarter turn front (reverse)
];

// Check if cubie belongs to a face
function belongsToFace(pos: [number, number, number], face: MoveType['face']): boolean {
  switch (face) {
    case 'R': return pos[0] === 1;
    case 'L': return pos[0] === -1;
    case 'U': return pos[1] === 1;
    case 'D': return pos[1] === -1;
    case 'F': return pos[2] === 1;
    case 'B': return pos[2] === -1;
  }
}

// Get rotation axis for a face
function getAxis(face: MoveType['face']): THREE.Vector3 {
  switch (face) {
    case 'R': return new THREE.Vector3(1, 0, 0);
    case 'L': return new THREE.Vector3(-1, 0, 0);
    case 'U': return new THREE.Vector3(0, 1, 0);
    case 'D': return new THREE.Vector3(0, -1, 0);
    case 'F': return new THREE.Vector3(0, 0, 1);
    case 'B': return new THREE.Vector3(0, 0, -1);
  }
}

// Complete Rubik's Cube with face rotations
function RubiksCubeModel({ isHovered }: { isHovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const faceGroupRef = useRef<THREE.Group>(null);
  
  // Track current animation state
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationProgress = useRef(0);
  const targetRotation = useRef(0);
  
  // Generate all 27 cubie positions
  const cubies = useMemo(() => {
    const positions: { pos: [number, number, number]; colors: FaceColors; id: string }[] = [];
    
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          positions.push({
            pos: [x, y, z],
            colors: getCubieColors(x, y, z),
            id: `${x}-${y}-${z}`,
          });
        }
      }
    }
    
    return positions;
  }, []);
  
  const currentMove = MOVE_SEQUENCE[currentMoveIndex];
  
  // Start new move every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMoveIndex((prev) => (prev + 1) % MOVE_SEQUENCE.length);
      setIsAnimating(true);
      animationProgress.current = 0;
      targetRotation.current = MOVE_SEQUENCE[(currentMoveIndex + 1) % MOVE_SEQUENCE.length].amount;
    }, 1500);
    
    return () => clearInterval(interval);
  }, [currentMoveIndex]);
  
  // Animation frame
  useFrame((state, delta) => {
    // Overall cube rotation (slow continuous)
    if (groupRef.current) {
      const speed = isHovered ? 0.3 : 0.1;
      groupRef.current.rotation.y += delta * speed;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1 + 0.35;
    }
    
    // Face rotation animation
    if (faceGroupRef.current && isAnimating) {
      const animSpeed = 3; // Speed of face rotation
      animationProgress.current += delta * animSpeed;
      
      const progress = Math.min(animationProgress.current, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
      
      const axis = getAxis(currentMove.face);
      const angle = currentMove.amount * eased;
      
      faceGroupRef.current.rotation.set(0, 0, 0);
      faceGroupRef.current.rotateOnAxis(axis, angle);
      
      if (progress >= 1) {
        setIsAnimating(false);
      }
    }
  });
  
  // Separate cubies into rotating face and static cubies
  const faceCubies = cubies.filter(c => belongsToFace(c.pos, currentMove.face));
  const staticCubies = cubies.filter(c => !belongsToFace(c.pos, currentMove.face));
  
  return (
    <group ref={groupRef}>
      {/* Static cubies (not on rotating face) */}
      {staticCubies.map((cubie) => (
        <Cubie 
          key={cubie.id} 
          position={cubie.pos} 
          colors={cubie.colors} 
        />
      ))}
      
      {/* Rotating face group */}
      <group ref={faceGroupRef}>
        {faceCubies.map((cubie) => (
          <Cubie 
            key={cubie.id} 
            position={cubie.pos} 
            colors={cubie.colors} 
          />
        ))}
      </group>
    </group>
  );
}

// Main scene component
function Scene({ isHovered }: { isHovered: boolean }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />
      <pointLight position={[0, 10, 0]} intensity={0.3} />
      
      {/* Environment for reflections - use 'city' preset which is lighter */}
      <Environment preset="city" background={false} />
      
      {/* The cube */}
      <group position={[0, 0, 0]}>
        <RubiksCubeModel isHovered={isHovered} />
      </group>
    </>
  );
}

// Exported component - wrapped in memo to prevent HMR re-renders
function RubiksCube3DInner() {
  const [isHovered, setIsHovered] = useState(false);
  const glRef = useRef<THREE.WebGLRenderer | null>(null);
  
  // Store renderer reference to prevent context loss
  const handleCreated = ({ gl }: { gl: THREE.WebGLRenderer }) => {
    glRef.current = gl;
    
    // Prevent context loss by keeping a strong reference
    const canvas = gl.domElement;
    
    canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault(); // This is crucial - prevents automatic context loss handling
    });
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (glRef.current) {
        glRef.current.dispose();
        glRef.current = null;
      }
    };
  }, []);
  
  return (
    <div
      style={{
        width: '100%',
        height: 400,
        overflow: 'visible',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [5, 3, 5], fov: 50 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          preserveDrawingBuffer: true,
        }}
        dpr={[1, 2]}
        frameloop="always"
        onCreated={handleCreated}
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%',
        }}
      >
        <Scene isHovered={isHovered} />
      </Canvas>
    </div>
  );
}

// Memo prevents re-renders from parent components and HMR
export const RubiksCube3D = memo(RubiksCube3DInner);

export default RubiksCube3D;
