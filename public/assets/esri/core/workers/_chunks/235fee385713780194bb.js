self.webpackChunkRemoteClient([143],{101:function(t,e,r){"use strict";r.d(e,"a",(function(){return v})),r.d(e,"b",(function(){return S}));var i=r(24),s=r(6),a=r(25),o=r(31),n=r(30),l=r(95),c=r(2),u=r(129),b=r(8),p=r(21);class h{constructor(){this._propertyOriginMap=new Map,this._originStores=new Array(o.a),this._values=new Map}clone(t){const e=new h,r=this._originStores[0];r&&r.forEach((t,r)=>{e.set(r,Object(b.a)(t),0)});for(let r=2;r<o.a;r++){const i=this._originStores[r];i&&i.forEach((i,s)=>{t&&t.has(s)||e.set(s,Object(b.a)(i),r)})}return e}get(t,e){const r=void 0===e?this._values:this._originStores[e];return r?r.get(t):void 0}keys(t){const e=null==t?this._values:this._originStores[t];return e?Object(p.f)(e):[]}set(t,e,r=6){let i=this._originStores[r];if(i||(i=new Map,this._originStores[r]=i),i.set(t,e),!this._values.has(t)||Object(c.c)(this._propertyOriginMap.get(t))<=r){const i=this._values.get(t);return this._values.set(t,e),this._propertyOriginMap.set(t,r),i!==e}return!1}delete(t,e=6){const r=this._originStores[e];if(!r)return;const i=r.get(t);if(r.delete(t),this._values.has(t)&&this._propertyOriginMap.get(t)===e){this._values.delete(t);for(let r=e-1;r>=0;r--){const e=this._originStores[r];if(e&&e.has(t)){this._values.set(t,e.get(t)),this._propertyOriginMap.set(t,r);break}}}return i}has(t,e){const r=void 0===e?this._values:this._originStores[e];return!!r&&r.has(t)}revert(t,e){for(;e>0&&!this.has(t,e);)--e;const r=this._originStores[e],i=r&&r.get(t),s=this._values.get(t);return this._values.set(t,i),this._propertyOriginMap.set(t,e),s!==i}originOf(t){return this._propertyOriginMap.get(t)||0}forEach(t){this._values.forEach(t)}}var O=h;const d=t=>{let e=class extends t{constructor(...t){super(...t);const e=Object(c.c)(Object(s.a)(this)),r=e.metadatas,i=e.store,a=new O;e.store=a,i.keys().forEach(t=>{a.set(t,i.get(t),0)}),Object.keys(r).forEach(t=>{e.internalGet(t)&&a.set(t,e.internalGet(t),0)})}read(t,e){Object(u.a)(this,t,e)}getAtOrigin(t,e){const r=y(this),i=Object(o.d)(e);if("string"==typeof t)return r.get(t,i);const s={};return t.forEach(t=>{s[t]=r.get(t,i)}),s}originOf(t){return Object(o.b)(this.originIdOf(t))}originIdOf(t){return y(this).originOf(t)}revert(t,e){const r=y(this),i=Object(o.d)(e),a=Object(s.a)(this);let n;n="string"==typeof t?"*"===t?r.keys(i):[t]:t,n.forEach(t=>{a.propertyInvalidated(t),r.revert(t,i),a.propertyCommitted(t)})}};return e=Object(i.a)([Object(a.a)("esri.core.ReadOnlyMultiOriginJSONSupport")],e),e};function y(t){return Object(s.a)(t).store}let g=class extends(d(n.a)){};g=Object(i.a)([Object(a.a)("esri.core.ReadOnlyMultiOriginJSONSupport")],g);const j=t=>{let e=class extends t{constructor(...t){super(...t)}clear(t,e="user"){return f(this).delete(t,Object(o.d)(e))}write(t={},e){return Object(l.b)(this,t=t||{},e),t}setAtOrigin(t,e,r){Object(s.a)(this).setAtOrigin(t,e,Object(o.d)(r))}removeOrigin(t){const e=f(this),r=Object(o.d)(t),i=e.keys(r);for(const t of i)e.originOf(t)===r&&e.set(t,e.get(t,r),6)}updateOrigin(t,e){const r=f(this),i=Object(o.d)(e),s=this.get(t);for(let e=i+1;e<o.a;++e)r.delete(t,e);r.set(t,s,i)}toJSON(t){return this.write({},t)}};return e=Object(i.a)([Object(a.a)("esri.core.WriteableMultiOriginJSONSupport")],e),e.prototype.toJSON.isDefaultToJSON=!0,e};function f(t){return Object(s.a)(t).store}const v=t=>{let e=class extends(j(d(t))){constructor(...t){super(...t)}};return e=Object(i.a)([Object(a.a)("esri.core.MultiOriginJSONSupport")],e),e};let S=class extends(v(n.a)){};S=Object(i.a)([Object(a.a)("esri.core.MultiOriginJSONSupport")],S)},99:function(t,e,r){"use strict";var i=r(24),s=(r(3),r(20),r(19)),a=r(7),o=(r(9),r(26)),n=r(25),l=r(10),c=r(4),u=(r(41),r(43)),b=(r(42),r(71)),p=r(70),h=(r(72),r(112)),O=r(170),d=r(98);let y=0;const g=a.a.getLogger("esri.layers.Layer");let j=class extends(h.a.EventedMixin(Object(O.a)(d.a))){constructor(){super(...arguments),this.attributionDataUrl=null,this.fullExtent=new p.a(-180,-90,180,90,b.a.WGS84),this.id=Date.now().toString(16)+"-layer-"+y++,this.legendEnabled=!0,this.listMode="show",this.opacity=1,this.parent=null,this.popupEnabled=!0,this.attributionVisible=!0,this.spatialReference=b.a.WGS84,this.title=null,this.type=null,this.url=null,this.visible=!0}static async fromArcGISServerUrl(t){const e="string"==typeof t?{url:t}:t,i=await r.e(78).then(r.bind(null,209));try{return await i.fromUrl(e)}catch(t){throw g.error("#fromArcGISServerUrl({ url: '"+e.url+"'})","Failed to create layer from arcgis server url",t),t}}static async fromPortalItem(t){const e="portalItem"in t?t:{portalItem:t},i=await r.e(79).then(r.bind(null,190));try{return await i.fromItem(e)}catch(t){const r=e&&e.portalItem,i=r&&r.id||"unset",a=r&&r.portal&&r.portal.url||s.a.portalUrl;throw g.error("#fromPortalItem()","Failed to create layer from portal item (portal: '"+a+"', id: '"+i+"')",t),t}}initialize(){this.when().catch(t=>{var e,r;a.a.getLogger(this.declaredClass).error("#load()",`Failed to load layer (title: '${null!=(e=this.title)?e:"no title"}', id: '${null!=(r=this.id)?r:"no id"}')`,{error:t})})}destroy(){if(this.parent){const t=this,e=this.parent;"layers"in e&&e.layers.includes(t)?e.layers.remove(t):"tables"in e&&e.tables.includes(t)?e.tables.remove(t):"baseLayers"in e&&e.baseLayers.includes(t)?e.baseLayers.remove(t):"baseLayers"in e&&e.referenceLayers.includes(t)&&e.referenceLayers.remove(t)}}get hasAttributionData(){return null!=this.attributionDataUrl}get parsedUrl(){const t=this._get("url");return t?Object(c.H)(t):null}async fetchAttributionData(){const t=this.attributionDataUrl;if(this.hasAttributionData&&t)return(await Object(u.default)(t,{query:{f:"json"},responseType:"json"})).data;throw new l.a("layer:no-attribution-data","Layer does not have attribution data")}};Object(i.a)([Object(o.b)({type:String})],j.prototype,"attributionDataUrl",void 0),Object(i.a)([Object(o.b)({type:p.a})],j.prototype,"fullExtent",void 0),Object(i.a)([Object(o.b)({readOnly:!0,dependsOn:["attributionDataUrl"]})],j.prototype,"hasAttributionData",null),Object(i.a)([Object(o.b)({type:String})],j.prototype,"id",void 0),Object(i.a)([Object(o.b)({type:Boolean,nonNullable:!0})],j.prototype,"legendEnabled",void 0),Object(i.a)([Object(o.b)({type:["show","hide","hide-children"]})],j.prototype,"listMode",void 0),Object(i.a)([Object(o.b)({type:Number,range:{min:0,max:1},nonNullable:!0})],j.prototype,"opacity",void 0),Object(i.a)([Object(o.b)()],j.prototype,"parent",void 0),Object(i.a)([Object(o.b)({readOnly:!0,dependsOn:["url"]})],j.prototype,"parsedUrl",null),Object(i.a)([Object(o.b)({type:Boolean})],j.prototype,"popupEnabled",void 0),Object(i.a)([Object(o.b)({type:Boolean})],j.prototype,"attributionVisible",void 0),Object(i.a)([Object(o.b)({type:b.a})],j.prototype,"spatialReference",void 0),Object(i.a)([Object(o.b)({type:String})],j.prototype,"title",void 0),Object(i.a)([Object(o.b)({type:String,readOnly:!0,json:{read:!1}})],j.prototype,"type",void 0),Object(i.a)([Object(o.b)()],j.prototype,"url",void 0),Object(i.a)([Object(o.b)({type:Boolean,nonNullable:!0})],j.prototype,"visible",void 0),j=Object(i.a)([Object(n.a)("esri.layers.Layer")],j);var f=j;e.a=f}});