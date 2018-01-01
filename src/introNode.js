(function(global) {
  class IntroNode extends NIN.Node {
    constructor(id, options) {
      super(id, {
        inputs: {
          percolator: new NIN.Input()
        },
        outputs: {
          render: new NIN.TextureOutput()
        }
      });
      this.noteCount = 0;

      this.canvas = document.createElement('canvas');
      this.ctx = this.canvas.getContext('2d');
      this.resize();
      this.output = new THREE.VideoTexture(this.canvas);
      this.output.minFilter = THREE.LinearFilter;
      this.output.magFilter = THREE.LinearFilter;
      this.circleThrob = 0;
      this.hihatThrob = 0;
      this.squares = [];
    }

    fire(cardinality) {
      let sizeModifier = 1;
      if(cardinality == 3) {
        sizeModifier = 2.6;
      }
      this.squares.unshift({
        size: 0.5 * sizeModifier,
        rotation: this.noteCount * Math.PI / 8 * sizeModifier,
        cardinality
      });
    }

    resize() {
      this.canvas.width = 16 * GU;
      this.canvas.height = 9 * GU;
      this.ctx.globalCompositeOperation = 'xor';
    }

    update(frame) {
      const bar = 12 * 4;

      this.circleThrob *= 0.93;
      if(this.circleThrob < 0.15) {
        this.circleThrob = 0.15;
      }
      if(frame <= FRAME_FOR_BEAN(bar)) {
        this.circleThrob = 0;
      }

      this.rotation = -frame / 30;
      this.frame = frame;
    }

    renderShape(ctx, shape) {
      ctx.fill();
    }

    render(renderer) {
      this.ctx.globalCompositeOperation = 'xor';
      this.ctx.clearRect(0, 0, 16 * GU, 9 * GU);
      this.circleEndSize = smoothstep(0, 1, (this.frame - 927) / (996 - 927));

      const r = smoothstep(255, 27, this.circleEndSize * 2);
      const g = smoothstep(0, 9, this.circleEndSize * 2);
      const b = smoothstep(162, 34, this.circleEndSize * 2);
      this.ctx.fillStyle = `rgb(${r|0}, ${g|0}, ${b|0})`;
      this.ctx.beginPath();
      this.ctx.ellipse(
        8 * GU,
        4.5 * GU,
        0.5 * GU * this.circleThrob * (1 + this.circleEndSize * 200),
        0.5 * GU * this.circleThrob * (1 + this.circleEndSize * 200),
        0, 0, Math.PI * 2);
      this.ctx.fill();
      this.output.needsUpdate = true;
      this.outputs.render.setValue(this.output);
    }
  }

  global.IntroNode = IntroNode;
})(this);