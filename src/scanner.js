(function(global) {
  class scanner extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.cube = new THREE.Mesh(new THREE.BoxGeometry(50, 5, 5),
                                 new THREE.MeshBasicMaterial({ color: 0x000fff }));
      this.scene.add(this.cube);

      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(50, 50, 50);
      this.scene.add(light);

      this.camera2 = new THREE.PerspectiveCamera( 45, 16 / 9, 50, 150 );
      this.camera2.position.z = 100;
      console.log(this.camera2);

      // Create a multi render target with Float buffers
      /*this.target = new THREE.WebGLRenderTarget( window.innerWidth, window.innerHeight );
      this.target.texture.format = THREE.RGBFormat;
      this.target.texture.minFilter = THREE.NearestFilter;
      this.target.texture.magFilter = THREE.NearestFilter;
      this.target.texture.generateMipmaps = false;
      this.target.stencilBuffer = false;
      this.target.depthBuffer = true;
      this.target.depthTexture = new THREE.DepthTexture();
      this.target.depthTexture.type = THREE.UnsignedShortType;*/

      this.targetDepthTexture = new THREE.DepthTexture();

      //this.render(demo.renderer);
    }

    update(frame) {
      super.update(frame);

      this.cube.rotation.x = Math.sin(frame / 10);
      this.cube.rotation.y = Math.cos(frame / 10);
    }

    render(renderer) {
      renderer.overrideMaterial = null;
      this.renderTarget.depthTexture = this.targetDepthTexture;
      this.renderTarget.depthTexture.type = THREE.UnsignedShortType;
      renderer.render(this.scene, this.camera2, this.renderTarget, true);
      this.outputs.render.setValue(this.renderTarget.depthTexture);
    }
  }

  global.scanner = scanner;
})(this);
