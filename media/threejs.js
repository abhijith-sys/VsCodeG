import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  95,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

scene.background = new THREE.CubeTextureLoader()
  .setPath("./skies/")
  .load([
    "utopia_ft.png",
    "utopia_bk.png",
    "utopia_up.png",
    "utopia_dn.png",
    "utopia_rt.png",
    "utopia_lf.png",
  ]);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
let axes = new THREE.AxesHelper(20);

const geometry = new THREE.BoxGeometry(0.5, 30, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0xff1212,
  metalness: 1,
});

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

scene.add(
  innerCube1,
  innerCube2,
  innerCube3,
  innerCube4,
  innerCube5,
  innerCube6,
  innerCube7,
  innerCube8,
  innerCube9
);

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
  color: 0xffffff,
  metalness: 1,
  roughness: 1,
});

const spotLight = new THREE.SpotLight(0x0ef518);
const spotLight1 = new THREE.SpotLight(0xe70ef5);
const spotLight2 = new THREE.SpotLight(0xf01b09);
const spotLight3 = new THREE.SpotLight(0xf01b09);

spotLight.position.set(10, 20, 10);
spotLight1.position.set(-10, 20, 10);

spotLight2.position.set(10, -20, 10);
spotLight3.position.set(-10, -20, 10);

spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.camera.near = 50;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;
scene.add(spotLight);
scene.add(spotLight1, spotLight2, spotLight3);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);
const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1);
// scene.add(spotLightHelper1);
// const hlight = new THREE.AmbientLight(0x404040, 100);
// scene.add(hlight);
camera.position.z = 25;
camera.position.y = 3;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let clickCount = 0;

let gamestate = new Array(9).fill(0);

