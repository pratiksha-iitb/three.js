import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import gsap from "gsap";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

//textures
const textureLoader = new THREE.TextureLoader();
const doorColorTexture=textureLoader.load('/textures/door/color.jpg');
const doorambientTexture=textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorroughnessTexture=textureLoader.load('/textures/door/roughness.jpg');
const doormetalnessTexture=textureLoader.load('/textures/door/metalness.jpg');
const doorheightTexture=textureLoader.load('/textures/door/height.jpg');
const dooralphaTexture=textureLoader.load('/textures/door/alpha.jpg');
const doornormalTexture=textureLoader.load('/textures/door/normal.jpg');
const wallColorTexture=textureLoader.load('/textures/bricks/color.jpg');
const wallambientTexture=textureLoader.load('/textures/bricks/ambientOcclusion.jpg');
const wallroughnessTexture=textureLoader.load('/textures/bricks/roughness.jpg');
const wallnormalTexture=textureLoader.load('/textures/bricks/normal.jpg');
const roadTexture=textureLoader.load('/textures/road.jpeg');
const grassColorTexture=textureLoader.load('/textures/grass/color.jpg');
const grassroughnessTexture=textureLoader.load('/textures/grass/roughness.jpg');
const grassambientTexture=textureLoader.load('/textures/grass/ambientOcclusion.jpg');
doorColorTexture.colorSpace=THREE.SRGBColorSpace;
wallColorTexture.colorSpace=THREE.SRGBColorSpace;
roadTexture.colorSpace=THREE.SRGBColorSpace;
grassColorTexture.colorSpace=THREE.SRGBColorSpace;

grassColorTexture.repeat.set(10,10);
grassColorTexture.wrapS=THREE.RepeatWrapping;
grassColorTexture.wrapT=THREE.RepeatWrapping;
//house
const groupHouse=new THREE.Group();
groupHouse.position.y=0;
scene.add(groupHouse);

const wall=new THREE.Mesh(
  new THREE.BoxGeometry(4,2.5,4),
  new THREE.MeshStandardMaterial({
    map:wallColorTexture,
    aoMap:wallambientTexture,
    normalMap:wallnormalTexture,
    roughnessMap:wallroughnessTexture
  })
); 
wall.position.y=1.25;
groupHouse.add(wall);

const roof=new THREE.Mesh(
  new THREE.ConeGeometry(4,2,4),
  new THREE.MeshStandardMaterial()
);
roof.position.y=3.5;
roof.rotation.y=Math.PI/4;
groupHouse.add(roof);

//door
const door=new THREE.Mesh(
  new THREE.PlaneGeometry(2,2,30,30),
  new THREE.MeshStandardMaterial({
    map:doorColorTexture,
    aomap:doorambientTexture,
    alphaMap:dooralphaTexture,
    transparent:true,
    displacementMap:doorheightTexture,
    displacementScale:0.1,
    metalnessMap:doormetalnessTexture,
    roughnessMap:doorroughnessTexture,
    normalMap:doornormalTexture

  })
);
door.position.z=2.01;
door.position.y=1;
groupHouse.add(door);

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({ map:grassColorTexture ,aoMap:grassambientTexture,roughnessMap:grassroughnessTexture})
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

//road
const road=new THREE.Mesh(
  new THREE.PlaneGeometry(20,4),
  new THREE.MeshStandardMaterial({map:roadTexture})
);
road.position.y=0.01;
road.rotation.x=-Math.PI/2;
road.position.z=7;
scene.add(road)

//car
const groupCar=new THREE.Group();
groupCar.position.z=7;
groupCar.position.x=-8;
scene.add(groupCar);

const wheelBack=new THREE.Mesh(
  new THREE.BoxGeometry(2,0.5,0.5),
  new THREE.MeshBasicMaterial({color:'black'})
);
wheelBack.rotation.y=Math.PI/2;
wheelBack.position.y=0.25;
groupCar.add(wheelBack);

const wheelFront=new THREE.Mesh(
  new THREE.BoxGeometry(2,0.5,0.5),
  new THREE.MeshBasicMaterial({color:'black'})
);
wheelFront.position.x=2;
wheelFront.position.y=0.25;
wheelFront.rotation.y=Math.PI/2;
groupCar.add(wheelFront);

