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

      this.dots_per_level = 24;
      this.dots = 168;
    }

    resize() {
      this.canvas.width = 16 * GU;
      this.canvas.height = 9 * GU;
      this.ctx.globalCompositeOperation = 'xor';
    }

    update(frame) {
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
      
      for(var level = 0; level < this.dots / this.dots_per_level; level++) {
        var dots_on_level = Math.min(this.dots_per_level, this.dots - this.dots_per_level * level);
        for (var dot = 0; dot < dots_on_level; dot++) {
          var branches = Math.pow(2, level); 
          for(var branch = 0; branch < branches; branch++) {
            this.ctx.beginPath();
            this.ctx.ellipse(
              8 * GU + (branch / branches ) * GU * 8,
              8.9 * GU - (level * this.dots_per_level + dot) * GU * 0.05 - level * GU * 0.06,
              0.02 * GU,
              0.02 * GU,
              0, 0, Math.PI * 2);
            this.ctx.fill();
          }
        }
      }
      this.output.needsUpdate = true;
      this.outputs.render.setValue(this.output);
    }
  }

  global.IntroNode = IntroNode;
})(this);