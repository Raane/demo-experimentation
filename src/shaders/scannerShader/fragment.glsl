varying vec2 vUv;
uniform sampler2D tDiffuse;
uniform sampler2D tDepth;
uniform float cameraNear;
uniform float cameraFar;

void main() {
  vec3 diffuse = texture2D(tDiffuse, vUv).rgb;
  float depth = texture2D(tDepth, vUv).x;
  gl_FragColor.rgb = vec3(depth);
  gl_FragColor.a = 1.0;
}