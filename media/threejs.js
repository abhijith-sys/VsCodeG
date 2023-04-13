const myCanvas = document.querySelector('#canvas');
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
myCanvas.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
let axes = new THREE.AxesHelper(20);
scene.add(axes);

const geometry = new THREE.BoxGeometry(0.5, 30, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });

const cube1 = new THREE.Mesh(geometry, material);
const cube2 = new THREE.Mesh(geometry, material);
const cube3 = new THREE.Mesh(geometry, material);
const cube4 = new THREE.Mesh(geometry, material);
cube3.rotation.z = Math.PI / 2;
cube4.rotation.z = Math.PI / 2;

scene.add(cube1);
scene.add(cube2);
scene.add(cube3);
scene.add(cube4);

cube1.position.set(5, 0);
cube2.position.set(-5, 0);
cube3.position.set(0, 5);
cube4.position.set(0, -5);
const sphereGeometry = new THREE.SphereGeometry(3, 32, 16);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xffff00,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x2323c9 });
const cube = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(cube);
cube.position.set(10, 0);

const spotLight = new THREE.SpotLight(0xffffff);
const spotLight1 = new THREE.SpotLight(0xffffff);

spotLight.position.set(10, 10, 10);
spotLight1.position.set(-10, 10, 10);

spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 50;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;
scene.add(spotLight);
scene.add(spotLight1);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
//   scene.add(spotLightHelper);
camera.position.z = 25;
camera.position.y = 3;
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();