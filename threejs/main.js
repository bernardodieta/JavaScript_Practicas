
import * as THREE from './js/three.module.js'

const scene = new THREE.Scene()
//scene.background = new THREE.Color(0x666666)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
const renderer = new THREE.WebGLRenderer({ alpha: true })

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cubre = new THREE.Mesh(geometry, material);
cubre.castShadow = true;
cubre.position.set(1, 2, 1);
scene.add(cubre);

const light = new THREE.DirectionalLight(0xffffff, 1, 10);
light.position.set(-1, 1, 1);
light.castShadow = true;
scene.add(light);

const planeGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xff1300 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

plane.receiveShadow = true;
plane.position.set(0, 0, 0);
scene.add(plane);

camera.position.z = 5;
camera.position.y = -3;
camera.rotation.x = .5;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();



