import{b as Be,a as rn,u as sn,r as g,B as Oe,j as a,A as Me,ac as $e,ad as Re,ae as Pe,h as Le,L as Fe,_ as He,ag as Ve,Q as on,ah as an,ai as cn,aj as dn,ak as ln,al as un,am as fn}from"./index-35bd031f.js";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ct=function(e){const t=[];let n=0;for(let r=0;r<e.length;r++){let s=e.charCodeAt(r);s<128?t[n++]=s:s<2048?(t[n++]=s>>6|192,t[n++]=s&63|128):(s&64512)===55296&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(e.charCodeAt(++r)&1023),t[n++]=s>>18|240,t[n++]=s>>12&63|128,t[n++]=s>>6&63|128,t[n++]=s&63|128):(t[n++]=s>>12|224,t[n++]=s>>6&63|128,t[n++]=s&63|128)}return t},hn=function(e){const t=[];let n=0,r=0;for(;n<e.length;){const s=e[n++];if(s<128)t[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=e[n++];t[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=e[n++],i=e[n++],c=e[n++],d=((s&7)<<18|(o&63)<<12|(i&63)<<6|c&63)-65536;t[r++]=String.fromCharCode(55296+(d>>10)),t[r++]=String.fromCharCode(56320+(d&1023))}else{const o=e[n++],i=e[n++];t[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|i&63)}}return t.join("")},dt={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(e,t){if(!Array.isArray(e))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=t?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<e.length;s+=3){const o=e[s],i=s+1<e.length,c=i?e[s+1]:0,d=s+2<e.length,l=d?e[s+2]:0,u=o>>2,w=(o&3)<<4|c>>4;let S=(c&15)<<2|l>>6,y=l&63;d||(y=64,i||(S=64)),r.push(n[u],n[w],n[S],n[y])}return r.join("")},encodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?btoa(e):this.encodeByteArray(ct(e),t)},decodeString(e,t){return this.HAS_NATIVE_SUPPORT&&!t?atob(e):hn(this.decodeStringToByteArray(e,t))},decodeStringToByteArray(e,t){this.init_();const n=t?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<e.length;){const o=n[e.charAt(s++)],c=s<e.length?n[e.charAt(s)]:0;++s;const l=s<e.length?n[e.charAt(s)]:64;++s;const w=s<e.length?n[e.charAt(s)]:64;if(++s,o==null||c==null||l==null||w==null)throw new pn;const S=o<<2|c>>4;if(r.push(S),l!==64){const y=c<<4&240|l>>2;if(r.push(y),w!==64){const H=l<<6&192|w;r.push(H)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let e=0;e<this.ENCODED_VALS.length;e++)this.byteToCharMap_[e]=this.ENCODED_VALS.charAt(e),this.charToByteMap_[this.byteToCharMap_[e]]=e,this.byteToCharMapWebSafe_[e]=this.ENCODED_VALS_WEBSAFE.charAt(e),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]]=e,e>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)]=e,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)]=e)}}};class pn extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const gn=function(e){const t=ct(e);return dt.encodeByteArray(t,!0)},lt=function(e){return gn(e).replace(/\./g,"")},mn=function(e){try{return dt.decodeString(e,!0)}catch(t){console.error("base64Decode failed: ",t)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bn(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wn=()=>bn().__FIREBASE_DEFAULTS__,yn=()=>{if(typeof process>"u"||typeof process.env>"u")return;const e={}.__FIREBASE_DEFAULTS__;if(e)return JSON.parse(e)},In=()=>{if(typeof document>"u")return;let e;try{e=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const t=e&&mn(e[1]);return t&&JSON.parse(t)},vn=()=>{try{return wn()||yn()||In()}catch(e){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);return}},ut=()=>{var e;return(e=vn())===null||e===void 0?void 0:e.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((t,n)=>{this.resolve=t,this.reject=n})}wrapCallback(t){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof t=="function"&&(this.promise.catch(()=>{}),t.length===1?t(n):t(n,r))}}}function ft(){try{return typeof indexedDB=="object"}catch{return!1}}function ht(){return new Promise((e,t)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),e(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var o;t(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(n){t(n)}})}function _n(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn="FirebaseError";class B extends Error{constructor(t,n,r){super(n),this.code=t,this.customData=r,this.name=Sn,Object.setPrototypeOf(this,B.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,P.prototype.create)}}class P{constructor(t,n,r){this.service=t,this.serviceName=n,this.errors=r}create(t,...n){const r=n[0]||{},s=`${this.service}/${t}`,o=this.errors[t],i=o?An(o,r):"Error",c=`${this.serviceName}: ${i} (${s}).`;return new B(s,c,r)}}function An(e,t){return e.replace(Dn,(n,r)=>{const s=t[r];return s!=null?String(s):`<${r}?>`})}const Dn=/\{\$([^}]+)}/g;function ae(e,t){if(e===t)return!0;const n=Object.keys(e),r=Object.keys(t);for(const s of n){if(!r.includes(s))return!1;const o=e[s],i=t[s];if(Ke(o)&&Ke(i)){if(!ae(o,i))return!1}else if(o!==i)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Ke(e){return e!==null&&typeof e=="object"}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tn(e){return e&&e._delegate?e._delegate:e}class _{constructor(t,n,r){this.name=t,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(t){return this.instantiationMode=t,this}setMultipleInstances(t){return this.multipleInstances=t,this}setServiceProps(t){return this.serviceProps=t,this}setInstanceCreatedCallback(t){return this.onInstanceCreated=t,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const A="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(t,n){this.name=t,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(t){const n=this.normalizeInstanceIdentifier(t);if(!this.instancesDeferred.has(n)){const r=new En;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(t){var n;const r=this.normalizeInstanceIdentifier(t==null?void 0:t.identifier),s=(n=t==null?void 0:t.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(t){if(t.name!==this.name)throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=t,!!this.shouldAutoInitialize()){if(Nn(t))try{this.getOrInitializeService({instanceIdentifier:A})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(t=A){this.instancesDeferred.delete(t),this.instancesOptions.delete(t),this.instances.delete(t)}async delete(){const t=Array.from(this.instances.values());await Promise.all([...t.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...t.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(t=A){return this.instances.has(t)}getOptions(t=A){return this.instancesOptions.get(t)||{}}initialize(t={}){const{options:n={}}=t,r=this.normalizeInstanceIdentifier(t.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[o,i]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);r===c&&i.resolve(s)}return s}onInit(t,n){var r;const s=this.normalizeInstanceIdentifier(n),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(t),this.onInitCallbacks.set(s,o);const i=this.instances.get(s);return i&&t(i,s),()=>{o.delete(t)}}invokeOnInitCallbacks(t,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(t,n)}catch{}}getOrInitializeService({instanceIdentifier:t,options:n={}}){let r=this.instances.get(t);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:kn(t),options:n}),this.instances.set(t,r),this.instancesOptions.set(t,n),this.invokeOnInitCallbacks(r,t),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,t,r)}catch{}return r||null}normalizeInstanceIdentifier(t=A){return this.component?this.component.multipleInstances?t:A:t}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function kn(e){return e===A?void 0:e}function Nn(e){return e.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xn{constructor(t){this.name=t,this.providers=new Map}addComponent(t){const n=this.getProvider(t.name);if(n.isComponentSet())throw new Error(`Component ${t.name} has already been registered with ${this.name}`);n.setComponent(t)}addOrOverwriteComponent(t){this.getProvider(t.name).isComponentSet()&&this.providers.delete(t.name),this.addComponent(t)}getProvider(t){if(this.providers.has(t))return this.providers.get(t);const n=new Cn(t,this);return this.providers.set(t,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var h;(function(e){e[e.DEBUG=0]="DEBUG",e[e.VERBOSE=1]="VERBOSE",e[e.INFO=2]="INFO",e[e.WARN=3]="WARN",e[e.ERROR=4]="ERROR",e[e.SILENT=5]="SILENT"})(h||(h={}));const jn={debug:h.DEBUG,verbose:h.VERBOSE,info:h.INFO,warn:h.WARN,error:h.ERROR,silent:h.SILENT},Bn=h.INFO,On={[h.DEBUG]:"log",[h.VERBOSE]:"log",[h.INFO]:"info",[h.WARN]:"warn",[h.ERROR]:"error"},Mn=(e,t,...n)=>{if(t<e.logLevel)return;const r=new Date().toISOString(),s=On[t];if(s)console[s](`[${r}]  ${e.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${t})`)};class $n{constructor(t){this.name=t,this._logLevel=Bn,this._logHandler=Mn,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(t){if(!(t in h))throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);this._logLevel=t}setLogLevel(t){this._logLevel=typeof t=="string"?jn[t]:t}get logHandler(){return this._logHandler}set logHandler(t){if(typeof t!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=t}get userLogHandler(){return this._userLogHandler}set userLogHandler(t){this._userLogHandler=t}debug(...t){this._userLogHandler&&this._userLogHandler(this,h.DEBUG,...t),this._logHandler(this,h.DEBUG,...t)}log(...t){this._userLogHandler&&this._userLogHandler(this,h.VERBOSE,...t),this._logHandler(this,h.VERBOSE,...t)}info(...t){this._userLogHandler&&this._userLogHandler(this,h.INFO,...t),this._logHandler(this,h.INFO,...t)}warn(...t){this._userLogHandler&&this._userLogHandler(this,h.WARN,...t),this._logHandler(this,h.WARN,...t)}error(...t){this._userLogHandler&&this._userLogHandler(this,h.ERROR,...t),this._logHandler(this,h.ERROR,...t)}}const Rn=(e,t)=>t.some(n=>e instanceof n);let Ue,We;function Pn(){return Ue||(Ue=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ln(){return We||(We=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const pt=new WeakMap,ce=new WeakMap,gt=new WeakMap,G=new WeakMap,me=new WeakMap;function Fn(e){const t=new Promise((n,r)=>{const s=()=>{e.removeEventListener("success",o),e.removeEventListener("error",i)},o=()=>{n(b(e.result)),s()},i=()=>{r(e.error),s()};e.addEventListener("success",o),e.addEventListener("error",i)});return t.then(n=>{n instanceof IDBCursor&&pt.set(n,e)}).catch(()=>{}),me.set(t,e),t}function Hn(e){if(ce.has(e))return;const t=new Promise((n,r)=>{const s=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",i),e.removeEventListener("abort",i)},o=()=>{n(),s()},i=()=>{r(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",o),e.addEventListener("error",i),e.addEventListener("abort",i)});ce.set(e,t)}let de={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return ce.get(e);if(t==="objectStoreNames")return e.objectStoreNames||gt.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return b(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Vn(e){de=e(de)}function Kn(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(J(this),t,...n);return gt.set(r,t.sort?t.sort():[t]),b(r)}:Ln().includes(e)?function(...t){return e.apply(J(this),t),b(pt.get(this))}:function(...t){return b(e.apply(J(this),t))}}function Un(e){return typeof e=="function"?Kn(e):(e instanceof IDBTransaction&&Hn(e),Rn(e,Pn())?new Proxy(e,de):e)}function b(e){if(e instanceof IDBRequest)return Fn(e);if(G.has(e))return G.get(e);const t=Un(e);return t!==e&&(G.set(e,t),me.set(t,e)),t}const J=e=>me.get(e);function be(e,t,{blocked:n,upgrade:r,blocking:s,terminated:o}={}){const i=indexedDB.open(e,t),c=b(i);return r&&i.addEventListener("upgradeneeded",d=>{r(b(i.result),d.oldVersion,d.newVersion,b(i.transaction),d)}),n&&i.addEventListener("blocked",d=>n(d.oldVersion,d.newVersion,d)),c.then(d=>{o&&d.addEventListener("close",()=>o()),s&&d.addEventListener("versionchange",l=>s(l.oldVersion,l.newVersion,l))}).catch(()=>{}),c}function Y(e,{blocked:t}={}){const n=indexedDB.deleteDatabase(e);return t&&n.addEventListener("blocked",r=>t(r.oldVersion,r)),b(n).then(()=>{})}const Wn=["get","getKey","getAll","getAllKeys","count"],qn=["put","add","delete","clear"],X=new Map;function qe(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(X.get(t))return X.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,s=qn.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Wn.includes(n)))return;const o=async function(i,...c){const d=this.transaction(i,s?"readwrite":"readonly");let l=d.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[n](...c),s&&d.done]))[0]};return X.set(t,o),o}Vn(e=>({...e,get:(t,n,r)=>qe(t,n)||e.get(t,n,r),has:(t,n)=>!!qe(t,n)||e.has(t,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{constructor(t){this.container=t}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Gn(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Gn(e){const t=e.getComponent();return(t==null?void 0:t.type)==="VERSION"}const le="@firebase/app",ze="0.9.25";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const T=new $n("@firebase/app"),Jn="@firebase/app-compat",Yn="@firebase/analytics-compat",Xn="@firebase/analytics",Qn="@firebase/app-check-compat",Zn="@firebase/app-check",er="@firebase/auth",tr="@firebase/auth-compat",nr="@firebase/database",rr="@firebase/database-compat",sr="@firebase/functions",or="@firebase/functions-compat",ir="@firebase/installations",ar="@firebase/installations-compat",cr="@firebase/messaging",dr="@firebase/messaging-compat",lr="@firebase/performance",ur="@firebase/performance-compat",fr="@firebase/remote-config",hr="@firebase/remote-config-compat",pr="@firebase/storage",gr="@firebase/storage-compat",mr="@firebase/firestore",br="@firebase/firestore-compat",wr="firebase";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ue="[DEFAULT]",yr={[le]:"fire-core",[Jn]:"fire-core-compat",[Xn]:"fire-analytics",[Yn]:"fire-analytics-compat",[Zn]:"fire-app-check",[Qn]:"fire-app-check-compat",[er]:"fire-auth",[tr]:"fire-auth-compat",[nr]:"fire-rtdb",[rr]:"fire-rtdb-compat",[sr]:"fire-fn",[or]:"fire-fn-compat",[ir]:"fire-iid",[ar]:"fire-iid-compat",[cr]:"fire-fcm",[dr]:"fire-fcm-compat",[lr]:"fire-perf",[ur]:"fire-perf-compat",[fr]:"fire-rc",[hr]:"fire-rc-compat",[pr]:"fire-gcs",[gr]:"fire-gcs-compat",[mr]:"fire-fst",[br]:"fire-fst-compat","fire-js":"fire-js",[wr]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $=new Map,fe=new Map;function Ir(e,t){try{e.container.addComponent(t)}catch(n){T.debug(`Component ${t.name} failed to register with FirebaseApp ${e.name}`,n)}}function C(e){const t=e.name;if(fe.has(t))return T.debug(`There were multiple attempts to register component ${t}.`),!1;fe.set(t,e);for(const n of $.values())Ir(n,e);return!0}function we(e,t){const n=e.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),e.container.getProvider(t)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vr={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},I=new P("app","Firebase",vr);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(t,n,r){this._isDeleted=!1,this._options=Object.assign({},t),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new _("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(t){this.checkDestroyed(),this._automaticDataCollectionEnabled=t}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(t){this._isDeleted=t}checkDestroyed(){if(this.isDeleted)throw I.create("app-deleted",{appName:this._name})}}function mt(e,t={}){let n=e;typeof t!="object"&&(t={name:t});const r=Object.assign({name:ue,automaticDataCollectionEnabled:!1},t),s=r.name;if(typeof s!="string"||!s)throw I.create("bad-app-name",{appName:String(s)});if(n||(n=ut()),!n)throw I.create("no-options");const o=$.get(s);if(o){if(ae(n,o.options)&&ae(r,o.config))return o;throw I.create("duplicate-app",{appName:s})}const i=new xn(s);for(const d of fe.values())i.addComponent(d);const c=new Er(n,r,i);return $.set(s,c),c}function _r(e=ue){const t=$.get(e);if(!t&&e===ue&&ut())return mt();if(!t)throw I.create("no-app",{appName:e});return t}function v(e,t,n){var r;let s=(r=yr[e])!==null&&r!==void 0?r:e;n&&(s+=`-${n}`);const o=s.match(/\s|\//),i=t.match(/\s|\//);if(o||i){const c=[`Unable to register library "${s}" with version "${t}":`];o&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&i&&c.push("and"),i&&c.push(`version name "${t}" contains illegal characters (whitespace or "/")`),T.warn(c.join(" "));return}C(new _(`${s}-version`,()=>({library:s,version:t}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sr="firebase-heartbeat-database",Ar=1,O="firebase-heartbeat-store";let Q=null;function bt(){return Q||(Q=be(Sr,Ar,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(O)}}}).catch(e=>{throw I.create("idb-open",{originalErrorMessage:e.message})})),Q}async function Dr(e){try{return await(await bt()).transaction(O).objectStore(O).get(wt(e))}catch(t){if(t instanceof B)T.warn(t.message);else{const n=I.create("idb-get",{originalErrorMessage:t==null?void 0:t.message});T.warn(n.message)}}}async function Ge(e,t){try{const r=(await bt()).transaction(O,"readwrite");await r.objectStore(O).put(t,wt(e)),await r.done}catch(n){if(n instanceof B)T.warn(n.message);else{const r=I.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});T.warn(r.message)}}}function wt(e){return`${e.name}!${e.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tr=1024,Cr=30*24*60*60*1e3;class kr{constructor(t){this.container=t,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new xr(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var t,n;const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Je();if(!(((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(i=>i.date===o)))return this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(i=>{const c=new Date(i.date).valueOf();return Date.now()-c<=Cr}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var t;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Je(),{heartbeatsToSend:r,unsentEntries:s}=Nr(this._heartbeatsCache.heartbeats),o=lt(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}}function Je(){return new Date().toISOString().substring(0,10)}function Nr(e,t=Tr){const n=[];let r=e.slice();for(const s of e){const o=n.find(i=>i.agent===s.agent);if(o){if(o.dates.push(s.date),Ye(n)>t){o.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Ye(n)>t){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class xr{constructor(t){this.app=t,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return ft()?ht().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Dr(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(t){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ge(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:t.heartbeats})}else return}async add(t){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return Ge(this.app,{lastSentHeartbeatDate:(n=t.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...t.heartbeats]})}else return}}function Ye(e){return lt(JSON.stringify({version:2,heartbeats:e})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jr(e){C(new _("platform-logger",t=>new zn(t),"PRIVATE")),C(new _("heartbeat",t=>new kr(t),"PRIVATE")),v(le,ze,e),v(le,ze,"esm2017"),v("fire-js","")}jr("");const Br=(e,t)=>t.some(n=>e instanceof n);let Xe,Qe;function Or(){return Xe||(Xe=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Mr(){return Qe||(Qe=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const yt=new WeakMap,he=new WeakMap,It=new WeakMap,Z=new WeakMap,ye=new WeakMap;function $r(e){const t=new Promise((n,r)=>{const s=()=>{e.removeEventListener("success",o),e.removeEventListener("error",i)},o=()=>{n(E(e.result)),s()},i=()=>{r(e.error),s()};e.addEventListener("success",o),e.addEventListener("error",i)});return t.then(n=>{n instanceof IDBCursor&&yt.set(n,e)}).catch(()=>{}),ye.set(t,e),t}function Rr(e){if(he.has(e))return;const t=new Promise((n,r)=>{const s=()=>{e.removeEventListener("complete",o),e.removeEventListener("error",i),e.removeEventListener("abort",i)},o=()=>{n(),s()},i=()=>{r(e.error||new DOMException("AbortError","AbortError")),s()};e.addEventListener("complete",o),e.addEventListener("error",i),e.addEventListener("abort",i)});he.set(e,t)}let pe={get(e,t,n){if(e instanceof IDBTransaction){if(t==="done")return he.get(e);if(t==="objectStoreNames")return e.objectStoreNames||It.get(e);if(t==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return E(e[t])},set(e,t,n){return e[t]=n,!0},has(e,t){return e instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in e}};function Pr(e){pe=e(pe)}function Lr(e){return e===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(t,...n){const r=e.call(ee(this),t,...n);return It.set(r,t.sort?t.sort():[t]),E(r)}:Mr().includes(e)?function(...t){return e.apply(ee(this),t),E(yt.get(this))}:function(...t){return E(e.apply(ee(this),t))}}function Fr(e){return typeof e=="function"?Lr(e):(e instanceof IDBTransaction&&Rr(e),Br(e,Or())?new Proxy(e,pe):e)}function E(e){if(e instanceof IDBRequest)return $r(e);if(Z.has(e))return Z.get(e);const t=Fr(e);return t!==e&&(Z.set(e,t),ye.set(t,e)),t}const ee=e=>ye.get(e);function Hr(e,t,{blocked:n,upgrade:r,blocking:s,terminated:o}={}){const i=indexedDB.open(e,t),c=E(i);return r&&i.addEventListener("upgradeneeded",d=>{r(E(i.result),d.oldVersion,d.newVersion,E(i.transaction))}),n&&i.addEventListener("blocked",()=>n()),c.then(d=>{o&&d.addEventListener("close",()=>o()),s&&d.addEventListener("versionchange",()=>s())}).catch(()=>{}),c}const Vr=["get","getKey","getAll","getAllKeys","count"],Kr=["put","add","delete","clear"],te=new Map;function Ze(e,t){if(!(e instanceof IDBDatabase&&!(t in e)&&typeof t=="string"))return;if(te.get(t))return te.get(t);const n=t.replace(/FromIndex$/,""),r=t!==n,s=Kr.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Vr.includes(n)))return;const o=async function(i,...c){const d=this.transaction(i,s?"readwrite":"readonly");let l=d.store;return r&&(l=l.index(c.shift())),(await Promise.all([l[n](...c),s&&d.done]))[0]};return te.set(t,o),o}Pr(e=>({...e,get:(t,n,r)=>Ze(t,n)||e.get(t,n,r),has:(t,n)=>!!Ze(t,n)||e.has(t,n)}));const vt="@firebase/installations",Ie="0.6.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Et=1e4,_t=`w:${Ie}`,St="FIS_v2",Ur="https://firebaseinstallations.googleapis.com/v1",Wr=60*60*1e3,qr="installations",zr="Installations";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gr={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"not-registered":"Firebase Installation is not registered.","installation-not-found":"Firebase Installation not found.","request-failed":'{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',"app-offline":"Could not process request. Application offline.","delete-pending-registration":"Can't delete installation while there is a pending registration request."},k=new P(qr,zr,Gr);function At(e){return e instanceof B&&e.code.includes("request-failed")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dt({projectId:e}){return`${Ur}/projects/${e}/installations`}function Tt(e){return{token:e.token,requestStatus:2,expiresIn:Yr(e.expiresIn),creationTime:Date.now()}}async function Ct(e,t){const r=(await t.json()).error;return k.create("request-failed",{requestName:e,serverCode:r.code,serverMessage:r.message,serverStatus:r.status})}function kt({apiKey:e}){return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e})}function Jr(e,{refreshToken:t}){const n=kt(e);return n.append("Authorization",Xr(t)),n}async function Nt(e){const t=await e();return t.status>=500&&t.status<600?e():t}function Yr(e){return Number(e.replace("s","000"))}function Xr(e){return`${St} ${e}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qr({appConfig:e,heartbeatServiceProvider:t},{fid:n}){const r=Dt(e),s=kt(e),o=t.getImmediate({optional:!0});if(o){const l=await o.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const i={fid:n,authVersion:St,appId:e.appId,sdkVersion:_t},c={method:"POST",headers:s,body:JSON.stringify(i)},d=await Nt(()=>fetch(r,c));if(d.ok){const l=await d.json();return{fid:l.fid||n,registrationStatus:2,refreshToken:l.refreshToken,authToken:Tt(l.authToken)}}else throw await Ct("Create Installation",d)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xt(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zr(e){return btoa(String.fromCharCode(...e)).replace(/\+/g,"-").replace(/\//g,"_")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const es=/^[cdef][\w-]{21}$/,ge="";function ts(){try{const e=new Uint8Array(17);(self.crypto||self.msCrypto).getRandomValues(e),e[0]=112+e[0]%16;const n=ns(e);return es.test(n)?n:ge}catch{return ge}}function ns(e){return Zr(e).substr(0,22)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(e){return`${e.appName}!${e.appId}`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jt=new Map;function Bt(e,t){const n=L(e);Ot(n,t),rs(n,t)}function Ot(e,t){const n=jt.get(e);if(n)for(const r of n)r(t)}function rs(e,t){const n=ss();n&&n.postMessage({key:e,fid:t}),os()}let D=null;function ss(){return!D&&"BroadcastChannel"in self&&(D=new BroadcastChannel("[Firebase] FID Change"),D.onmessage=e=>{Ot(e.data.key,e.data.fid)}),D}function os(){jt.size===0&&D&&(D.close(),D=null)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const is="firebase-installations-database",as=1,N="firebase-installations-store";let ne=null;function ve(){return ne||(ne=Hr(is,as,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(N)}}})),ne}async function R(e,t){const n=L(e),s=(await ve()).transaction(N,"readwrite"),o=s.objectStore(N),i=await o.get(n);return await o.put(t,n),await s.done,(!i||i.fid!==t.fid)&&Bt(e,t.fid),t}async function Mt(e){const t=L(e),r=(await ve()).transaction(N,"readwrite");await r.objectStore(N).delete(t),await r.done}async function F(e,t){const n=L(e),s=(await ve()).transaction(N,"readwrite"),o=s.objectStore(N),i=await o.get(n),c=t(i);return c===void 0?await o.delete(n):await o.put(c,n),await s.done,c&&(!i||i.fid!==c.fid)&&Bt(e,c.fid),c}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ee(e){let t;const n=await F(e.appConfig,r=>{const s=cs(r),o=ds(e,s);return t=o.registrationPromise,o.installationEntry});return n.fid===ge?{installationEntry:await t}:{installationEntry:n,registrationPromise:t}}function cs(e){const t=e||{fid:ts(),registrationStatus:0};return $t(t)}function ds(e,t){if(t.registrationStatus===0){if(!navigator.onLine){const s=Promise.reject(k.create("app-offline"));return{installationEntry:t,registrationPromise:s}}const n={fid:t.fid,registrationStatus:1,registrationTime:Date.now()},r=ls(e,n);return{installationEntry:n,registrationPromise:r}}else return t.registrationStatus===1?{installationEntry:t,registrationPromise:us(e)}:{installationEntry:t}}async function ls(e,t){try{const n=await Qr(e,t);return R(e.appConfig,n)}catch(n){throw At(n)&&n.customData.serverCode===409?await Mt(e.appConfig):await R(e.appConfig,{fid:t.fid,registrationStatus:0}),n}}async function us(e){let t=await et(e.appConfig);for(;t.registrationStatus===1;)await xt(100),t=await et(e.appConfig);if(t.registrationStatus===0){const{installationEntry:n,registrationPromise:r}=await Ee(e);return r||n}return t}function et(e){return F(e,t=>{if(!t)throw k.create("installation-not-found");return $t(t)})}function $t(e){return fs(e)?{fid:e.fid,registrationStatus:0}:e}function fs(e){return e.registrationStatus===1&&e.registrationTime+Et<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hs({appConfig:e,heartbeatServiceProvider:t},n){const r=ps(e,n),s=Jr(e,n),o=t.getImmediate({optional:!0});if(o){const l=await o.getHeartbeatsHeader();l&&s.append("x-firebase-client",l)}const i={installation:{sdkVersion:_t,appId:e.appId}},c={method:"POST",headers:s,body:JSON.stringify(i)},d=await Nt(()=>fetch(r,c));if(d.ok){const l=await d.json();return Tt(l)}else throw await Ct("Generate Auth Token",d)}function ps(e,{fid:t}){return`${Dt(e)}/${t}/authTokens:generate`}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function _e(e,t=!1){let n;const r=await F(e.appConfig,o=>{if(!Rt(o))throw k.create("not-registered");const i=o.authToken;if(!t&&bs(i))return o;if(i.requestStatus===1)return n=gs(e,t),o;{if(!navigator.onLine)throw k.create("app-offline");const c=ys(o);return n=ms(e,c),c}});return n?await n:r.authToken}async function gs(e,t){let n=await tt(e.appConfig);for(;n.authToken.requestStatus===1;)await xt(100),n=await tt(e.appConfig);const r=n.authToken;return r.requestStatus===0?_e(e,t):r}function tt(e){return F(e,t=>{if(!Rt(t))throw k.create("not-registered");const n=t.authToken;return Is(n)?Object.assign(Object.assign({},t),{authToken:{requestStatus:0}}):t})}async function ms(e,t){try{const n=await hs(e,t),r=Object.assign(Object.assign({},t),{authToken:n});return await R(e.appConfig,r),n}catch(n){if(At(n)&&(n.customData.serverCode===401||n.customData.serverCode===404))await Mt(e.appConfig);else{const r=Object.assign(Object.assign({},t),{authToken:{requestStatus:0}});await R(e.appConfig,r)}throw n}}function Rt(e){return e!==void 0&&e.registrationStatus===2}function bs(e){return e.requestStatus===2&&!ws(e)}function ws(e){const t=Date.now();return t<e.creationTime||e.creationTime+e.expiresIn<t+Wr}function ys(e){const t={requestStatus:1,requestTime:Date.now()};return Object.assign(Object.assign({},e),{authToken:t})}function Is(e){return e.requestStatus===1&&e.requestTime+Et<Date.now()}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vs(e){const t=e,{installationEntry:n,registrationPromise:r}=await Ee(t);return r?r.catch(console.error):_e(t).catch(console.error),n.fid}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Es(e,t=!1){const n=e;return await _s(n),(await _e(n,t)).token}async function _s(e){const{registrationPromise:t}=await Ee(e);t&&await t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ss(e){if(!e||!e.options)throw re("App Configuration");if(!e.name)throw re("App Name");const t=["projectId","apiKey","appId"];for(const n of t)if(!e.options[n])throw re(n);return{appName:e.name,projectId:e.options.projectId,apiKey:e.options.apiKey,appId:e.options.appId}}function re(e){return k.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pt="installations",As="installations-internal",Ds=e=>{const t=e.getProvider("app").getImmediate(),n=Ss(t),r=we(t,"heartbeat");return{app:t,appConfig:n,heartbeatServiceProvider:r,_delete:()=>Promise.resolve()}},Ts=e=>{const t=e.getProvider("app").getImmediate(),n=we(t,Pt).getImmediate();return{getId:()=>vs(n),getToken:s=>Es(n,s)}};function Cs(){C(new _(Pt,Ds,"PUBLIC")),C(new _(As,Ts,"PRIVATE"))}Cs();v(vt,Ie);v(vt,Ie,"esm2017");/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ks="/firebase-messaging-sw.js",Ns="/firebase-cloud-messaging-push-scope",Lt="BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4",xs="https://fcmregistrations.googleapis.com/v1",Ft="google.c.a.c_id",js="google.c.a.c_l",Bs="google.c.a.ts",Os="google.c.a.e";var nt;(function(e){e[e.DATA_MESSAGE=1]="DATA_MESSAGE",e[e.DISPLAY_NOTIFICATION=3]="DISPLAY_NOTIFICATION"})(nt||(nt={}));/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 */var M;(function(e){e.PUSH_RECEIVED="push-received",e.NOTIFICATION_CLICKED="notification-clicked"})(M||(M={}));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function m(e){const t=new Uint8Array(e);return btoa(String.fromCharCode(...t)).replace(/=/g,"").replace(/\+/g,"-").replace(/\//g,"_")}function Ms(e){const t="=".repeat((4-e.length%4)%4),n=(e+t).replace(/\-/g,"+").replace(/_/g,"/"),r=atob(n),s=new Uint8Array(r.length);for(let o=0;o<r.length;++o)s[o]=r.charCodeAt(o);return s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const se="fcm_token_details_db",$s=5,rt="fcm_token_object_Store";async function Rs(e){if("databases"in indexedDB&&!(await indexedDB.databases()).map(o=>o.name).includes(se))return null;let t=null;return(await be(se,$s,{upgrade:async(r,s,o,i)=>{var c;if(s<2||!r.objectStoreNames.contains(rt))return;const d=i.objectStore(rt),l=await d.index("fcmSenderId").get(e);if(await d.clear(),!!l){if(s===2){const u=l;if(!u.auth||!u.p256dh||!u.endpoint)return;t={token:u.fcmToken,createTime:(c=u.createTime)!==null&&c!==void 0?c:Date.now(),subscriptionOptions:{auth:u.auth,p256dh:u.p256dh,endpoint:u.endpoint,swScope:u.swScope,vapidKey:typeof u.vapidKey=="string"?u.vapidKey:m(u.vapidKey)}}}else if(s===3){const u=l;t={token:u.fcmToken,createTime:u.createTime,subscriptionOptions:{auth:m(u.auth),p256dh:m(u.p256dh),endpoint:u.endpoint,swScope:u.swScope,vapidKey:m(u.vapidKey)}}}else if(s===4){const u=l;t={token:u.fcmToken,createTime:u.createTime,subscriptionOptions:{auth:m(u.auth),p256dh:m(u.p256dh),endpoint:u.endpoint,swScope:u.swScope,vapidKey:m(u.vapidKey)}}}}}})).close(),await Y(se),await Y("fcm_vapid_details_db"),await Y("undefined"),Ps(t)?t:null}function Ps(e){if(!e||!e.subscriptionOptions)return!1;const{subscriptionOptions:t}=e;return typeof e.createTime=="number"&&e.createTime>0&&typeof e.token=="string"&&e.token.length>0&&typeof t.auth=="string"&&t.auth.length>0&&typeof t.p256dh=="string"&&t.p256dh.length>0&&typeof t.endpoint=="string"&&t.endpoint.length>0&&typeof t.swScope=="string"&&t.swScope.length>0&&typeof t.vapidKey=="string"&&t.vapidKey.length>0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ls="firebase-messaging-database",Fs=1,x="firebase-messaging-store";let oe=null;function Se(){return oe||(oe=be(Ls,Fs,{upgrade:(e,t)=>{switch(t){case 0:e.createObjectStore(x)}}})),oe}async function Ht(e){const t=De(e),r=await(await Se()).transaction(x).objectStore(x).get(t);if(r)return r;{const s=await Rs(e.appConfig.senderId);if(s)return await Ae(e,s),s}}async function Ae(e,t){const n=De(e),s=(await Se()).transaction(x,"readwrite");return await s.objectStore(x).put(t,n),await s.done,t}async function Hs(e){const t=De(e),r=(await Se()).transaction(x,"readwrite");await r.objectStore(x).delete(t),await r.done}function De({appConfig:e}){return e.appId}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vs={"missing-app-config-values":'Missing App configuration value: "{$valueName}"',"only-available-in-window":"This method is available in a Window context.","only-available-in-sw":"This method is available in a service worker context.","permission-default":"The notification permission was not granted and dismissed instead.","permission-blocked":"The notification permission was not granted and blocked instead.","unsupported-browser":"This browser doesn't support the API's required to use the Firebase SDK.","indexed-db-unsupported":"This browser doesn't support indexedDb.open() (ex. Safari iFrame, Firefox Private Browsing, etc)","failed-service-worker-registration":"We are unable to register the default service worker. {$browserErrorMessage}","token-subscribe-failed":"A problem occurred while subscribing the user to FCM: {$errorInfo}","token-subscribe-no-token":"FCM returned no token when subscribing the user to push.","token-unsubscribe-failed":"A problem occurred while unsubscribing the user from FCM: {$errorInfo}","token-update-failed":"A problem occurred while updating the user from FCM: {$errorInfo}","token-update-no-token":"FCM returned no token when updating the user to push.","use-sw-after-get-token":"The useServiceWorker() method may only be called once and must be called before calling getToken() to ensure your service worker is used.","invalid-sw-registration":"The input to useServiceWorker() must be a ServiceWorkerRegistration.","invalid-bg-handler":"The input to setBackgroundMessageHandler() must be a function.","invalid-vapid-key":"The public VAPID key must be a string.","use-vapid-key-after-get-token":"The usePublicVapidKey() method may only be called once and must be called before calling getToken() to ensure your VAPID key is used."},p=new P("messaging","Messaging",Vs);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ks(e,t){const n=await Ce(e),r=Kt(t),s={method:"POST",headers:n,body:JSON.stringify(r)};let o;try{o=await(await fetch(Te(e.appConfig),s)).json()}catch(i){throw p.create("token-subscribe-failed",{errorInfo:i==null?void 0:i.toString()})}if(o.error){const i=o.error.message;throw p.create("token-subscribe-failed",{errorInfo:i})}if(!o.token)throw p.create("token-subscribe-no-token");return o.token}async function Us(e,t){const n=await Ce(e),r=Kt(t.subscriptionOptions),s={method:"PATCH",headers:n,body:JSON.stringify(r)};let o;try{o=await(await fetch(`${Te(e.appConfig)}/${t.token}`,s)).json()}catch(i){throw p.create("token-update-failed",{errorInfo:i==null?void 0:i.toString()})}if(o.error){const i=o.error.message;throw p.create("token-update-failed",{errorInfo:i})}if(!o.token)throw p.create("token-update-no-token");return o.token}async function Vt(e,t){const r={method:"DELETE",headers:await Ce(e)};try{const o=await(await fetch(`${Te(e.appConfig)}/${t}`,r)).json();if(o.error){const i=o.error.message;throw p.create("token-unsubscribe-failed",{errorInfo:i})}}catch(s){throw p.create("token-unsubscribe-failed",{errorInfo:s==null?void 0:s.toString()})}}function Te({projectId:e}){return`${xs}/projects/${e}/registrations`}async function Ce({appConfig:e,installations:t}){const n=await t.getToken();return new Headers({"Content-Type":"application/json",Accept:"application/json","x-goog-api-key":e.apiKey,"x-goog-firebase-installations-auth":`FIS ${n}`})}function Kt({p256dh:e,auth:t,endpoint:n,vapidKey:r}){const s={web:{endpoint:n,auth:t,p256dh:e}};return r!==Lt&&(s.web.applicationPubKey=r),s}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ws=7*24*60*60*1e3;async function qs(e){const t=await Js(e.swRegistration,e.vapidKey),n={vapidKey:e.vapidKey,swScope:e.swRegistration.scope,endpoint:t.endpoint,auth:m(t.getKey("auth")),p256dh:m(t.getKey("p256dh"))},r=await Ht(e.firebaseDependencies);if(r){if(Ys(r.subscriptionOptions,n))return Date.now()>=r.createTime+Ws?Gs(e,{token:r.token,createTime:Date.now(),subscriptionOptions:n}):r.token;try{await Vt(e.firebaseDependencies,r.token)}catch(s){console.warn(s)}return st(e.firebaseDependencies,n)}else return st(e.firebaseDependencies,n)}async function zs(e){const t=await Ht(e.firebaseDependencies);t&&(await Vt(e.firebaseDependencies,t.token),await Hs(e.firebaseDependencies));const n=await e.swRegistration.pushManager.getSubscription();return n?n.unsubscribe():!0}async function Gs(e,t){try{const n=await Us(e.firebaseDependencies,t),r=Object.assign(Object.assign({},t),{token:n,createTime:Date.now()});return await Ae(e.firebaseDependencies,r),n}catch(n){throw await zs(e),n}}async function st(e,t){const r={token:await Ks(e,t),createTime:Date.now(),subscriptionOptions:t};return await Ae(e,r),r.token}async function Js(e,t){const n=await e.pushManager.getSubscription();return n||e.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:Ms(t)})}function Ys(e,t){const n=t.vapidKey===e.vapidKey,r=t.endpoint===e.endpoint,s=t.auth===e.auth,o=t.p256dh===e.p256dh;return n&&r&&s&&o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(e){const t={from:e.from,collapseKey:e.collapse_key,messageId:e.fcmMessageId};return Xs(t,e),Qs(t,e),Zs(t,e),t}function Xs(e,t){if(!t.notification)return;e.notification={};const n=t.notification.title;n&&(e.notification.title=n);const r=t.notification.body;r&&(e.notification.body=r);const s=t.notification.image;s&&(e.notification.image=s);const o=t.notification.icon;o&&(e.notification.icon=o)}function Qs(e,t){t.data&&(e.data=t.data)}function Zs(e,t){var n,r,s,o,i;if(!t.fcmOptions&&!(!((n=t.notification)===null||n===void 0)&&n.click_action))return;e.fcmOptions={};const c=(s=(r=t.fcmOptions)===null||r===void 0?void 0:r.link)!==null&&s!==void 0?s:(o=t.notification)===null||o===void 0?void 0:o.click_action;c&&(e.fcmOptions.link=c);const d=(i=t.fcmOptions)===null||i===void 0?void 0:i.analytics_label;d&&(e.fcmOptions.analyticsLabel=d)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eo(e){return typeof e=="object"&&!!e&&Ft in e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ut("hts/frbslgigp.ogepscmv/ieo/eaylg","tp:/ieaeogn-agolai.o/1frlglgc/o");Ut("AzSCbw63g1R0nCw85jG8","Iaya3yLKwmgvh7cF0q4");function Ut(e,t){const n=[];for(let r=0;r<e.length;r++)n.push(e.charAt(r)),r<t.length&&n.push(t.charAt(r));return n.join("")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function to(e){if(!e||!e.options)throw ie("App Configuration Object");if(!e.name)throw ie("App Name");const t=["projectId","apiKey","appId","messagingSenderId"],{options:n}=e;for(const r of t)if(!n[r])throw ie(r);return{appName:e.name,projectId:n.projectId,apiKey:n.apiKey,appId:n.appId,senderId:n.messagingSenderId}}function ie(e){return p.create("missing-app-config-values",{valueName:e})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class no{constructor(t,n,r){this.deliveryMetricsExportedToBigQueryEnabled=!1,this.onBackgroundMessageHandler=null,this.onMessageHandler=null,this.logEvents=[],this.isLogServiceStarted=!1;const s=to(t);this.firebaseDependencies={app:t,appConfig:s,installations:n,analyticsProvider:r}}_delete(){return Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ro(e){try{e.swRegistration=await navigator.serviceWorker.register(ks,{scope:Ns}),e.swRegistration.update().catch(()=>{})}catch(t){throw p.create("failed-service-worker-registration",{browserErrorMessage:t==null?void 0:t.message})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function so(e,t){if(!t&&!e.swRegistration&&await ro(e),!(!t&&e.swRegistration)){if(!(t instanceof ServiceWorkerRegistration))throw p.create("invalid-sw-registration");e.swRegistration=t}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function oo(e,t){t?e.vapidKey=t:e.vapidKey||(e.vapidKey=Lt)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function io(e,t){if(!navigator)throw p.create("only-available-in-window");if(Notification.permission==="default"&&await Notification.requestPermission(),Notification.permission!=="granted")throw p.create("permission-blocked");return await oo(e,t==null?void 0:t.vapidKey),await so(e,t==null?void 0:t.serviceWorkerRegistration),qs(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ao(e,t,n){const r=co(t);(await e.firebaseDependencies.analyticsProvider.get()).logEvent(r,{message_id:n[Ft],message_name:n[js],message_time:n[Bs],message_device_time:Math.floor(Date.now()/1e3)})}function co(e){switch(e){case M.NOTIFICATION_CLICKED:return"notification_open";case M.PUSH_RECEIVED:return"notification_foreground";default:throw new Error}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function lo(e,t){const n=t.data;if(!n.isFirebaseMessaging)return;e.onMessageHandler&&n.messageType===M.PUSH_RECEIVED&&(typeof e.onMessageHandler=="function"?e.onMessageHandler(ot(n)):e.onMessageHandler.next(ot(n)));const r=n.data;eo(r)&&r[Os]==="1"&&await ao(e,n.messageType,r)}const it="@firebase/messaging",at="0.12.5";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uo=e=>{const t=new no(e.getProvider("app").getImmediate(),e.getProvider("installations-internal").getImmediate(),e.getProvider("analytics-internal"));return navigator.serviceWorker.addEventListener("message",n=>lo(t,n)),t},fo=e=>{const t=e.getProvider("messaging").getImmediate();return{getToken:r=>io(t,r)}};function ho(){C(new _("messaging",uo,"PUBLIC")),C(new _("messaging-internal",fo,"PRIVATE")),v(it,at),v(it,at,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function po(){try{await ht()}catch{return!1}return typeof window<"u"&&ft()&&_n()&&"serviceWorker"in navigator&&"PushManager"in window&&"Notification"in window&&"fetch"in window&&ServiceWorkerRegistration.prototype.hasOwnProperty("showNotification")&&PushSubscription.prototype.hasOwnProperty("getKey")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function go(e=_r()){return po().then(t=>{if(!t)throw p.create("unsupported-browser")},t=>{throw p.create("indexed-db-unsupported")}),we(Tn(e),"messaging").getImmediate()}ho();var mo="firebase",bo="10.7.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */v(mo,bo,"app");const wo={apiKey:"AIzaSyCsKTm-8nSXdKgh0m_Q-E2qgropUsVZuTo",authDomain:"notificationapp-af121.firebaseapp.com",projectId:"notificationapp-af121",storageBucket:"notificationapp-af121.appspot.com",messagingSenderId:"751987114008",appId:"1:751987114008:web:1ef170c205fcfd860b436d"},yo=mt(wo);go(yo);const _o=()=>{const e=Be(f=>f.BarberLogin),{loading:t,error:n}=e,r=Be(f=>f.AdminLogin),{loading:s,error:o}=r,i=rn(),c=sn(),[d,l]=g.useState(!1),u=()=>{l(!d)},w=localStorage.getItem("userLoggedIn"),S=localStorage.getItem("barberLoggedIn");g.useEffect(()=>{w=="true"?i("/admin-dashboard"):S=="true"&&i("/barber-dashboard")},[i,w,S]);const[y,H]=g.useState(""),[V,Wt]=g.useState(""),[K,qt]=g.useState(!1),[ke,Io]=g.useState(!0),zt=async()=>{var f;console.log("Yes i am admin");try{V?y?c(an({email:V,password:y},i)):alert("Password required"):alert("Email Required")}catch(j){console.log((f=j==null?void 0:j.response)==null?void 0:f.data)}},Gt=async f=>{console.log("admin"),c(cn(f.credential,i))},Jt=f=>{console.log(f)},[U,Yt]=g.useState("Admin"),Ne=(f,j)=>{Yt(j)},[W,Xt]=g.useState(""),[q,Qt]=g.useState(""),[z,Zt]=g.useState(!1),[xe,vo]=g.useState(!0),en=async()=>{console.log("Yes i am barber");try{if(!q)alert("Email Required");else if(!W)alert("Password required");else{const f={email:q,password:W};console.log(f),c(dn(f,i))}}catch(f){console.log(f)}},tn=async f=>{console.log("barber"),c(ln(f.credential,i))},nn=f=>{console.log(f)};g.useEffect(()=>{o&&Oe.error(o==null?void 0:o.message,{position:"top-right"})},[o,c]),g.useEffect(()=>{n&&Oe.error(n==null?void 0:n.message,{position:"top-right"})},[n,c]);const je=()=>{try{c({type:un,payload:{}}),c({type:fn,payload:{}}),i("/admin-signup")}catch(f){console.error("Error navigating:",f)}};return a.jsxs("main",{className:"signup",children:[a.jsx("div",{className:"left",children:a.jsx("img",{src:"https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000",alt:"signup"})}),a.jsx("div",{className:"right",children:a.jsxs("div",{className:"right_inner_container",children:[a.jsxs("div",{className:"tab-buttons",children:[a.jsx("button",{className:`tablinks ${U==="Admin"&&"active3"}`,onClick:f=>Ne(f,"Admin"),children:"Admin"}),a.jsx("button",{className:`tablinks ${U==="Barber"&&"active4"}`,onClick:f=>Ne(f,"Barber"),children:"Barber"})]}),a.jsx("div",{className:"tab-content",children:U=="Admin"?a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"divone",children:[a.jsx("h1",{children:"Sign In to your Admin Account"}),a.jsx("p",{children:"Welcome back Admin! please enter your detail"})]}),a.jsxs("div",{className:"divtwo",children:[ke&&a.jsx("p",{children:ke}),a.jsxs("div",{className:"input_container",children:[a.jsx("div",{children:a.jsx(Me,{})}),a.jsx("input",{type:"email",placeholder:"Email",value:V,onChange:f=>Wt(f.target.value)})]}),a.jsxs("div",{className:"input_container_password",children:[a.jsx("div",{className:"password_icon",children:a.jsx($e,{})}),a.jsx("input",{type:K?"text":"password",placeholder:"Password",value:y,onChange:f=>H(f.target.value),className:"password"}),a.jsx("div",{className:"toggle_password",onClick:()=>qt(!K),children:K?a.jsx(Re,{}):a.jsx(Pe,{})})]}),a.jsxs("div",{className:"lg-input_container_end",children:[a.jsxs("div",{children:[a.jsx("div",{style:{color:"white",backgroundColor:d?"black":""},onClick:u,children:a.jsx(Le,{})}),a.jsx("p",{children:"Remember me"})]}),a.jsx(Fe,{to:"/resetpassword",style:{textDecoration:"none"},children:a.jsx("p",{children:"Forgot Password?"})})]})]}),a.jsxs("button",{className:"divthree",onClick:zt,children:[s?a.jsx("div",{children:a.jsx(He,{color:"#fff"})}):"Sign In"," "]}),a.jsxs("div",{className:"divfour",children:[a.jsx("div",{}),a.jsx("p",{children:"Or sign in with"}),a.jsx("div",{})]}),a.jsx("div",{className:"divfive",children:a.jsx(Ve,{onSuccess:Gt,onError:Jt,size:"large",shape:"circle",width:310,logo_alignment:"left",text:"continue_with"})}),a.jsxs("p",{className:"divsix",children:["Don't have an account? ",a.jsx("p",{onClick:je,className:"link",children:a.jsx("strong",{children:"Sign Up"})})]})]}):a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:"divone",children:[a.jsx("h1",{children:"Sign In to your Barber Account"}),a.jsx("p",{children:"Welcome back Barber! please enter your detail"})]}),a.jsxs("div",{className:"divtwo",children:[xe&&a.jsx("p",{children:xe}),a.jsxs("div",{className:"input_container",children:[a.jsx("div",{children:a.jsx(Me,{})}),a.jsx("input",{type:"email",placeholder:"Email",value:q,onChange:f=>Qt(f.target.value)})]}),a.jsxs("div",{className:"input_container_password",children:[a.jsx("div",{className:"password_icon",children:a.jsx($e,{})}),a.jsx("input",{type:z?"text":"password",placeholder:"Password",value:W,onChange:f=>Xt(f.target.value),className:"password"}),a.jsx("div",{className:"toggle_password",onClick:()=>Zt(!z),children:z?a.jsx(Re,{}):a.jsx(Pe,{})})]}),a.jsxs("div",{className:"lg-input_container_end",children:[a.jsxs("div",{children:[a.jsx("div",{style:{color:"white",backgroundColor:d?"black":""},onClick:u,children:a.jsx(Le,{})}),a.jsx("p",{children:"Remember me"})]}),a.jsx(Fe,{to:"/barber-resetpassword",style:{textDecoration:"none"},children:a.jsx("p",{children:"Forgot Password?"})})]})]}),a.jsx("button",{className:"divthree",onClick:en,children:t?a.jsx("div",{children:a.jsx(He,{color:"#fff"})}):"Sign In"}),a.jsxs("div",{className:"divfour",children:[a.jsx("div",{}),a.jsx("p",{children:"Or sign in with"}),a.jsx("div",{})]}),a.jsx("div",{className:"divfive",children:a.jsx(Ve,{onSuccess:tn,onError:nn,size:"large",shape:"circle",width:310,logo_alignment:"left",text:"continue_with"})}),a.jsxs("p",{className:"divsix",children:["Don't have an account? ",a.jsx("p",{onClick:je,className:"link",children:a.jsx("strong",{children:"Sign Up"})})]})]})})]})}),a.jsx(on,{})]})};export{_o as default};
