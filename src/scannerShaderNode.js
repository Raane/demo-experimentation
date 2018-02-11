(function(global) {
  class scannerShaderNode extends NIN.ShaderNode {
    constructor(id, options) {
      options.inputs = {
         texture: new NIN.TextureInput(),
      }
      super(id, options);
    }

    update(frame) {
      this.uniforms.frame.value = frame;
      this.uniforms.tDiffuse.value = this.inputs.texture.getValue();
    }
  }

  global.scannerShaderNode = scannerShaderNode;
})(this);