let gameOver = false;
const onClick = (event) => {
  if (gameOver) {
    return;
  }
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
    console.log(cube.position.x);
    let X_AXIS = cube.position.x;
    let Y_AXIS = cube.position.y;
    if (X_AXIS === -10 && Y_AXIS === 10) {
      if (gamestate[0] === 0) {
        //for checking if already column taken
        if (clickCount % 2 === 0) {
          gamestate[0] = 1;
        } //sphere
        else {
          gamestate[0] = 2;
        } //cube
      } else {
        return;
      }
    } else if (X_AXIS === 0 && Y_AXIS === 10) {
      if (gamestate[1] === 0) {
        //for checking if already column taken
        if (clickCount % 2 === 0) {
          gamestate[1] = 1;
        } //sphere
        else {
          gamestate[1] = 2;
        } //cube
      } else {
        return;
      }
    } else if (X_AXIS === 10 && Y_AXIS === 10) {
      if (gamestate[2] === 0) {
        //for checking if already column taken

        if (clickCount % 2 === 0) {
          gamestate[2] = 1;
        } //sphere
        else {
          gamestate[2] = 2;
        } //cube
      } else {
        return;
      }
    } else if (X_AXIS === -10 && Y_AXIS === 0) {
      if (gamestate[3] === 0) {
        //for checking if already column taken

        if (clickCount % 2 === 0) {
          gamestate[3] = 1;
        } //sphere
        else {
          gamestate[3] = 2;
        } //cube
      } else {
        return;
      }
    } else if (X_AXIS === 0 && Y_AXIS === 0) {
      if (gamestate[4] === 0) {
        //for checking if already column taken

        if (clickCount % 2 === 0) {
          gamestate[4] = 1;
        } //sphere
        else {
          gamestate[4] = 2;
        } //cube
      } else {
        return;
      }
    } else if (X_AXIS === 10 && Y_AXIS === 0) {
      if (gamestate[5] === 0) {
        //for checking if already column taken

        if (clickCount % 2 === 0) {
          gamestate[5] = 1;
        } //sphere
        else {
          gamestate[5] = 2;
        } //cube
      } else {
        return;
      }
    } else if (X_AXIS === -10 && Y_AXIS === -10) {
      if (gamestate[6] === 0) {
        //for checking if already column taken

        if (clickCount % 2 === 0) {
          gamestate[6] = 1;
        } //sphere
        else {
          gamestate[6] = 2;
        } //cube
      } else {
        return;
      }
    } else if (X_AXIS === 0 && Y_AXIS === -10) {
      if (gamestate[7] === 0) {
        //for checking if already column taken

        if (clickCount % 2 === 0) {
          gamestate[7] = 1;
        } //sphere
        else {
          gamestate[7] = 2;
        } //cube
      } else {
        return;
      }
    } else if (X_AXIS === 10 && Y_AXIS === -10) {
      if (gamestate[8] === 0) {
        //for checking if already column taken

        if (clickCount % 2 === 0) {
          gamestate[8] = 1;
        } //sphere
        else {
          gamestate[8] = 2;
        } //cube
      } else {
        return;
      }
    }
    console.log(gamestate);

    if (clickCount % 2 === 0) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.copy(cube.position);
      scene.add(sphere);
    } else {
      const cube = intersects[0].object;
      const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
      const boxMaterial = new THREE.MeshStandardMaterial({
        color: 0x6487ff,
        metalness: 1,
      });
      const cube1 = new THREE.Mesh(boxGeometry, boxMaterial);
      cube1.position.copy(cube.position);
      scene.add(cube1);
    }
    clickCount = clickCount + 1;
    if (
      (gamestate[0] === gamestate[1] &&
        gamestate[1] === gamestate[2] &&
        gamestate[0] !== 0) ||
      (gamestate[3] === gamestate[4] &&
        gamestate[4] === gamestate[5] &&
        gamestate[3] !== 0) ||
      (gamestate[6] === gamestate[7] &&
        gamestate[7] === gamestate[8] &&
        gamestate[6] !== 0) ||
      (gamestate[0] === gamestate[3] &&
        gamestate[3] === gamestate[6] &&
        gamestate[0] !== 0) ||
      (gamestate[1] === gamestate[4] &&
        gamestate[4] === gamestate[7] &&
        gamestate[1] !== 0) ||
      (gamestate[2] === gamestate[5] &&
        gamestate[5] === gamestate[8] &&
        gamestate[2] !== 0) ||
      (gamestate[0] === gamestate[4] &&
        gamestate[4] === gamestate[8] &&
        gamestate[0] !== 0) ||
      (gamestate[2] === gamestate[4] &&
        gamestate[4] === gamestate[6] &&
        gamestate[2] !== 0)
    ) {
      gameOver = true;
      let material2=new THREE.MeshStandardMaterial({
        color: 0x00FF00,
      });
      if (
        gamestate[0] === gamestate[1] &&
        gamestate[1] === gamestate[2] &&
        gamestate[0] !== 0
      ) {
        const cube10 = new THREE.Mesh(geometry, material2);
        cube10.rotation.z = Math.PI / 2;
        cube10.position.y = 10;
        scene.add(cube10);
      } else if (
        gamestate[3] === gamestate[4] &&
        gamestate[4] === gamestate[5] &&
        gamestate[3] !== 0
      ) {
        const cube10 = new THREE.Mesh(geometry, material2);
        cube10.rotation.z = Math.PI / 2;

        scene.add(cube10);
      } else if (
        gamestate[6] === gamestate[7] &&
        gamestate[7] === gamestate[8] &&
        gamestate[6] !== 0
      ) {
        const cube10 = new THREE.Mesh(geometry, material2);
        cube10.rotation.z = Math.PI / 2;
        cube10.position.y = -10;
        scene.add(cube10);
      } else if (
        gamestate[0] === gamestate[3] &&
        gamestate[3] === gamestate[6] &&
        gamestate[0] !== 0
      ) {
        const cube10 = new THREE.Mesh(geometry, material2);

        cube10.position.x = -10;
        scene.add(cube10);
      } else if (
        gamestate[1] === gamestate[4] &&
        gamestate[4] === gamestate[7] &&
        gamestate[1] !== 0
      ) {
        const cube10 = new THREE.Mesh(geometry, material2);

        scene.add(cube10);
      } else if (
        gamestate[2] === gamestate[5] &&
        gamestate[5] === gamestate[8] &&
        gamestate[2] !== 0
      ) {
        const cube10 = new THREE.Mesh(geometry, material2);
        cube10.position.z = 10;
        scene.add(cube10);
      } else if (
        gamestate[0] === gamestate[4] &&
        gamestate[4] === gamestate[8] &&
        gamestate[0] !== 0
      ) {
        const cube10 = new THREE.Mesh(geometry, material2);
        cube10.rotation.z = Math.PI / 4;
        scene.add(cube10);
      } else if (
        gamestate[2] === gamestate[4] &&
        gamestate[4] === gamestate[6] &&
        gamestate[2] !== 0
      ) {
        const cube10 = new THREE.Mesh(geometry, material2);
        cube10.rotation.z = -Math.PI / 4;
        scene.add(cube10);
      }
      if ((clickCount - 1) % 2 === 0) {
        document.getElementById("gameresult").innerHTML = "SPHERE WINS";
      } else {
        document.getElementById("gameresult").innerHTML = "CUBE WINS";
      }
      // const bodyElement = document.getElementsByTagName("body");
      
      // const result = document.createElement("h1");
      // bodyElement.appendChild(result);
      // if ((clickCount - 1) % 2 === 0) {
      //   document.getElementsByTagName("h1").innerHTML = "SPHERE WINS";
      // } else {
      //   document.getElementsByTagName("h1").innerHTML = "CUBE WINS";
      // }
    }
  }
};

window.addEventListener("click", onClick);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();
