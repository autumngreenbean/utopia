import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const scrollableElement = document.querySelector('.right-column');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, window.innerWidth/window.innerHeight, 0.1, 1000);

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});

let currentShapeIndex = 0;
let currentGeometryIndex = 0;
let isRight =0;
const scaleFactors = [1, 1.5, 2, 2.5]; 
let scaleIndex = 0;
const isMobile = window.innerWidth <= 768; // You can adjust this value as needed for your needs


const torusGeometries = [
  new THREE.TorusGeometry(10, 3, 8, 50),
  new THREE.TorusGeometry(10, 3, 16, 100),
  new THREE.TorusGeometry(10, 3, 24, 150),
  new THREE.TorusGeometry(10, 3, 32, 200),
  new THREE.TorusGeometry(10, 3, 48, 300)
];

const boxGeometries = [
  new THREE.BoxGeometry(10, 10, 10, 1, 1, 1),
  new THREE.BoxGeometry(10, 10, 10, 2, 2, 2),
  new THREE.BoxGeometry(10, 10, 10, 4, 4, 4),
  new THREE.BoxGeometry(10, 10, 10, 8, 8, 8),
  new THREE.BoxGeometry(10, 10, 10, 16, 16, 16)
];

const sphereGeometries = [
  new THREE.SphereGeometry(5, 8, 8),
  new THREE.SphereGeometry(5, 16, 16),
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.SphereGeometry(5, 64, 64),
  new THREE.SphereGeometry(5, 128, 128)
];

const coneGeometries = [
  new THREE.ConeGeometry(5, 10, 8),
  new THREE.ConeGeometry(5, 10, 16),
  new THREE.ConeGeometry(5, 10, 32),
  new THREE.ConeGeometry(5, 10, 64),
  new THREE.ConeGeometry(5, 10, 128)
];

const cylinderGeometries = [
  new THREE.CylinderGeometry(5, 5, 10, 8),
  new THREE.CylinderGeometry(5, 5, 10, 16),
  new THREE.CylinderGeometry(5, 5, 10, 32),
  new THREE.CylinderGeometry(5, 5, 10, 64),
  new THREE.CylinderGeometry(5, 5, 10, 128)
];

const dodecahedronGeometries = [
  new THREE.DodecahedronGeometry(5, 0),
  new THREE.DodecahedronGeometry(5, 1),
  new THREE.DodecahedronGeometry(5, 2),
  new THREE.DodecahedronGeometry(5, 3),
  new THREE.DodecahedronGeometry(5, 4)
];

const icosahedronGeometries = [
  new THREE.IcosahedronGeometry(5, 0),
  new THREE.IcosahedronGeometry(5, 1),
  new THREE.IcosahedronGeometry(5, 2),
  new THREE.IcosahedronGeometry(5, 3),
  new THREE.IcosahedronGeometry(5, 4)
];

const shapeGeometries = [
  new THREE.TorusGeometry(10, 3, 16, 100),
  new THREE.BoxGeometry(10, 10, 10),
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.ConeGeometry(5, 10, 32),
  new THREE.CylinderGeometry(5, 5, 10, 32),
  new THREE.DodecahedronGeometry(5),
  new THREE.IcosahedronGeometry(5)
];



renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

scene.background = new THREE.Color(0xFFFFFF);

const geometries = [
  new THREE.TorusGeometry(10, 3, 8, 50),   // Low detail
  new THREE.TorusGeometry(10, 3, 16, 100), // Medium-low detail
  new THREE.TorusGeometry(10, 3, 24, 150), // Medium detail
  new THREE.TorusGeometry(10, 3, 32, 200), // Medium-high detail
  new THREE.TorusGeometry(10, 3, 48, 300)  // High detail
];


var material = new THREE.MeshBasicMaterial({
  color: (0x000000),
  wireframe: true,
  dithering: true,
  wireframeLinewidth: 1 
});


