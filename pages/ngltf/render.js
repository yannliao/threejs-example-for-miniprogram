import gLTF from '../../jsm/loaders/GLTFLoader'
import { OrbitControls } from '../../jsm/controls/OrbitControls'

import getRGBLoader from '../../jsm/loaders/RGBELoader.js';
import getGenerator from '../../jsm/loaders/EquirectangularToCubeGenerator.js';
import getPMREMGenerator from '../../jsm/pmrem/PMREMGenerator.js';
import getPMREMCubeUVPacker from '../../jsm/pmrem/PMREMCubeUVPacker.js';


export default function (canvas, THREE) {
  let GLTFLoader = gLTF(THREE);
  let { RGBELoader } = getRGBLoader(THREE)
  let { EquirectangularToCubeGenerator } = getGenerator(THREE)
  let { PMREMGenerator } = getPMREMGenerator(THREE)
  let { PMREMCubeUVPacker } = getPMREMCubeUVPacker(THREE)
  let window = THREE.global

  var controls;
  var camera, scene, renderer;

  init();
  animate();

  function init() {

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(canvas.width, canvas.height);
    renderer.gammaOutput = true;


    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 0.25, 20);
    camera.position.set(- 1.8, 0.9, 2.7);

    scene = new THREE.Scene();

    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .setPath('https://threejs.org/examples/textures/equirectangular/')
      .load('pedestrian_overpass_2k.hdr', function (texture) {

        var cubeGenerator = new EquirectangularToCubeGenerator(texture, { resolution: 1024 });
        cubeGenerator.update(renderer);

        var pmremGenerator = new PMREMGenerator(cubeGenerator.renderTarget.texture);
        pmremGenerator.update(renderer);

        var pmremCubeUVPacker = new PMREMCubeUVPacker(pmremGenerator.cubeLods);
        pmremCubeUVPacker.update(renderer);

        var envMap = pmremCubeUVPacker.CubeUVRenderTarget.texture;

        // model

        var loader = new GLTFLoader().setPath('https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/');
        loader.load('DamagedHelmet.gltf', function (gltf) {

          gltf.scene.traverse(function (child) {

            if (child.isMesh) {

              child.material.envMap = envMap;

            }

          });

          scene.add(gltf.scene);

        });

        pmremGenerator.dispose();
        pmremCubeUVPacker.dispose();

        scene.background = cubeGenerator.renderTarget;

      });



    controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, - 0.2, - 0.2);
    controls.update();
  }

  //

  function animate() {

    canvas.requestAnimationFrame(animate);

    renderer.render(scene, camera);

  }


}