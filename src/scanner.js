(function(global) {
  class scanner extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput(),
          depth: new NIN.TextureOutput()
        }
      });

      this.depthRenderTarget = new THREE.WebGLRenderTarget(640, 360, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBFormat
      });

      this.cube = new THREE.Mesh(new THREE.BoxGeometry(50, 5, 5),
                                 new THREE.MeshBasicMaterial({ color: 0x000fff }));
      this.scene.add(this.cube);

      var light = new THREE.PointLight(0xffffff, 1, 100);
      light.position.set(50, 50, 50);
      this.scene.add(light);

      this.camera.position.z = 100;
    }

    update(frame) {
      super.update(frame);

      this.cube.rotation.x = Math.sin(frame / 10);
      this.cube.rotation.y = Math.cos(frame / 10);
    }

    render(renderer) {
      renderer.overrideMaterial = null;
      renderer.render(this.scene, this.camera, this.renderTarget, true);
      renderer.overrideMaterial = this.depthMaterial;
      renderer.render(this.scene, this.camera, this.depthRenderTarget, true);
      this.outputs.render.setValue(this.renderTarget.texture);
      /*this.outputs.depthUniforms.setValue(this.depthUniforms);
      this.depthUniforms.tDiffuse.value = this.renderTarget.texture;
      this.depthUniforms.tDepth.value = this.depthRenderTarget.texture;
      this.depthUniforms.size.value.set(16 * GU, 9 * GU);
      this.depthUniforms.cameraNear.value = this.camera.near;
      this.depthUniforms.cameraFar.value = this.camera.far;
      this.depthUniforms.onlyAO.value = false;
      this.depthUniforms.aoClamp.value = 0.5;
      ths.depthUniforms.lumInfluence.value = 0.5;*/
    }
  }

  global.scanner = scanner;
})(this);
