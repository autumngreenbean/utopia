import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";


const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setClearColor(0xFFFFFF, 1);  
document.body.appendChild(renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

let model; 
<<<<<<< Updated upstream
new GLTFLoader().load('nail_charms_XD/scene.gltf', gltf => {
    model = gltf.scene;

    model.scale.set(30, 30, 30);  
    model.position.set(0, 0, 0); 
=======
new GLTFLoader().load('/assets/star.glb', gltf => {
    model = gltf.scene;

    // Set scale, position, and rotation for the model
    model.scale.set(4, 4, 4);  
    model.position.set(0, 0, 0); 
    // model.rotateX(Math.PI / 7);
>>>>>>> Stashed changes
    
    // model.rotateX(Math.PI / 7);
        model.traverse(child => {
        if (child.isMesh) {
            child.material.wireframe = false; // Enable wireframe for each mesh
        }
    });
    scene.add(model);
});

camera.position.set(0, 100, 150); //x, y, z
camera.lookAt(0, 0, 0); 

(function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // model.rotation.z += 0.01; 


})();
