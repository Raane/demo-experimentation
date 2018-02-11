(function(global) {
  class scanner extends NIN.THREENode {
    constructor(id, options) {
      super(id, {
        camera: options.camera,
        outputs: {
          render: new NIN.TextureOutput(),
          depth: new NIN.TextureOutput(),
        }
      });

      this.cube = new THREE.Mesh(new THREE.BoxGeometry(50, 5, 5),
                                 new THREE.MeshPhongMaterial({ color: 0x000fff }));
      this.scene.add(this.cube);

      this.cube2 = new THREE.Mesh(new THREE.BoxGeometry(221, 124, 0.0001),
                                 new THREE.MeshPhongMaterial({ color: 0x666666 })); // A background of max size ish. Useful to know how large that would be :)
      this.scene.add(this.cube2);

      for (var i = 0; i < 30; i++)
      {
        for (var j = 0; j < 30; j++)
        {
          var cube = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3),
                                     new THREE.MeshPhongMaterial({ color: 0x000fff }));
          cube.position.x = - 60 + i * 4;
          cube.position.z = - 60 + j * 4;
          cube.position.y = Math.random() * 3 - 20;
          this.scene.add(cube);
        }
      }

      this.cube2.position.z = -49; // just within the cameras view

      var light = new THREE.PointLight(0xffffff, 1, 200);
      light.position.set(50, 50, 50);
      this.scene.add(light);

      this.camera2 = new THREE.PerspectiveCamera( 45, 16 / 9, 50, 150 );
      this.camera2.position.z = 100;

      this.targetDepthTexture = new THREE.DepthTexture();
      this.renderTarget.depthTexture = this.targetDepthTexture;
      this.renderTarget.depthTexture.type = THREE.UnsignedShortType;
    }

    update(frame) {
      super.update(frame);

      this.cube.rotation.x = Math.sin(frame / 10);
      this.cube.rotation.y = Math.cos(frame / 10);
    }

    render(renderer) {
      renderer.render(this.scene, this.camera2, this.renderTarget, true);
      this.outputs.render.setValue(this.renderTarget.texture);
      this.outputs.depth.setValue(this.renderTarget.depthTexture);
    }
  }

  global.scanner = scanner;
})(this);
