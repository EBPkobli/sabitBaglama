varying highp vec2 coord;
uniform sampler2D src;

uniform lowp float r;
uniform lowp float g;
uniform lowp float b;
uniform lowp float enableCont;

void main() {
    lowp vec4 clr = texture2D(src, coord);
    if(enableCont == 0.0)
    {
       gl_FragColor = vec4(0.1 * clr.r,0.1 * clr.g,0.1 * clr.b,clr.a);
    }else{
    gl_FragColor = vec4(r * clr.r, g * clr.g, b * clr.b, clr.a);
    }
}
