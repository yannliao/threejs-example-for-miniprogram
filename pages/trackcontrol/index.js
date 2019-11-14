import * as THREE from '../../libs/three.weapp.js'
import getControl from '../../jsm/controls/TrackballControls.js'
let { TrackballControls } = getControl(THREE);
let window = THREE.global;
import ResourceTracker from '../../utils/ResourceTracker';

const resMgr = new ResourceTracker();
const track = resMgr.track.bind(resMgr);

Page({
  data: {
    canvas: null
  },
  onLoad: function () {
    let that = this;
    wx.createSelectorQuery()
      .select('#c')
      .node()
      .exec((res) => {
        const canvas = THREE.global.registerCanvas(res[0].node);
        that.setData({
          canvas: canvas
        })
        const params = {
          orthographicCamera: false
        };

        const frustumSize = 400;


        const aspect = window.innerWidth / window.innerHeight;

        const perspectiveCamera = new THREE.PerspectiveCamera(60, aspect, 1, 1000);
        perspectiveCamera.position.z = 500;

        const orthographicCamera = new THREE.OrthographicCamera(frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000);
        orthographicCamera.position.z = 500;

        // world

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xcccccc);
        scene.fog = new THREE.FogExp2(0xcccccc, 0.002);
        track(scene);

        const geometry = new THREE.CylinderBufferGeometry(0, 10, 30, 4, 1);
        const material = new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true });

        for (let i = 0; i < 500; i++) {

          let mesh = new THREE.Mesh(geometry, material);
          mesh.position.x = (Math.random() - 0.5) * 1000;
          mesh.position.y = (Math.random() - 0.5) * 1000;
          mesh.position.z = (Math.random() - 0.5) * 1000;
          mesh.updateMatrix();
          mesh.matrixAutoUpdate = false;
          scene.add(mesh);

        }

        // lights

        {
          let dlight = new THREE.DirectionalLight(0xffffff);
          dlight.position.set(1, 1, 1);
          scene.add(dlight);

          let Dlight = new THREE.DirectionalLight(0x002288);
          Dlight.position.set(- 1, - 1, - 1);
          scene.add(Dlight);

          let Alight = new THREE.AmbientLight(0x222222);
          scene.add(Alight);
        }
        // renderer

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);


        const controls = new TrackballControls(perspectiveCamera, renderer.domElement);

        controls.rotateSpeed = 1.0;
        controls.zoomSpeed = 1.2;
        controls.panSpeed = 0.8;

        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;

        controls.keys = [65, 83, 68];

        controls.addEventListener('change', render);



        window.addEventListener('resize', onWindowResize, false);

        function onWindowResize() {

          var aspect = window.innerWidth / window.innerHeight;

          perspectiveCamera.aspect = aspect;
          perspectiveCamera.updateProjectionMatrix();

          orthographicCamera.left = - frustumSize * aspect / 2;
          orthographicCamera.right = frustumSize * aspect / 2;
          orthographicCamera.top = frustumSize / 2;
          orthographicCamera.bottom = - frustumSize / 2;
          orthographicCamera.updateProjectionMatrix();

          renderer.setSize(window.innerWidth, window.innerHeight);

          // controls.handleResize();

          render();

        }

        function animate() {

          that.animateId = canvas.requestAnimationFrame(animate);

          controls.update();

        }

        function render() {

          let camera = (params.orthographicCamera) ? orthographicCamera : perspectiveCamera;

          renderer.render(scene, camera);

        }

        render();
        animate();
      })
  },
  onUnload: function () {
    let that = this;
    that.data.canvas.cancelAnimationFrame(that.animateId);
    that.animateId = null;
    that.setData({
      canvas: null
    });
    THREE.global.clearCanvas();
    resMgr.dispose();
  },
  touchStart(e) {
    console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
  },
  touchMove(e) {
    console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchmove')(e)
  },
  touchEnd(e) {
    console.log('canvas', e)
    THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
  },
  touchCancel(e) {
    // console.log('canvas', e)
  },
  longTap(e) {
    // console.log('canvas', e)
  },
  tap(e) {
    // console.log('canvas', e)
  },
  documentTouchStart(e) {
    // console.log('document',e)
  },
  documentTouchMove(e) {
    // console.log('document',e)
  },
  documentTouchEnd(e) {
    // console.log('document',e)
  },
})
