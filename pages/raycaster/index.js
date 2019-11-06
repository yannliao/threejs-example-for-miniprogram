import * as THREE from '../../libs/three.weapp.js'

let window = THREE.global;
let { document } = window;

Page({
  data: {
  },
  onLoad: function () {
    this.theta = 0;
    this.mouse = new THREE.Vector2();
    this.radius = 100;

    wx.createSelectorQuery()
      .select('#c')
      .node()
      .exec((res) => {
        const canvas = THREE.global.registerCanvas(res[0].node)
        this.canvas = canvas;

        this.init(canvas)
			  this.animate(canvas);
      })

  },

  render() {
    let { scene, mouse, renderer, radius, raycaster } = this;

    this.theta += 0.1;

    this.camera.position.x = radius * Math.sin(THREE.Math.degToRad(this.theta));
    this.camera.position.y = radius * Math.sin(THREE.Math.degToRad(this.theta));
    this.camera.position.z = radius * Math.cos(THREE.Math.degToRad(this.theta));
    this.camera.lookAt(scene.position);

    this.camera.updateMatrixWorld();

    // find intersections

    raycaster.setFromCamera(mouse, this.camera);

    var intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) {

      if (this.INTERSECTED != intersects[0].object) {

        if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);

        this.INTERSECTED = intersects[0].object;
        this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
        this.INTERSECTED.material.emissive.setHex(0xff0000);

      }

    } else {

      if (this.INTERSECTED) this.INTERSECTED.material.emissive.setHex(this.INTERSECTED.currentHex);

      this.INTERSECTED = null;

    }

    renderer.render(scene, this.camera);

  },
  animate() {
    let canvas = this.canvas;
    canvas.requestAnimationFrame(this.animate);

    this.render();

  },
  init(canvas) {

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xf0f0f0);

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(1, 1, 1).normalize();
    this.scene.add(light);

    var geometry = new THREE.BoxBufferGeometry(20, 20, 20);

    for (var i = 0; i < 2000; i++) {

      var object = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff }));

      object.position.x = Math.random() * 800 - 400;
      object.position.y = Math.random() * 800 - 400;
      object.position.z = Math.random() * 800 - 400;

      object.rotation.x = Math.random() * 2 * Math.PI;
      object.rotation.y = Math.random() * 2 * Math.PI;
      object.rotation.z = Math.random() * 2 * Math.PI;

      object.scale.x = Math.random() + 0.5;
      object.scale.y = Math.random() + 0.5;
      object.scale.z = Math.random() + 0.5;

      this.scene.add(object);

    }

    this.raycaster = new THREE.Raycaster();

    this.renderer = new THREE.WebGLRenderer({ canvas });
    // this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);


    //
    window.addEventListener('resize', onWindowResize, false);

    function onWindowResize() {

      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);

    }



  },
  onUnload() {
    THREE.global.clearCanvas()
  },
  touchStart(e) {
    // console.log('canvas', e)
    // THREE.global.touchEventHandlerFactory('canvas', 'touchstart')(e)
  },
  touchMove(event) {
    console.log('canvas', event)
    
    let touch = event.touches[0];
    this.mouse.x = (touch.x / window.innerWidth) * 2 - 1;
    this.mouse.y = - (touch.y / window.innerHeight) * 2 + 1;

  },
  touchEnd(e) {
    // console.log('canvas', e)
    // THREE.global.touchEventHandlerFactory('canvas', 'touchend')(e)
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
})
