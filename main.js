import './style.css'



import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Loader, Texture } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

const PointLight = new THREE.PointLight(0xffffff)
PointLight.position.set(5,5,5)

const AmbientLight = new THREE.AmbientLight(0xffffff)
scene.add(PointLight, AmbientLight)

//const LightHelper = new THREE.PointLightHelper(PointLight)
//const GridHelper = new THREE.GridHelper(200,50);
//scene.add(LightHelper, GridHelper)

const controls = new OrbitControls(camera, renderer.domElement);


function addStar(){

  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)

}

Array(200).fill().forEach(addStar)

const loader = new THREE.TextureLoader();
loader.load('./imagenes/galaxia.jpg', (Texture) => {
  scene.background = Texture
} )


//cubo

const aldocubo = new THREE.TextureLoader().load('./imagenes/aldo.jpg')

const aldo = new THREE.Mesh(
  new THREE.BoxGeometry(5,5,5),
  new THREE.MeshBasicMaterial({map: aldocubo})
)

scene.add(aldo);

//Luna

const moonTexture = new THREE.TextureLoader().load('/imagenes/moon.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(4,32,32),
  new THREE.MeshStandardMaterial({map: moonTexture,})
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  aldo.rotation.y += 0.01;
  aldo.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;


}

document.body.onscroll = moveCamera


function animate(){
  requestAnimationFrame( animate );

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render( scene, camera);
}

animate()