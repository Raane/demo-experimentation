uniform float frame;
uniform sampler2D tDiffuse;
uniform sampler2D z1;
uniform sampler2D z2;
uniform sampler2D z3;
uniform sampler2D z4;
uniform sampler2D z5;
uniform sampler2D z6;

#define number_of_zs 6

varying vec2 vUv;

void main() {
    //gl_FragColor = vec4(vUv, 0.5 + 0.5 * sin(frame / 60.0), 1.0);
    vec4 color = texture2D(tDiffuse, vUv);
    float intensity = color.r * 0.2126 + color.g * 0.7152 + color.b * 0.0722;

    if (intensity < 1./6.)
    {
      gl_FragColor = texture2D(z1, vUv);
    }
    else if (intensity < 2./6.)
    {
      gl_FragColor = texture2D(z2, vUv);
    }
    else if (intensity < 3./6.)
    {
      gl_FragColor = texture2D(z3, vUv);
    }
    else if (intensity < 4./6.)
    {
      gl_FragColor = texture2D(z4, vUv);
    }
    else if (intensity < 5./6.)
    {
      gl_FragColor = texture2D(z5, vUv);
    }
    else
    {
      gl_FragColor = texture2D(z6, vUv);
    }
    //gl_FragColor = texture2D(tDiffuse , vUv);
}
