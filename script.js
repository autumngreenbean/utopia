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
new GLTFLoader().load('assets/avatars/cat_with_bows.glb', gltf => {
    model = gltf.scene;

    model.scale.set(100, 100, 100);  
    model.position.set(0, 0, 0); 
    
    // model.rotateX(Math.PI / 7);
        model.traverse(child => {
        if (child.isMesh) {
            child.material.wireframe = false; // Enable wireframe for each mesh
        }
    });
    scene.add(model);
});

camera.position.set(0, 0, 150); //x, y, z
camera.lookAt(0, 0, 0); 

(function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    model.rotation.y += 0.01; 


})();
