
import getDDSLoader from '../../jsm/loaders/DDSLoader.js';
import getMTLLoader from '../../jsm/loaders/MTLLoader.js';
import getOBJLoader from '../../jsm/loaders/OBJLoader.js';

export default function (canvas, THREE) {
    let { DDSLoader } = getDDSLoader(THREE);
    let { MTLLoader } = getMTLLoader(THREE);
    let OBJLoader = getOBJLoader(THREE);
    let window = THREE.global;
    let { document } = THREE.global;

    var camera, scene, renderer;
    var mouseX = 0, mouseY = 0;
    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;
    init();
    animate();
    function init() {
        renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);


        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.z = 250;
        // scene
        scene = new THREE.Scene();
        var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
        scene.add(ambientLight);
        var pointLight = new THREE.PointLight(0xffffff, 0.8);
        camera.add(pointLight);
        scene.add(camera);
        // model
        var onProgress = function (xhr) {
            if (xhr.lengthComputable) {
                var percentComplete = xhr.loaded / xhr.total * 100;
                console.log(Math.round(percentComplete, 2) + '% downloaded');
            }
        };
        var onError = function () { };
        var manager = new THREE.LoadingManager();
        manager.addHandler(/\.dds$/i, new DDSLoader());
        // comment in the following line and import TGALoader if your asset uses TGA textures
        // manager.addHandler( /\.tga$/i, new TGALoader() );
        new MTLLoader(manager)
            .setPath('https://techbrood.com/threejs/examples/models/obj/male02/')
            .load('male02_dds.mtl', function (materials) {
                materials.preload();
                new OBJLoader(manager)
                    .setMaterials(materials)
                    .setPath('https://techbrood.com/threejs/examples/models/obj/male02/')
                    .load('male02.obj', function (object) {
                        object.position.y = - 95;
                        scene.add(object);
                    }, onProgress, onError);
            });
        //

        document.addEventListener('touchmove', onDocumentMouseMove, false);
        //
        window.addEventListener('resize', onWindowResize, false);
    }
    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    function onDocumentMouseMove(event) {
        mouseX = (event.clientX - windowHalfX) / 2;
        mouseY = (event.clientY - windowHalfY) / 2;
    }
    //
    function animate() {
        canvas.requestAnimationFrame(animate);
        render();
    }
    function render() {
        camera.position.x += (mouseX - camera.position.x) * .05;
        camera.position.y += (- mouseY - camera.position.y) * .05;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

}