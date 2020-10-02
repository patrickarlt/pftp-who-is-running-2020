self.webpackChunkRemoteClient([148],{481:function(e,t,r){"use strict";var s=r(24),a=(r(3),r(20),r(7),r(9),r(26)),o=r(25),n=(r(4),r(41),r(42),r(204));let i=class extends n.a{initialize(){}destroy(){}get supportsTileUpdates(){return!1}get spatialReference(){const e=this.get("tileStore.tileScheme.spatialReference");return e&&e.toJSON()||null}};Object(s.a)([Object(a.b)({readOnly:!0})],i.prototype,"supportsTileUpdates",null),Object(s.a)([Object(a.b)({constructOnly:!0})],i.prototype,"remoteClient",void 0),Object(s.a)([Object(a.b)({constructOnly:!0})],i.prototype,"service",void 0),Object(s.a)([Object(a.b)({dependsOn:["tileStore.tileScheme.spatialReference"]})],i.prototype,"spatialReference",null),Object(s.a)([Object(a.b)({constructOnly:!0})],i.prototype,"tileInfo",void 0),Object(s.a)([Object(a.b)({constructOnly:!0})],i.prototype,"tileStore",void 0),i=Object(s.a)([Object(o.a)("esri.views.2d.layers.features.processors.BaseProcessor")],i);var c=i;t.a=c},682:function(e,t,r){"use strict";r.r(t);var s=r(24),a=r(3),o=(r(20),r(2)),n=(r(7),r(9),r(26),r(25)),i=(r(4),r(41),r(42),r(232)),c=r(1);r(93);(()=>{if(!("document"in c.a))return()=>null;const e=document.createElement("canvas"),t=e.getContext("2d");e.height=512,e.width=1})();function l(e){const t=Math.round(3*e),r=2*e*e,s=new Float64Array(2*t+1);for(let a=0;a<=s.length;a++)s[a]=Math.exp(-Math.pow(a-t,2)/r)/Math.sqrt(2*Math.PI)*(e/2);return s}var d=r(481);let u=class extends d.a{constructor(){super(...arguments),this.type="heatmap",this._tileKeyToFeatureSets=new Map}initialize(){this.handles.add([this.tileStore.on("update",this.onTileUpdate.bind(this))])}async update(e,t){const r=t.schema.processors[0];"heatmap"===r.type?Object(i.a)(this._schema,r)&&(e.mesh=!0,this._schema=r):Object(a.a)("esri-2d-debug")&&console.debug("Tried to update symbol processor with schema of type",r.type)}onTileUpdate(e){for(const t of e.removed)this._tileKeyToFeatureSets.delete(t.key.id)}async onTileData(e,t,r){this._tileKeyToFeatureSets.has(e.key.id)&&"replace"!==t.type||this._tileKeyToFeatureSets.set(e.key.id,new Map);const s=this._tileKeyToFeatureSets.get(e.key.id);Object(o.h)(t.addOrUpdate)&&s.set(t.addOrUpdate.instance,t);let a=t.end;if(s.forEach(e=>a=a||e.end),!a)return;const n=[];s.forEach(e=>{Object(o.h)(e.addOrUpdate)&&n.push(e.addOrUpdate)});const i=function(e,t,r,s){const{blurRadius:a,fieldOffset:o,field:n}=t,i=new Float64Array(r*s),c=l(a),d=Math.round(3*a);let u,p=Number.NEGATIVE_INFINITY;const h=function(e,t){return null!=e?"string"==typeof t?t=>-1*+t.readAttribute(e):r=>+r.readAttribute(e)+t:e=>1}(n,o),y=new Set;for(const t of e){const e=t.getCursor();for(;e.next();){const t=e.getObjectId();if(y.has(t))continue;y.add(t);const a=e.readLegacyPointGeometry(),o=+h(e),n=a.x-d,l=a.y-d,b=Math.max(0,n),f=Math.max(0,l),O=Math.min(s,a.y+d),m=Math.min(r,a.x+d);for(let e=f;e<O;e++){const t=c[e-l];for(let s=b;s<m;s++){const a=c[s-n];u=i[e*r+s]+=t*a*o,u>p&&(p=u)}}}}return{matrix:i.buffer,max:p}}(n,this._schema.mesh,512,512),c={tileKey:e.key.id,intensityInfo:i},d=[i.matrix];return this.remoteClient.invoke("tileRenderer.onTileData",c,{...r,transferList:d})}onTileError(e,t,r){return this.remoteClient.invoke("tileRenderer.onTileError",{tileKey:e.id,error:t},r)}};u=Object(s.a)([Object(n.a)("esri.views.2d.layers.features.processors.HeatmapProcessor")],u);var p=u;t.default=p}});