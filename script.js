import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";


const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0xFFFFFF, 1);  // Set the background to white (or any color you prefer)
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);
// Load GLB model
let model; 
new GLTFLoader().load('scene.gltf', gltf => {
    model = gltf.scene;

    // Set scale, position, and rotation for the model
    model.scale.set(30, 30, 30);  
    model.position.set(0, 0, 0); 
    model.rotateX(Math.PI / 7);
    
    // Traverse through all the meshes in the model and set wireframe
    model.traverse(child => {
        if (child.isMesh) {
            child.material.wireframe = true; // Enable wireframe for each mesh
        }
    });

    scene.add(model);
});

// Camera setup
camera.position.set(0, 1, 150); // Move camera back to see both objects
camera.lookAt(0, 0, 0);

(function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    model.rotation.z += 0.01;  // Adjust the value for speed

})();
