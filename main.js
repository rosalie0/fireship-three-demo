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
