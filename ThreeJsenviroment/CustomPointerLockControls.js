import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import * as THREE from 'three';

class CustomPointerLockControls extends PointerLockControls {
    constructor(camera, domElement) {
        super(camera, domElement);
        this.sensitivity = 0.2; // Sensibilidad por defecto
        this.velocity = new THREE.Vector3();
        this.direction = new THREE.Vector3();
        this.moveSpeed = 10;
    }

    onMouseMove(event) {
        if (this.isLocked === false) return;

        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        this.getObject().rotation.y -= movementX * 0.002 * this.sensitivity;
        this.getObject().rotation.x -= movementY * 0.002 * this.sensitivity;
        this.getObject().rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.getObject().rotation.x));
    }

    moveForward(distance) {
        this.getDirection(this.direction);
        this.velocity.add(this.direction.multiplyScalar(distance));
    }

    moveRight(distance) {
        this.getObject().matrix.extractBasis(new THREE.Vector3(), this.direction, new THREE.Vector3());
        this.velocity.add(this.direction.multiplyScalar(distance));
    }

    update(delta) {
        this.getObject().position.add(this.velocity.clone().multiplyScalar(delta));
        this.velocity.set(0, 0, 0); // Reset velocity after applying it
    }
}

export { CustomPointerLockControls };
