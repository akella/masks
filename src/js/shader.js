
precision mediump float;
varying vec2 vTextureCoord;

uniform float time;
uniform sampler2D uSampler;
uniform sampler2D currentimage;
uniform sampler2D oldimage;



void main(void) {
	vec2 uv = vTextureCoord;
	float mytime = time;
	vec3 mask = vec3(0.0);
	vec3 mask1 = vec3(0.0);
	vec3 mask2 = vec3(0.0);
	vec3 layer1,layer2,layer3;

	mask += step(0.2,(0.2*uv.x+uv.y)*0.8);
	mask1 += step(0.2,(0.2*uv.x+uv.y)*0.4);
	mask2 = (1. - (1.0 - mask1)*mask);


	vec4 currentimageT = texture2D(currentimage, vec2(uv.x - 1.0 + mytime*mytime*mytime,uv.y*1.5));
	vec4 oldimageT = texture2D(oldimage, vec2(uv.x + mytime*mytime*mytime,uv.y*1.5));

	layer1 = currentimageT.rgb + oldimageT.rgb;


	vec4 currentimageT1 = texture2D(currentimage, vec2(uv.x - 1.0 + mytime,uv.y*1.5));
	vec4 oldimageT1 = texture2D(oldimage, vec2(uv.x + mytime,uv.y*1.5));

	layer2 = currentimageT1.rgb + oldimageT1.rgb;


	vec4 currentimageT2 = texture2D(currentimage, vec2(uv.x - 1.0 + mytime*mytime,uv.y*1.5));
	vec4 oldimageT2 = texture2D(oldimage, vec2(uv.x + mytime*mytime,uv.y*1.5));

	layer3 = currentimageT2.rgb + oldimageT2.rgb;

	vec3 all =  (1.-mask)*layer2 + mask1*layer1 + (1.0 - mask2)*layer3;
	gl_FragColor = vec4(all,0.0);
}

