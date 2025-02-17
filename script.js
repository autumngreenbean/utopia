import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";


const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Load GLB model
new GLTFLoader().load('model.glb', gltf => {
    const model = gltf.scene;
    model.scale.set(2, 2, 2);  
    model.position.set(0, 0, 0); 
    model.rotateX(Math.PI / 7);
    scene.add(model);

    const sphereGeometry = new THREE.SphereGeometry(1, 16, 16); // Adjust size if needed
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red sphere
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(100, 0, 0); // 100 units away on the X-axis
    scene.add(sphere);
});

// Camera setup
camera.position.set(0, 1, 150); // Move camera back to see both objects
camera.lookAt(0, 0, 0);

(function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
})();
