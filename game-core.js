///requires THREE.js




function returnLight(type, color, intensity, opts) {
  //returns a THREEjs light object
  //returnLight(string type, hex color, flot intensity, dict opts)
  var light;
  
  switch(type) {
    case "directional":
      light = new THREE.DirectionalLight(color, intensity);
      break;
    case "ambient":
      light = new THREE.AmbientLight(color);
      break;
  }
  
  for(var opt in opts)
    light[opt] = opts[opt];
  
  return light;
}

function returnObject(type, pos, rot, color, opts) {
  //returns a THREEjs 3d object
  //returnObject(string type, vector pos, vector rot, hex color, dict opts)
  
  var geometry;
  var material;
  var obj3d;
  
  switch(type) {
    case "cube":
      geometry = new THREE.BoxBufferGeometry(opts.width,opts.width,opts.width);
      material = new THREE.MeshStandardMaterial({color: color});
      obj3d = new THREE.Mesh(geometry, material);
      break;
    case "box":
      geometry = new THREE.BoxBufferGeometry(opts.width,opts.height,opts.depth);
      material = new THREE.MeshStandardMaterial({color: color});
      obj3d = new THREE.Mesh(geometry, material);
      break;
    case "plane":
      geometry = new THREE.PlaneBufferGeometry(opts.width, opts.height);
      material = new THREE.MeshStandardMaterial({color: color, side: THREE.DoubleSide});
      obj3d = new THREE.Mesh(geometry, material);
      break;
  }
  
  for(var opt in opts)
    obj3d[opt] = opts[opt];
  
  
  obj3d.position.x = pos[0];
  obj3d.position.y = pos[1];
  obj3d.position.z = pos[2];
  
  obj3d.rotation.x = rot[0];
  obj3d.rotation.y = rot[1];
  obj3d.rotation.z = rot[2];
  
  return obj3d;
}


function addObjects(objs, scn) {
  for(var obj in objs)
    scn.add(objs[obj]);
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
  
  var lightList = {
    ambientLight: returnLight("ambient", 0x404040, 1, {}),
    overheadLight: returnLight("directional", 0xffffff, 1, {castShadow: true})
  };
  
  var objectList = {
    ground: returnObject("plane", [0,-10,0], [Math.PI/2,0,0], 0x00ff00, {width: 500, height: 500, receiveShadow: true}),
    cube: returnObject("cube", [50,0,20], [0,0,0], 0xff0000, {width: 5, castShadow: true})
  };
  
  addObjects(lightList, scene);
  addObjects(objectList, scene);
  
  
  var animate = function () {
    requestAnimationFrame(animate);
    
    
    objectList.cube.rotation.x += 0.01;
    objectList.cube.rotation.y += 0.02;
    
    
    if(controls.left)
      camera.rotation.y += 0.05;
    if(controls.right)
      camera.rotation.y -= 0.05;
    
    if(controls.up) {
       camera.position.x -= Math.sin(camera.rotation.y);
       camera.position.z -= Math.cos(camera.rotation.y);
    }
    
    if(controls.down) {
       camera.position.x += Math.sin(camera.rotation.y);
       camera.position.z += Math.cos(camera.rotation.y);
    }
    
    renderer.render(scene, camera);
  };
  
  animate();
  
}