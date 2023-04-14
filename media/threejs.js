const myCanvas = document.querySelector("#canvas");
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
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

const boxGeo = new THREE.BoxGeometry(9.5, 9.5, 1);
const boxMat = new THREE.MeshBasicMaterial({
  opacity: 0.00001,
  transparent: true,
});
const innerCube1 = new THREE.Mesh(boxGeo, boxMat);
const innerCube2 = new THREE.Mesh(boxGeo, boxMat);
const innerCube3 = new THREE.Mesh(boxGeo, boxMat);
const innerCube4 = new THREE.Mesh(boxGeo, boxMat);
const innerCube5 = new THREE.Mesh(boxGeo, boxMat);
const innerCube6 = new THREE.Mesh(boxGeo, boxMat);
const innerCube7 = new THREE.Mesh(boxGeo, boxMat);
const innerCube8 = new THREE.Mesh(boxGeo, boxMat);
const innerCube9 = new THREE.Mesh(boxGeo, boxMat);

scene.add(innerCube1);
scene.add(innerCube2);
scene.add(innerCube3);
scene.add(innerCube4);
scene.add(innerCube5);
scene.add(innerCube6);
scene.add(innerCube7);
scene.add(innerCube8);
scene.add(innerCube9);

innerCube2.position.set(10, 10, 0);
innerCube3.position.set(10, 0, 0);
innerCube4.position.set(0, 10, 0);
innerCube5.position.set(0, -10, 0);
innerCube6.position.set(-10, -10, 0);
innerCube7.position.set(10, -10, 0);
innerCube8.position.set(-10, 0, 0);
innerCube9.position.set(-10, 10, 0);

const sphereGeometry = new THREE.SphereGeometry(3, 32, 16);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0xffff00,
});

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
camera.position.z = 25;
camera.position.y = 3;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let clickCount = 0;

let gamestate = new Array(9).fill(0);

const onClick = (event) => {
  // Calculate the mouse position in normalized device coordinates
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  // Cast a ray from the camera to the clicked position
  raycaster.setFromCamera(mouse, camera);

  // Check if the ray intersects with any of the cubes
  const intersects = raycaster.intersectObjects([
    innerCube1,
    innerCube2,
    innerCube3,
    innerCube4,
    innerCube5,
    innerCube6,
    innerCube7,
    innerCube8,
    innerCube9,
  ]);
  if (intersects.length > 0) {
    // Change the color of the clicked cube
    const cube = intersects[0].object;

    console.log(cube.position);
    console.log(clickCount);
    if (clickCount % 2 == 0) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.copy(cube.position);
      scene.add(sphere);
    } else {
      const cube = intersects[0].object;
      const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
      const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x2323c9 });
      const cube1 = new THREE.Mesh(boxGeometry, boxMaterial);
      cube1.position.copy(cube.position);
      scene.add(cube1);
    }
    clickCount = clickCount + 1;
    cube.material.color.setHex(Math.random() * 0xffffff);
  }
};

window.addEventListener("click", onClick);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
