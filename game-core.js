///requires THREE.js




function returnLight(type, color, intensity, opts) {
  var light;
  
  switch(type) {
    case "directional":
      light = new THREE.DirectionalLight(color, intensity);
      break;
    case "ambient":
      light = new THREE.AmbientLight(color);
      break;
  }
  
  //for(var opt of opts)
   // light[opt] = opts[opt];
  
  return light;
}







function initialize_game(dom_container) {

  const VIEWING_ANGLE = 60;
  const WINDOW_HEIGHT = 600;
  const WINDOW_WIDTH = 600;
  const ASPECT_RATIO = WINDOW_WIDTH / WINDOW_HEIGHT;
  const FPS = 60;                           // game frames per second
  const DRAW_DISTANCE = [0.1,1000];       // game draw distance
  const DOM_CONTAINER = dom_container; // HTML container for the game

  // initialize the scene
  var scene = new THREE.Scene();

  // initialize the camera
  var camera = new THREE.PerspectiveCamera(VIEWING_ANGLE, ASPECT_RATIO, DRAW_DISTANCE[0], DRAW_DISTANCE[1]);

  // initailize the renderer
  var renderer = new THREE.WebGLRenderer();
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.setSize(WINDOW_WIDTH, WINDOW_HEIGHT);

  DOM_CONTAINER.appendChild(renderer.domElement);
  
  var geometry = new THREE.BoxGeometry(1,1,1);
  var material = new THREE.MeshStandardMaterial({color: 0x00ff00});
  var cube = new THREE.Mesh(geometry, material);
  cube.receiveShadow = true;
  cube.rotation.z = Math.PI/4;
  cube.rotation.x = Math.PI/8;
  cube.rotation.y = Math.PI/4;
  
  camera.position.z = 10;
  
  scene.add(returnLight("ambient", 0x404040, 0));
  
  var light = new THREE.DirectionalLight(0xffffff,1);
  light.position.y = 1;
  
  scene.add(light);
  
  scene.add(cube);
  console.log(camera);
  
  var animate = function () {
    requestAnimationFrame(animate);
    
    
    
    renderer.render(scene, camera);
  };
  
  animate();
  
}
