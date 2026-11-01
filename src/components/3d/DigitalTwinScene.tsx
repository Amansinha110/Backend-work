import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

export interface TelemetryData {
  selectedUnit: string;
  status: 'OPTIMAL' | 'RUNNING' | 'AUTONOMOUS' | 'INSPECTING';
  oee: number;
  cycleTime: string;
  temperature: string;
  vibration: string;
  speedRPM: number;
  activeWorkOrder: string;
}

interface DigitalTwinSceneProps {
  onSelectEquipment?: (data: TelemetryData) => void;
  cameraPreset?: 'overview' | 'robot' | 'warehouse' | 'agv';
  isSimulating?: boolean;
}

export const DigitalTwinScene: React.FC<DigitalTwinSceneProps> = ({
  onSelectEquipment,
  cameraPreset = 'overview',
  isSimulating = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);

  // References to keep animation loop clean
  const stateRef = useRef({
    cameraPreset,
    isSimulating,
    targetCameraPos: new THREE.Vector3(18, 14, 18),
    targetLookAt: new THREE.Vector3(0, 2, 0),
    currentLookAt: new THREE.Vector3(0, 2, 0)
  });

  stateRef.current.cameraPreset = cameraPreset;
  stateRef.current.isSimulating = isSimulating;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE & RENDERER SETUP
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0B1020);
    scene.fog = new THREE.FogExp2(0x0B1020, 0.022);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(18, 14, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Environment map with PMREMGenerator for PBR studio reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envTexture = pmremGenerator.fromScene(roomEnv).texture;
    scene.environment = envTexture;

    // 2. LIGHTING RIG (Warm key + cool hemisphere fill + accent edge light)
    const hemiLight = new THREE.HemisphereLight(0x94B2FF, 0x141B2D, 1.2);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xFFF3E0, 2.2);
    dirLight.position.set(16, 22, 12);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 60;
    dirLight.shadow.camera.left = -16;
    dirLight.shadow.camera.right = 16;
    dirLight.shadow.camera.top = 16;
    dirLight.shadow.camera.bottom = -16;
    dirLight.shadow.bias = -0.0005;
    scene.add(dirLight);

    const cyanSpot = new THREE.PointLight(0x2F54EB, 2.5, 25);
    cyanSpot.position.set(0, 6, 0);
    scene.add(cyanSpot);

    // 3. PROCEDURAL TEXTURES & GROUND
    const createGridCanvasTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#0E1426';
      ctx.fillRect(0, 0, 512, 512);

      ctx.strokeStyle = '#1E2848';
      ctx.lineWidth = 2;
      ctx.strokeRect(0, 0, 512, 512);

      // Sub-grid lines
      ctx.strokeStyle = '#151D35';
      ctx.lineWidth = 1;
      for (let i = 64; i < 512; i += 64) {
        ctx.beginPath();
        ctx.moveTo(i, 0); ctx.lineTo(i, 512);
        ctx.moveTo(0, i); ctx.lineTo(512, i);
        ctx.stroke();
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(12, 12);
      return tex;
    };

    const floorGeo = new THREE.PlaneGeometry(64, 64);
    const floorMat = new THREE.MeshStandardMaterial({
      map: createGridCanvasTexture(),
      roughness: 0.65,
      metalness: 0.3
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Soft radial contact shadow helper
    const createContactShadow = (width: number, length: number) => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 64);
      grad.addColorStop(0, 'rgba(0,0,0,0.65)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 128, 128);

      const tex = new THREE.CanvasTexture(canvas);
      const shadowGeo = new THREE.PlaneGeometry(width, length);
      const shadowMat = new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.8, depthWrite: false });
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.rotation.x = -Math.PI / 2;
      shadowMesh.position.y = 0.01;
      return shadowMesh;
    };

    // Shared Materials
    const blueMat = new THREE.MeshStandardMaterial({ color: 0x2F54EB, roughness: 0.25, metalness: 0.8 });
    const darkSteelMat = new THREE.MeshStandardMaterial({ color: 0x1E2436, roughness: 0.35, metalness: 0.85 });
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xE8ECF4, roughness: 0.1, metalness: 0.95 });
    const orangeMat = new THREE.MeshStandardMaterial({ color: 0xFF7A00, roughness: 0.3, metalness: 0.2 });
    const yellowHazardMat = new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.4, metalness: 0.1 });
    const glowingCyanMat = new THREE.MeshStandardMaterial({ color: 0x00F0FF, emissive: 0x00A3FF, emissiveIntensity: 0.8, roughness: 0.2 });

    // 4. COMPOSITE PROCEDURAL SUBJECT 1: ARTICULATED ROBOTIC ASSEMBLY ARM (8 Parts)
    const robotGroup = new THREE.Group();
    robotGroup.name = 'ROBOT_ARM_CELL_01';
    robotGroup.position.set(-2, 0, -1);

    // Part 1: Pedestal
    const basePedestal = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, 0.4, 24), darkSteelMat);
    basePedestal.position.y = 0.2;
    basePedestal.castShadow = true;
    basePedestal.receiveShadow = true;
    robotGroup.add(basePedestal);

    // Part 2: Rotating Turret
    const turretPivot = new THREE.Group();
    turretPivot.position.y = 0.4;
    const turretBody = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.2, 0.8, 20), blueMat);
    turretBody.position.y = 0.4;
    turretBody.castShadow = true;
    turretPivot.add(turretBody);
    robotGroup.add(turretPivot);

    // Part 3: Shoulder Joint Housing
    const shoulderJoint = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.2, 16), chromeMat);
    shoulderJoint.rotation.z = Math.PI / 2;
    shoulderJoint.position.set(0, 0.9, 0);
    turretPivot.add(shoulderJoint);

    // Part 4: Lower Boom Arm
    const lowerArmPivot = new THREE.Group();
    lowerArmPivot.position.set(0, 0.9, 0);
    const lowerArm = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2.8, 0.5), blueMat);
    lowerArm.position.set(0, 1.3, 0);
    lowerArm.castShadow = true;
    lowerArmPivot.add(lowerArm);
    turretPivot.add(lowerArmPivot);

    // Part 5: Hydraulic Cylinder Accent
    const hydraulicPiston = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 2.2, 12), chromeMat);
    hydraulicPiston.position.set(0.3, 1.1, 0);
    lowerArmPivot.add(hydraulicPiston);

    // Part 6: Elbow Joint
    const elbowPivot = new THREE.Group();
    elbowPivot.position.set(0, 2.6, 0);
    const elbowCasing = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.8, 16), darkSteelMat);
    elbowCasing.rotation.z = Math.PI / 2;
    elbowPivot.add(elbowCasing);
    lowerArmPivot.add(elbowPivot);

    // Part 7: Forearm Upper Boom
    const upperArm = new THREE.Mesh(new THREE.BoxGeometry(0.35, 2.2, 0.4), darkSteelMat);
    upperArm.position.set(0, 1.0, 0);
    upperArm.castShadow = true;
    elbowPivot.add(upperArm);

    // Part 8: End-Effector Gripper with laser ring
    const wristPivot = new THREE.Group();
    wristPivot.position.set(0, 2.1, 0);
    const wristCuff = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.3, 12), chromeMat);
    wristPivot.add(wristCuff);

    const gripperFingerL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.15), orangeMat);
    gripperFingerL.position.set(-0.15, 0.3, 0);
    wristPivot.add(gripperFingerL);

    const gripperFingerR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.4, 0.15), orangeMat);
    gripperFingerR.position.set(0.15, 0.3, 0);
    wristPivot.add(gripperFingerR);

    const laserRing = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.03, 8, 16), glowingCyanMat);
    laserRing.rotation.x = Math.PI / 2;
    laserRing.position.set(0, 0.2, 0);
    wristPivot.add(laserRing);

    elbowPivot.add(wristPivot);
    robotGroup.add(createContactShadow(3.4, 3.4));
    scene.add(robotGroup);

    // 5. COMPOSITE PROCEDURAL SUBJECT 2: AUTONOMOUS GUIDED VEHICLE (AGV) (6 Parts)
    const createAGV = (name: string, startX: number, startZ: number) => {
      const agvGroup = new THREE.Group();
      agvGroup.name = name;
      agvGroup.position.set(startX, 0, startZ);

      // 1. Chassis
      const chassis = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.45, 1.6), darkSteelMat);
      chassis.position.y = 0.35;
      chassis.castShadow = true;
      agvGroup.add(chassis);

      // 2. Drive Wheels (4x)
      const wheelGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.2, 16);
      const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 });
      const wheelPositions = [
        [-0.9, 0.24, 0.8],
        [-0.9, 0.24, -0.8],
        [0.9, 0.24, 0.8],
        [0.9, 0.24, -0.8]
      ];
      wheelPositions.forEach(pos => {
        const w = new THREE.Mesh(wheelGeo, wheelMat);
        w.rotation.x = Math.PI / 2;
        w.position.set(pos[0], pos[1], pos[2]);
        agvGroup.add(w);
      });

      // 3. Safety Perimeter LED Edge
      const ledStripe = new THREE.Mesh(new THREE.BoxGeometry(2.45, 0.08, 1.65), glowingCyanMat);
      ledStripe.position.y = 0.35;
      agvGroup.add(ledStripe);

      // 4. LiDAR Turret
      const lidarBase = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.25, 12), chromeMat);
      lidarBase.position.set(0.9, 0.7, 0);
      agvGroup.add(lidarBase);
      const lidarHead = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.12, 12), darkSteelMat);
      lidarHead.position.set(0.9, 0.85, 0);
      agvGroup.add(lidarHead);

      // 5. Pallet Cargo
      const cargoBox = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.9, 1.2), blueMat);
      cargoBox.position.set(-0.2, 0.95, 0);
      cargoBox.castShadow = true;
      agvGroup.add(cargoBox);

      // 6. Contact Shadow
      agvGroup.add(createContactShadow(2.8, 2.0));
      return { agvGroup, lidarHead };
    };

    const agv1 = createAGV('AUTONOMOUS_AGV_UNIT_09', 4, 3);
    const agv2 = createAGV('AUTONOMOUS_AGV_UNIT_14', -6, 5);
    scene.add(agv1.agvGroup);
    scene.add(agv2.agvGroup);

    // 6. HIGH-BAY AUTOMATED WAREHOUSE RACK & STACKER CRANE (Multi-Tier with InstancedMesh Pallets)
    const rackGroup = new THREE.Group();
    rackGroup.name = 'HIGH_BAY_STORAGE_RACK';
    rackGroup.position.set(8, 0, -4);

    // Structural uprights (4 columns)
    const uprightGeo = new THREE.BoxGeometry(0.2, 8, 0.2);
    const uprightMat = new THREE.MeshStandardMaterial({ color: 0x2A334E, metalness: 0.9, roughness: 0.2 });
    const beamGeo = new THREE.BoxGeometry(6.4, 0.15, 0.15);
    const beamMat = yellowHazardMat;

    // Uprights
    for (let x = -3; x <= 3; x += 3) {
      for (let z = -1; z <= 1; z += 2) {
        const upright = new THREE.Mesh(uprightGeo, uprightMat);
        upright.position.set(x, 4, z);
        upright.castShadow = true;
        rackGroup.add(upright);
      }
    }
    // Cross Beams at 4 levels
    for (let y = 1.6; y <= 7.2; y += 1.8) {
      const bFront = new THREE.Mesh(beamGeo, beamMat);
      bFront.position.set(0, y, 1);
      const bBack = new THREE.Mesh(beamGeo, beamMat);
      bBack.position.set(0, y, -1);
      rackGroup.add(bFront);
      rackGroup.add(bBack);
    }

    // InstancedMesh for 36 Pallet Cargo Units inside rack
    const palletBoxGeo = new THREE.BoxGeometry(0.85, 0.7, 0.85);
    const palletBoxMat = new THREE.MeshStandardMaterial({ color: 0x3A5285, roughness: 0.4, metalness: 0.5 });
    const instancedPallets = new THREE.InstancedMesh(palletBoxGeo, palletBoxMat, 36);
    instancedPallets.castShadow = true;

    const dummyMatrix = new THREE.Matrix4();
    let pIdx = 0;
    for (let bayX = -2.4; bayX <= 2.4; bayX += 1.2) {
      for (let levelY = 1.95; levelY <= 7.2; levelY += 1.8) {
        dummyMatrix.setPosition(bayX, levelY, 0);
        instancedPallets.setMatrixAt(pIdx++, dummyMatrix);
      }
    }
    instancedPallets.instanceMatrix.needsUpdate = true;
    rackGroup.add(instancedPallets);
    rackGroup.add(createContactShadow(7.4, 3.0));
    scene.add(rackGroup);

    // 7. ROLLER CONVEYOR & QUALITY SCANNER ARCH
    const conveyorGroup = new THREE.Group();
    conveyorGroup.name = 'INSPECTION_CONVEYOR_LINE';
    conveyorGroup.position.set(-7, 0, -4);

    const railBed = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.8, 8), darkSteelMat);
    railBed.position.y = 0.6;
    railBed.castShadow = true;
    conveyorGroup.add(railBed);

    // 12 Roller Cylinders
    const rollerGeo = new THREE.CylinderGeometry(0.08, 0.08, 1.5, 12);
    for (let rz = -3.5; rz <= 3.5; rz += 0.65) {
      const roller = new THREE.Mesh(rollerGeo, chromeMat);
      roller.rotation.z = Math.PI / 2;
      roller.position.set(0, 1.05, rz);
      conveyorGroup.add(roller);
    }

    // Inspection Scanner Arch
    const archPillarL = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.2, 0.2), blueMat);
    archPillarL.position.set(-0.85, 1.8, 0);
    const archPillarR = new THREE.Mesh(new THREE.BoxGeometry(0.15, 2.2, 0.2), blueMat);
    archPillarR.position.set(0.85, 1.8, 0);
    const archTop = new THREE.Mesh(new THREE.BoxGeometry(1.85, 0.2, 0.3), blueMat);
    archTop.position.set(0, 2.9, 0);
    const scanLaser = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.8), new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide
    }));
    scanLaser.position.set(0, 2.0, 0);
    conveyorGroup.add(archPillarL, archPillarR, archTop, scanLaser);

    // Moving Pallet on conveyor
    const movingBox = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 0.8), orangeMat);
    movingBox.position.set(0, 1.4, -2.5);
    movingBox.castShadow = true;
    conveyorGroup.add(movingBox);

    conveyorGroup.add(createContactShadow(2.4, 9.0));
    scene.add(conveyorGroup);

    // 8. INTERACTIVE RAYCASTING
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([robotGroup, agv1.agvGroup, agv2.agvGroup, rackGroup, conveyorGroup], true);

      if (intersects.length > 0) {
        let parentObj: THREE.Object3D | null = intersects[0].object;
        while (parentObj && !parentObj.name && parentObj.parent) {
          parentObj = parentObj.parent;
        }

        const unitName = parentObj?.name || 'ROBOT_ARM_CELL_01';
        setHoveredUnit(unitName);

        if (onSelectEquipment) {
          if (unitName.includes('ROBOT')) {
            onSelectEquipment({
              selectedUnit: 'Robotic Welding & Assembly Cell (KUKA-QNTX-6)',
              status: 'RUNNING',
              oee: 96.4,
              cycleTime: '3.14s',
              temperature: '48.2°C',
              vibration: '0.04 mm/s (Optimal)',
              speedRPM: 2800,
              activeWorkOrder: 'WO-2026-8812 (Titanium Flange)'
            });
          } else if (unitName.includes('AGV')) {
            onSelectEquipment({
              selectedUnit: 'Autonomous Guided Vehicle (AGV-09 Fleet)',
              status: 'AUTONOMOUS',
              oee: 98.1,
              cycleTime: '18.4s / Station',
              temperature: '34.5°C',
              vibration: '0.02 mm/s (Smooth)',
              speedRPM: 120,
              activeWorkOrder: 'TRANSIT-Pallet-Batch-490'
            });
          } else if (unitName.includes('RACK')) {
            onSelectEquipment({
              selectedUnit: 'High-Bay Automated Warehouse (ASRS Stacker)',
              status: 'OPTIMAL',
              oee: 99.2,
              cycleTime: '9.2s Pick & Stow',
              temperature: '21.0°C',
              vibration: '0.01 mm/s',
              speedRPM: 940,
              activeWorkOrder: 'BIN-STORAGE-36/36 Capacity'
            });
          } else {
            onSelectEquipment({
              selectedUnit: 'Vision Quality Inspection Conveyor',
              status: 'INSPECTING',
              oee: 99.8,
              cycleTime: '0.8s / Part',
              temperature: '26.8°C',
              vibration: '0.03 mm/s',
              speedRPM: 450,
              activeWorkOrder: 'QC-INSPECTION-PASS-100%'
            });
          }
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // 9. ANIMATION LOOP WITH EXPONENTIAL DAMPING (60 FPS)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const dt = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      const sim = stateRef.current.isSimulating;

      // Camera preset positioning with smooth exponential damping (1 - Math.exp(-k * dt))
      const preset = stateRef.current.cameraPreset;
      let targetCam = new THREE.Vector3(18, 14, 18);
      let targetLook = new THREE.Vector3(0, 2, 0);

      if (preset === 'robot') {
        targetCam = new THREE.Vector3(-2, 4.5, 4.5);
        targetLook = new THREE.Vector3(-2, 2.2, -1);
      } else if (preset === 'warehouse') {
        targetCam = new THREE.Vector3(8, 7.5, 6.5);
        targetLook = new THREE.Vector3(8, 4.0, -4);
      } else if (preset === 'agv') {
        targetCam = new THREE.Vector3(agv1.agvGroup.position.x + 4, 3.5, agv1.agvGroup.position.z + 4);
        targetLook = new THREE.Vector3(agv1.agvGroup.position.x, 1.0, agv1.agvGroup.position.z);
      }

      const lerpFactor = 1 - Math.exp(-5.0 * dt);
      camera.position.lerp(targetCam, lerpFactor);
      stateRef.current.currentLookAt.lerp(targetLook, lerpFactor);
      camera.lookAt(stateRef.current.currentLookAt);

      if (sim) {
        // Robotic arm kinematics simulation
        turretPivot.rotation.y = Math.sin(elapsed * 1.2) * 0.75;
        lowerArmPivot.rotation.z = Math.sin(elapsed * 1.5) * 0.35 - 0.2;
        elbowPivot.rotation.z = Math.cos(elapsed * 1.8) * 0.45 + 0.3;
        wristPivot.rotation.y = elapsed * 2.5;

        // AGV autonomous patrol path
        const agvRadius = 6.5;
        const agvSpeed = 0.5;
        agv1.agvGroup.position.x = Math.sin(elapsed * agvSpeed) * agvRadius;
        agv1.agvGroup.position.z = Math.cos(elapsed * agvSpeed) * (agvRadius * 0.6) + 2;
        agv1.agvGroup.rotation.y = elapsed * agvSpeed + Math.PI / 2;
        agv1.lidarHead.rotation.y = elapsed * 8.0;

        agv2.agvGroup.position.x = Math.sin(elapsed * 0.4 + Math.PI) * 7;
        agv2.agvGroup.position.z = Math.cos(elapsed * 0.4 + Math.PI) * 3 + 4;
        agv2.agvGroup.rotation.y = elapsed * 0.4 + Math.PI;
        agv2.lidarHead.rotation.y = elapsed * 6.0;

        // Conveyor moving package loop
        movingBox.position.z = ((elapsed * 2.0) % 7.0) - 3.5;

        // Laser scan pulsation
        scanLaser.material.opacity = 0.2 + Math.sin(elapsed * 6.0) * 0.15;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.dispose();
      pmremGenerator.dispose();
      floorMat.dispose();
      floorGeo.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
      {hoveredUnit && (
        <div className="absolute top-4 left-4 pointer-events-none px-3 py-1.5 rounded bg-[var(--dark-card)]/90 border border-[var(--dark-line)] text-xs font-mono text-[var(--mint)] shadow-lg">
          Target: {hoveredUnit}
        </div>
      )}
    </div>
  );
};
