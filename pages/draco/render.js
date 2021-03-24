import getLoader from '../../jsm/loaders/DRACOLoader.js';

export default function (canvas, THREE) {

  var camera, scene, renderer;

  let { DRACOLoader } = getLoader(THREE);

  // Configure and create Draco decoder.
  // var dracoLoader = new DRACOLoader();
  // dracoLoader.setDecoderPath('https://threejs.org/examples/js/libs/draco/');
  // dracoLoader.setDecoderConfig({ type: 'js' });

  init();
  animate();

  function init() {
    // renderer
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    // renderer.setPixelRatio(window.devicePixelRatio);
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.shadowMap.enabled = true;

    camera = new THREE.PerspectiveCamera(35, canvas.width / canvas.height, 0.1, 15);
    camera.position.set(3, 0.25, 3);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x443333);
    scene.fog = new THREE.Fog(0x443333, 1, 4);

    // Ground
    var plane = new THREE.Mesh(
      new THREE.PlaneBufferGeometry(8, 8),
      new THREE.MeshPhongMaterial({ color: 0x999999, specular: 0x101010 })
    );
    plane.rotation.x = - Math.PI / 2;
    plane.position.y = 0.03;
    plane.receiveShadow = true;
    scene.add(plane);

    // Lights
    var light = new THREE.HemisphereLight(0x443333, 0x111122);
    scene.add(light);

    var light = new THREE.SpotLight();
    light.angle = Math.PI / 16;
    light.penumbra = 0.5;
    light.castShadow = true;
    light.position.set(- 1, 1, 1);
    scene.add(light);


    var loader = new THREE.FileLoader();
    loader.setResponseType('arraybuffer');

    loader.load('https://threejs.org/examples/models/draco/bunny.drc', (buffer) => {
      let taskConfig = {
        "attributeIDs": { "position": "POSITION", "normal": "NORMAL", "color": "COLOR", "uv": "TEX_COORD" },
        "attributeTypes": { "position": "Float32Array", "normal": "Float32Array", "color": "Float32Array", "uv": "Float32Array" },
        "useUniqueIDs": false
      }
      let taskID = 1;

      const worker = wx.createWorker('workers/decoder.js');
      worker.postMessage({ type: 'init', decoderConfig: { type: "js" } });
      worker.onMessage(function (message) {
        switch (message.type) {

          case 'decode':

            let geometry = _createGeometry(message.geometry);
            geometry.computeVertexNormals();

            var material = new THREE.MeshStandardMaterial({ color: 0x606060 });
            var mesh = new THREE.Mesh(geometry, material);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);

            break;

          case 'error':
            console.log(message.type);
            break;

          default:
            console.error('THREE.DRACOLoader: Unexpected message, "' + message.type + '"');

        }

      });

      worker.postMessage({ type: 'decode', id: taskID, taskConfig, buffer }, [buffer]);




    });


    function _createGeometry(geometryData) {

      var geometry = new THREE.BufferGeometry();


      let tarray = []
      for (var i in geometryData.index.array){
        tarray[i] = geometryData.index.array[i]
      }
      geometryData.index.array = Uint32Array.from(tarray)


      if (geometryData.index) {

        geometry.setIndex(new THREE.BufferAttribute(geometryData.index.array, 1));

      }

      for (var i = 0; i < geometryData.attributes.length; i++) {

        var attribute = geometryData.attributes[i];
        let ta = [];
        for (let i in attribute.array){
          ta[i] = attribute.array[i]
        }
        attribute.array = Float32Array.from(ta)

        console.log(attribute.array)
        var name = attribute.name;
        var array = attribute.array;
        var itemSize = attribute.itemSize;

        geometry.setAttribute(name, new THREE.BufferAttribute(array, itemSize));

      }
      return geometry;

    }


    // dracoLoader.load('https://threejs.org/examples/models/draco/bunny.drc', function (geometry) {

    //   geometry.computeVertexNormals();

    //   var material = new THREE.MeshStandardMaterial({ color: 0x606060 });
    //   var mesh = new THREE.Mesh(geometry, material);
    //   mesh.castShadow = true;
    //   mesh.receiveShadow = true;
    //   scene.add(mesh);

    //   // Release decoder resources.
    //   dracoLoader.dispose();

    // });



  }


  function animate() {

    render();
    canvas.requestAnimationFrame(animate);

  }

  function render() {

    var timer = Date.now() * 0.0003;

    camera.position.x = Math.sin(timer) * 0.5;
    camera.position.z = Math.cos(timer) * 0.5;
    camera.lookAt(0, 0.1, 0);

    renderer.render(scene, camera);

  }


}