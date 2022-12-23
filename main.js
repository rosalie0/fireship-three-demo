import "./style.css";
import * as THREE from "three";

/***********************  MAKING THE SCENE **********************/
// The scene holds everything
const scene = new THREE.Scene();

/***********************  MAKING THE CAMERA **********************/
const aspectRatio = window.innerWidth / window.innerHeight;
const fov = 75;
// There are many types of camera, this one mimics what human eyeballs see
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, 0.1, 1000);

/***********************  MAKING THE RENDERER **********************/
// renderer makes the magic happen
const renderer = new THREE.WebGLRenderer({
  // tell it which canvas to use (use the one we defined in index.html)
  canvas: document.querySelector("#bg"),
});

// set pixels based on client's device
renderer.setPixelRatio(window.devicePixelRatio);
// make canvas 'full screen'
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30); // start the camera at a position not 0,0,0 so we can see stuff and not be inside things.

/*********************** CONNECTING SCENE, CAMERA, AND RENDERER **********************/
// This actually DRAWS the two pieces we've created!
renderer.render(scene, camera);

/*********************** ******* CREATING SHAPES/ 3-D OBJECTS ********* **********************/

// 1. Make Geometry
// First get a geometry , the x, y, z points that make up a shape.
// theres a bunch built in, such as Cylinder or TorusGeomtery
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// 2. Make material
// Again, there's many built in ( you can even make your own)
// The MeshBasicMaterial does not require light source.
const material = new THREE.MeshBasicMaterial({
  color: 0xff6666,
  wireframe: true,
});

// 3. Make Mesh (using 1 & 2)
// Combining the geometry with the material is the MESH - which is
// What we actually want to add to the scene.
const myTorus = new THREE.Mesh(geometry, material);

/*********************** ******* ADDING MESHES TO SCENE ********* **********************/
scene.add(myTorus);

// Here you need to re-invoke renderer.render(scene, camera);
// but instead, better to recursively call it
const animate = () => {
  requestAnimationFrame(animate); // Tell browser to repaint
  renderer.render(scene, camera);
};
animate();
