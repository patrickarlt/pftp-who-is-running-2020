self.webpackChunkRemoteClient([18,143],{101:function(e,t,r){"use strict";r.d(t,"a",(function(){return v})),r.d(t,"b",(function(){return j}));var i=r(24),n=r(6),s=r(25),a=r(31),o=r(30),l=r(95),c=r(2),d=r(129),u=r(8),p=r(21);class b{constructor(){this._propertyOriginMap=new Map,this._originStores=new Array(a.a),this._values=new Map}clone(e){const t=new b,r=this._originStores[0];r&&r.forEach((e,r)=>{t.set(r,Object(u.a)(e),0)});for(let r=2;r<a.a;r++){const i=this._originStores[r];i&&i.forEach((i,n)=>{e&&e.has(n)||t.set(n,Object(u.a)(i),r)})}return t}get(e,t){const r=void 0===t?this._values:this._originStores[t];return r?r.get(e):void 0}keys(e){const t=null==e?this._values:this._originStores[e];return t?Object(p.f)(t):[]}set(e,t,r=6){let i=this._originStores[r];if(i||(i=new Map,this._originStores[r]=i),i.set(e,t),!this._values.has(e)||Object(c.c)(this._propertyOriginMap.get(e))<=r){const i=this._values.get(e);return this._values.set(e,t),this._propertyOriginMap.set(e,r),i!==t}return!1}delete(e,t=6){const r=this._originStores[t];if(!r)return;const i=r.get(e);if(r.delete(e),this._values.has(e)&&this._propertyOriginMap.get(e)===t){this._values.delete(e);for(let r=t-1;r>=0;r--){const t=this._originStores[r];if(t&&t.has(e)){this._values.set(e,t.get(e)),this._propertyOriginMap.set(e,r);break}}}return i}has(e,t){const r=void 0===t?this._values:this._originStores[t];return!!r&&r.has(e)}revert(e,t){for(;t>0&&!this.has(e,t);)--t;const r=this._originStores[t],i=r&&r.get(e),n=this._values.get(e);return this._values.set(e,i),this._propertyOriginMap.set(e,t),n!==i}originOf(e){return this._propertyOriginMap.get(e)||0}forEach(e){this._values.forEach(e)}}var h=b;const f=e=>{let t=class extends e{constructor(...e){super(...e);const t=Object(c.c)(Object(n.a)(this)),r=t.metadatas,i=t.store,s=new h;t.store=s,i.keys().forEach(e=>{s.set(e,i.get(e),0)}),Object.keys(r).forEach(e=>{t.internalGet(e)&&s.set(e,t.internalGet(e),0)})}read(e,t){Object(d.a)(this,e,t)}getAtOrigin(e,t){const r=y(this),i=Object(a.d)(t);if("string"==typeof e)return r.get(e,i);const n={};return e.forEach(e=>{n[e]=r.get(e,i)}),n}originOf(e){return Object(a.b)(this.originIdOf(e))}originIdOf(e){return y(this).originOf(e)}revert(e,t){const r=y(this),i=Object(a.d)(t),s=Object(n.a)(this);let o;o="string"==typeof e?"*"===e?r.keys(i):[e]:e,o.forEach(e=>{s.propertyInvalidated(e),r.revert(e,i),s.propertyCommitted(e)})}};return t=Object(i.a)([Object(s.a)("esri.core.ReadOnlyMultiOriginJSONSupport")],t),t};function y(e){return Object(n.a)(e).store}let g=class extends(f(o.a)){};g=Object(i.a)([Object(s.a)("esri.core.ReadOnlyMultiOriginJSONSupport")],g);const m=e=>{let t=class extends e{constructor(...e){super(...e)}clear(e,t="user"){return O(this).delete(e,Object(a.d)(t))}write(e={},t){return Object(l.b)(this,e=e||{},t),e}setAtOrigin(e,t,r){Object(n.a)(this).setAtOrigin(e,t,Object(a.d)(r))}removeOrigin(e){const t=O(this),r=Object(a.d)(e),i=t.keys(r);for(const e of i)t.originOf(e)===r&&t.set(e,t.get(e,r),6)}updateOrigin(e,t){const r=O(this),i=Object(a.d)(t),n=this.get(e);for(let t=i+1;t<a.a;++t)r.delete(e,t);r.set(e,n,i)}toJSON(e){return this.write({},e)}};return t=Object(i.a)([Object(s.a)("esri.core.WriteableMultiOriginJSONSupport")],t),t.prototype.toJSON.isDefaultToJSON=!0,t};function O(e){return Object(n.a)(e).store}const v=e=>{let t=class extends(m(f(e))){constructor(...e){super(...e)}};return t=Object(i.a)([Object(s.a)("esri.core.MultiOriginJSONSupport")],t),t};let j=class extends(v(o.a)){};j=Object(i.a)([Object(s.a)("esri.core.MultiOriginJSONSupport")],j)},111:function(e,t,r){"use strict";r.d(t,"a",(function(){return f}));var i=r(24),n=(r(3),r(20),r(7)),s=(r(9),r(26)),a=r(68),o=r(25),l=r(66),c=r(10),d=r(4),u=(r(41),r(5)),p=(r(42),r(91)),b=r(117);const h=n.a.getLogger("esri.layers.mixins.PortalLayer"),f=e=>{let t=class extends e{constructor(){super(...arguments),this.resourceReferences={portalItem:null,paths:[]}}destroy(){var e;null==(e=this.portalItem)||e.destroy(),this.portalItem=null}set portalItem(e){e!==this._get("portalItem")&&(this.removeOrigin("portal-item"),this._set("portalItem",e))}readPortalItem(e,t,r){if(t.itemId)return new b.default({id:t.itemId,portal:r&&r.portal})}writePortalItem(e,t){e&&e.id&&(t.itemId=e.id)}async loadFromPortal(e,t){if(this.portalItem&&this.portalItem.id)try{const i=await r.e(69).then(r.bind(null,217));return Object(u.t)(t),await i.load({instance:this,supportedTypes:e.supportedTypes,validateItem:e.validateItem,supportsData:e.supportsData},t)}catch(e){throw h.warn(`Failed to load layer (${this.title}, ${this.id}) portal item (${this.portalItem.id})\n  ${e}`),e}}read(e,t){t&&(t.layer=this),super.read(e,t)}write(e,t){const r=t&&t.portal,i=this.portalItem&&this.portalItem.id&&(this.portalItem.portal||p.a.getDefault());return r&&i&&!Object(d.q)(i.restUrl,r.restUrl)?(t.messages&&t.messages.push(new c.a("layer:cross-portal",`The layer '${this.title} (${this.id})' cannot be persisted because it refers to an item on a different portal than the one being saved to. To save the scene, set the layer.portalItem to null or save the scene to the same portal as the item associated with the layer`,{layer:this})),null):super.write(e,{...t,layer:this})}};return Object(i.a)([Object(s.b)({type:b.default})],t.prototype,"portalItem",null),Object(i.a)([Object(a.a)("web-document","portalItem",["itemId"])],t.prototype,"readPortalItem",null),Object(i.a)([Object(l.a)("web-document","portalItem",{itemId:{type:String}})],t.prototype,"writePortalItem",null),Object(i.a)([Object(s.b)()],t.prototype,"resourceReferences",void 0),t=Object(i.a)([Object(o.a)("esri.layers.mixins.PortalLayer")],t),t}},118:function(e,t,r){"use strict";r.d(t,"a",(function(){return p}));var i=r(24),n=(r(3),r(20),r(7),r(9),r(26)),s=r(25),a=r(66),o=r(10),l=(r(4),r(41),r(42),r(129)),c=r(95);const d={"web-scene/operational-layers":{ArcGISFeatureLayer:!0,ArcGISImageServiceLayer:!0,ArcGISMapServiceLayer:!0,ArcGISSceneServiceLayer:!0,ArcGISTiledElevationServiceLayer:!0,ArcGISTiledImageServiceLayer:!0,ArcGISTiledMapServiceLayer:!0,BuildingSceneLayer:!0,GroupLayer:!0,IntegratedMeshLayer:!0,PointCloudLayer:!0,WebTiledLayer:!0,CSV:!0,VectorTileLayer:!0,WMS:!0,KML:!0,RasterDataLayer:!0},"web-scene/basemap":{ArcGISTiledImageServiceLayer:!0,ArcGISTiledMapServiceLayer:!0,WebTiledLayer:!0,OpenStreetMap:!0,VectorTileLayer:!0,ArcGISImageServiceLayer:!0,WMS:!0,ArcGISMapServiceLayer:!0},"web-scene/ground":{ArcGISTiledElevationServiceLayer:!0,RasterDataElevationLayer:!0},"web-map/operational-layers":{ArcGISImageServiceLayer:!0,ArcGISImageServiceVectorLayer:!0,ArcGISMapServiceLayer:!0,ArcGISStreamLayer:!0,ArcGISTiledImageServiceLayer:!0,ArcGISTiledMapServiceLayer:!0,ArcGISFeatureLayer:!0,BingMapsAerial:!0,BingMapsRoad:!0,BingMapsHybrid:!0,CSV:!0,GeoRSS:!0,GroupLayer:!0,KML:!0,VectorTileLayer:!0,WFS:!0,SubtypeGroupLayer:!0,WMS:!0,WebTiledLayer:!0},"web-map/basemap":{ArcGISImageServiceLayer:!0,ArcGISImageServiceVectorLayer:!0,ArcGISMapServiceLayer:!0,ArcGISTiledImageServiceLayer:!0,ArcGISTiledMapServiceLayer:!0,OpenStreetMap:!0,VectorTileLayer:!0,WMS:!0,WebTiledLayer:!0,BingMapsAerial:!0,BingMapsRoad:!0,BingMapsHybrid:!0},"web-map/tables":{ArcGISFeatureLayer:!0},"portal-item/operational-layers":{ArcGISSceneServiceLayer:!0,PointCloudLayer:!0,BuildingSceneLayer:!0,IntegratedMeshLayer:!0}};var u=r(85);const p=e=>{let t=class extends e{constructor(){super(...arguments),this.title="Layer"}writeListMode(e,t,r,i){(i&&"ground"===i.layerContainerType||e&&Object(c.a)(this,r,{},i))&&(t[r]=e)}writeOperationalLayerType(e,t,r,i){!e||i&&"tables"===i.layerContainerType||(t.layerType=e)}writeTitle(e,t){t.title=e||"Layer"}read(e,t){t&&(t.layer=this),Object(l.b)(this,e,t=>super.read(e,t),t)}write(e,t){if(t&&t.origin){const e=`${t.origin}/${t.layerContainerType||"operational-layers"}`,r=d[e];let i=r&&r[this.operationalLayerType];if("ArcGISTiledElevationServiceLayer"===this.operationalLayerType&&"web-scene/operational-layers"===e&&(i=!1),!i)return t.messages&&t.messages.push(new o.a("layer:unsupported",`Layers (${this.title}, ${this.id}) of type '${this.declaredClass}' are not supported in the context of '${e}'`,{layer:this})),null}const r=super.write(e,{...t,layer:this}),i=!!t&&!!t.messages&&!!t.messages.filter(e=>e instanceof o.a&&"web-document-write:property-required"===e.name).length;return!this.url&&i?null:r}beforeSave(){}};return Object(i.a)([Object(n.b)({type:String,json:{write:{ignoreOrigin:!0},origins:{"web-scene":{write:{isRequired:!0,ignoreOrigin:!0}},"portal-item":{write:!1}}}})],t.prototype,"id",void 0),Object(i.a)([Object(n.b)({json:{write:{ignoreOrigin:!0},origins:{"web-map":{read:!1,write:!1}}}})],t.prototype,"listMode",void 0),Object(i.a)([Object(a.a)("listMode")],t.prototype,"writeListMode",null),Object(i.a)([Object(n.b)({type:String,readOnly:!0,json:{read:!1,write:{target:"layerType",ignoreOrigin:!0},origins:{"portal-item":{write:!1}}}})],t.prototype,"operationalLayerType",void 0),Object(i.a)([Object(a.a)("operationalLayerType")],t.prototype,"writeOperationalLayerType",null),Object(i.a)([Object(n.b)(u.e)],t.prototype,"opacity",void 0),Object(i.a)([Object(n.b)({type:String,json:{write:{ignoreOrigin:!0,allowNull:!0},origins:{"web-scene":{write:{isRequired:!0,ignoreOrigin:!0,allowNull:!0}},"portal-item":{write:!1}}}})],t.prototype,"title",void 0),Object(i.a)([Object(a.a)("title")],t.prototype,"writeTitle",null),Object(i.a)([Object(n.b)({type:Boolean,json:{name:"visibility",origins:{"web-document":{name:"visibility",default:!0},"portal-item":{name:"visibility",read:{source:["visible","visibility"]}}}}})],t.prototype,"visible",void 0),t=Object(i.a)([Object(s.a)("esri.layers.mixins.OperationalLayer")],t),t}},136:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var i=r(24),n=(r(3),r(20),r(7),r(9),r(26)),s=r(25);r(4),r(41),r(42);const a=e=>{let t=class extends e{constructor(){super(...arguments),this.minScale=0,this.maxScale=0}get scaleRangeId(){return`${this.minScale},${this.maxScale}`}};return Object(i.a)([Object(n.b)({type:Number,nonNullable:!0,json:{write:!0}})],t.prototype,"minScale",void 0),Object(i.a)([Object(n.b)({type:Number,nonNullable:!0,json:{write:!0}})],t.prototype,"maxScale",void 0),Object(i.a)([Object(n.b)({readOnly:!0,dependsOn:["minScale","maxScale"]})],t.prototype,"scaleRangeId",null),t=Object(i.a)([Object(s.a)("esri.layers.mixins.ScaleRangeLayer")],t),t}},145:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var i=r(24),n=(r(3),r(20),r(7),r(9),r(26)),s=r(25);r(4),r(41),r(42);const a=e=>{let t=class extends e{constructor(){super(...arguments),this.blendMode="normal",this.effect=null}};return Object(i.a)([Object(n.b)({type:["average","color-burn","color-dodge","color","darken","destination-atop","destination-in","destination-out","destination-over","difference","exclusion","hard-light","hue","invert","lighten","lighter","luminosity","minus","multiply","normal","overlay","plus","reflect","saturation","screen","soft-light","source-atop","source-in","source-out","vivid-light","xor"],nonNullable:!0,json:{read:!1,write:!1,origins:{"web-map":{default:"normal",read:!0,write:!0}}}})],t.prototype,"blendMode",void 0),Object(i.a)([Object(n.b)({type:String})],t.prototype,"effect",void 0),t=Object(i.a)([Object(s.a)("esri.layers.mixins.BlendLayer")],t),t}},146:function(e,t,r){"use strict";var i,n=r(24),s=(r(3),r(20),r(2)),a=(r(7),r(9),r(26)),o=r(67),l=r(68),c=r(25),d=r(66),u=(r(4),r(41),r(42),r(65)),p=r(82);let b=i=class extends u.a{async collectRequiredFields(e,t){return Object(p.a)(e,t,this.expression)}clone(){return new i({expression:this.expression,title:this.title})}};Object(n.a)([Object(a.b)({type:String,json:{write:!0}})],b.prototype,"expression",void 0),Object(n.a)([Object(a.b)({type:String,json:{write:!0}})],b.prototype,"title",void 0),b=i=Object(n.a)([Object(c.a)("esri.layers.support.FeatureExpressionInfo")],b);var h=b,f=r(192);const y=function(){const e=Object.keys(f.a);return e.sort(),e}();var g;const m=Object(o.b)()({onTheGround:"on-the-ground",relativeToGround:"relative-to-ground",relativeToScene:"relative-to-scene",absoluteHeight:"absolute-height"}),O=new o.a({foot:"feet",kilometer:"kilometers",meter:"meters",mile:"miles","us-foot":"us-feet",yard:"yards"});let v=g=class extends u.a{constructor(){super(...arguments),this.offset=null}readFeatureExpressionInfo(e,t){return null!=e?e:t.featureExpression&&0===t.featureExpression.value?{expression:"0"}:void 0}writeFeatureExpressionInfo(e,t,r,i){t[r]=e.write(null,i),"0"===e.expression&&(t.featureExpression={value:0})}get mode(){return this._isOverridden("mode")?this._get("mode"):Object(s.h)(this.offset)||this.featureExpressionInfo?"relative-to-ground":"on-the-ground"}set mode(e){this._override("mode",e)}set unit(e){this._set("unit",e)}write(e,t){return this.offset||this.mode||this.featureExpressionInfo||this.unit?super.write(e,t):null}clone(){return new g({mode:this.mode,offset:this.offset,featureExpressionInfo:this.featureExpressionInfo?this.featureExpressionInfo.clone():void 0,unit:this.unit})}};Object(n.a)([Object(a.b)({type:h,json:{write:!0}})],v.prototype,"featureExpressionInfo",void 0),Object(n.a)([Object(l.a)("featureExpressionInfo",["featureExpressionInfo","featureExpression"])],v.prototype,"readFeatureExpressionInfo",null),Object(n.a)([Object(d.a)("featureExpressionInfo",{featureExpressionInfo:{type:h},"featureExpression.value":{type:[0]}})],v.prototype,"writeFeatureExpressionInfo",null),Object(n.a)([Object(a.b)({type:m.apiValues,dependsOn:["offset","featureExpressionInfo"],nonNullable:!0,json:{type:m.jsonValues,read:m.read,write:{writer:m.write,isRequired:!0}}})],v.prototype,"mode",null),Object(n.a)([Object(a.b)({type:Number,json:{write:!0}})],v.prototype,"offset",void 0),Object(n.a)([Object(a.b)({type:y,json:{type:String,read:O.read,write:O.write}})],v.prototype,"unit",null),v=g=Object(n.a)([Object(c.a)("esri.layers.support.ElevationInfo")],v);var j=v;t.a=j},168:function(e,t,r){"use strict";r.d(t,"a",(function(){return u}));var i=r(82),n=(r(116),r(157)),s=(r(166),r(185)),a=r(167),o=r(158),l=(r(159),r(150),r(131));const c=["oid","global-id"],d=["oid","global-id","guid"];function u({displayField:e,editFieldsInfo:t,fields:r,objectIdField:s,title:a},c){if(!r)return null;const d=g({editFieldsInfo:t,fields:r,objectIdField:s},c);if(!d.length)return null;const u=function(e){const t=Object(i.h)(e),{titleBase:r}=e;return t?`${r}: {${t.trim()}}`:r}({titleBase:a,fields:r,displayField:e}),p=[new o.a,new n.a];return new l.a({title:u,content:p,fieldInfos:d})}const p=[/^fnode_$/i,/^tnode_$/i,/^lpoly_$/i,/^rpoly_$/i,/^poly_$/i,/^subclass$/i,/^subclass_$/i,/^rings_ok$/i,/^rings_nok$/i,/shape/i,/perimeter/i,/objectid/i,/_i$/i],b=(e,{editFieldsInfo:t,objectIdField:r,visibleFieldNames:i})=>i?i.has(e.name):!(f(e.name,t)||r&&e.name===r||c.indexOf(e.type)>-1||p.some(t=>t.test(e.name)));function h(e,t){return"oid"===e.type?-1:"oid"===t.type?1:O(e)?-1:O(t)?1:(e.alias||e.name).toLocaleLowerCase().localeCompare((t.alias||t.name).toLocaleLowerCase())}function f(e,t){if(!e||!t)return!1;const{creationDateField:r,creatorField:i,editDateField:n,editorField:s}=t;return-1!==[r&&r.toLowerCase(),i&&i.toLowerCase(),n&&n.toLowerCase(),s&&s.toLowerCase()].indexOf(e.toLowerCase())}function y(e,t){return e.editable&&-1===d.indexOf(e.type)&&!f(e.name,t)}function g({editFieldsInfo:e,fields:t,objectIdField:r},i){return function(e,t){const r=e;return t&&(e=e.filter(e=>-1===t.indexOf(e.type))),e===r&&(e=e.slice()),e.sort(h),e}(t,(null==i?void 0:i.ignoreFieldTypes)||v).map(t=>new a.a({fieldName:t.name,isEditable:y(t,e),label:t.alias,format:m(t),visible:b(t,{editFieldsInfo:e,objectIdField:r,visibleFieldNames:null==i?void 0:i.visibleFieldNames})}))}function m(e){switch(e.type){case"small-integer":case"integer":case"single":return new s.a({digitSeparator:!0,places:0});case"double":return new s.a({digitSeparator:!0,places:2});case"date":return new s.a({dateFormat:"long-month-day-year"});default:return null}}function O(e){return"name"===(e.name&&e.name.toLowerCase())||("name"===(e.alias&&e.alias.toLowerCase())||void 0)}const v=["geometry","blob","raster","guid","xml"]},176:function(e,t,r){"use strict";r.d(t,"a",(function(){return a}));var i=r(24),n=(r(3),r(20),r(7),r(9),r(26)),s=r(25);r(4),r(41),r(42);const a=e=>{let t=class extends e{constructor(){super(...arguments),this.refreshInterval=0}refresh(){this.emit("refresh")}};return Object(i.a)([Object(n.b)({type:Number,cast:e=>e>=.1?e:e<=0?0:.1,json:{write:!0,origins:{"web-document":{write:!0}}}})],t.prototype,"refreshInterval",void 0),t=Object(i.a)([Object(s.a)("esri.layers.mixins.RefreshableLayer")],t),t}},198:function(e,t){function r(e){return Promise.resolve().then((function(){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}))}r.keys=function(){return[]},r.resolve=r,e.exports=r,r.id=198},210:function(e,t,r){"use strict";r.d(t,"a",(function(){return H})),r.d(t,"b",(function(){return B}));var i=r(3),n=(r(20),r(10)),s=r(5),a=r(57),o=r(7),l=r(49);const c=o.a.getLogger("esri.core.workers.Connection");var d=r(12),u=r(16),p=r(19),b=r(4),h=r(102);r(122),r(125),r(160),r(154),r(11);const f={};var y=function(e){var t;const r={async:e.async,isDebug:e.isDebug,locale:e.locale,baseUrl:e.baseUrl,has:{...e.has},map:{...e.map},packages:e.packages&&e.packages.concat()||[],paths:{...e.paths}};return e.hasOwnProperty("async")||(r.async=!0),e.hasOwnProperty("isDebug")||(r.isDebug=!1),e.baseUrl||(r.baseUrl=f.baseUrl),null==(t=f.packages)||t.forEach(e=>{!function(e,t){for(const r of e)if(r.name===t.name)return;e.push(t)}(r.packages,e)}),r},g=r(1);class m{constructor(){const e=document.createDocumentFragment();["addEventListener","dispatchEvent","removeEventListener"].forEach(t=>{this[t]=(...r)=>e[t](...r)})}}const O=g.a.MutationObserver||g.a.WebKitMutationObserver,v=function(){let e;if(g.a.process&&g.a.process.nextTick)e=e=>{g.a.process.nextTick(e)};else if(g.a.Promise)e=e=>{g.a.Promise.resolve().then(e)};else if(O){const t=[],r=document.createElement("div");new O(()=>{for(;t.length>0;)t.shift()()}).observe(r,{attributes:!0}),e=e=>{t.push(e),r.setAttribute("queueStatus","1")}}return e}(),j=(()=>{const e=g.a.MessageEvent;try{new e("message",{data:null})}catch{return(e,t={})=>{const{data:r,bubbles:i=!1,cancelable:n=!1}=t,s=document.createEvent("Event");return s.initEvent(e,i,n),s.data=r,s}}return(t,r)=>new e(t,r)})();var w=class{constructor(){this._dispatcher=new m,this._isInitialized=!1,this._workerPostMessage({type:u.a.HANDSHAKE})}terminate(){}get onmessage(){return this._onmessageHandler}set onmessage(e){this._onmessageHandler&&this.removeEventListener("message",this._onmessageHandler),this._onmessageHandler=e,e&&this.addEventListener("message",e)}get onmessageerror(){return this._onmessageerrorHandler}set onmessageerror(e){this._onmessageerrorHandler&&this.removeEventListener("messageerror",this._onmessageerrorHandler),this._onmessageerrorHandler=e,e&&this.addEventListener("messageerror",e)}get onerror(){return this._onerrorHandler}set onerror(e){this._onerrorHandler&&this.removeEventListener("error",this._onerrorHandler),this._onerrorHandler=e,e&&this.addEventListener("error",e)}postMessage(e){v(()=>{this._workerMessageHandler(j("message",{data:e}))})}dispatchEvent(e){return this._dispatcher.dispatchEvent(e)}addEventListener(e,t,r){this._dispatcher.addEventListener(e,t,r)}removeEventListener(e,t,r){this._dispatcher.removeEventListener(e,t,r)}_workerPostMessage(e){v(()=>{this.dispatchEvent(j("message",{data:e}))})}async _workerMessageHandler(e){const t=Object(u.d)(e);if(t)switch(t.type){case u.a.CONFIGURE:this._isInitialized||this._workerPostMessage({type:u.a.CONFIGURED});break;case u.a.OPEN:{const{modulePath:e,jobId:i}=t;let n=await a.default.loadWorker(e);n||(n=await r(198)(e));const s=a.default.connect(n);this._workerPostMessage({type:u.a.OPENED,jobId:i,data:s});break}}}};const S=o.a.getLogger("esri.core.workers");i.a.add("esri-workers-arraybuffer-transfer",!Object(i.a)("safari")||Object(i.a)("safari")>=12);const{CONFIGURED:I,CONFIGURE:_,HANDSHAKE:E}=u.a;let L;try{L=URL.createObjectURL(new Blob(['var esriConfig,remoteClientPath,globalId=0,outgoing=new Map,configured=!1,HANDSHAKE=0,CONFIGURE=1,CONFIGURED=2,OPEN=3,OPENED=4,RESPONSE=5,INVOKE=6,ABORT=7;function createAbortError(){var e=new Error("Aborted");return e.name="AbortError",e}function receiveMessage(e){return e&&e.data?"string"==typeof e.data?JSON.parse(e.data):e.data:null}function invokeStaticMessage(e,t,r){var o=r&&r.signal,n=globalId++;return new Promise((function(r,i){if(o){if(o.aborted)return i(createAbortError());o.addEventListener("abort",(function(){outgoing.get(n)&&(outgoing.delete(n),self.postMessage({type:ABORT,jobId:n}),i(createAbortError()))}))}outgoing.set(n,{resolve:r,reject:i}),self.postMessage({type:INVOKE,jobId:n,methodName:e,abortable:null!=o,data:t})}))}function messageHandler(e){var t=receiveMessage(e);if(t){var r=t.jobId;switch(t.type){case CONFIGURE:var o=t.configure;if(configured)return;configured=!0,esriConfig=o.esriConfig,remoteClientPath=esriConfig.workers.remoteClientPath,self.dojoConfig=o.loaderConfig,esriConfig.workers.loaderUrl&&(self.importScripts(esriConfig.workers.loaderUrl),"function"==typeof require&&"function"==typeof require.config&&require.config(o.loaderConfig)),self.postMessage({type:CONFIGURED});break;case OPEN:var n,i=/^https?:\\/\\//i.test(t.modulePath)?t.modulePath:esriConfig.baseUrl+t.modulePath;function a(e){var t=n.connect(e);self.postMessage({type:OPENED,jobId:r,data:t},[t])}"function"==typeof define&&define.amd?require([remoteClientPath.replace(/\\.js$/,"")],(function(e){(n=e.default||e).loadWorker(t.modulePath).then((function(e){return e||new Promise((function(e){require([t.modulePath],e)}))})).then(a)})):"System"in self&&"function"==typeof System.import?System.import(esriConfig.baseUrl+remoteClientPath).then((function(e){return(n=e.default).loadWorker(t.modulePath)})).then((function(e){return e||System.import(i)})).then(a):(self.RemoteClient||importScripts(esriConfig.baseUrl+remoteClientPath),(n=self.RemoteClient.default||self.RemoteClient).loadWorker(t.modulePath).then(a));break;case RESPONSE:if(outgoing.has(r)){var s=outgoing.get(r);outgoing.delete(r),t.error?s.reject(JSON.parse(t.error)):s.resolve(t.data)}}}}self.addEventListener("message",messageHandler),self.postMessage({type:HANDSHAKE});'],{type:"text/javascript"}))}catch(e){}const k="Failed to create Worker. Fallback to execute module in main thread";async function x(e){return Object(s.f)(t=>{function r(s){const a=Object(u.d)(s);if(a)switch(a.type){case E:!function(e){let t;if(null!=p.a.default){const e={...p.a};delete e.default,t=JSON.parse(JSON.stringify(e))}else t=JSON.parse(JSON.stringify(p.a));t.baseUrl=Object(b.x)(t.baseUrl),t.locale=Object(h.b)(),t.has={"csp-restrictions":Object(i.a)("csp-restrictions"),"esri-2d-debug":Object(i.a)("esri-2d-debug"),"esri-2d-update-debug":Object(i.a)("esri-2d-update-debug"),"esri-atomics":Object(i.a)("esri-atomics"),"esri-secure-context":Object(i.a)("esri-secure-context"),"esri-shared-array-buffer":Object(i.a)("esri-shared-array-buffer"),"esri-tiles-debug":Object(i.a)("esri-tiles-debug"),"esri-webgl-max-texture-size":Object(i.a)("esri-webgl-max-texture-size"),"esri-webgl-texture-float":Object(i.a)("esri-webgl-texture-float"),"esri-workers-arraybuffer-transfer":Object(i.a)("esri-workers-arraybuffer-transfer"),"host-webworker":1},t.workers.loaderUrl&&(t.workers.loaderUrl=Object(b.x)(t.workers.loaderUrl)),t.workers.remoteClientPath||(t.workers.remoteClientPath=p.a.assetsPath+"/esri/core/workers/RemoteClient.js");const r=p.a.workers.loaderConfig,n=y({baseUrl:null==r?void 0:r.baseUrl,locale:Object(h.b)(),has:{"csp-restrictions":Object(i.a)("csp-restrictions"),"dojo-test-sniff":0,"host-webworker":1,...null==r?void 0:r.has},map:{...null==r?void 0:r.map},paths:{...null==r?void 0:r.paths},packages:(null==r?void 0:r.packages)||[]});e.postMessage({type:_,configure:{esriConfig:t,loaderConfig:n}})}(e);break;case I:e.removeEventListener("message",r),e.removeEventListener("error",n),t(e)}}function n(t){t.preventDefault(),e.removeEventListener("message",r),e.removeEventListener("error",n),S.warn("Failed to create Worker. Fallback to execute module in main thread",t),(e=new w).addEventListener("message",r),e.addEventListener("error",n)}e.addEventListener("message",r),e.addEventListener("error",n)})}const N=o.a.getLogger("esri.core.workers"),{ABORT:P,INVOKE:M,OPEN:T,OPENED:A,RESPONSE:C}=u.a;class F{constructor(e,t){this._outJobs=new Map,this._inJobs=new Map,this.worker=e,this.id=t,e.addEventListener("message",this._onMessage.bind(this)),e.addEventListener("error",e=>{e.preventDefault(),N.error(e)})}static async create(e){const t=await async function(){if(!Object(i.a)("esri-workers"))return x(new w);let e;if(L)try{e=new Worker(L)}catch(t){S.warn(k,event),e=new w}else S.warn(k,event),e=new w;return x(e)}();return new F(t,e)}terminate(){this.worker.terminate()}async open(e,t={}){const{signal:r}=t,i=Object(u.b)();return Object(s.f)((t,n)=>{const a={resolve:t,reject:n,abortHandle:Object(s.k)(r,()=>{this._outJobs.delete(i),this._post({type:P,jobId:i})})};this._outJobs.set(i,a),this._post({type:T,jobId:i,modulePath:e})})}_onMessage(e){const t=Object(u.d)(e);if(t)switch(t.type){case A:this._onOpenedMessage(t);break;case C:this._onResponseMessage(t);break;case P:this._onAbortMessage(t);break;case M:this._onInvokeMessage(t)}}_onAbortMessage(e){const t=this._inJobs,r=e.jobId,i=t.get(r);i&&(i.controller&&i.controller.abort(),t.delete(r))}_onInvokeMessage(e){const{methodName:t,jobId:r,data:i,abortable:n}=e,a=n?Object(s.c)():null,o=this._inJobs,l=d.d[t];let c;try{if("function"!=typeof l)throw new TypeError(t+" is not a function");c=l.call(null,i,{signal:a?a.signal:null})}catch(e){return void this._post({type:C,jobId:r,error:Object(u.e)(e)})}Object(s.i)(c)?(o.set(r,{controller:a,promise:c}),c.then(e=>{o.has(r)&&(o.delete(r),this._post({type:C,jobId:r},e))},e=>{o.has(r)&&(o.delete(r),e||(e={message:"Error encountered at method"+t}),Object(s.b)(e)||this._post({type:C,jobId:r,error:Object(u.e)(e||{message:"Error encountered at method "+t})}))})):this._post({type:C,jobId:r},c)}_onOpenedMessage(e){var t;const{jobId:r,data:i}=e,n=this._outJobs.get(r);n&&(this._outJobs.delete(r),null==(t=n.abortHandle)||t.remove(),n.resolve(i))}_onResponseMessage(e){var t;const{jobId:r,error:i,data:s}=e,a=this._outJobs.get(r);a&&(this._outJobs.delete(r),null==(t=a.abortHandle)||t.remove(),i?a.reject(n.a.fromJSON(JSON.parse(i))):a.resolve(s))}_post(e,t,r){return Object(u.c)(this.worker,e,t,r)}}var D=F;let G=Object(i.a)("esri-workers-debug")?1:Object(i.a)("host-browser")?navigator.hardwareConcurrency-1:0;G||(G=Object(i.a)("safari")&&Object(i.a)("mac")||Object(i.a)("trident")?7:2);let R=0;const U=[];function B(e,t){return J(e,{client:t})}async function J(e,t){const r=new class{constructor(){this._clients=new Array,this._clientPromises=new Array,this._clientIdx=0}destroy(){this.close()}get closed(){return!this._clients||!this._clients.length}open(e,t){return Object(s.f)((r,i)=>{let n=!0;const o=e=>{Object(s.t)(t.signal),n&&(n=!1,e())};this._clients.length=e.length,this._clientPromises.length=e.length;for(let n=0;n<e.length;++n){const l=e[n];Object(s.p)(l)?this._clientPromises[n]=l.then(e=>(this._clients[n]=new a.default(e,t),o(r),this._clients[n]),()=>(o(i),null)):(this._clients[n]=new a.default(l,t),this._clientPromises[n]=Object(s.r)(this._clients[n]),o(r))}})}broadcast(e,t,r){const i=new Array(this._clientPromises.length);for(let n=0;n<this._clientPromises.length;++n){const s=this._clientPromises[n];i[n]=s.then(i=>i.invoke(e,t,r))}return i}close(){for(const e of this._clientPromises)e.then(e=>e.close());this._clients.length=0,this._clientPromises.length=0}getAvailableClient(){let e;for(let t=0;t<this._clients.length;++t){const r=this._clients[t];if(r){if(!r.isBusy())return Object(s.r)(r)}else e=e||[],e.push(this._clientPromises[t])}return e?Object(s.q)(e):(this._clientIdx=(this._clientIdx+1)%this._clients.length,Object(s.r)(this._clients[this._clientIdx]))}invoke(e,t,r){let i=null;return Array.isArray(r)?(c.warn("invoke()","The transferList parameter is deprecated, use the options object instead"),i={transferList:r}):i=r,this.closed?Object(s.h)(new Error("Connection closed")):this.getAvailableClient().then(r=>r.invoke(e,t,i))}on(e,t){return Object(s.a)(this._clientPromises).then(()=>Object(l.a)(this._clients.map(r=>r.on(e,t))))}openPorts(){return Object(s.f)(e=>{const t=new Array(this._clientPromises.length);let r=t.length;for(let i=0;i<this._clientPromises.length;++i)this._clientPromises[i].then(n=>{t[i]=n.openPort(),0==--r&&e(t)})})}get test(){return{numClients:this._clients.length}}};return await r.open(e,t),r}async function H(e,t={}){if("string"!=typeof e)throw new n.a("workers:undefined-module","modulePath is missing");let o=t.strategy||"distributed";if(Object(i.a)("host-webworker")&&!Object(i.a)("esri-workers")&&(o="local"),"local"===o){let i=await a.default.loadWorker(e);i||(i=await r(198)(e)),Object(s.t)(t.signal);const n=t.client||i;return J([a.default.connect(i)],{...t,client:n})}if(await z(),Object(s.t)(t.signal),"dedicated"===o){const r=R++%G;return J([await U[r].open(e,t)],t)}if(t.maxNumWorkers&&t.maxNumWorkers>0){const r=Math.min(t.maxNumWorkers,G);if(r<G){const i=new Array(r);for(let n=0;n<r;++n){const r=R++%G;i[r]=U[r].open(e,t)}return J(i,t)}}return J(U.map(r=>r.open(e,t)),t)}let $,W=null;async function z(){if(W)return W;$=Object(s.c)();const e=[];for(let t=0;t<G;t++){const r=D.create(t).then(e=>(U[t]=e,e));e.push(r)}return W=Object(s.a)(e),W}},491:function(e,t,r){"use strict";var i,n=r(24),s=(r(3),r(20),r(8)),a=(r(7),r(9)),o=r(26),l=r(25),c=(r(4),r(41),r(42),r(65));let d=i=class extends c.a{constructor(e){super(e),this.variableName=null,this.dimensionName=null,this.values=[],this.isSlice=!1}clone(){return new i({variableName:this.variableName,dimensionName:this.dimensionName,values:Object(s.a)(this.values),isSlice:this.isSlice})}};Object(n.a)([Object(o.b)({type:String,json:{write:!0}})],d.prototype,"variableName",void 0),Object(n.a)([Object(o.b)({type:String,json:{write:!0}})],d.prototype,"dimensionName",void 0),Object(n.a)([Object(o.b)({type:a.p.array(a.p.oneOf([a.p.native(Number),a.p.array(a.p.native(Number))])),json:{write:!0}})],d.prototype,"values",void 0),Object(n.a)([Object(o.b)({type:Boolean,json:{write:!0}})],d.prototype,"isSlice",void 0),d=i=Object(n.a)([Object(l.a)("esri.layers.support.DimensionalDefinition")],d);var u=d;t.a=u},528:function(e,t,r){"use strict";var i=r(10),n=r(5),s=r(210),a=r(286);t.a=class{constructor(){this._workerThread=null,this._destroyed=!1}async initialize(){const e=await Object(s.a)("RasterWorker");this._destroyed?e.close():this._workerThread=e}destroy(){this._destroyed=!0,this._workerThread&&(this._workerThread.close(),this._workerThread=null)}async decode(e,t){if(!this._workerThread)throw new i.a("raster-jobhandler:no-connection","no available worker connection");const r=await this._workerThread.invoke("decode",e,t);return r?new a.a(r):null}async symbolize(e,t){if(!this._workerThread)throw new i.a("raster-jobhandler:no-connection","no available worker connection");const r={extent:e.extent&&e.extent.toJSON(),pixelBlock:e.pixelBlock.toJSON(),simpleStretchParams:e.simpleStretchParams,bandIds:e.bandIds},n=await this._workerThread.invoke("symbolize",r,t);return n?new a.a(n):null}async updateSymbolizer(e,t){if(!this._workerThread)throw new i.a("raster-jobhandler:no-connection","no available worker connection");const r=e&&e.renderer&&"raster-stretch"===e.renderer.type&&e.renderer.histograms;await Object(n.a)(this._workerThread.broadcast("updateSymbolizer",{symbolizerJSON:e.toJSON(),histograms:r},t))}async stretch(e,t){if(!this._workerThread)throw new i.a("raster-jobhandler:no-connection","no available worker connection");if(!e||!e.pixelBlock)return null;const r={srcPixelBlock:e.pixelBlock.toJSON(),stretchParams:e.stretchParams},n=await this._workerThread.invoke("stretch",r,t);return n?new a.a(n):null}async mosaicAndTransform(e,t){if(!this._workerThread)throw new i.a("raster-jobhandler:no-connection","no available worker connection");if(!(e&&e.srcPixelBlocks&&e.srcPixelBlocks.length>0))return null;const r={...e,srcPixelBlocks:e.srcPixelBlocks.map(e=>e?e.toJSON():null)},n=await this._workerThread.invoke("mosaicAndTransform",r,t);return n?new a.a(n):null}}},85:function(e,t,r){"use strict";r.d(t,"a",(function(){return m})),r.d(t,"b",(function(){return h})),r.d(t,"c",(function(){return u})),r.d(t,"d",(function(){return b})),r.d(t,"e",(function(){return y})),r.d(t,"f",(function(){return g})),r.d(t,"g",(function(){return d})),r.d(t,"h",(function(){return f})),r.d(t,"i",(function(){return c})),r.d(t,"j",(function(){return p}));var i=r(6),n=r(87),s=r(95),a=r(175),o=r(81),l=r(146);const c={type:Boolean,value:!0,json:{origins:{"web-scene":{read:{source:["id","url","layerType"],reader(e,t){if(null!=t.screenSizePerspective||"defaults"!==this.originOf("screenSizePerspectiveEnabled"))return t.screenSizePerspective;Object(i.a)(this).store.set("screenSizePerspectiveEnabled",!1,0)}},write:{ignoreOrigin:!0,target:"screenSizePerspective",writer(e,t,r,i){("defaults"===this.originOf("screenSizePerspectiveEnabled")&&e||Object(s.a)(this,"screenSizePerspectiveEnabled",{},i))&&(t[r]=e)}}}}}},d={type:Boolean,value:!0,json:{name:"disablePopup",read:{reader:(e,t)=>!t.disablePopup},write:{enabled:!0,writer(e,t,r){t[r]=!e}}}},u={type:Boolean,value:!0,json:{name:"showLabels",write:!0}},p={type:String,json:{origins:{"portal-item":{write:!1}},write:{isRequired:!0,ignoreOrigin:!0,writer:n.f}}},b={type:Boolean,value:!0,json:{origins:{service:{read:{enabled:!1}}},name:"showLegend",write:!0}},h={value:null,type:l.a,json:{origins:{service:{name:"elevationInfo",write:!0}},name:"layerDefinition.elevationInfo",write:!0}};function f(e){return{type:e,readOnly:!0,json:{origins:{service:{read:!0}},read:!1}}}const y={type:Number,json:{origins:{"web-document":{default:1,write:!0,read:!0},"portal-item":{write:!0}}}},g={...y,json:{...y.json,origins:{"web-document":{...y.json.origins["web-document"],write:{enabled:!0,target:{opacity:{type:Number},"layerDefinition.drawingInfo.transparency":{type:Number}}}}},read:{source:["layerDefinition.drawingInfo.transparency","drawingInfo.transparency"],reader:(e,t,r)=>r&&"service"!==r.origin||!t.drawingInfo||void 0===t.drawingInfo.transparency?t.layerDefinition&&t.layerDefinition.drawingInfo&&void 0!==t.layerDefinition.drawingInfo.transparency?Object(a.b)(t.layerDefinition.drawingInfo.transparency):void 0:Object(a.b)(t.drawingInfo.transparency)}}},m={type:o.a,dependsOn:["view.timeExtent","layer.timeExtent","layer.timeInfo","layer.timeOffset","layer.timeOffset.value","layer.timeOffset.unit","layer.useViewTime"],readOnly:!0,get(){var e,t;if(!(null==(e=this.layer)?void 0:e.timeInfo))return null;const r=null==(t=this.view)?void 0:t.timeExtent,i=this.layer.timeExtent,n=this.layer.useViewTime?r&&i?r.intersection(i):r||i:i;if(!n||n.isEmpty)return n;const s=this.layer.timeOffset,a=s?n.offset(-s.value,s.unit):n,o=this._get("timeExtent");return a.equals(o)?o:a}}},99:function(e,t,r){"use strict";var i=r(24),n=(r(3),r(20),r(19)),s=r(7),a=(r(9),r(26)),o=r(25),l=r(10),c=r(4),d=(r(41),r(43)),u=(r(42),r(71)),p=r(70),b=(r(72),r(112)),h=r(170),f=r(98);let y=0;const g=s.a.getLogger("esri.layers.Layer");let m=class extends(b.a.EventedMixin(Object(h.a)(f.a))){constructor(){super(...arguments),this.attributionDataUrl=null,this.fullExtent=new p.a(-180,-90,180,90,u.a.WGS84),this.id=Date.now().toString(16)+"-layer-"+y++,this.legendEnabled=!0,this.listMode="show",this.opacity=1,this.parent=null,this.popupEnabled=!0,this.attributionVisible=!0,this.spatialReference=u.a.WGS84,this.title=null,this.type=null,this.url=null,this.visible=!0}static async fromArcGISServerUrl(e){const t="string"==typeof e?{url:e}:e,i=await r.e(78).then(r.bind(null,209));try{return await i.fromUrl(t)}catch(e){throw g.error("#fromArcGISServerUrl({ url: '"+t.url+"'})","Failed to create layer from arcgis server url",e),e}}static async fromPortalItem(e){const t="portalItem"in e?e:{portalItem:e},i=await r.e(79).then(r.bind(null,190));try{return await i.fromItem(t)}catch(e){const r=t&&t.portalItem,i=r&&r.id||"unset",s=r&&r.portal&&r.portal.url||n.a.portalUrl;throw g.error("#fromPortalItem()","Failed to create layer from portal item (portal: '"+s+"', id: '"+i+"')",e),e}}initialize(){this.when().catch(e=>{var t,r;s.a.getLogger(this.declaredClass).error("#load()",`Failed to load layer (title: '${null!=(t=this.title)?t:"no title"}', id: '${null!=(r=this.id)?r:"no id"}')`,{error:e})})}destroy(){if(this.parent){const e=this,t=this.parent;"layers"in t&&t.layers.includes(e)?t.layers.remove(e):"tables"in t&&t.tables.includes(e)?t.tables.remove(e):"baseLayers"in t&&t.baseLayers.includes(e)?t.baseLayers.remove(e):"baseLayers"in t&&t.referenceLayers.includes(e)&&t.referenceLayers.remove(e)}}get hasAttributionData(){return null!=this.attributionDataUrl}get parsedUrl(){const e=this._get("url");return e?Object(c.H)(e):null}async fetchAttributionData(){const e=this.attributionDataUrl;if(this.hasAttributionData&&e)return(await Object(d.default)(e,{query:{f:"json"},responseType:"json"})).data;throw new l.a("layer:no-attribution-data","Layer does not have attribution data")}};Object(i.a)([Object(a.b)({type:String})],m.prototype,"attributionDataUrl",void 0),Object(i.a)([Object(a.b)({type:p.a})],m.prototype,"fullExtent",void 0),Object(i.a)([Object(a.b)({readOnly:!0,dependsOn:["attributionDataUrl"]})],m.prototype,"hasAttributionData",null),Object(i.a)([Object(a.b)({type:String})],m.prototype,"id",void 0),Object(i.a)([Object(a.b)({type:Boolean,nonNullable:!0})],m.prototype,"legendEnabled",void 0),Object(i.a)([Object(a.b)({type:["show","hide","hide-children"]})],m.prototype,"listMode",void 0),Object(i.a)([Object(a.b)({type:Number,range:{min:0,max:1},nonNullable:!0})],m.prototype,"opacity",void 0),Object(i.a)([Object(a.b)()],m.prototype,"parent",void 0),Object(i.a)([Object(a.b)({readOnly:!0,dependsOn:["url"]})],m.prototype,"parsedUrl",null),Object(i.a)([Object(a.b)({type:Boolean})],m.prototype,"popupEnabled",void 0),Object(i.a)([Object(a.b)({type:Boolean})],m.prototype,"attributionVisible",void 0),Object(i.a)([Object(a.b)({type:u.a})],m.prototype,"spatialReference",void 0),Object(i.a)([Object(a.b)({type:String})],m.prototype,"title",void 0),Object(i.a)([Object(a.b)({type:String,readOnly:!0,json:{read:!1}})],m.prototype,"type",void 0),Object(i.a)([Object(a.b)()],m.prototype,"url",void 0),Object(i.a)([Object(a.b)({type:Boolean,nonNullable:!0})],m.prototype,"visible",void 0),m=Object(i.a)([Object(o.a)("esri.layers.Layer")],m);var O=m;t.a=O}});