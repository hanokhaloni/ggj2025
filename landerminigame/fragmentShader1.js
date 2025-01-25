
const fragmentShader1 = `
precision highp float;   /// iOS needs high?

uniform float time;
uniform vec2 resolution;

varying vec2 fragCoord;

// "[SH17A] Fireworks" by Martijn Steinrucken aka BigWings/Countfrolic - 2017
// License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.
// Based on https://www.shadertoy.com/view/lscGRl

#define N(h) fract(sin(vec4(6,9,1,0)*h) * 9e2)

void main(void)
{
  vec4 o;
  vec2 u = fragCoord.xy/resolution.y;

// proper pixelate
float s = 500.;
    u = floor(u * s) / s;

  float e, d, i=0.;
  vec4 p;

  for(float i=1.; i<30.; i++) {
    d = floor(e = i*9.1+time);
    p = N(d)+.1;
    e -= d;
    for(float d=0.; d<5.;d++)
      o += p*(2.9-e)/1e3/length(u-(p-e*(N(d*i)-.5)).xy);
  }

  gl_FragColor = vec4(o.rgb, 1.0);
}
`;

export default fragmentShader1;