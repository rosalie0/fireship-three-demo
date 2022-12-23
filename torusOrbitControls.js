import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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
const basicMaterial = new THREE.MeshBasicMaterial({
  color: 0xff6666,
  wireframe: true,
});

// Using any mat other than basic, requires a light source
const standardMaterial = new THREE.MeshStandardMaterial({
  color: 0xf4f352,
});

// 2.5 Light source(s)
//// I. Point Light
const pointLight = new THREE.PointLight(0xffffff); // makes a 'lightbulb' like light.
pointLight.position.set(-2, 15, 5); // Position it
scene.add(pointLight); // Add it to scene
//// II. Ambient Light
const ambientLight = new THREE.AmbientLight(0xfffff, 0.5);
scene.add(ambientLight);

// 3. Make Mesh (using 1 & 2)
// Combining the geometry with the material is the MESH - which is
// What we actually want to add to the scene.
const myTorus = new THREE.Mesh(geometry, standardMaterial);

/*********************** ******* ADDING MESHES TO SCENE ********* **********************/
scene.add(myTorus);

/*********************** ******* HELPERS FOR IMAGINING 3-D ********* **********************/

// Light Helper - Shows a box of where the light starts from
const lightHelper = new THREE.PointLightHelper(pointLight);

// Grid Helper - creates a grid (may look like a single line if your camera is flat)
const gridHelper = new THREE.GridHelper(200, 50);

// Add them
scene.add(lightHelper, gridHelper);

// With orbit controls imported...
// Listen to DOM events on the mouse and use it to update the camera's pos
// MUST add `controls.update()` into the Game Loop
const controls = new OrbitControls(camera, renderer.domElement);

/*********************** ******* GAME LOOP ********* **********************/

// Rather than re-invoke renderer.render(scene, camera), better to recursively call it
// This is known as a 'Game Loop'
const animate = () => {
  requestAnimationFrame(animate);
  // Rotate our torus - this is a single frame of rotation!
  myTorus.rotation.x += 0.001;
  myTorus.rotation.y += 0.005;
  myTorus.rotation.z += 0.001;

  controls.update(); // Animation frame check OrbitControls interaction
  renderer.render(scene, camera);
};
animate();
