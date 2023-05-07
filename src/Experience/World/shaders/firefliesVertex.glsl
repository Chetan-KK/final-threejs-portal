uniform float uPixelRatio;
uniform float uSize;
uniform float uTime;

attribute float aScale;

void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    modelPosition.y += sin((modelPosition.x*100.0)+ uTime)*.2*aScale;

    vec4 viewPosition = viewMatrix * modelPosition;
    
    gl_Position = projectionMatrix * viewPosition;

    gl_PointSize = uSize  * aScale* uPixelRatio;

    gl_PointSize *= ( 1.0 / - viewPosition.z );
}