self.webpackChunkRemoteClient([77],{102:function(e,t,n){"use strict";n.d(t,"a",(function(){return f})),n.d(t,"b",(function(){return d})),n.d(t,"c",(function(){return b}));var i,a,o,l=n(1);let r=void 0,u=void 0;const c=null!=(i=null==(a=l.a.esriConfig)?void 0:a.locale)?i:null==(o=l.a.dojoConfig)?void 0:o.locale;function s(){var e,t;return null!=(e=null!=c?c:null==(t=l.a.navigator)?void 0:t.language)?e:"en"}function d(){return void 0===u&&(u=s()),u}const p=[];function b(e){return p.push(e),{remove(){p.splice(p.indexOf(e),1)}}}const y=[];function f(e){return y.push(e),{remove(){p.splice(y.indexOf(e),1)}}}function v(){var e;const t=null!=(e=r)?e:s();u!==t&&(u=t,[...y].forEach(e=>{e.call(null,t)}),[...p].forEach(e=>{e.call(null,t)}))}null==l.a.addEventListener||l.a.addEventListener("languagechange",v)},107:function(e,t,n){"use strict";var i,a=n(24),o=(n(3),n(20),n(7),n(9)),l=n(26),r=n(67),u=n(69),c=n(68),s=n(25),d=(n(4),n(41),n(42),n(65)),p=n(149),b=n(219);const y=new r.a({binary:"binary",coordinate:"coordinate",countOrAmount:"count-or-amount",dateAndTime:"date-and-time",description:"description",locationOrPlaceName:"location-or-place-name",measurement:"measurement",nameOrTitle:"name-or-title",none:"none",orderedOrRanked:"ordered-or-ranked",percentageOrRatio:"percentage-or-ratio",typeOrCategory:"type-or-category",uniqueIdentifier:"unique-identifier"});let f=i=class extends d.a{constructor(e){super(e),this.alias=null,this.defaultValue=void 0,this.description=null,this.domain=null,this.editable=!0,this.length=-1,this.name=null,this.nullable=!0,this.type=null,this.valueType=null}readDescription(e,{description:t}){let n;try{n=JSON.parse(t)}catch(e){}return n?n.value:null}readValueType(e,{description:t}){let n;try{n=JSON.parse(t)}catch(e){}return n?y.fromJSON(n.fieldValueType):null}clone(){return new i({alias:this.alias,defaultValue:this.defaultValue,description:this.description,domain:this.domain&&this.domain.clone()||null,editable:this.editable,length:this.length,name:this.name,nullable:this.nullable,type:this.type,valueType:this.valueType})}};Object(a.a)([Object(l.b)({type:String,json:{write:!0}})],f.prototype,"alias",void 0),Object(a.a)([Object(l.b)({type:[String,Number],json:{write:{allowNull:!0}}})],f.prototype,"defaultValue",void 0),Object(a.a)([Object(l.b)()],f.prototype,"description",void 0),Object(a.a)([Object(c.a)("description")],f.prototype,"readDescription",null),Object(a.a)([Object(l.b)({types:p.d,json:{read:{reader:p.b},write:!0}})],f.prototype,"domain",void 0),Object(a.a)([Object(l.b)({type:Boolean,json:{write:!0}})],f.prototype,"editable",void 0),Object(a.a)([Object(l.b)({type:o.a,json:{write:!0}})],f.prototype,"length",void 0),Object(a.a)([Object(l.b)({type:String,json:{write:!0}})],f.prototype,"name",void 0),Object(a.a)([Object(l.b)({type:Boolean,json:{write:!0}})],f.prototype,"nullable",void 0),Object(a.a)([Object(u.a)(b.a)],f.prototype,"type",void 0),Object(a.a)([Object(l.b)()],f.prototype,"valueType",void 0),Object(a.a)([Object(c.a)("valueType",["description"])],f.prototype,"readValueType",null),f=i=Object(a.a)([Object(s.a)("esri.layers.support.Field")],f);var v=f;t.a=v},264:function(e,t,n){"use strict";function i(e){return e&&"esri.renderers.visualVariables.SizeVariable"===e.declaredClass}function a(e){return null!=e&&!isNaN(e)&&isFinite(e)}function o(e){return e.valueExpression?"expression":e.field&&"string"==typeof e.field?"field":"unknown"}function l(e,t){const n=t||o(e),i=e.valueUnit||"unknown";return"unknown"===n?"constant":e.stops?"stops":null!=e.minSize&&null!=e.maxSize&&null!=e.minDataValue&&null!=e.maxDataValue?"clamped-linear":"unknown"===i?null!=e.minSize&&null!=e.minDataValue?e.minSize&&e.minDataValue?"proportional":"additive":"identity":"real-world-size"}n.d(t,"a",(function(){return o})),n.d(t,"b",(function(){return l})),n.d(t,"c",(function(){return i})),n.d(t,"d",(function(){return a}))}});