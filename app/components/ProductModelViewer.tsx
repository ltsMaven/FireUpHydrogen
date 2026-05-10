import {useEffect, useRef, useState} from 'react';
import {Loader2} from 'lucide-react';

interface ProductModelViewerProps {
  activeIndex?: number;
  autoSpin?: boolean;
  className?: string;
  modelUrl: string;
  scrollProgress?: number;
  textureUrl?: string;
}

export function ProductModelViewer({
  activeIndex = 0,
  autoSpin = false,
  className,
  modelUrl,
  scrollProgress = 0,
  textureUrl,
}: ProductModelViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const activeIndexRef = useRef(activeIndex);
  const autoSpinRef = useRef(autoSpin);
  const scrollProgressRef = useRef(scrollProgress);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    autoSpinRef.current = autoSpin;
  }, [autoSpin]);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    const effectContainer = containerRef.current;
    let mounted = true;
    let renderer: any = null;
    let camera: any = null;
    let frameId = 0;
    let resizeObserver: ResizeObserver | null = null;
    let cleanupScene: (() => void) | null = null;
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;
    let currentRoll = 0;
    let currentScale = 1;
    let handlePointerMove: ((event: PointerEvent) => void) | null = null;
    let handlePointerLeave: (() => void) | null = null;
    let modelRadius = 0;

    async function setupScene() {
      if (!effectContainer) return;

      try {
        const [{ACESFilmicToneMapping, Box3, Group, MathUtils, PerspectiveCamera, Scene, Sphere, SRGBColorSpace, TextureLoader, Vector3, WebGLRenderer, AmbientLight, DirectionalLight, HemisphereLight}, {GLTFLoader}] = await Promise.all([
          import('three'),
          import('three/examples/jsm/loaders/GLTFLoader.js'),
        ]);

        if (!mounted || !effectContainer) return;

        const container = effectContainer;
        const scene = new Scene();
        scene.background = null;

        camera = new PerspectiveCamera(30, 1, 0.1, 100);
        camera.position.set(0, 0.28, 8.6);

        renderer = new WebGLRenderer({antialias: true, alpha: true});
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.outputColorSpace = SRGBColorSpace;
        renderer.toneMapping = ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.12;
        renderer.domElement.style.display = 'block';
        renderer.domElement.style.width = '100%';
        renderer.domElement.style.height = '100%';
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.inset = '0';
        renderer.domElement.style.zIndex = '2';
        container.appendChild(renderer.domElement);

        const root = new Group();
        scene.add(root);

        scene.add(new AmbientLight('#ffffff', 0.65));

        const hemi = new HemisphereLight('#fff1df', '#140201', 0.85);
        scene.add(hemi);

        const keyLight = new DirectionalLight('#fff2df', 2.2);
        keyLight.position.set(3.5, 5.2, 7.2);
        scene.add(keyLight);

        const rimLight = new DirectionalLight('#ff5a1f', 1.35);
        rimLight.position.set(-5.5, 2.4, -1.8);
        scene.add(rimLight);

        const warmFill = new DirectionalLight('#fb923c', 0.65);
        warmFill.position.set(2.6, 0.4, 3);
        scene.add(warmFill);

        const loader = new GLTFLoader();
        const [gltf, labelTexture] = await Promise.all([
          loader.loadAsync(modelUrl),
          textureUrl
            ? new TextureLoader().loadAsync(textureUrl).then((texture: any) => {
                texture.flipY = false;
                texture.colorSpace = SRGBColorSpace;
                texture.anisotropy = renderer?.capabilities
                  ? renderer.capabilities.getMaxAnisotropy()
                  : 1;
                texture.needsUpdate = true;
                return texture;
              })
            : Promise.resolve(null),
        ]);

        if (!mounted) return;

        const model = gltf.scene;
        root.add(model);

        const box = new Box3().setFromObject(model);
        const size = box.getSize(new Vector3());
        const maxAxis = Math.max(size.x, size.y, size.z) || 1;
        const scale = 3.8 / maxAxis;

        model.scale.setScalar(scale);
        model.rotation.set(-0.09, 0.68, 0.02);
        model.updateMatrixWorld(true);

        const centeredBox = new Box3().setFromObject(model);
        const centeredOffset = centeredBox.getCenter(new Vector3());
        model.position.sub(centeredOffset);
        model.updateMatrixWorld(true);

        const fittedSphere = new Sphere();
        new Box3().setFromObject(model).getBoundingSphere(fittedSphere);
        modelRadius = fittedSphere.radius;

        model.traverse((child: any) => {
          if (!child.isMesh || !child.material) return;
          const materials = Array.isArray(child.material)
            ? child.material
            : [child.material];

          for (const material of materials) {
            if (
              labelTexture &&
              (material.name === 'Main' || material.map)
            ) {
              material.map = labelTexture;
            }

            if (material.map) {
              material.map.colorSpace = SRGBColorSpace;
            }
            material.needsUpdate = true;
          }
        });

        const updateSize = () => {
          if (!containerRef.current || !renderer || !camera) return;
          const {clientWidth, clientHeight} = containerRef.current;
          renderer.setSize(clientWidth, clientHeight, true);
          camera.aspect = clientWidth / Math.max(clientHeight, 1);
          if (modelRadius) {
            const paddedRadius = modelRadius * 1.42;
            const verticalFov = MathUtils.degToRad(camera.fov);
            const horizontalFov =
              2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
            const distanceForHeight =
              paddedRadius / Math.sin(verticalFov / 2);
            const distanceForWidth =
              paddedRadius / Math.sin(horizontalFov / 2);
            const distance = Math.max(distanceForHeight, distanceForWidth);

            camera.position.set(0, 0, distance);
            camera.near = Math.max(0.1, distance - paddedRadius * 3);
            camera.far = distance + paddedRadius * 3;
          }
          camera.updateProjectionMatrix();
          camera.lookAt(0, 0, 0);
        };

        updateSize();

        resizeObserver = new ResizeObserver(updateSize);
        resizeObserver.observe(container);

        handlePointerMove = (event: PointerEvent) => {
          const rect = container.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          pointerX = x * 0.32;
          pointerY = y * 0.1;
        };

        handlePointerLeave = () => {
          pointerX = 0;
          pointerY = 0;
        };

        container.addEventListener('pointermove', handlePointerMove);
        container.addEventListener('pointerleave', handlePointerLeave);

        const animate = () => {
          if (!renderer || !camera) return;
          const progress = scrollProgressRef.current;
          const focusIndex = activeIndexRef.current;
          const normalizedProgress = Math.min(Math.max(progress, 0), 1);
          const middleZoom = Math.pow(
            Math.sin(normalizedProgress * Math.PI),
            0.55,
          );
          const targetScale = 1 + middleZoom * 0.38;
          currentX = MathUtils.lerp(currentX, pointerX, 0.055);
          currentY = MathUtils.lerp(currentY, pointerY, 0.055);
          const targetRoll = Math.sin(focusIndex * 1.24) * 0.18;
          currentRoll = MathUtils.lerp(currentRoll, targetRoll, 0.05);
          currentScale = MathUtils.lerp(currentScale, targetScale, 0.06);

          root.scale.setScalar(currentScale);
          root.rotation.y =
            currentX +
            progress * Math.PI * 5.5 +
            (autoSpinRef.current ? performance.now() * 0.00022 : 0);
          root.rotation.x =
            currentY + Math.sin(progress * Math.PI * 2) * 0.06;
          root.rotation.z = currentRoll;
          root.position.y = Math.sin(performance.now() * 0.0012) * 0.08;

          renderer.render(scene, camera);
          frameId = window.requestAnimationFrame(animate);
        };

        animate();

        cleanupScene = () => {
          root.traverse((child: any) => {
            const mesh = child as {
              geometry?: {dispose: () => void};
              material?:
                | {dispose: () => void}
                | {dispose: () => void}[];
            };

            mesh.geometry?.dispose();

            if (Array.isArray(mesh.material)) {
              mesh.material.forEach((material: any) => material.dispose());
            } else {
              mesh.material?.dispose();
            }
          });

          labelTexture?.dispose();
        };

        setLoading(false);
      } catch (error) {
        console.error('Failed to load product model', error);
        if (!mounted) return;
        setFailed(true);
        setLoading(false);
      }
    }

    void setupScene();

    return () => {
      mounted = false;
      if (frameId) window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      if (effectContainer && handlePointerMove && handlePointerLeave) {
        effectContainer.removeEventListener('pointermove', handlePointerMove);
        effectContainer.removeEventListener('pointerleave', handlePointerLeave);
      }
      cleanupScene?.();

      if (renderer) {
        renderer.dispose();
        renderer.domElement.remove();
      }
    };
  }, [modelUrl, textureUrl]);

  return (
    <div
      ref={containerRef}
      className={className}
      aria-label="3D Fire Up can model"
      role="img"
      style={{
        minHeight: '360px',
        overflow: 'visible',
        position: 'relative',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, #050505 0%, #1b1b1b 16%, #ff5a1f 48%, #ffd08a 54%, #141414 84%, #030303 100%)',
          border: '1px solid rgba(255,255,255,0.22)',
          borderRadius: '46px',
          boxShadow:
            '0 44px 120px rgba(255,92,31,0.35), inset 18px 0 38px rgba(255,255,255,0.22), inset -22px 0 44px rgba(0,0,0,0.72)',
          height: 'min(72vh, 560px)',
          left: '50%',
          opacity: loading || failed ? 0.72 : 0,
          overflow: 'hidden',
          position: 'absolute',
          top: '50%',
          transform:
            'translate(-50%, -50%) rotate(-8deg) perspective(700px) rotateY(-16deg)',
          transition: 'opacity 300ms ease',
          width: 'min(32vw, 210px)',
          minWidth: '150px',
          zIndex: 1,
        }}
      >
        <div
          style={{
            alignItems: 'center',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            fontWeight: 800,
            gap: '0.7rem',
            height: '100%',
            justifyContent: 'center',
            letterSpacing: '0.18em',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          <span style={{fontSize: 'clamp(1.25rem, 4vw, 2.4rem)'}}>Fire</span>
          <span style={{fontSize: 'clamp(1.25rem, 4vw, 2.4rem)'}}>Up</span>
          <span
            style={{
              color: '#111',
              fontSize: 'clamp(0.68rem, 1.8vw, 0.92rem)',
              marginTop: '1rem',
            }}
          >
            Energy Drink
          </span>
        </div>
      </div>

      {loading ? (
        <div className="absolute inset-0 z-[3] flex h-full items-center justify-center text-orange-300">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : null}

      {failed ? (
        <div className="absolute inset-x-0 bottom-6 z-[3] flex justify-center px-6 text-center text-sm text-white/70">
          The 3D model could not be loaded.
        </div>
      ) : null}
    </div>
  );
}
