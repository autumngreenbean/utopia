import * as THREE from 'https://unpkg.com/three/build/three.module.js';
import { OBJLoader } from 'https://unpkg.com/three/examples/jsm/loaders/OBJLoader.js';

const scrollableElement = document.querySelector('.right-column');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.setZ(30);

scene.background = new THREE.Color(0xFFFFFF);

// Material for Eleanor
const material = new THREE.MeshStandardMaterial({
  color: 0xAAAAAA, 
  metalness: 0.3, 
  roughness: 0.6
});

let eleanor;

// Load 4site.obj
const loader = new OBJLoader();
loader.load(
  '4site.obj', // Ensure this path is correct relative to your HTML file
  (object) => {
    eleanor = object;
    eleanor.traverse((child) => {
      if (child.isMesh) {
        child.material = material;
      }
    });

    // Positioning and Scaling
    eleanor.scale.set(2, 2, 2);
    eleanor.position.set(1, 1, -50);
    scene.add(eleanor);
  },
  (xhr) => {
    console.log(`Loading: ${(xhr.loaded / xhr.total) * 100}%`);
  },
  (error) => {
    console.error('Error loading OBJ:', error);
  }
);

function moveCamera() {
  if (eleanor) {
    eleanor.rotation.x += 0.034;
  }
  renderer.render(scene, camera);
}

if (scrollableElement) {
  scrollableElement.addEventListener('scroll', moveCamera);
}

document.addEventListener('keyup', (event) => {
  if (!eleanor) return;
  if (event.key === 'ArrowLeft') {
    eleanor.position.x -= 1;
  }
  if (event.key === 'ArrowRight') {
    eleanor.position.x += 1;
    console.log('im moving right');
  }
});

function animate() {
  requestAnimationFrame(animate);
  if (eleanor) {
    eleanor.rotation.y += 0.005;
  }
  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

// document.addEventListener('keydown', (event) => {
//   if (event.key === 'Tab') {
//     event.preventDefault(); 
//     currentShapeIndex = (currentShapeIndex + 1) % shapeGeometries.length;
//     updateShapes();
//   }

//   if (event.key === 'ArrowUp') {
//     eleanor.material.color.set(Math.random() * 0xffffff);
//   }

// //   if (event.key === 'ArrowDown') {
// //     let geometriesList;
// //     switch (currentShapeIndex) {
// //       case 0:
// //         geometriesList = torusGeometries;
// //         break;
// //       case 1:
// //         geometriesList = boxGeometries;
// //         break;
// //       case 2:
// //         geometriesList = sphereGeometries;
// //         break;
// //       case 3:
// //         geometriesList = coneGeometries;
// //         break;
// //       case 4:
// //         geometriesList = cylinderGeometries;
// //         break;
// //       case 5:
// //         geometriesList = dodecahedronGeometries;
// //         break;
// //       case 6:
// //         geometriesList = icosahedronGeometries;
// //         break;
// //     }

//     currentGeometryIndex = (currentGeometryIndex + 1) % geometriesList.length;

//     eleanor.geometry.dispose();
//     eleanor.geometry = new THREE.WireframeGeometry(geometriesList[currentGeometryIndex]);

//     console.log(`Switched to geometry index: ${currentGeometryIndex}`);
//   }

// //   if (event.key === 's') {
// //     event.preventDefault(); 
    
// //     scaleIndex = (scaleIndex + 1) % scaleFactors.length;
// //     const scaleFactor = scaleFactors[scaleIndex];

// //     shape1.scale.set(scaleFactor, scaleFactor, scaleFactor);
// //     shape2.scale.set(scaleFactor, scaleFactor, scaleFactor);

// //     console.log(`Scaled shapes to factor: ${scaleFactor}`);
// //   }
// });