const main=new  THREE.Mesh(
  new  THREE.BoxGeometry(1.8,1.5,3.5),
  new THREE.MeshStandardMaterial({color:'red'})
);
main.rotation.y=Math.PI/2;
main.position.y=1;
main.position.x=1;
groupCar.add(main);

const cabin=new  THREE.Mesh(
  new  THREE.BoxGeometry(2,1,1.3),
  new THREE.MeshStandardMaterial()
);
cabin.position.y=2;
cabin.position.x=1;
groupCar.add(cabin);

gsap.to(groupCar.position,{x:7.5,duration:5,repeat:-1});

const groupTree=new THREE.Group();
groupTree.position.z=4;
groupTree.position.x=-4;
groupTree.position.y=1.5;
scene.add(groupTree);
const wood=new THREE.Mesh(
  new THREE.BoxGeometry(0.2,3,0.2),
  new THREE.MeshStandardMaterial({color:'brown'})
);
groupTree.add(wood);

const branch1=new THREE.Mesh(
  new THREE.ConeGeometry(2,1,6),
  new THREE.MeshStandardMaterial({color:'green'})
);
branch1.position.y=1;
groupTree.add(branch1);

const branch2=new THREE.Mesh(
  new THREE.ConeGeometry(1.5,1.2,7),
  new THREE.MeshStandardMaterial({color:'green'})
);
branch2.position.y=1.8;
groupTree.add(branch2);

const branch3=new THREE.Mesh(
  new THREE.ConeGeometry(1,1.3,9),
  new THREE.MeshStandardMaterial({color:'green'})
);
branch3.position.y=2.8;
groupTree.add(branch3);

const towerGeometry = new THREE.CylinderGeometry(0.2, 0.2, 10, 32);
const towerMaterial = new THREE.MeshStandardMaterial({color: 0x808080});
const tower = new THREE.Mesh(towerGeometry, towerMaterial);
tower.position.set(6,5,-3);
scene.add(tower);

// Windmill nacelle
const nacelleGeometry = new THREE.BoxGeometry(1, 1, 1);
const nacelleMaterial = new THREE.MeshStandardMaterial({color: 0x404040});
const nacelle = new THREE.Mesh(nacelleGeometry, nacelleMaterial);
nacelle.position.set(6,10,-3);
scene.add(nacelle);
const bladeGeometry = new THREE.BoxGeometry(0.5, 4, 0.3);
const bladeMaterial = new THREE.MeshStandardMaterial({color: 0x0000ff});
const blade1 = new THREE.Mesh(bladeGeometry, bladeMaterial);
const blade2 = blade1.clone();
const blade3 = blade1.clone();
const blade4 = blade1.clone();

blade1.position.set(0, 2, 0.5);
blade2.position.set(0, -2, 0.5);
blade3.position.set(2, 0, 0.5);
blade3.rotation.z = Math.PI / 2;
blade4.position.set(-2, 0, 0.5);
blade4.rotation.z = Math.PI / 2;

const blades = new THREE.Group();
blades.add(blade1);
blades.add(blade2);
blades.add(blade3);
blades.add(blade4);
blades.position.set(6,10,-3)
scene.add(blades);

// Lamp Post
const lampPost = new THREE.Group();
lampPost.position.set(8.5,1,5.5);
scene.add(lampPost);

const post = new THREE.Mesh(
  new THREE.CylinderGeometry(0.1, 0.1, 4, 8),
  new THREE.MeshStandardMaterial({ color: 'black' })
);
post.position.y = 1;
lampPost.add(post);

const lamp = new THREE.Mesh(
  new THREE.SphereGeometry(0.5),
  new THREE.MeshStandardMaterial({ color: 'yellow' })
);
lamp.position.y = 3;
lampPost.add(lamp);

const lampLight = new THREE.PointLight('yellow', 1, 10);
lampLight.position.y = 4.2;
lampPost.add(lampLight);

// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#ffffff", 1.5);
moonLight.position.set(4, 5, 6);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});


// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};
function animate() {
  requestAnimationFrame(animate);

  // Rotate the blades
  blades.rotation.z += 0.01;

  renderer.render(scene, camera);
}
animate();

tick();
