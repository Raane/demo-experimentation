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

      this.dots_per_level = 10;
      this.dots = 168;
    }

    resize() {
      this.canvas.width = 16 * GU;
      this.canvas.height = 9 * GU;
      this.ctx.globalCompositeOperation = 'xor';
    }

    update(frame) {
      this.frame = frame;
      this.dots = (frame) % 70;
    }

    renderShape(ctx, shape) {
      ctx.fill();
    }

    render(renderer) {
      this.ctx.globalCompositeOperation = 'xor';
      this.ctx.clearRect(0, 0, 16 * GU, 9 * GU);

      this.circleEndSize = smoothstep(0, 1, (this.frame - 827) / (996 - 827));

      const r = 140;
      const g = 150;
      const b = 90;
      this.ctx.fillStyle = `rgb(${r|0}, ${g|0}, ${b|0})`;
      
      /*for(var level = 0; level < this.dots / this.dots_per_level; level++) {
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
      }*/

      var draw_branch = function(x, y, dots_remaining, dots_per_level, angle, ctx) {
        if (dots_remaining > dots_per_level) 
        {
          draw_branch(x + Math.sin(angle), y + Math.cos(angle), dots_remaining - dots_per_level, dots_per_level, angle - 0.35, ctx);
          draw_branch(x + Math.sin(angle), y + Math.cos(angle), dots_remaining - dots_per_level, dots_per_level, angle + 0.35, ctx);
        }
        for (var dot = 0; dot < Math.min(dots_remaining, dots_per_level); dot++) {
          var progression = Math.min(10, dots_remaining - dot);
          var nr = 255 - progression * r / 10;
          var ng = 255 - progression * g / 10;
          var nb = 255 - progression * b / 10;
          ctx.fillStyle = `rgb(${nr|0}, ${ng|0}, ${nb|0})`;
          ctx.beginPath();
          ctx.ellipse(
            GU * (8 + x + dot / dots_per_level * Math.sin(angle)),
            GU * (8.9 - y - dot / dots_per_level * Math.cos(angle)),
            0.02 * GU,
            0.02 * GU,
            0, 0, Math.PI * 2);
          //ctx.closePath();
          ctx.fill();
        }
        return;
      }

      draw_branch(0, 0, this.dots, this.dots_per_level, 0, this.ctx);

      this.output.needsUpdate = true;
      this.outputs.render.setValue(this.output);
    }
  }

  global.IntroNode = IntroNode;
})(this);