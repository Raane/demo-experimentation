/*uniform float frame;
uniform sampler2D tDiffuse;

varying vec2 vUv;

void main() {
    gl_FragColor = texture2D(tDiffuse, vUv);
}*/

#include <packing>
varying vec2 vUv;
uniform sampler2D tDiffuse;
//uniform sampler2D tDiffuse;
//uniform sampler2D tDepth;
//uniform float cameraNear;
//uniform float cameraFar;

float readDepth (sampler2D depthSampler, vec2 coord) {
  float fragCoordZ = texture2D(depthSampler, coord).x;
  float viewZ = ( 50. * 150. ) / ( ( 150. - 50. ) * fragCoordZ - 150. );
  return viewZ * ( 50. - 150. ) - 50.;
}
void main() {
  vec3 diffuse = texture2D(tDiffuse, vUv).rgb;
  float depth = readDepth(tDiffuse, vUv);
  gl_FragColor.rgb = vec3(texture2D(tDiffuse, vUv).x);
  gl_FragColor.a = 1.0;
}