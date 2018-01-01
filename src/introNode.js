(function(global) {
  class IntroNode extends NIN.Node {
    constructor(id, options) {
      super(id, {
        outputs: {
          render: new NIN.TextureOutput()
        }
      });

      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      this.output = new THREE.VideoTexture(this.canvas);
      this.output.minFilter = THREE.LinearFilter;
      this.output.magFilter = THREE.LinearFilter;
    }

    resize() {
      this.canvas.width = 16 * GU;
      this.canvas.height = 9 * GU;
      this.ctx.globalCompositeOperation = 'xor';
    }

    update(frame) {
      const bar = 12 * 4;

      this.frame = frame;
    }

    renderShape(ctx, shape) {
      ctx.fill();
    }

    render(renderer) {
      this.ctx.globalCompositeOperation = 'xor';
      this.ctx.clearRect(0, 0, 16 * GU, 9 * GU);
      this.circleEndSize = smoothstep(0, 1, (this.frame - 827) / (996 - 827));

      const r = 255;
      const g = 0;
      const b = 162;
      this.ctx.fillStyle = `rgb(${r|0}, ${g|0}, ${b|0})`;
      this.ctx.beginPath();
      this.ctx.ellipse(
        8 * GU,
        4.5 * GU,
        0.5 * GU  * (1 + this.circleEndSize * 200),
        0.5 * GU * (1 + this.circleEndSize * 200),
        0, 0, Math.PI * 2);
      this.ctx.fill();
      this.output.needsUpdate = true;
      this.outputs.render.setValue(this.output);
    }
  }

  global.IntroNode = IntroNode;
})(this);