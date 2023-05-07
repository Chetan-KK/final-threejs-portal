void main(){
    float pointToCenter = distance(gl_PointCoord,vec2(.5));

    float strength = (.05/pointToCenter)-.1;
    
    gl_FragColor = vec4(1.0,1.0,1.0,strength);
}