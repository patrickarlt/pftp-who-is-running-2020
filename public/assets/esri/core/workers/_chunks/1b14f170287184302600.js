self.webpackChunkRemoteClient([22],{115:function(t,e,r){"use strict";r.d(e,"a",(function(){return d})),r.d(e,"b",(function(){return h})),r.d(e,"c",(function(){return c})),r.d(e,"d",(function(){return M})),r.d(e,"e",(function(){return m})),r.d(e,"f",(function(){return T})),r.d(e,"g",(function(){return o})),r.d(e,"h",(function(){return f})),r.d(e,"i",(function(){return p})),r.d(e,"j",(function(){return E})),r.d(e,"k",(function(){return F})),r.d(e,"l",(function(){return y})),r.d(e,"m",(function(){return u})),r.d(e,"n",(function(){return g})),r.d(e,"o",(function(){return b})),r.d(e,"p",(function(){return l})),r.d(e,"q",(function(){return O})),r.d(e,"r",(function(){return i})),r.d(e,"s",(function(){return B})),r.d(e,"t",(function(){return _}));var n=r(90),s=r(164);function u(t){const e=t[0],r=t[1],n=t[2];return Math.sqrt(e*e+r*r+n*n)}function f(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t}function i(t,e,r,n){return t[0]=e,t[1]=r,t[2]=n,t}function c(t,e,r){return t[0]=e[0]+r[0],t[1]=e[1]+r[1],t[2]=e[2]+r[2],t}function o(t,e,r){return t[0]=e[0]-r[0],t[1]=e[1]-r[1],t[2]=e[2]-r[2],t}function a(t,e,r){return t[0]=e[0]*r[0],t[1]=e[1]*r[1],t[2]=e[2]*r[2],t}function d(t,e,r){return t[0]=e[0]/r[0],t[1]=e[1]/r[1],t[2]=e[2]/r[2],t}function h(t,e,r){return t[0]=e[0]*r,t[1]=e[1]*r,t[2]=e[2]*r,t}function y(t,e){const r=e[0]-t[0],n=e[1]-t[1],s=e[2]-t[2];return Math.sqrt(r*r+n*n+s*s)}function p(t,e){const r=e[0]-t[0],n=e[1]-t[1],s=e[2]-t[2];return r*r+n*n+s*s}function l(t){const e=t[0],r=t[1],n=t[2];return e*e+r*r+n*n}function b(t,e){const r=e[0],n=e[1],s=e[2];let u=r*r+n*n+s*s;return u>0&&(u=1/Math.sqrt(u),t[0]=e[0]*u,t[1]=e[1]*u,t[2]=e[2]*u),t}function m(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function M(t,e,r){const n=e[0],s=e[1],u=e[2],f=r[0],i=r[1],c=r[2];return t[0]=s*c-u*i,t[1]=u*f-n*c,t[2]=n*i-s*f,t}function T(t,e,r,n){const s=e[0],u=e[1],f=e[2];return t[0]=s+n*(r[0]-s),t[1]=u+n*(r[1]-u),t[2]=f+n*(r[2]-f),t}function E(t,e,r){const n=e[0],s=e[1],u=e[2];return t[0]=r[0]*n+r[4]*s+r[8]*u+r[12],t[1]=r[1]*n+r[5]*s+r[9]*u+r[13],t[2]=r[2]*n+r[6]*s+r[10]*u+r[14],t}function B(t,e,r){const n=e[0],s=e[1],u=e[2];return t[0]=n*r[0]+s*r[3]+u*r[6],t[1]=n*r[1]+s*r[4]+u*r[7],t[2]=n*r[2]+s*r[5]+u*r[8],t}function O(t,e,r){const n=r[0],s=r[1],u=r[2],f=r[3],i=e[0],c=e[1],o=e[2];let a=s*o-u*c,d=u*i-n*o,h=n*c-s*i,y=s*h-u*d,p=u*a-n*h,l=n*d-s*a;const b=2*f;return a*=b,d*=b,h*=b,y*=2,p*=2,l*=2,t[0]=i+a+y,t[1]=c+d+p,t[2]=o+h+l,t}const A=Object(n.e)(),S=Object(n.e)();function g(t,e){const r=t[0],n=t[1],u=t[2],f=e[0],i=e[1],c=e[2];return Math.abs(r-f)<=s.a*Math.max(1,Math.abs(r),Math.abs(f))&&Math.abs(n-i)<=s.a*Math.max(1,Math.abs(n),Math.abs(i))&&Math.abs(u-c)<=s.a*Math.max(1,Math.abs(u),Math.abs(c))}let L=o,w=a,x=d,_=y,v=p,F=u,q=l;Object.freeze({__proto__:null,length:u,copy:f,set:i,add:c,subtract:o,multiply:a,divide:d,ceil:function(t,e){return t[0]=Math.ceil(e[0]),t[1]=Math.ceil(e[1]),t[2]=Math.ceil(e[2]),t},floor:function(t,e){return t[0]=Math.floor(e[0]),t[1]=Math.floor(e[1]),t[2]=Math.floor(e[2]),t},min:function(t,e,r){return t[0]=Math.min(e[0],r[0]),t[1]=Math.min(e[1],r[1]),t[2]=Math.min(e[2],r[2]),t},max:function(t,e,r){return t[0]=Math.max(e[0],r[0]),t[1]=Math.max(e[1],r[1]),t[2]=Math.max(e[2],r[2]),t},round:function(t,e){return t[0]=Math.round(e[0]),t[1]=Math.round(e[1]),t[2]=Math.round(e[2]),t},scale:h,scaleAndAdd:function(t,e,r,n){return t[0]=e[0]+r[0]*n,t[1]=e[1]+r[1]*n,t[2]=e[2]+r[2]*n,t},distance:y,squaredDistance:p,squaredLength:l,negate:function(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t},inverse:function(t,e){return t[0]=1/e[0],t[1]=1/e[1],t[2]=1/e[2],t},normalize:b,dot:m,cross:M,lerp:T,hermite:function(t,e,r,n,s,u){const f=u*u,i=f*(2*u-3)+1,c=f*(u-2)+u,o=f*(u-1),a=f*(3-2*u);return t[0]=e[0]*i+r[0]*c+n[0]*o+s[0]*a,t[1]=e[1]*i+r[1]*c+n[1]*o+s[1]*a,t[2]=e[2]*i+r[2]*c+n[2]*o+s[2]*a,t},bezier:function(t,e,r,n,s,u){const f=1-u,i=f*f,c=u*u,o=i*f,a=3*u*i,d=3*c*f,h=c*u;return t[0]=e[0]*o+r[0]*a+n[0]*d+s[0]*h,t[1]=e[1]*o+r[1]*a+n[1]*d+s[1]*h,t[2]=e[2]*o+r[2]*a+n[2]*d+s[2]*h,t},random:function(t,e){e=e||1;const r=2*Object(s.b)()*Math.PI,n=2*Object(s.b)()-1,u=Math.sqrt(1-n*n)*e;return t[0]=Math.cos(r)*u,t[1]=Math.sin(r)*u,t[2]=n*e,t},transformMat4:E,transformMat3:B,transformQuat:O,rotateX:function(t,e,r,n){const s=[],u=[];return s[0]=e[0]-r[0],s[1]=e[1]-r[1],s[2]=e[2]-r[2],u[0]=s[0],u[1]=s[1]*Math.cos(n)-s[2]*Math.sin(n),u[2]=s[1]*Math.sin(n)+s[2]*Math.cos(n),t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t},rotateY:function(t,e,r,n){const s=[],u=[];return s[0]=e[0]-r[0],s[1]=e[1]-r[1],s[2]=e[2]-r[2],u[0]=s[2]*Math.sin(n)+s[0]*Math.cos(n),u[1]=s[1],u[2]=s[2]*Math.cos(n)-s[0]*Math.sin(n),t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t},rotateZ:function(t,e,r,n){const s=[],u=[];return s[0]=e[0]-r[0],s[1]=e[1]-r[1],s[2]=e[2]-r[2],u[0]=s[0]*Math.cos(n)-s[1]*Math.sin(n),u[1]=s[0]*Math.sin(n)+s[1]*Math.cos(n),u[2]=s[2],t[0]=u[0]+r[0],t[1]=u[1]+r[1],t[2]=u[2]+r[2],t},angle:function(t,e){f(A,t),f(S,e),b(A,A),b(S,S);const r=m(A,S);return r>1?0:r<-1?Math.PI:Math.acos(r)},str:function(t){return"vec3("+t[0]+", "+t[1]+", "+t[2]+")"},exactEquals:function(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]},equals:g,sub:L,mul:w,div:x,dist:_,sqrDist:v,len:F,sqrLen:q})},164:function(t,e,r){"use strict";r.d(e,"a",(function(){return n})),r.d(e,"b",(function(){return s})),r.d(e,"c",(function(){return c})),r.d(e,"d",(function(){return i}));const n=1e-6,s=Math.random,u=Math.PI/180,f=180/Math.PI;function i(t){return t*u}function c(t){return t*f}Object.freeze({__proto__:null,EPSILON:1e-6,RANDOM:s,toRadian:i,toDegree:c,equals:function(t,e){return Math.abs(t-e)<=1e-6*Math.max(1,Math.abs(t),Math.abs(e))}})},244:function(t,e,r){"use strict";r.d(e,"a",(function(){return a})),r.d(e,"b",(function(){return B})),r.d(e,"c",(function(){return s})),r.d(e,"d",(function(){return i})),r.d(e,"e",(function(){return b})),r.d(e,"f",(function(){return M})),r.d(e,"g",(function(){return m})),r.d(e,"h",(function(){return f})),r.d(e,"i",(function(){return d})),r.d(e,"j",(function(){return y})),r.d(e,"k",(function(){return l})),r.d(e,"l",(function(){return u})),r.d(e,"m",(function(){return T}));var n=r(164);function s(t,e){return t[0]=e[0],t[1]=e[1],t}function u(t,e,r){return t[0]=e,t[1]=r,t}function f(t,e,r){return t[0]=e[0]+r[0],t[1]=e[1]+r[1],t}function i(t,e,r){return t[0]=e[0]-r[0],t[1]=e[1]-r[1],t}function c(t,e,r){return t[0]=e[0]*r[0],t[1]=e[1]*r[1],t}function o(t,e,r){return t[0]=e[0]/r[0],t[1]=e[1]/r[1],t}function a(t,e,r){return t[0]=e[0]*r,t[1]=e[1]*r,t}function d(t,e){const r=e[0]-t[0],n=e[1]-t[1];return Math.sqrt(r*r+n*n)}function h(t,e){const r=e[0]-t[0],n=e[1]-t[1];return r*r+n*n}function y(t){const e=t[0],r=t[1];return Math.sqrt(e*e+r*r)}function p(t){const e=t[0],r=t[1];return e*e+r*r}function l(t,e){return t[0]=-e[0],t[1]=-e[1],t}function b(t,e){const r=e[0],n=e[1];let s=r*r+n*n;return s>0&&(s=1/Math.sqrt(s),t[0]=e[0]*s,t[1]=e[1]*s),t}function m(t,e){return t[0]*e[0]+t[1]*e[1]}function M(t,e,r){const n=e[0]*r[1]-e[1]*r[0];return t[0]=t[1]=0,t[2]=n,t}function T(t,e,r){const n=e[0],s=e[1];return t[0]=r[0]*n+r[2]*s+r[4],t[1]=r[1]*n+r[3]*s+r[5],t}const E=y,B=i,O=c,A=o,S=d,g=h,L=p;Object.freeze({__proto__:null,copy:s,set:u,add:f,subtract:i,multiply:c,divide:o,ceil:function(t,e){return t[0]=Math.ceil(e[0]),t[1]=Math.ceil(e[1]),t},floor:function(t,e){return t[0]=Math.floor(e[0]),t[1]=Math.floor(e[1]),t},min:function(t,e,r){return t[0]=Math.min(e[0],r[0]),t[1]=Math.min(e[1],r[1]),t},max:function(t,e,r){return t[0]=Math.max(e[0],r[0]),t[1]=Math.max(e[1],r[1]),t},round:function(t,e){return t[0]=Math.round(e[0]),t[1]=Math.round(e[1]),t},scale:a,scaleAndAdd:function(t,e,r,n){return t[0]=e[0]+r[0]*n,t[1]=e[1]+r[1]*n,t},distance:d,squaredDistance:h,length:y,squaredLength:p,negate:l,inverse:function(t,e){return t[0]=1/e[0],t[1]=1/e[1],t},normalize:b,dot:m,cross:M,lerp:function(t,e,r,n){const s=e[0],u=e[1];return t[0]=s+n*(r[0]-s),t[1]=u+n*(r[1]-u),t},random:function(t,e){e=e||1;const r=2*Object(n.b)()*Math.PI;return t[0]=Math.cos(r)*e,t[1]=Math.sin(r)*e,t},transformMat2:function(t,e,r){const n=e[0],s=e[1];return t[0]=r[0]*n+r[2]*s,t[1]=r[1]*n+r[3]*s,t},transformMat2d:T,transformMat3:function(t,e,r){const n=e[0],s=e[1];return t[0]=r[0]*n+r[3]*s+r[6],t[1]=r[1]*n+r[4]*s+r[7],t},transformMat4:function(t,e,r){const n=e[0],s=e[1];return t[0]=r[0]*n+r[4]*s+r[12],t[1]=r[1]*n+r[5]*s+r[13],t},rotate:function(t,e,r,n){const s=e[0]-r[0],u=e[1]-r[1],f=Math.sin(n),i=Math.cos(n);return t[0]=s*i-u*f+r[0],t[1]=s*f+u*i+r[1],t},angle:function(t,e){const r=t[0],n=t[1],s=e[0],u=e[1];let f=r*r+n*n;f>0&&(f=1/Math.sqrt(f));let i=s*s+u*u;i>0&&(i=1/Math.sqrt(i));const c=(r*s+n*u)*f*i;return c>1?0:c<-1?Math.PI:Math.acos(c)},str:function(t){return"vec2("+t[0]+", "+t[1]+")"},exactEquals:function(t,e){return t[0]===e[0]&&t[1]===e[1]},equals:function(t,e){const r=t[0],s=t[1],u=e[0],f=e[1];return Math.abs(r-u)<=n.a*Math.max(1,Math.abs(r),Math.abs(u))&&Math.abs(s-f)<=n.a*Math.max(1,Math.abs(s),Math.abs(f))},len:E,sub:B,mul:O,div:A,dist:S,sqrDist:g,sqrLen:L})},272:function(t,e,r){"use strict";r.d(e,"a",(function(){return f})),r.d(e,"b",(function(){return a})),r.d(e,"c",(function(){return s})),r.d(e,"d",(function(){return b})),r.d(e,"e",(function(){return y})),r.d(e,"f",(function(){return p})),r.d(e,"g",(function(){return T})),r.d(e,"h",(function(){return E})),r.d(e,"i",(function(){return m})),r.d(e,"j",(function(){return l})),r.d(e,"k",(function(){return u})),r.d(e,"l",(function(){return M}));var n=r(164);function s(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t}function u(t,e,r,n,s){return t[0]=e,t[1]=r,t[2]=n,t[3]=s,t}function f(t,e,r){return t[0]=e[0]+r[0],t[1]=e[1]+r[1],t[2]=e[2]+r[2],t[3]=e[3]+r[3],t}function i(t,e,r){return t[0]=e[0]-r[0],t[1]=e[1]-r[1],t[2]=e[2]-r[2],t[3]=e[3]-r[3],t}function c(t,e,r){return t[0]=e[0]*r[0],t[1]=e[1]*r[1],t[2]=e[2]*r[2],t[3]=e[3]*r[3],t}function o(t,e,r){return t[0]=e[0]/r[0],t[1]=e[1]/r[1],t[2]=e[2]/r[2],t[3]=e[3]/r[3],t}function a(t,e,r){return t[0]=e[0]*r,t[1]=e[1]*r,t[2]=e[2]*r,t[3]=e[3]*r,t}function d(t,e){const r=e[0]-t[0],n=e[1]-t[1],s=e[2]-t[2],u=e[3]-t[3];return Math.sqrt(r*r+n*n+s*s+u*u)}function h(t,e){const r=e[0]-t[0],n=e[1]-t[1],s=e[2]-t[2],u=e[3]-t[3];return r*r+n*n+s*s+u*u}function y(t){const e=t[0],r=t[1],n=t[2],s=t[3];return Math.sqrt(e*e+r*r+n*n+s*s)}function p(t){const e=t[0],r=t[1],n=t[2],s=t[3];return e*e+r*r+n*n+s*s}function l(t,e){const r=e[0],n=e[1],s=e[2],u=e[3];let f=r*r+n*n+s*s+u*u;return f>0&&(f=1/Math.sqrt(f),t[0]=r*f,t[1]=n*f,t[2]=s*f,t[3]=u*f),t}function b(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]+t[3]*e[3]}function m(t,e,r,n){const s=e[0],u=e[1],f=e[2],i=e[3];return t[0]=s+n*(r[0]-s),t[1]=u+n*(r[1]-u),t[2]=f+n*(r[2]-f),t[3]=i+n*(r[3]-i),t}function M(t,e,r){const n=e[0],s=e[1],u=e[2],f=e[3];return t[0]=r[0]*n+r[4]*s+r[8]*u+r[12]*f,t[1]=r[1]*n+r[5]*s+r[9]*u+r[13]*f,t[2]=r[2]*n+r[6]*s+r[10]*u+r[14]*f,t[3]=r[3]*n+r[7]*s+r[11]*u+r[15]*f,t}function T(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]&&t[3]===e[3]}function E(t,e){const r=t[0],s=t[1],u=t[2],f=t[3],i=e[0],c=e[1],o=e[2],a=e[3];return Math.abs(r-i)<=n.a*Math.max(1,Math.abs(r),Math.abs(i))&&Math.abs(s-c)<=n.a*Math.max(1,Math.abs(s),Math.abs(c))&&Math.abs(u-o)<=n.a*Math.max(1,Math.abs(u),Math.abs(o))&&Math.abs(f-a)<=n.a*Math.max(1,Math.abs(f),Math.abs(a))}let B=i,O=c,A=o,S=d,g=h,L=y,w=p;Object.freeze({__proto__:null,copy:s,set:u,add:f,subtract:i,multiply:c,divide:o,ceil:function(t,e){return t[0]=Math.ceil(e[0]),t[1]=Math.ceil(e[1]),t[2]=Math.ceil(e[2]),t[3]=Math.ceil(e[3]),t},floor:function(t,e){return t[0]=Math.floor(e[0]),t[1]=Math.floor(e[1]),t[2]=Math.floor(e[2]),t[3]=Math.floor(e[3]),t},min:function(t,e,r){return t[0]=Math.min(e[0],r[0]),t[1]=Math.min(e[1],r[1]),t[2]=Math.min(e[2],r[2]),t[3]=Math.min(e[3],r[3]),t},max:function(t,e,r){return t[0]=Math.max(e[0],r[0]),t[1]=Math.max(e[1],r[1]),t[2]=Math.max(e[2],r[2]),t[3]=Math.max(e[3],r[3]),t},round:function(t,e){return t[0]=Math.round(e[0]),t[1]=Math.round(e[1]),t[2]=Math.round(e[2]),t[3]=Math.round(e[3]),t},scale:a,scaleAndAdd:function(t,e,r,n){return t[0]=e[0]+r[0]*n,t[1]=e[1]+r[1]*n,t[2]=e[2]+r[2]*n,t[3]=e[3]+r[3]*n,t},distance:d,squaredDistance:h,length:y,squaredLength:p,negate:function(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t[3]=-e[3],t},inverse:function(t,e){return t[0]=1/e[0],t[1]=1/e[1],t[2]=1/e[2],t[3]=1/e[3],t},normalize:l,dot:b,lerp:m,random:function(t,e){let r,s,u,f,i,c;e=e||1;do{r=2*Object(n.b)()-1,s=2*Object(n.b)()-1,i=r*r+s*s}while(i>=1);do{u=2*Object(n.b)()-1,f=2*Object(n.b)()-1,c=u*u+f*f}while(c>=1);const o=Math.sqrt((1-i)/c);return t[0]=e*r,t[1]=e*s,t[2]=e*u*o,t[3]=e*f*o,t},transformMat4:M,transformQuat:function(t,e,r){const n=e[0],s=e[1],u=e[2],f=r[0],i=r[1],c=r[2],o=r[3],a=o*n+i*u-c*s,d=o*s+c*n-f*u,h=o*u+f*s-i*n,y=-f*n-i*s-c*u;return t[0]=a*o+y*-f+d*-c-h*-i,t[1]=d*o+y*-i+h*-f-a*-c,t[2]=h*o+y*-c+a*-i-d*-f,t[3]=e[3],t},str:function(t){return"vec4("+t[0]+", "+t[1]+", "+t[2]+", "+t[3]+")"},exactEquals:T,equals:E,sub:B,mul:O,div:A,dist:S,sqrDist:g,len:L,sqrLen:w})},295:function(t,e,r){"use strict";r.d(e,"a",(function(){return i})),r.d(e,"b",(function(){return d})),r.d(e,"c",(function(){return c})),r.d(e,"d",(function(){return f}));var n=r(93),s=r(90),u=r(115);function f(t){const e=t[0]*t[0]+t[4]*t[4]+t[8]*t[8],r=t[1]*t[1]+t[5]*t[5]+t[9]*t[9],n=t[2]*t[2]+t[6]*t[6]+t[10]*t[10];return Math.sqrt(Math.max(Math.max(e,r),n))}function i(t,e){const r=Object(u.m)(t),s=Object(n.b)(t[2]/r),f=Math.atan2(t[1]/r,t[0]/r);return Object(u.r)(e,r,s,f),e}function c(t,e,r){const n=r[0]-e[0],s=r[1]-e[1],u=r[2]-e[2];let f=n*n+s*s+u*u;return f?(f=1/Math.sqrt(f),t[0]=n*f,t[1]=s*f,t[2]=u*f,t):(t[0]=0,t[1]=0,t[2]=0,t)}class o{constructor(t,e){this.min=t,this.max=e,this.range=e-t}ndiff(t,e=0){return Math.ceil((t-e)/this.range)*this.range+e}_normalize(t,e,r,n=0,s=!1){return(r-=n)<t?r+=this.ndiff(t-r):r>e&&(r-=this.ndiff(r-e)),s&&r===e&&(r=t),r+n}normalize(t,e=0,r=!1){return this._normalize(this.min,this.max,t,e,r)}clamp(t,e=0){return Object(n.c)(t-e,this.min,this.max)+e}monotonic(t,e,r){return t<e?e:e+this.ndiff(t-e,r)}minimalMonotonic(t,e,r){return this._normalize(t,t+this.range,e,r)}center(t,e,r){return e=this.monotonic(t,e,r),this.normalize((t+e)/2,r)}diff(t,e,r){return this.monotonic(t,e,r)-t}shortestSignedDiff(t,e){t=this.normalize(t);const r=(e=this.normalize(e))-t,n=e<t?this.minimalMonotonic(t,e)-t:e-this.minimalMonotonic(e,t);return Math.abs(r)<Math.abs(n)?r:n}contains(t,e,r){return e=this.minimalMonotonic(t,e),(r=this.minimalMonotonic(t,r))>t&&r<e}}Object(s.e)(),Object(s.e)();function a(t){for(const e in t){const r=t[e];r instanceof Function&&(t[e]=r.bind(t))}return t}a(new o(0,2*Math.PI)),a(new o(-Math.PI,Math.PI));const d=a(new o(0,360));Object(s.e)(),Object(s.e)(),Object(s.e)()},379:function(t,e,r){"use strict";r.d(e,"a",(function(){return h})),r.d(e,"b",(function(){return E})),r.d(e,"c",(function(){return z})),r.d(e,"d",(function(){return k})),r.d(e,"e",(function(){return N})),r.d(e,"f",(function(){return b})),r.d(e,"g",(function(){return m})),r.d(e,"h",(function(){return M})),r.d(e,"i",(function(){return T})),r.d(e,"j",(function(){return x})),r.d(e,"k",(function(){return q})),r.d(e,"l",(function(){return S})),r.d(e,"m",(function(){return y})),r.d(e,"n",(function(){return B})),r.d(e,"o",(function(){return U})),r.d(e,"p",(function(){return H})),r.d(e,"q",(function(){return R})),r.d(e,"r",(function(){return _})),r.d(e,"s",(function(){return C})),r.d(e,"t",(function(){return g})),r.d(e,"u",(function(){return p})),r.d(e,"v",(function(){return O})),r.d(e,"w",(function(){return D})),r.d(e,"x",(function(){return J})),r.d(e,"y",(function(){return Y})),r.d(e,"z",(function(){return v})),r.d(e,"A",(function(){return j})),r.d(e,"B",(function(){return L})),r.d(e,"C",(function(){return l})),r.d(e,"D",(function(){return A})),r.d(e,"E",(function(){return V})),r.d(e,"F",(function(){return Q})),r.d(e,"G",(function(){return I})),r.d(e,"H",(function(){return F})),r.d(e,"I",(function(){return P})),r.d(e,"J",(function(){return w}));class n{constructor(t,e,r=0,n,s){this.TypedArrayConstructor=t,this.elementCount=9;const u=this.TypedArrayConstructor;void 0===n&&(n=9*u.BYTES_PER_ELEMENT);const f=0===e.byteLength?0:r;this.typedBuffer=null==s?new u(e,f):new u(e,f,(s-r)/u.BYTES_PER_ELEMENT),this.typedBufferStride=n/u.BYTES_PER_ELEMENT,this.count=Math.ceil(this.typedBuffer.length/this.typedBufferStride),this.stride=this.typedBufferStride*this.TypedArrayConstructor.BYTES_PER_ELEMENT}getMat(t,e){const r=t*this.typedBufferStride;for(let t=0;t<9;t++)e[t]=this.typedBuffer[r+t];return e}setMat(t,e){const r=t*this.typedBufferStride;for(let t=0;t<9;t++)this.typedBuffer[r+t]=e[t]}get(t,e){return this.typedBuffer[t*this.typedBufferStride+e]}set(t,e,r){this.typedBuffer[t*this.typedBufferStride+e]=r}copyFrom(t,e,r){const n=this.typedBuffer,s=e.typedBuffer,u=t*this.typedBufferStride,f=r*e.typedBufferStride;for(let t=0;t<9;++t)n[u+t]=s[f+t]}get buffer(){return this.typedBuffer.buffer}}n.ElementCount=9;class s{constructor(t,e,r=0,n,s){this.TypedArrayConstructor=t,this.elementCount=16;const u=this.TypedArrayConstructor;void 0===n&&(n=16*u.BYTES_PER_ELEMENT);const f=0===e.byteLength?0:r;this.typedBuffer=null==s?new u(e,f):new u(e,f,(s-r)/u.BYTES_PER_ELEMENT),this.typedBufferStride=n/u.BYTES_PER_ELEMENT,this.count=Math.ceil(this.typedBuffer.length/this.typedBufferStride),this.stride=this.typedBufferStride*this.TypedArrayConstructor.BYTES_PER_ELEMENT}getMat(t,e){const r=t*this.typedBufferStride;for(let t=0;t<16;t++)e[t]=this.typedBuffer[r+t];return e}setMat(t,e){const r=t*this.typedBufferStride;for(let t=0;t<16;t++)this.typedBuffer[r+t]=e[t]}get(t,e){return this.typedBuffer[t*this.typedBufferStride+e]}set(t,e,r){this.typedBuffer[t*this.typedBufferStride+e]=r}copyFrom(t,e,r){const n=this.typedBuffer,s=e.typedBuffer,u=t*this.typedBufferStride,f=r*e.typedBufferStride;for(let t=0;t<16;++t)n[u+t]=s[f+t]}get buffer(){return this.typedBuffer.buffer}}s.ElementCount=16;class u{constructor(t,e,r=0,n,s){this.TypedArrayConstructor=t,this.elementCount=1;const u=this.TypedArrayConstructor;void 0===n&&(n=u.BYTES_PER_ELEMENT);const f=0===e.byteLength?0:r;this.typedBuffer=null==s?new u(e,f):new u(e,f,(s-r)/u.BYTES_PER_ELEMENT),this.typedBufferStride=n/u.BYTES_PER_ELEMENT,this.count=Math.ceil(this.typedBuffer.length/this.typedBufferStride),this.stride=this.typedBufferStride*this.TypedArrayConstructor.BYTES_PER_ELEMENT}get(t){return this.typedBuffer[t*this.typedBufferStride]}set(t,e){this.typedBuffer[t*this.typedBufferStride]=e}get buffer(){return this.typedBuffer.buffer}}u.ElementCount=1;var f=r(244);class i{constructor(t,e,r=0,n,s){this.TypedArrayConstructor=t,this.elementCount=2;const u=this.TypedArrayConstructor;void 0===n&&(n=2*u.BYTES_PER_ELEMENT);const f=0===e.byteLength?0:r;this.typedBuffer=null==s?new u(e,f):new u(e,f,(s-r)/u.BYTES_PER_ELEMENT),this.typedBufferStride=n/u.BYTES_PER_ELEMENT,this.count=Math.ceil(this.typedBuffer.length/this.typedBufferStride),this.stride=this.typedBufferStride*this.TypedArrayConstructor.BYTES_PER_ELEMENT}getVec(t,e){return Object(f.l)(e,this.typedBuffer[t*this.typedBufferStride],this.typedBuffer[t*this.typedBufferStride+1])}setVec(t,e){this.typedBuffer[t*this.typedBufferStride]=e[0],this.typedBuffer[t*this.typedBufferStride+1]=e[1]}get(t,e){return this.typedBuffer[t*this.typedBufferStride+e]}set(t,e,r){this.typedBuffer[t*this.typedBufferStride+e]=r}setValues(t,e,r){this.typedBuffer[t*this.typedBufferStride]=e,this.typedBuffer[t*this.typedBufferStride+1]=r}copyFrom(t,e,r){const n=this.typedBuffer,s=e.typedBuffer,u=t*this.typedBufferStride,f=r*e.typedBufferStride;n[u]=s[f],n[u+1]=s[f+1]}get buffer(){return this.typedBuffer.buffer}}i.ElementCount=2;var c=r(115);class o{constructor(t,e,r=0,n,s){this.TypedArrayConstructor=t,this.elementCount=3;const u=this.TypedArrayConstructor;void 0===n&&(n=3*u.BYTES_PER_ELEMENT);const f=0===e.byteLength?0:r;this.typedBuffer=null==s?new u(e,f):new u(e,f,(s-r)/u.BYTES_PER_ELEMENT),this.typedBufferStride=n/u.BYTES_PER_ELEMENT,this.count=Math.ceil(this.typedBuffer.length/this.typedBufferStride),this.stride=this.typedBufferStride*this.TypedArrayConstructor.BYTES_PER_ELEMENT}getVec(t,e){return Object(c.r)(e,this.typedBuffer[t*this.typedBufferStride],this.typedBuffer[t*this.typedBufferStride+1],this.typedBuffer[t*this.typedBufferStride+2])}setVec(t,e){this.typedBuffer[t*this.typedBufferStride]=e[0],this.typedBuffer[t*this.typedBufferStride+1]=e[1],this.typedBuffer[t*this.typedBufferStride+2]=e[2]}get(t,e){return this.typedBuffer[t*this.typedBufferStride+e]}set(t,e,r){this.typedBuffer[t*this.typedBufferStride+e]=r}setValues(t,e,r,n){this.typedBuffer[t*this.typedBufferStride]=e,this.typedBuffer[t*this.typedBufferStride+1]=r,this.typedBuffer[t*this.typedBufferStride+2]=n}copyFrom(t,e,r){const n=this.typedBuffer,s=e.typedBuffer,u=t*this.typedBufferStride,f=r*e.typedBufferStride;n[u]=s[f],n[u+1]=s[f+1],n[u+2]=s[f+2]}get buffer(){return this.typedBuffer.buffer}}o.ElementCount=3;var a=r(272);class d{constructor(t,e,r=0,n,s){this.TypedArrayConstructor=t,this.elementCount=4;const u=this.TypedArrayConstructor;void 0===n&&(n=4*u.BYTES_PER_ELEMENT);const f=0===e.byteLength?0:r;this.typedBuffer=null==s?new u(e,f):new u(e,f,(s-r)/u.BYTES_PER_ELEMENT),this.typedBufferStride=n/u.BYTES_PER_ELEMENT,this.count=Math.ceil(this.typedBuffer.length/this.typedBufferStride),this.stride=this.typedBufferStride*this.TypedArrayConstructor.BYTES_PER_ELEMENT}getVec(t,e){return Object(a.k)(e,this.typedBuffer[t*this.typedBufferStride],this.typedBuffer[t*this.typedBufferStride+1],this.typedBuffer[t*this.typedBufferStride+2],this.typedBuffer[t*this.typedBufferStride+3])}setVec(t,e){this.typedBuffer[t*this.typedBufferStride]=e[0],this.typedBuffer[t*this.typedBufferStride+1]=e[1],this.typedBuffer[t*this.typedBufferStride+2]=e[2],this.typedBuffer[t*this.typedBufferStride+3]=e[3]}get(t,e){return this.typedBuffer[t*this.typedBufferStride+e]}set(t,e,r){this.typedBuffer[t*this.typedBufferStride+e]=r}setValues(t,e,r,n,s){this.typedBuffer[t*this.typedBufferStride]=e,this.typedBuffer[t*this.typedBufferStride+1]=r,this.typedBuffer[t*this.typedBufferStride+2]=n,this.typedBuffer[t*this.typedBufferStride+3]=s}copyFrom(t,e,r){const n=this.typedBuffer,s=e.typedBuffer,u=t*this.typedBufferStride,f=r*e.typedBufferStride;n[u]=s[f],n[u+1]=s[f+1],n[u+2]=s[f+2],n[u+3]=s[f+3]}get buffer(){return this.typedBuffer.buffer}}d.ElementCount=4;class h extends u{constructor(t,e=0,r,n){super(Float32Array,t,e,r,n),this.elementType="f32"}static fromTypedArray(t,e){return new h(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}h.ElementType="f32";class y extends i{constructor(t,e=0,r,n){super(Float32Array,t,e,r,n),this.elementType="f32"}static fromTypedArray(t,e){return new y(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}y.ElementType="f32";class p extends o{constructor(t,e=0,r,n){super(Float32Array,t,e,r,n),this.elementType="f32"}static fromTypedArray(t,e){return new p(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}p.ElementType="f32";class l extends d{constructor(t,e=0,r,n){super(Float32Array,t,e,r,n),this.elementType="f32"}static fromTypedArray(t,e){return new l(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}l.ElementType="f32";class b extends n{constructor(t,e=0,r,n){super(Float32Array,t,e,r,n),this.elementType="f32"}static fromTypedArray(t,e){return new b(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}b.ElementType="f32";class m extends n{constructor(t,e=0,r,n){super(Float64Array,t,e,r,n),this.elementType="f64"}static fromTypedArray(t,e){return new m(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}m.ElementType="f64";class M extends s{constructor(t,e=0,r,n){super(Float32Array,t,e,r,n),this.elementType="f32"}static fromTypedArray(t,e){return new M(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}M.ElementType="f32";class T extends s{constructor(t,e=0,r,n){super(Float64Array,t,e,r,n),this.elementType="f64"}static fromTypedArray(t,e){return new T(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}T.ElementType="f64";class E extends u{constructor(t,e=0,r,n){super(Float64Array,t,e,r,n),this.elementType="f64"}static fromTypedArray(t,e){return new E(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}E.ElementType="f64";class B extends i{constructor(t,e=0,r,n){super(Float64Array,t,e,r,n),this.elementType="f64"}static fromTypedArray(t,e){return new B(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}B.ElementType="f64";class O extends o{constructor(t,e=0,r,n){super(Float64Array,t,e,r,n),this.elementType="f64"}static fromTypedArray(t,e){return new O(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}O.ElementType="f64";class A extends d{constructor(t,e=0,r,n){super(Float64Array,t,e,r,n),this.elementType="f64"}static fromTypedArray(t,e){return new A(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}A.ElementType="f64";class S extends u{constructor(t,e=0,r,n){super(Uint8Array,t,e,r,n),this.elementType="u8"}static fromTypedArray(t,e){return new S(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}S.ElementType="u8";class g extends i{constructor(t,e=0,r,n){super(Uint8Array,t,e,r,n),this.elementType="u8"}static fromTypedArray(t,e){return new g(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}g.ElementType="u8";class L extends o{constructor(t,e=0,r,n){super(Uint8Array,t,e,r,n),this.elementType="u8"}static fromTypedArray(t,e){return new L(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}L.ElementType="u8";class w extends d{constructor(t,e=0,r,n){super(Uint8Array,t,e,r,n),this.elementType="u8"}static fromTypedArray(t,e){return new w(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}w.ElementType="u8";class x extends u{constructor(t,e=0,r,n){super(Uint16Array,t,e,r,n),this.elementType="u16"}static fromTypedArray(t,e){return new x(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}x.ElementType="u16";class _ extends i{constructor(t,e=0,r,n){super(Uint16Array,t,e,r,n),this.elementType="u16"}static fromTypedArray(t,e){return new _(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}_.ElementType="u16";class v extends o{constructor(t,e=0,r,n){super(Uint16Array,t,e,r,n),this.elementType="u16"}static fromTypedArray(t,e){return new v(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}v.ElementType="u16";class F extends d{constructor(t,e=0,r,n){super(Uint16Array,t,e,r,n),this.elementType="u16"}static fromTypedArray(t,e){return new F(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}F.ElementType="u16";class q extends u{constructor(t,e=0,r,n){super(Uint32Array,t,e,r,n),this.elementType="u32"}static fromTypedArray(t,e){return new q(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}q.ElementType="u32";class C extends i{constructor(t,e=0,r,n){super(Uint32Array,t,e,r,n),this.elementType="u32"}static fromTypedArray(t,e){return new C(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}C.ElementType="u32";class j extends o{constructor(t,e=0,r,n){super(Uint32Array,t,e,r,n),this.elementType="u32"}static fromTypedArray(t,e){return new j(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}j.ElementType="u32";class P extends d{constructor(t,e=0,r,n){super(Uint32Array,t,e,r,n),this.elementType="u32"}static fromTypedArray(t,e){return new P(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}P.ElementType="u32";class N extends u{constructor(t,e=0,r,n){super(Int8Array,t,e,r,n),this.elementType="i8"}static fromTypedArray(t,e){return new N(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}N.ElementType="i8";class R extends i{constructor(t,e=0,r,n){super(Int8Array,t,e,r,n),this.elementType="i8"}static fromTypedArray(t,e){return new R(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}R.ElementType="i8";class Y extends o{constructor(t,e=0,r,n){super(Int8Array,t,e,r,n),this.elementType="i8"}static fromTypedArray(t,e){return new Y(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}Y.ElementType="i8";class I extends d{constructor(t,e=0,r,n){super(Int8Array,t,e,r,n),this.elementType="i8"}static fromTypedArray(t,e){return new I(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}I.ElementType="i8";class z extends u{constructor(t,e=0,r,n){super(Int16Array,t,e,r,n),this.elementType="i16"}static fromTypedArray(t,e){return new z(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}z.ElementType="i16";class U extends i{constructor(t,e=0,r,n){super(Int16Array,t,e,r,n),this.elementType="i16"}static fromTypedArray(t,e){return new U(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}U.ElementType="i16";class D extends o{constructor(t,e=0,r,n){super(Int16Array,t,e,r,n),this.elementType="i16"}static fromTypedArray(t,e){return new D(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}D.ElementType="i16";class V extends d{constructor(t,e=0,r,n){super(Int16Array,t,e,r,n),this.elementType="i16"}static fromTypedArray(t,e){return new V(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}V.ElementType="i16";class k extends u{constructor(t,e=0,r,n){super(Int32Array,t,e,r,n),this.elementType="i32"}static fromTypedArray(t,e){return new k(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}k.ElementType="i32";class H extends i{constructor(t,e=0,r,n){super(Int32Array,t,e,r,n),this.elementType="i32"}static fromTypedArray(t,e){return new H(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}H.ElementType="i32";class J extends o{constructor(t,e=0,r,n){super(Int32Array,t,e,r,n),this.elementType="i32"}static fromTypedArray(t,e){return new J(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}J.ElementType="i32";class Q extends d{constructor(t,e=0,r,n){super(Int32Array,t,e,r,n),this.elementType="i32"}static fromTypedArray(t,e){return new Q(t.buffer,t.byteOffset,e,t.byteOffset+t.byteLength)}}Q.ElementType="i32"},462:function(t,e,r){"use strict";r.d(e,"a",(function(){return i}));var n=r(379),s=r(463);class u{constructor(t,e){this.layout=t,this.buffer="number"==typeof e?new ArrayBuffer(e*t.stride):e;for(const e of t.fieldNames){const r=t.fields.get(e);this[e]=new r.constructor(this.buffer,r.offset,this.stride)}}get stride(){return this.layout.stride}get count(){return this.buffer.byteLength/this.stride}get byteLength(){return this.buffer.byteLength}getField(t,e){const r=this[t];return r&&r.elementCount===e.ElementCount&&r.elementType===e.ElementType?r:null}slice(t,e){return new u(this.layout,this.buffer.slice(t*this.stride,e*this.stride))}copyFrom(t,e,r,n){const s=this.stride;if(s%4==0){const u=new Uint32Array(t.buffer,e*s,n*s/4);new Uint32Array(this.buffer,r*s,n*s/4).set(u)}else{const u=new Uint8Array(t.buffer,e*s,n*s);new Uint8Array(this.buffer,r*s,n*s).set(u)}}}class f{constructor(){this.stride=0,this.fields=new Map,this.fieldNames=[]}vec2f(t,e){return this.appendField(t,n.m,e),this}vec2f64(t,e){return this.appendField(t,n.n,e),this}vec3f(t,e){return this.appendField(t,n.u,e),this}vec3f64(t,e){return this.appendField(t,n.v,e),this}vec4f(t,e){return this.appendField(t,n.C,e),this}vec4f64(t,e){return this.appendField(t,n.D,e),this}mat3f(t,e){return this.appendField(t,n.f,e),this}mat3f64(t,e){return this.appendField(t,n.g,e),this}mat4f(t,e){return this.appendField(t,n.h,e),this}mat4f64(t,e){return this.appendField(t,n.i,e),this}vec4u8(t,e){return this.appendField(t,n.J,e),this}f32(t,e){return this.appendField(t,n.a,e),this}f64(t,e){return this.appendField(t,n.b,e),this}u8(t,e){return this.appendField(t,n.l,e),this}u16(t,e){return this.appendField(t,n.j,e),this}i8(t,e){return this.appendField(t,n.e,e),this}vec2i8(t,e){return this.appendField(t,n.q,e),this}vec2i16(t,e){return this.appendField(t,n.o,e),this}vec2u8(t,e){return this.appendField(t,n.t,e),this}vec4u16(t,e){return this.appendField(t,n.H,e),this}u32(t,e){return this.appendField(t,n.k,e),this}appendField(t,e,r){const n=e.ElementCount*Object(s.a)(e.ElementType),u=this.stride;this.fields.set(t,{size:n,constructor:e,offset:u,optional:r}),this.stride+=n,this.fieldNames.push(t)}alignTo(t){return this.stride=Math.floor((this.stride+t-1)/t)*t,this}hasField(t){return this.fieldNames.indexOf(t)>=0}createBuffer(t){return new u(this,t)}createView(t){return new u(this,t)}clone(){const t=new f;return t.stride=this.stride,t.fields=new Map,this.fields.forEach((e,r)=>t.fields.set(r,e)),t.fieldNames=this.fieldNames.slice(),t.BufferType=this.BufferType,t}}function i(){return new f}},463:function(t,e,r){"use strict";r.d(e,"a",(function(){return s})),r.d(e,"b",(function(){return f})),r.d(e,"c",(function(){return u})),r.d(e,"d",(function(){return i}));var n=r(37);function s(t){switch(t){case"u8":return 1;case"u16":return 2;case"u32":return 4;case"i8":return 1;case"i16":return 2;case"i32":case"f32":return 4;case"f64":return 8;default:return void Object(n.a)(t)}}function u(t){switch(t){case"u8":case"u16":case"u32":return!1;case"i8":case"i16":case"i32":case"f32":case"f64":return!0;default:return void Object(n.a)(t)}}function f(t){switch(t){case"u8":case"u16":case"u32":case"i8":case"i16":case"i32":return!0;case"f32":case"f64":return!1;default:return void Object(n.a)(t)}}function i(t){switch(t){case"u8":return 255;case"u16":return 65535;case"u32":return 4294967295;case"i8":return 127;case"i16":return 32767;case"i32":return 2147483647;case"f32":return 3402823e32;case"f64":return 179769e303;default:return void Object(n.a)(t)}}}});