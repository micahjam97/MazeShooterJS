///requires THREE.js


const VIEWING_ANGLE = 60;
const WINDOW_HEIGHT = 600;
const WINDOW_WIDTH = 600;
const ASPECT_RATIO = WINDOW_WIDTH / WINDOW_HEIGHT;
const FPS;                           // game frames per second
const DRAW_DISTANCE = [0,100];       // game draw distance
const DOM_CONTAINER = document.body; // HTML container for the game

// initialize the scene
var scene = new THREE.Scene();

// initialize the camera
var camera = new THREE.PerspectiveCamera(VIEWING_ANGLE, ASPECT_RATIO, DRAW_DISTANCE[0], DRAW_DISTANCE[1]);

// initailize the renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);

DOM_CONTAINER.appendChild(renderer.domElement);
