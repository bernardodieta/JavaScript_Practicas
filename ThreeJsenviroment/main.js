import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { AmmoPhysics } from 'three/examples/jsm/physics/AmmoPhysics.js';

let scene, camera, renderer, controls, physics;

init();
animate();

async function init() {
    // Crear la escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xcce0ff);

    // Crear la cámara
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.y = 10;
    camera.position.z = 20;

    // Crear el renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Crear controles de PointerLock
    controls = new PointerLockControls(camera, document.body);
    scene.add(controls.getObject());

    // Inicializar el motor de física AmmoPhysics
    physics = new AmmoPhysics();

    // Crear un suelo
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1;
    scene.add(ground);
    physics.addMeshGroup(ground);

    // Cubos para simular edificios
    createBuilding(-5, 0, -5);
    createBuilding(5, 0, -5);
    createBuilding(-5, 0, 5);
    createBuilding(5, 0, 5);

    // Eventos de teclado
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    // Evento de resize
    window.addEventListener('resize', onWindowResize);
}

function createBuilding(x, y, z) {
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const material = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y + 1.5, z);
    scene.add(cube);
    physics.addMeshGroup(cube);
}

function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW':
            controls.moveForward(1);
            break;
        case 'KeyA':
            controls.moveRight(-1);
            break;
        case 'KeyS':
            controls.moveForward(-1);
            break;
        case 'KeyD':
            controls.moveRight(1);
            break;
        case 'Space':
            jump();
            break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW':
        case 'KeyA':
        case 'KeyS':
        case 'KeyD':
            controls.moveForward(0);
            controls.moveRight(0);
            break;
    }
}

function jump() {
    const velocity = controls.getObject().body.getLinearVelocity();
    if (velocity.y() === 0) {
        controls.getObject().applyImpulse(new THREE.Vector3(0, 5, 0));
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    physics.update(); // Actualizar la simulación de física en cada cuadro
}