let shape1 = new THREE.Mesh(new THREE.WireframeGeometry(shapeGeometries[0]), material);
let shape2 = new THREE.Mesh(new THREE.WireframeGeometry(shapeGeometries[0]), material);
shape2.position.setX(isMobile ? -10 : 20);

// shape2.position.setY(1);
shape2.position.setY(isMobile ? 10 : -5);

shape2.position.setZ(isMobile ? -150 : -50);
shape2.rotation.x = 1;
scene.add(shape1);
scene.add(shape2);




function moveCamera() {
  const scrollTop = scrollableElement.scrollTop;
  shape2.rotation.x += 0.034;

  renderer.render(scene, camera);
}

if (scrollableElement) {
  scrollableElement.addEventListener('scroll', moveCamera);
}



export function updateShapes() {
  scene.remove(shape1);
  scene.remove(shape2);

  shape1.geometry.dispose();
  shape2.geometry.dispose();

  // event.preventDefault(); 
  currentShapeIndex = (currentShapeIndex + 1) % shapeGeometries.length;

  shape1.geometry = new THREE.WireframeGeometry(shapeGeometries[currentShapeIndex]);
  shape2.geometry = new THREE.WireframeGeometry(shapeGeometries[currentShapeIndex]);


  scene.add(shape1);
  scene.add(shape2);
}

function animate() {
  requestAnimationFrame(animate);

  shape1.rotation.x += 0.005;
  shape1.rotation.y += 0.005;
  shape1.rotation.z += 0.0001;

  
  renderer.render(scene, camera);
}

animate();



window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});


// Listen for dragStart and dragMove events in main.js
document.addEventListener('dragStart', (event) => {
    console.log('Dragging started');
    // You can set up any initial conditions here if needed
});

document.addEventListener('dragMove', (event) => {
    // Apply rotation to shape2 as the form is being dragged
    if (shape2) {
        // You can modify the rotation based on the drag distance or position
        let rotationFactor = event.clientX / window.innerWidth;  // You can use clientX or clientY to rotate
        shape2.rotation.z += rotationFactor * 0.1;  // Adjust the factor for desired effect
    }
});

// document.addEventListener('keydown', (event) => {
//   if (event.key === 'Tab') {
//     event.preventDefault(); 
//     currentShapeIndex = (currentShapeIndex + 1) % shapeGeometries.length;
//     updateShapes();
//   }

//   if (event.key === 'ArrowUp') {
//     shape1.material.color.set(Math.random() * 0xffffff);
//     shape2.material.color.set(Math.random() * 0xffffff);
//   }

//   if (event.key === 'ArrowDown') {
//     let geometriesList;
//     switch (currentShapeIndex) {
//       case 0:
//         geometriesList = torusGeometries;
//         break;
//       case 1:
//         geometriesList = boxGeometries;
//         break;
//       case 2:
//         geometriesList = sphereGeometries;
//         break;
//       case 3:
//         geometriesList = coneGeometries;
//         break;
//       case 4:
//         geometriesList = cylinderGeometries;
//         break;
//       case 5:
//         geometriesList = dodecahedronGeometries;
//         break;
//       case 6:
//         geometriesList = icosahedronGeometries;
//         break;
//     }

//     currentGeometryIndex = (currentGeometryIndex + 1) % geometriesList.length;

//     shape1.geometry.dispose();
//     shape2.geometry.dispose();
//     shape1.geometry = new THREE.WireframeGeometry(geometriesList[currentGeometryIndex]);
//     shape2.geometry = new THREE.WireframeGeometry(geometriesList[currentGeometryIndex]);

//     console.log(`Switched to geometry index: ${currentGeometryIndex}`);
//   }

//   if (event.key === 's') {
//     event.preventDefault(); 
    
//     scaleIndex = (scaleIndex + 1) % scaleFactors.length;
//     const scaleFactor = scaleFactors[scaleIndex];

//     shape1.scale.set(scaleFactor, scaleFactor, scaleFactor);
//     shape2.scale.set(scaleFactor, scaleFactor, scaleFactor);

//     console.log(`Scaled shapes to factor: ${scaleFactor}`);
//   }
// });