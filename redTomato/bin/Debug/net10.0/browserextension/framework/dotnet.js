//! Licensed to the .NET Foundation under one or more agreements.
//! The .NET Foundation licenses this file to you under the MIT license.

var e=!1;const t=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,8,1,6,0,6,64,25,11,11])),o=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,15,1,13,0,65,1,253,15,65,2,253,15,253,128,2,11])),n=async()=>WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11])),r=Symbol.for("wasm promise_control");function i(e,t){let o=null;const n=new Promise((function(n,r){o={isDone:!1,promise:null,resolve:t=>{o.isDone||(o.isDone=!0,n(t),e&&e())},reject:e=>{o.isDone||(o.isDone=!0,r(e),t&&t())}}}));o.promise=n;const i=n;return i[r]=o,{promise:i,promise_control:o}}function s(e){return e[r]}function a(e){e&&function(e){return void 0!==e[r]}(e)||Be(!1,"Promise is not controllable")}const l="__mono_message__",c=["debug","log","trace","warn","info","error"],d="MONO_WASM: ";let u,f,m,g,p,h;function w(e){g=e}function b(e){if(Pe.diagnosticTracing){const t="function"==typeof e?e():e;console.debug(d+t)}}function y(e,...t){console.info(d+e,...t)}function v(e,...t){console.info(e,...t)}function E(e,...t){console.warn(d+e,...t)}function _(e,...t){if(t&&t.length>0&&t[0]&&"object"==typeof t[0]){if(t[0].silent)return;if(t[0].toString)return void console.error(d+e,t[0].toString())}console.error(d+e,...t)}function x(e,t,o){return function(...n){try{let r=n[0];if(void 0===r)r="undefined";else if(null===r)r="null";else if("function"==typeof r)r=r.toString();else if("string"!=typeof r)try{r=JSON.stringify(r)}catch(e){r=r.toString()}t(o?JSON.stringify({method:e,payload:r,arguments:n.slice(1)}):[e+r,...n.slice(1)])}catch(e){m.error(`proxyConsole failed: ${e}`)}}}function j(e,t,o){f=t,g=e,m={...t};const n=`${o}/console`.replace("https://","wss://").replace("http://","ws://");u=new WebSocket(n),u.addEventListener("error",A),u.addEventListener("close",S),function(){for(const e of c)f[e]=x(`console.${e}`,T,!0)}()}function R(e){let t=30;const o=()=>{u?0==u.bufferedAmount||0==t?(e&&v(e),function(){for(const e of c)f[e]=x(`console.${e}`,m.log,!1)}(),u.removeEventListener("error",A),u.removeEventListener("close",S),u.close(1e3,e),u=void 0):(t--,globalThis.setTimeout(o,100)):e&&m&&m.log(e)};o()}function T(e){u&&u.readyState===WebSocket.OPEN?u.send(e):m.log(e)}function A(e){m.error(`[${g}] proxy console websocket error: ${e}`,e)}function S(e){m.debug(`[${g}] proxy console websocket closed: ${e}`,e)}function D(){Pe.preferredIcuAsset=O(Pe.config);let e="invariant"==Pe.config.globalizationMode;if(!e)if(Pe.preferredIcuAsset)Pe.diagnosticTracing&&b("ICU data archive(s) available, disabling invariant mode");else{if("custom"===Pe.config.globalizationMode||"all"===Pe.config.globalizationMode||"sharded"===Pe.config.globalizationMode){const e="invariant globalization mode is inactive and no ICU data archives are available";throw _(`ERROR: ${e}`),new Error(e)}Pe.diagnosticTracing&&b("ICU data archive(s) not available, using invariant globalization mode"),e=!0,Pe.preferredIcuAsset=null}const t="DOTNET_SYSTEM_GLOBALIZATION_INVARIANT",o=Pe.config.environmentVariables;if(void 0===o[t]&&e&&(o[t]="1"),void 0===o.TZ)try{const e=Intl.DateTimeFormat().resolvedOptions().timeZone||null;e&&(o.TZ=e)}catch(e){y("failed to detect timezone, will fallback to UTC")}}function O(e){var t;if((null===(t=e.resources)||void 0===t?void 0:t.icu)&&"invariant"!=e.globalizationMode){const t=e.applicationCulture||(ke?globalThis.navigator&&globalThis.navigator.languages&&globalThis.navigator.languages[0]:Intl.DateTimeFormat().resolvedOptions().locale),o=e.resources.icu;let n=null;if("custom"===e.globalizationMode){if(o.length>=1)return o[0].name}else t&&"all"!==e.globalizationMode?"sharded"===e.globalizationMode&&(n=function(e){const t=e.split("-")[0];return"en"===t||["fr","fr-FR","it","it-IT","de","de-DE","es","es-ES"].includes(e)?"icudt_EFIGS.dat":["zh","ko","ja"].includes(t)?"icudt_CJK.dat":"icudt_no_CJK.dat"}(t)):n="icudt.dat";if(n)for(let e=0;e<o.length;e++){const t=o[e];if(t.virtualPath===n)return t.name}}return e.globalizationMode="invariant",null}(new Date).valueOf();const C=class{constructor(e){this.url=e}toString(){return this.url}};async function k(e,t){try{const o="function"==typeof globalThis.fetch;if(Se){const n=e.startsWith("file://");if(!n&&o)return globalThis.fetch(e,t||{credentials:"same-origin"});p||(h=Ne.require("url"),p=Ne.require("fs")),n&&(e=h.fileURLToPath(e));const r=await p.promises.readFile(e);return{ok:!0,headers:{length:0,get:()=>null},url:e,arrayBuffer:()=>r,json:()=>JSON.parse(r),text:()=>{throw new Error("NotImplementedException")}}}if(o)return globalThis.fetch(e,t||{credentials:"same-origin"});if("function"==typeof read)return{ok:!0,url:e,headers:{length:0,get:()=>null},arrayBuffer:()=>new Uint8Array(read(e,"binary")),json:()=>JSON.parse(read(e,"utf8")),text:()=>read(e,"utf8")}}catch(t){return{ok:!1,url:e,status:500,headers:{length:0,get:()=>null},statusText:"ERR28: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t},text:()=>{throw t}}}throw new Error("No fetch implementation available")}function I(e){return"string"!=typeof e&&Be(!1,"url must be a string"),!M(e)&&0!==e.indexOf("./")&&0!==e.indexOf("../")&&globalThis.URL&&globalThis.document&&globalThis.document.baseURI&&(e=new URL(e,globalThis.document.baseURI).toString()),e}const U=/^[a-zA-Z][a-zA-Z\d+\-.]*?:\/\//,P=/[a-zA-Z]:[\\/]/;function M(e){return Se||Ie?e.startsWith("/")||e.startsWith("\\")||-1!==e.indexOf("///")||P.test(e):U.test(e)}let L,N=0;const $=[],z=[],W=new Map,F={"js-module-threads":!0,"js-module-runtime":!0,"js-module-dotnet":!0,"js-module-native":!0,"js-module-diagnostics":!0},B={...F,"js-module-library-initializer":!0},V={...F,dotnetwasm:!0,heap:!0,manifest:!0},q={...B,manifest:!0},H={...B,dotnetwasm:!0},J={dotnetwasm:!0,symbols:!0},Z={...B,dotnetwasm:!0,symbols:!0},Q={symbols:!0};function G(e){return!("icu"==e.behavior&&e.name!=Pe.preferredIcuAsset)}function K(e,t,o){null!=t||(t=[]),Be(1==t.length,`Expect to have one ${o} asset in resources`);const n=t[0];return n.behavior=o,X(n),e.push(n),n}function X(e){V[e.behavior]&&W.set(e.behavior,e)}function Y(e){Be(V[e],`Unknown single asset behavior ${e}`);const t=W.get(e);if(t&&!t.resolvedUrl)if(t.resolvedUrl=Pe.locateFile(t.name),F[t.behavior]){const e=ge(t);e?("string"!=typeof e&&Be(!1,"loadBootResource response for 'dotnetjs' type should be a URL string"),t.resolvedUrl=e):t.resolvedUrl=ce(t.resolvedUrl,t.behavior)}else if("dotnetwasm"!==t.behavior)throw new Error(`Unknown single asset behavior ${e}`);return t}function ee(e){const t=Y(e);return Be(t,`Single asset for ${e} not found`),t}let te=!1;async function oe(){if(!te){te=!0,Pe.diagnosticTracing&&b("mono_download_assets");try{const e=[],t=[],o=(e,t)=>{!Z[e.behavior]&&G(e)&&Pe.expected_instantiated_assets_count++,!H[e.behavior]&&G(e)&&(Pe.expected_downloaded_assets_count++,t.push(se(e)))};for(const t of $)o(t,e);for(const e of z)o(e,t);Pe.allDownloadsQueued.promise_control.resolve(),Promise.all([...e,...t]).then((()=>{Pe.allDownloadsFinished.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),await Pe.runtimeModuleLoaded.promise;const n=async e=>{const t=await e;if(t.buffer){if(!Z[t.behavior]){t.buffer&&"object"==typeof t.buffer||Be(!1,"asset buffer must be array-like or buffer-like or promise of these"),"string"!=typeof t.resolvedUrl&&Be(!1,"resolvedUrl must be string");const e=t.resolvedUrl,o=await t.buffer,n=new Uint8Array(o);pe(t),await Ue.beforeOnRuntimeInitialized.promise,Ue.instantiate_asset(t,e,n)}}else J[t.behavior]?("symbols"===t.behavior&&(await Ue.instantiate_symbols_asset(t),pe(t)),J[t.behavior]&&++Pe.actual_downloaded_assets_count):(t.isOptional||Be(!1,"Expected asset to have the downloaded buffer"),!H[t.behavior]&&G(t)&&Pe.expected_downloaded_assets_count--,!Z[t.behavior]&&G(t)&&Pe.expected_instantiated_assets_count--)},r=[],i=[];for(const t of e)r.push(n(t));for(const e of t)i.push(n(e));Promise.all(r).then((()=>{Ce||Ue.coreAssetsInMemory.promise_control.resolve()})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e})),Promise.all(i).then((async()=>{Ce||(await Ue.coreAssetsInMemory.promise,Ue.allAssetsInMemory.promise_control.resolve())})).catch((e=>{throw Pe.err("Error in mono_download_assets: "+e),Xe(1,e),e}))}catch(e){throw Pe.err("Error in mono_download_assets: "+e),e}}}let ne=!1;function re(){if(ne)return;ne=!0;const e=Pe.config,t=[];if(e.assets)for(const t of e.assets)"object"!=typeof t&&Be(!1,`asset must be object, it was ${typeof t} : ${t}`),"string"!=typeof t.behavior&&Be(!1,"asset behavior must be known string"),"string"!=typeof t.name&&Be(!1,"asset name must be string"),t.resolvedUrl&&"string"!=typeof t.resolvedUrl&&Be(!1,"asset resolvedUrl could be string"),t.hash&&"string"!=typeof t.hash&&Be(!1,"asset resolvedUrl could be string"),t.pendingDownload&&"object"!=typeof t.pendingDownload&&Be(!1,"asset pendingDownload could be object"),t.isCore?$.push(t):z.push(t),X(t);else if(e.resources){const o=e.resources;o.wasmNative||Be(!1,"resources.wasmNative must be defined"),o.jsModuleNative||Be(!1,"resources.jsModuleNative must be defined"),o.jsModuleRuntime||Be(!1,"resources.jsModuleRuntime must be defined"),K(z,o.wasmNative,"dotnetwasm"),K(t,o.jsModuleNative,"js-module-native"),K(t,o.jsModuleRuntime,"js-module-runtime"),o.jsModuleDiagnostics&&K(t,o.jsModuleDiagnostics,"js-module-diagnostics");const n=(e,t,o)=>{const n=e;n.behavior=t,o?(n.isCore=!0,$.push(n)):z.push(n)};if(o.coreAssembly)for(let e=0;e<o.coreAssembly.length;e++)n(o.coreAssembly[e],"assembly",!0);if(o.assembly)for(let e=0;e<o.assembly.length;e++)n(o.assembly[e],"assembly",!o.coreAssembly);if(0!=e.debugLevel&&Pe.isDebuggingSupported()){if(o.corePdb)for(let e=0;e<o.corePdb.length;e++)n(o.corePdb[e],"pdb",!0);if(o.pdb)for(let e=0;e<o.pdb.length;e++)n(o.pdb[e],"pdb",!o.corePdb)}if(e.loadAllSatelliteResources&&o.satelliteResources)for(const e in o.satelliteResources)for(let t=0;t<o.satelliteResources[e].length;t++){const r=o.satelliteResources[e][t];r.culture=e,n(r,"resource",!o.coreAssembly)}if(o.coreVfs)for(let e=0;e<o.coreVfs.length;e++)n(o.coreVfs[e],"vfs",!0);if(o.vfs)for(let e=0;e<o.vfs.length;e++)n(o.vfs[e],"vfs",!o.coreVfs);const r=O(e);if(r&&o.icu)for(let e=0;e<o.icu.length;e++){const t=o.icu[e];t.name===r&&n(t,"icu",!1)}if(o.wasmSymbols)for(let e=0;e<o.wasmSymbols.length;e++)n(o.wasmSymbols[e],"symbols",!1)}if(e.appsettings)for(let t=0;t<e.appsettings.length;t++){const o=e.appsettings[t],n=he(o);"appsettings.json"!==n&&n!==`appsettings.${e.applicationEnvironment}.json`||z.push({name:o,behavior:"vfs",noCache:!0,useCredentials:!0})}e.assets=[...$,...z,...t]}async function ie(e){const t=await se(e);return await t.pendingDownloadInternal.response,t.buffer}async function se(e){try{return await ae(e)}catch(t){if(!Pe.enableDownloadRetry)throw t;if(Ie||Se)throw t;if(e.pendingDownload&&e.pendingDownloadInternal==e.pendingDownload)throw t;if(e.resolvedUrl&&-1!=e.resolvedUrl.indexOf("file://"))throw t;if(t&&404==t.status)throw t;e.pendingDownloadInternal=void 0,await Pe.allDownloadsQueued.promise;try{return Pe.diagnosticTracing&&b(`Retrying download '${e.name}'`),await ae(e)}catch(t){return e.pendingDownloadInternal=void 0,await new Promise((e=>globalThis.setTimeout(e,100))),Pe.diagnosticTracing&&b(`Retrying download (2) '${e.name}' after delay`),await ae(e)}}}async function ae(e){for(;L;)await L.promise;try{++N,N==Pe.maxParallelDownloads&&(Pe.diagnosticTracing&&b("Throttling further parallel downloads"),L=i());const t=await async function(e){if(e.pendingDownload&&(e.pendingDownloadInternal=e.pendingDownload),e.pendingDownloadInternal&&e.pendingDownloadInternal.response)return e.pendingDownloadInternal.response;if(e.buffer){const t=await e.buffer;return e.resolvedUrl||(e.resolvedUrl="undefined://"+e.name),e.pendingDownloadInternal={url:e.resolvedUrl,name:e.name,response:Promise.resolve({ok:!0,arrayBuffer:()=>t,json:()=>JSON.parse(new TextDecoder("utf-8").decode(t)),text:()=>{throw new Error("NotImplementedException")},headers:{get:()=>{}}})},e.pendingDownloadInternal.response}const t=e.loadRemote&&Pe.config.remoteSources?Pe.config.remoteSources:[""];let o;for(let n of t){n=n.trim(),"./"===n&&(n="");const t=le(e,n);e.name===t?Pe.diagnosticTracing&&b(`Attempting to download '${t}'`):Pe.diagnosticTracing&&b(`Attempting to download '${t}' for ${e.name}`);try{e.resolvedUrl=t;const n=fe(e);if(e.pendingDownloadInternal=n,o=await n.response,!o||!o.ok)continue;return o}catch(e){o||(o={ok:!1,url:t,status:0,statusText:""+e});continue}}const n=e.isOptional||e.name.match(/\.pdb$/)&&Pe.config.ignorePdbLoadErrors;if(o||Be(!1,`Response undefined ${e.name}`),!n){const t=new Error(`download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`);throw t.status=o.status,t}y(`optional download '${o.url}' for ${e.name} failed ${o.status} ${o.statusText}`)}(e);return t?(J[e.behavior]||(e.buffer=await t.arrayBuffer(),++Pe.actual_downloaded_assets_count),e):e}finally{if(--N,L&&N==Pe.maxParallelDownloads-1){Pe.diagnosticTracing&&b("Resuming more parallel downloads");const e=L;L=void 0,e.promise_control.resolve()}}}function le(e,t){let o;return null==t&&Be(!1,`sourcePrefix must be provided for ${e.name}`),e.resolvedUrl?o=e.resolvedUrl:(o=""===t?"assembly"===e.behavior||"pdb"===e.behavior?e.name:"resource"===e.behavior&&e.culture&&""!==e.culture?`${e.culture}/${e.name}`:e.name:t+e.name,o=ce(Pe.locateFile(o),e.behavior)),o&&"string"==typeof o||Be(!1,"attemptUrl need to be path or url string"),o}function ce(e,t){return Pe.modulesUniqueQuery&&q[t]&&(e+=Pe.modulesUniqueQuery),e}let de=0;const ue=new Set;function fe(e){try{e.resolvedUrl||Be(!1,"Request's resolvedUrl must be set");const t=function(e){let t=e.resolvedUrl;if(Pe.loadBootResource){const o=ge(e);if(o instanceof Promise)return o;"string"==typeof o&&(t=o)}const o={};return Pe.config.disableNoCacheFetch||(o.cache="no-cache"),e.useCredentials?o.credentials="include":!Pe.config.disableIntegrityCheck&&e.hash&&(o.integrity=e.hash),Pe.fetch_like(t,o)}(e),o={name:e.name,url:e.resolvedUrl,response:t};return ue.add(e.name),o.response.then((()=>{"assembly"==e.behavior&&Pe.loadedAssemblies.push(e.name),de++,Pe.onDownloadResourceProgress&&Pe.onDownloadResourceProgress(de,ue.size)})),o}catch(t){const o={ok:!1,url:e.resolvedUrl,status:500,statusText:"ERR29: "+t,arrayBuffer:()=>{throw t},json:()=>{throw t}};return{name:e.name,url:e.resolvedUrl,response:Promise.resolve(o)}}}const me={resource:"assembly",assembly:"assembly",pdb:"pdb",icu:"globalization",vfs:"configuration",manifest:"manifest",dotnetwasm:"dotnetwasm","js-module-dotnet":"dotnetjs","js-module-native":"dotnetjs","js-module-runtime":"dotnetjs","js-module-threads":"dotnetjs"};function ge(e){var t;if(Pe.loadBootResource){const o=null!==(t=e.hash)&&void 0!==t?t:"",n=e.resolvedUrl,r=me[e.behavior];if(r){const t=Pe.loadBootResource(r,e.name,n,o,e.behavior);return"string"==typeof t?I(t):t}}}function pe(e){e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null}function he(e){let t=e.lastIndexOf("/");return t>=0&&t++,e.substring(t)}async function we(e){e&&await Promise.all((null!=e?e:[]).map((e=>async function(e){try{const t=e.name;if(!e.moduleExports){const o=ce(Pe.locateFile(t),"js-module-library-initializer");Pe.diagnosticTracing&&b(`Attempting to import '${o}' for ${e}`),e.moduleExports=await (globalThis.importProxy?.bind(null, "framework") ?? (m => import(m)))(/*! webpackIgnore: true */o)}Pe.libraryInitializers.push({scriptName:t,exports:e.moduleExports})}catch(t){E(`Failed to import library initializer '${e}': ${t}`)}}(e))))}async function be(e,t){if(!Pe.libraryInitializers)return;const o=[];for(let n=0;n<Pe.libraryInitializers.length;n++){const r=Pe.libraryInitializers[n];r.exports[e]&&o.push(ye(r.scriptName,e,(()=>r.exports[e](...t))))}await Promise.all(o)}async function ye(e,t,o){try{await o()}catch(o){throw E(`Failed to invoke '${t}' on library initializer '${e}': ${o}`),Xe(1,o),o}}function ve(e,t){if(e===t)return e;const o={...t};return void 0!==o.assets&&o.assets!==e.assets&&(o.assets=[...e.assets||[],...o.assets||[]]),void 0!==o.resources&&(o.resources=_e(e.resources||{assembly:[],jsModuleNative:[],jsModuleRuntime:[],wasmNative:[]},o.resources)),void 0!==o.environmentVariables&&(o.environmentVariables={...e.environmentVariables||{},...o.environmentVariables||{}}),void 0!==o.runtimeOptions&&o.runtimeOptions!==e.runtimeOptions&&(o.runtimeOptions=[...e.runtimeOptions||[],...o.runtimeOptions||[]]),Object.assign(e,o)}function Ee(e,t){if(e===t)return e;const o={...t};return o.config&&(e.config||(e.config={}),o.config=ve(e.config,o.config)),Object.assign(e,o)}function _e(e,t){if(e===t)return e;const o={...t};return void 0!==o.coreAssembly&&(o.coreAssembly=[...e.coreAssembly||[],...o.coreAssembly||[]]),void 0!==o.assembly&&(o.assembly=[...e.assembly||[],...o.assembly||[]]),void 0!==o.lazyAssembly&&(o.lazyAssembly=[...e.lazyAssembly||[],...o.lazyAssembly||[]]),void 0!==o.corePdb&&(o.corePdb=[...e.corePdb||[],...o.corePdb||[]]),void 0!==o.pdb&&(o.pdb=[...e.pdb||[],...o.pdb||[]]),void 0!==o.jsModuleWorker&&(o.jsModuleWorker=[...e.jsModuleWorker||[],...o.jsModuleWorker||[]]),void 0!==o.jsModuleNative&&(o.jsModuleNative=[...e.jsModuleNative||[],...o.jsModuleNative||[]]),void 0!==o.jsModuleDiagnostics&&(o.jsModuleDiagnostics=[...e.jsModuleDiagnostics||[],...o.jsModuleDiagnostics||[]]),void 0!==o.jsModuleRuntime&&(o.jsModuleRuntime=[...e.jsModuleRuntime||[],...o.jsModuleRuntime||[]]),void 0!==o.wasmSymbols&&(o.wasmSymbols=[...e.wasmSymbols||[],...o.wasmSymbols||[]]),void 0!==o.wasmNative&&(o.wasmNative=[...e.wasmNative||[],...o.wasmNative||[]]),void 0!==o.icu&&(o.icu=[...e.icu||[],...o.icu||[]]),void 0!==o.satelliteResources&&(o.satelliteResources=function(e,t){if(e===t)return e;for(const o in t)e[o]=[...e[o]||[],...t[o]||[]];return e}(e.satelliteResources||{},o.satelliteResources||{})),void 0!==o.modulesAfterConfigLoaded&&(o.modulesAfterConfigLoaded=[...e.modulesAfterConfigLoaded||[],...o.modulesAfterConfigLoaded||[]]),void 0!==o.modulesAfterRuntimeReady&&(o.modulesAfterRuntimeReady=[...e.modulesAfterRuntimeReady||[],...o.modulesAfterRuntimeReady||[]]),void 0!==o.extensions&&(o.extensions={...e.extensions||{},...o.extensions||{}}),void 0!==o.vfs&&(o.vfs=[...e.vfs||[],...o.vfs||[]]),Object.assign(e,o)}function xe(){const e=Pe.config;if(e.environmentVariables=e.environmentVariables||{},e.runtimeOptions=e.runtimeOptions||[],e.resources=e.resources||{assembly:[],jsModuleNative:[],jsModuleWorker:[],jsModuleRuntime:[],wasmNative:[],vfs:[],satelliteResources:{}},e.assets){Pe.diagnosticTracing&&b("config.assets is deprecated, use config.resources instead");for(const t of e.assets){const o={};switch(t.behavior){case"assembly":o.assembly=[t];break;case"pdb":o.pdb=[t];break;case"resource":o.satelliteResources={},o.satelliteResources[t.culture]=[t];break;case"icu":o.icu=[t];break;case"symbols":o.wasmSymbols=[t];break;case"vfs":o.vfs=[t];break;case"dotnetwasm":o.wasmNative=[t];break;case"js-module-threads":o.jsModuleWorker=[t];break;case"js-module-runtime":o.jsModuleRuntime=[t];break;case"js-module-native":o.jsModuleNative=[t];break;case"js-module-diagnostics":o.jsModuleDiagnostics=[t];break;case"js-module-dotnet":break;default:throw new Error(`Unexpected behavior ${t.behavior} of asset ${t.name}`)}_e(e.resources,o)}}e.debugLevel,e.applicationEnvironment||(e.applicationEnvironment="Production"),e.applicationCulture&&(e.environmentVariables.LANG=`${e.applicationCulture}.UTF-8`),Ue.diagnosticTracing=Pe.diagnosticTracing=!!e.diagnosticTracing,Ue.waitForDebugger=e.waitForDebugger,Pe.maxParallelDownloads=e.maxParallelDownloads||Pe.maxParallelDownloads,Pe.enableDownloadRetry=void 0!==e.enableDownloadRetry?e.enableDownloadRetry:Pe.enableDownloadRetry}let je=!1;async function Re(e){var t;if(je)return void await Pe.afterConfigLoaded.promise;let o;try{if(e.configSrc||Pe.config&&0!==Object.keys(Pe.config).length&&(Pe.config.assets||Pe.config.resources)||(e.configSrc="dotnet.boot.js"),o=e.configSrc,je=!0,o&&(Pe.diagnosticTracing&&b("mono_wasm_load_config"),await async function(e){const t=e.configSrc,o=Pe.locateFile(t);let n=null;void 0!==Pe.loadBootResource&&(n=Pe.loadBootResource("manifest",t,o,"","manifest"));let r,i=null;if(n)if("string"==typeof n)n.includes(".json")?(i=await s(I(n)),r=await Ae(i)):r=(await (globalThis.importProxy?.bind(null, "framework") ?? (m => import(m)))(I(n))).config;else{const e=await n;"function"==typeof e.json?(i=e,r=await Ae(i)):r=e.config}else o.includes(".json")?(i=await s(ce(o,"manifest")),r=await Ae(i)):r=(await (globalThis.importProxy?.bind(null, "framework") ?? (m => import(m)))(ce(o,"manifest"))).config;function s(e){return Pe.fetch_like(e,{method:"GET",credentials:"include",cache:"no-cache"})}Pe.config.applicationEnvironment&&(r.applicationEnvironment=Pe.config.applicationEnvironment),ve(Pe.config,r)}(e)),xe(),await we(null===(t=Pe.config.resources)||void 0===t?void 0:t.modulesAfterConfigLoaded),await be("onRuntimeConfigLoaded",[Pe.config]),e.onConfigLoaded)try{await e.onConfigLoaded(Pe.config,Le),xe()}catch(e){throw _("onConfigLoaded() failed",e),e}xe(),Pe.afterConfigLoaded.promise_control.resolve(Pe.config)}catch(t){const n=`Failed to load config file ${o} ${t} ${null==t?void 0:t.stack}`;throw Pe.config=e.config=Object.assign(Pe.config,{message:n,error:t,isError:!0}),Xe(1,new Error(n)),t}}function Te(){return!!globalThis.navigator&&(Pe.isChromium||Pe.isFirefox)}async function Ae(e){const t=Pe.config,o=await e.json();t.applicationEnvironment||o.applicationEnvironment||(o.applicationEnvironment=e.headers.get("Blazor-Environment")||e.headers.get("DotNet-Environment")||void 0),o.environmentVariables||(o.environmentVariables={});const n=e.headers.get("DOTNET-MODIFIABLE-ASSEMBLIES");n&&(o.environmentVariables.DOTNET_MODIFIABLE_ASSEMBLIES=n);const r=e.headers.get("ASPNETCORE-BROWSER-TOOLS");return r&&(o.environmentVariables.__ASPNETCORE_BROWSER_TOOLS=r),o}"function"!=typeof importScripts||globalThis.onmessage||(globalThis.dotnetSidecar=!0);const Se="object"==typeof process&&"object"==typeof process.versions&&"string"==typeof process.versions.node,De="function"==typeof importScripts,Oe=De&&"undefined"!=typeof dotnetSidecar,Ce=De&&!Oe,ke="object"==typeof window||De&&!Se,Ie=!ke&&!Se;let Ue={},Pe={},Me={},Le={},Ne={},$e=!1;const ze={},We={config:ze},Fe={mono:{},binding:{},internal:Ne,module:We,loaderHelpers:Pe,runtimeHelpers:Ue,diagnosticHelpers:Me,api:Le};function Be(e,t){if(e)return;const o="Assert failed: "+("function"==typeof t?t():t),n=new Error(o);_(o,n),Ue.nativeAbort(n)}function Ve(){return void 0!==Pe.exitCode}function qe(){return Ue.runtimeReady&&!Ve()}function He(){Ve()&&Be(!1,`.NET runtime already exited with ${Pe.exitCode} ${Pe.exitReason}. You can use runtime.runMain() which doesn't exit the runtime.`),Ue.runtimeReady||Be(!1,".NET runtime didn't start yet. Please call dotnet.create() first.")}function Je(){ke&&(globalThis.addEventListener("unhandledrejection",et),globalThis.addEventListener("error",tt))}let Ze,Qe;function Ge(e){Qe&&Qe(e),Xe(e,Pe.exitReason)}function Ke(e){Ze&&Ze(e||Pe.exitReason),Xe(1,e||Pe.exitReason)}function Xe(t,o){var n,r;const i=o&&"object"==typeof o;t=i&&"number"==typeof o.status?o.status:void 0===t?-1:t;const s=i&&"string"==typeof o.message?o.message:""+o;(o=i?o:Ue.ExitStatus?function(e,t){const o=new Ue.ExitStatus(e);return o.message=t,o.toString=()=>t,o}(t,s):new Error("Exit with code "+t+" "+s)).status=t,o.message||(o.message=s);const a=""+(o.stack||(new Error).stack);try{Object.defineProperty(o,"stack",{get:()=>a})}catch(e){}const l=!!o.silent;if(o.silent=!0,Ve())Pe.diagnosticTracing&&b("mono_exit called after exit");else{try{We.onAbort==Ke&&(We.onAbort=Ze),We.onExit==Ge&&(We.onExit=Qe),ke&&(globalThis.removeEventListener("unhandledrejection",et),globalThis.removeEventListener("error",tt)),Ue.runtimeReady?(Ue.jiterpreter_dump_stats&&Ue.jiterpreter_dump_stats(!1),0===t&&(null===(n=Pe.config)||void 0===n?void 0:n.interopCleanupOnExit)&&Ue.forceDisposeProxies(!0,!0),e&&0!==t&&(null===(r=Pe.config)||void 0===r||r.dumpThreadsOnNonZeroExit)):(Pe.diagnosticTracing&&b(`abort_startup, reason: ${o}`),function(e){Pe.allDownloadsQueued.promise_control.reject(e),Pe.allDownloadsFinished.promise_control.reject(e),Pe.afterConfigLoaded.promise_control.reject(e),Pe.wasmCompilePromise.promise_control.reject(e),Pe.runtimeModuleLoaded.promise_control.reject(e),Ue.dotnetReady&&(Ue.dotnetReady.promise_control.reject(e),Ue.afterInstantiateWasm.promise_control.reject(e),Ue.beforePreInit.promise_control.reject(e),Ue.afterPreInit.promise_control.reject(e),Ue.afterPreRun.promise_control.reject(e),Ue.beforeOnRuntimeInitialized.promise_control.reject(e),Ue.afterOnRuntimeInitialized.promise_control.reject(e),Ue.afterPostRun.promise_control.reject(e))}(o))}catch(e){E("mono_exit A failed",e)}try{l||(function(e,t){if(0!==e&&t){const e=Ue.ExitStatus&&t instanceof Ue.ExitStatus?b:_;"string"==typeof t?e(t):(void 0===t.stack&&(t.stack=(new Error).stack+""),t.message?e(Ue.stringify_as_error_with_stack?Ue.stringify_as_error_with_stack(t.message+"\n"+t.stack):t.message+"\n"+t.stack):e(JSON.stringify(t)))}!Ce&&Pe.config&&(Pe.config.logExitCode?Pe.config.forwardConsoleLogsToWS?R("WASM EXIT "+e):v("WASM EXIT "+e):Pe.config.forwardConsoleLogsToWS&&R())}(t,o),function(e){if(ke&&!Ce&&Pe.config&&Pe.config.appendElementOnExit&&document){const t=document.createElement("label");t.id="tests_done",0!==e&&(t.style.background="red"),t.innerHTML=""+e,document.body.appendChild(t)}}(t))}catch(e){E("mono_exit B failed",e)}Pe.exitCode=t,Pe.exitReason||(Pe.exitReason=o),!Ce&&Ue.runtimeReady&&We.runtimeKeepalivePop()}if(Pe.config&&Pe.config.asyncFlushOnExit&&0===t)throw(async()=>{try{await async function(){try{const e=await (globalThis.importProxy?.bind(null, "framework") ?? (m => import(m)))(/*! webpackIgnore: true */"process"),t=e=>new Promise(((t,o)=>{e.on("error",o),e.end("","utf8",t)})),o=t(e.stderr),n=t(e.stdout);let r;const i=new Promise((e=>{r=setTimeout((()=>e("timeout")),1e3)}));await Promise.race([Promise.all([n,o]),i]),clearTimeout(r)}catch(e){_(`flushing std* streams failed: ${e}`)}}()}finally{Ye(t,o)}})(),o;Ye(t,o)}function Ye(e,t){if(Ue.runtimeReady&&Ue.nativeExit)try{Ue.nativeExit(e)}catch(e){!Ue.ExitStatus||e instanceof Ue.ExitStatus||E("set_exit_code_and_quit_now failed: "+e.toString())}if(0!==e||!ke)throw Se&&Ne.process?Ne.process.exit(e):Ue.quit&&Ue.quit(e,t),t}function et(e){ot(e,e.reason,"rejection")}function tt(e){ot(e,e.error,"error")}function ot(e,t,o){e.preventDefault();try{t||(t=new Error("Unhandled "+o)),void 0===t.stack&&(t.stack=(new Error).stack),t.stack=t.stack+"",t.silent||(_("Unhandled error:",t),Xe(1,t))}catch(e){}}!function(e){if($e)throw new Error("Loader module already loaded");$e=!0,Ue=e.runtimeHelpers,Pe=e.loaderHelpers,Me=e.diagnosticHelpers,Le=e.api,Ne=e.internal,Object.assign(Le,{INTERNAL:Ne,invokeLibraryInitializers:be}),Object.assign(e.module,{config:ve(ze,{environmentVariables:{}})});const r={mono_wasm_bindings_is_ready:!1,config:e.module.config,diagnosticTracing:!1,nativeAbort:e=>{throw e||new Error("abort")},nativeExit:e=>{throw new Error("exit:"+e)}},l={gitHash:"b0f34d51fccc69fd334253924abd8d6853fad7aa",config:e.module.config,diagnosticTracing:!1,maxParallelDownloads:16,enableDownloadRetry:!0,_loaded_files:[],loadedFiles:[],loadedAssemblies:[],libraryInitializers:[],workerNextNumber:1,actual_downloaded_assets_count:0,actual_instantiated_assets_count:0,expected_downloaded_assets_count:0,expected_instantiated_assets_count:0,afterConfigLoaded:i(),allDownloadsQueued:i(),allDownloadsFinished:i(),wasmCompilePromise:i(),runtimeModuleLoaded:i(),loadingWorkers:i(),is_exited:Ve,is_runtime_running:qe,assert_runtime_running:He,mono_exit:Xe,createPromiseController:i,getPromiseController:s,assertIsControllablePromise:a,mono_download_assets:oe,resolve_single_asset_path:ee,setup_proxy_console:j,set_thread_prefix:w,installUnhandledErrorHandler:Je,retrieve_asset_download:ie,invokeLibraryInitializers:be,isDebuggingSupported:Te,exceptions:t,simd:n,relaxedSimd:o};Object.assign(Ue,r),Object.assign(Pe,l)}(Fe);let nt,rt,it,st=!1,at=!1;async function lt(e){if(!at){if(at=!0,ke&&Pe.config.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&j("main",globalThis.console,globalThis.location.origin),We||Be(!1,"Null moduleConfig"),Pe.config||Be(!1,"Null moduleConfig.config"),"function"==typeof e){const t=e(Fe.api);if(t.ready)throw new Error("Module.ready couldn't be redefined.");Object.assign(We,t),Ee(We,t)}else{if("object"!=typeof e)throw new Error("Can't use moduleFactory callback of createDotnetRuntime function.");Ee(We,e)}await async function(e){if(Se){const e=await (globalThis.importProxy?.bind(null, "framework") ?? (m => import(m)))(/*! webpackIgnore: true */"process"),t=14;if(e.versions.node.split(".")[0]<t)throw new Error(`NodeJS at '${e.execPath}' has too low version '${e.versions.node}', please use at least ${t}. See also https://aka.ms/dotnet-wasm-features`)}const t=/*! webpackIgnore: true */import.meta.url,o=t.indexOf("?");var n;if(o>0&&(Pe.modulesUniqueQuery=t.substring(o)),Pe.scriptUrl=t.replace(/\\/g,"/").replace(/[?#].*/,""),Pe.scriptDirectory=(n=Pe.scriptUrl).slice(0,n.lastIndexOf("/"))+"/",Pe.locateFile=e=>"URL"in globalThis&&globalThis.URL!==C?new URL(e,Pe.scriptDirectory).toString():M(e)?e:Pe.scriptDirectory+e,Pe.fetch_like=k,Pe.out=console.log,Pe.err=console.error,Pe.onDownloadResourceProgress=e.onDownloadResourceProgress,ke&&globalThis.navigator){const e=globalThis.navigator,t=e.userAgentData&&e.userAgentData.brands;t&&t.length>0?Pe.isChromium=t.some((e=>"Google Chrome"===e.brand||"Microsoft Edge"===e.brand||"Chromium"===e.brand)):e.userAgent&&(Pe.isChromium=e.userAgent.includes("Chrome"),Pe.isFirefox=e.userAgent.includes("Firefox"))}Ne.require=Se?await (globalThis.importProxy?.bind(null, "framework") ?? (m => import(m)))(/*! webpackIgnore: true */"module").then((e=>e.createRequire(/*! webpackIgnore: true */import.meta.url))):Promise.resolve((()=>{throw new Error("require not supported")})),void 0===globalThis.URL&&(globalThis.URL=C)}(We)}}async function ct(e){return await lt(e),Ze=We.onAbort,Qe=We.onExit,We.onAbort=Ke,We.onExit=Ge,We.ENVIRONMENT_IS_PTHREAD?async function(){(function(){const e=new MessageChannel,t=e.port1,o=e.port2;t.addEventListener("message",(e=>{var n,r;n=JSON.parse(e.data.config),r=JSON.parse(e.data.monoThreadInfo),st?Pe.diagnosticTracing&&b("mono config already received"):(ve(Pe.config,n),Ue.monoThreadInfo=r,xe(),Pe.diagnosticTracing&&b("mono config received"),st=!0,Pe.afterConfigLoaded.promise_control.resolve(Pe.config),ke&&n.forwardConsoleLogsToWS&&void 0!==globalThis.WebSocket&&Pe.setup_proxy_console("worker-idle",console,globalThis.location.origin)),t.close(),o.close()}),{once:!0}),t.start(),self.postMessage({[l]:{monoCmd:"preload",port:o}},[o])})(),await Pe.afterConfigLoaded.promise,function(){const e=Pe.config;e.assets||Be(!1,"config.assets must be defined");for(const t of e.assets)X(t),Q[t.behavior]&&z.push(t)}(),setTimeout((async()=>{try{await oe()}catch(e){Xe(1,e)}}),0);const e=dt(),t=await Promise.all(e);return await ut(t),We}():async function(){var e;await Re(We),re();const t=dt();(async function(){try{const e=ee("dotnetwasm");await se(e),e&&e.pendingDownloadInternal&&e.pendingDownloadInternal.response||Be(!1,"Can't load dotnet.native.wasm");const t=await e.pendingDownloadInternal.response,o=t.headers&&t.headers.get?t.headers.get("Content-Type"):void 0;let n;if("function"==typeof WebAssembly.compileStreaming&&"application/wasm"===o)n=await WebAssembly.compileStreaming(t);else{ke&&"application/wasm"!==o&&E('WebAssembly resource does not have the expected content type "application/wasm", so falling back to slower ArrayBuffer instantiation.');const e=await t.arrayBuffer();Pe.diagnosticTracing&&b("instantiate_wasm_module buffered"),n=Ie?await Promise.resolve(new WebAssembly.Module(e)):await WebAssembly.compile(e)}e.pendingDownloadInternal=null,e.pendingDownload=null,e.buffer=null,e.moduleExports=null,Pe.wasmCompilePromise.promise_control.resolve(n)}catch(e){Pe.wasmCompilePromise.promise_control.reject(e)}})(),setTimeout((async()=>{try{D(),await oe()}catch(e){Xe(1,e)}}),0);const o=await Promise.all(t);return await ut(o),await Ue.dotnetReady.promise,await we(null===(e=Pe.config.resources)||void 0===e?void 0:e.modulesAfterRuntimeReady),await be("onRuntimeReady",[Fe.api]),Le}()}function dt(){const e=ee("js-module-runtime"),t=ee("js-module-native");if(nt&&rt)return[nt,rt,it];"object"==typeof e.moduleExports?nt=e.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${e.resolvedUrl}' for ${e.name}`),nt=(globalThis.importProxy?.bind(null, "framework") ?? (m => import(m)))(/*! webpackIgnore: true */e.resolvedUrl)),"object"==typeof t.moduleExports?rt=t.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${t.resolvedUrl}' for ${t.name}`),rt=(globalThis.importProxy?.bind(null, "framework") ?? (m => import(m)))(/*! webpackIgnore: true */t.resolvedUrl));const o=Y("js-module-diagnostics");return o&&("object"==typeof o.moduleExports?it=o.moduleExports:(Pe.diagnosticTracing&&b(`Attempting to import '${o.resolvedUrl}' for ${o.name}`),it=(globalThis.importProxy?.bind(null, "framework") ?? (m => import(m)))(/*! webpackIgnore: true */o.resolvedUrl))),[nt,rt,it]}async function ut(e){const{initializeExports:t,initializeReplacements:o,configureRuntimeStartup:n,configureEmscriptenStartup:r,configureWorkerStartup:i,setRuntimeGlobals:s,passEmscriptenInternals:a}=e[0],{default:l}=e[1],c=e[2];s(Fe),t(Fe),c&&c.setRuntimeGlobals(Fe),await n(We),Pe.runtimeModuleLoaded.promise_control.resolve(),l((e=>(Object.assign(We,{ready:e.ready,__dotnet_runtime:{initializeReplacements:o,configureEmscriptenStartup:r,configureWorkerStartup:i,passEmscriptenInternals:a}}),We))).catch((e=>{if(e.message&&e.message.toLowerCase().includes("out of memory"))throw new Error(".NET runtime has failed to start, because too much memory was requested. Please decrease the memory by adjusting EmccMaximumHeapSize. See also https://aka.ms/dotnet-wasm-features");throw e}))}const ft=new class{withModuleConfig(e){try{return Ee(We,e),this}catch(e){throw Xe(1,e),e}}withOnConfigLoaded(e){try{return Ee(We,{onConfigLoaded:e}),this}catch(e){throw Xe(1,e),e}}withConsoleForwarding(){try{return ve(ze,{forwardConsoleLogsToWS:!0}),this}catch(e){throw Xe(1,e),e}}withExitOnUnhandledError(){try{return ve(ze,{exitOnUnhandledError:!0}),Je(),this}catch(e){throw Xe(1,e),e}}withAsyncFlushOnExit(){try{return ve(ze,{asyncFlushOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withExitCodeLogging(){try{return ve(ze,{logExitCode:!0}),this}catch(e){throw Xe(1,e),e}}withElementOnExit(){try{return ve(ze,{appendElementOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withInteropCleanupOnExit(){try{return ve(ze,{interopCleanupOnExit:!0}),this}catch(e){throw Xe(1,e),e}}withDumpThreadsOnNonZeroExit(){try{return ve(ze,{dumpThreadsOnNonZeroExit:!0}),this}catch(e){throw Xe(1,e),e}}withWaitingForDebugger(e){try{return ve(ze,{waitForDebugger:e}),this}catch(e){throw Xe(1,e),e}}withInterpreterPgo(e,t){try{return ve(ze,{interpreterPgo:e,interpreterPgoSaveDelay:t}),ze.runtimeOptions?ze.runtimeOptions.push("--interp-pgo-recording"):ze.runtimeOptions=["--interp-pgo-recording"],this}catch(e){throw Xe(1,e),e}}withConfig(e){try{return ve(ze,e),this}catch(e){throw Xe(1,e),e}}withConfigSrc(e){try{return e&&"string"==typeof e||Be(!1,"must be file path or URL"),Ee(We,{configSrc:e}),this}catch(e){throw Xe(1,e),e}}withVirtualWorkingDirectory(e){try{return e&&"string"==typeof e||Be(!1,"must be directory path"),ve(ze,{virtualWorkingDirectory:e}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariable(e,t){try{const o={};return o[e]=t,ve(ze,{environmentVariables:o}),this}catch(e){throw Xe(1,e),e}}withEnvironmentVariables(e){try{return e&&"object"==typeof e||Be(!1,"must be dictionary object"),ve(ze,{environmentVariables:e}),this}catch(e){throw Xe(1,e),e}}withDiagnosticTracing(e){try{return"boolean"!=typeof e&&Be(!1,"must be boolean"),ve(ze,{diagnosticTracing:e}),this}catch(e){throw Xe(1,e),e}}withDebugging(e){try{return null!=e&&"number"==typeof e||Be(!1,"must be number"),ve(ze,{debugLevel:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArguments(...e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ve(ze,{applicationArguments:e}),this}catch(e){throw Xe(1,e),e}}withRuntimeOptions(e){try{return e&&Array.isArray(e)||Be(!1,"must be array of strings"),ze.runtimeOptions?ze.runtimeOptions.push(...e):ze.runtimeOptions=e,this}catch(e){throw Xe(1,e),e}}withMainAssembly(e){try{return ve(ze,{mainAssemblyName:e}),this}catch(e){throw Xe(1,e),e}}withApplicationArgumentsFromQuery(){try{if(!globalThis.window)throw new Error("Missing window to the query parameters from");if(void 0===globalThis.URLSearchParams)throw new Error("URLSearchParams is supported");const e=new URLSearchParams(globalThis.window.location.search).getAll("arg");return this.withApplicationArguments(...e)}catch(e){throw Xe(1,e),e}}withApplicationEnvironment(e){try{return ve(ze,{applicationEnvironment:e}),this}catch(e){throw Xe(1,e),e}}withApplicationCulture(e){try{return ve(ze,{applicationCulture:e}),this}catch(e){throw Xe(1,e),e}}withResourceLoader(e){try{return Pe.loadBootResource=e,this}catch(e){throw Xe(1,e),e}}async download(){try{await async function(){lt(We),await Re(We),re(),D(),oe(),await Pe.allDownloadsFinished.promise}()}catch(e){throw Xe(1,e),e}}async create(){try{return this.instance||(this.instance=await async function(){return await ct(We),Fe.api}()),this.instance}catch(e){throw Xe(1,e),e}}async run(){try{return We.config||Be(!1,"Null moduleConfig.config"),this.instance||await this.create(),this.instance.runMainAndExit()}catch(e){throw Xe(1,e),e}}},mt=Xe,gt=ct;Ie||"function"==typeof globalThis.URL||Be(!1,"This browser/engine doesn't support URL API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),"function"!=typeof globalThis.BigInt64Array&&Be(!1,"This browser/engine doesn't support BigInt64Array API. Please use a modern version. See also https://aka.ms/dotnet-wasm-features"),ft.withConfig(/*json-start*/{
  "mainAssemblyName": "redTomato",
  "applicationEnvironment": "Development",
  "resources": {
    "hash": "sha256-pdzf7C2m1I5YCsm5f99/xseyqw0F4W02Kr2X00+bmC8=",
    "jsModuleNative": [
      {
        "name": "dotnet.native.js"
      }
    ],
    "jsModuleRuntime": [
      {
        "name": "dotnet.runtime.js"
      }
    ],
    "wasmNative": [
      {
        "name": "dotnet.native.wasm",
        "integrity": "sha256-Jq16DJlsNP/EZy3u5dUfhPu0r4vqciQE3d0LSaelSes="
      }
    ],
    "icu": [
      {
        "virtualPath": "icudt_CJK.dat",
        "name": "icudt_CJK.dat",
        "integrity": "sha256-SZLtQnRc0JkwqHab0VUVP7T3uBPSeYzxzDnpxPpUnHk="
      },
      {
        "virtualPath": "icudt_EFIGS.dat",
        "name": "icudt_EFIGS.dat",
        "integrity": "sha256-8fItetYY8kQ0ww6oxwTLiT3oXlBwHKumbeP2pRF4yTc="
      },
      {
        "virtualPath": "icudt_no_CJK.dat",
        "name": "icudt_no_CJK.dat",
        "integrity": "sha256-L7sV7NEYP37/Qr2FPCePo5cJqRgTXRwGHuwF5Q+0Nfs="
      }
    ],
    "coreAssembly": [
      {
        "virtualPath": "System.Runtime.InteropServices.JavaScript.wasm",
        "name": "System.Runtime.InteropServices.JavaScript.wasm",
        "integrity": "sha256-KDEGwvLuPsW2U5IWosNGLuFfvvsnc51nttHvW1jBuyQ="
      },
      {
        "virtualPath": "System.Private.CoreLib.wasm",
        "name": "System.Private.CoreLib.wasm",
        "integrity": "sha256-UPqXyIy+Vhy/9g3REe6SNZ90Yu2D6FU+kG6v4KTNqkM="
      }
    ],
    "assembly": [
      {
        "virtualPath": "Blazor.BrowserExtension.wasm",
        "name": "Blazor.BrowserExtension.wasm",
        "integrity": "sha256-6MB9CNIfXpnf6nuxX4HEqCzLk+CrjSUFBLxvH4o9SW8="
      },
      {
        "virtualPath": "JsBind.Net.wasm",
        "name": "JsBind.Net.wasm",
        "integrity": "sha256-KJDeIE93hY+QLogN1KU93ON4HI38nmr3sFRA/eOMusQ="
      },
      {
        "virtualPath": "JsBind.Net.Extensions.DependencyInjection.wasm",
        "name": "JsBind.Net.Extensions.DependencyInjection.wasm",
        "integrity": "sha256-IQvHtxYLBjZSMHanI+gzFnDMdFAPCKYqXhCJccZZzCo="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Authorization.wasm",
        "name": "Microsoft.AspNetCore.Authorization.wasm",
        "integrity": "sha256-q+EkKN9BLcIwLCOVyaecX4eEO6XppOqATijxWzC6otk="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.wasm",
        "name": "Microsoft.AspNetCore.Components.wasm",
        "integrity": "sha256-SlKk2Iszf1CasiPULCl216i2/uWoh0CI0Z1VbByD88w="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Forms.wasm",
        "name": "Microsoft.AspNetCore.Components.Forms.wasm",
        "integrity": "sha256-rk1EVOse3i6uXcKoua15buyKg1mSrNlf2wFTOm2iH20="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.Web.wasm",
        "name": "Microsoft.AspNetCore.Components.Web.wasm",
        "integrity": "sha256-bOpvG+4/gYauD6qquYzxcfDXNAx3doR5TD2xC2HH6+Q="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "name": "Microsoft.AspNetCore.Components.WebAssembly.wasm",
        "integrity": "sha256-b0NoLF7H21exT475itv370PzwHt299S+O7QLL9S0wPQ="
      },
      {
        "virtualPath": "Microsoft.AspNetCore.Metadata.wasm",
        "name": "Microsoft.AspNetCore.Metadata.wasm",
        "integrity": "sha256-feTahvOhYuLDIgSFkwXDSewTMyzsM7M9tmjKWEjxeBI="
      },
      {
        "virtualPath": "Microsoft.DotNet.HotReload.WebAssembly.Browser.wasm",
        "name": "Microsoft.DotNet.HotReload.WebAssembly.Browser.wasm",
        "integrity": "sha256-H/Bfgf0MP/7LYv2KEJTe2yFHdkRe4kJcJNqL5FnO9pM="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.wasm",
        "name": "Microsoft.Extensions.Configuration.wasm",
        "integrity": "sha256-f0r6Qpz7Z6XbqfEQFAKDoC7xxwnPQUeN1uOZN7jQSdU="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "name": "Microsoft.Extensions.Configuration.Abstractions.wasm",
        "integrity": "sha256-rBS3LgUFNuIxbHlU7scSWgQHJj1XvLq5lOCBSE7Xqf4="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Binder.wasm",
        "name": "Microsoft.Extensions.Configuration.Binder.wasm",
        "integrity": "sha256-kYQHDeicTG+nBEs6l5iq3UmdSMlHJgHqoa+ggaY501U="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.FileExtensions.wasm",
        "name": "Microsoft.Extensions.Configuration.FileExtensions.wasm",
        "integrity": "sha256-rVukgkTLSTNrk72xnW1GjiqXFDoZoeYNJz1CWkpzjqQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.Configuration.Json.wasm",
        "name": "Microsoft.Extensions.Configuration.Json.wasm",
        "integrity": "sha256-kaJEtYTmGmQJ235nthDFz+Ang6Ruk+JnGVFKh9ULJqw="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.wasm",
        "integrity": "sha256-cd5Qpyhoa1Mv83WQAMQalR7QZdXdgnBxRIgywoQ5ZXA="
      },
      {
        "virtualPath": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "name": "Microsoft.Extensions.DependencyInjection.Abstractions.wasm",
        "integrity": "sha256-xrrgUG/yk4I9W9bTGoMRs/SFjAwn7XnmpxoWIYskHP8="
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.wasm",
        "name": "Microsoft.Extensions.Diagnostics.wasm",
        "integrity": "sha256-c5/EPk8uh1q87GmX5HVLC/UUvbz8i1Maljl/W8etqSQ="
      },
      {
        "virtualPath": "Microsoft.Extensions.Diagnostics.Abstractions.wasm",
        "name": "Microsoft.Extensions.Diagnostics.Abstractions.wasm",
        "integrity": "sha256-p1PIrEspjlWTZhuuDFe2zNFctb6Snm3PPP0l1lLRGlM="
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Abstractions.wasm",
        "name": "Microsoft.Extensions.FileProviders.Abstractions.wasm",
        "integrity": "sha256-BMXU3fj0UK/6PNGpPF3cojEo3DozPCjJGaTZP6GoKdY="
      },
      {
        "virtualPath": "Microsoft.Extensions.FileProviders.Physical.wasm",
        "name": "Microsoft.Extensions.FileProviders.Physical.wasm",
        "integrity": "sha256-quilEO0GpuPvxSG6rAylSWEh5TwoCL+XbWNLelEOtds="
      },
      {
        "virtualPath": "Microsoft.Extensions.FileSystemGlobbing.wasm",
        "name": "Microsoft.Extensions.FileSystemGlobbing.wasm",
        "integrity": "sha256-1N2/rCQl/eAmYr1rfjJ32aMFRrX+RN35cCdm1VkbWGo="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.wasm",
        "name": "Microsoft.Extensions.Logging.wasm",
        "integrity": "sha256-dEjzt1uKX3R6EmoJQrRj6zcO9nfGtBCBS4OOMUzbXIg="
      },
      {
        "virtualPath": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "name": "Microsoft.Extensions.Logging.Abstractions.wasm",
        "integrity": "sha256-DyLaldc3Yx7VCPdRhnmmahnWJCCiiecZwizZCXGV2VU="
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.wasm",
        "name": "Microsoft.Extensions.Options.wasm",
        "integrity": "sha256-E0WLcJMfFpM5V2X8uzMGIJ0/0qoBDlhf/RXljHRcX98="
      },
      {
        "virtualPath": "Microsoft.Extensions.Options.ConfigurationExtensions.wasm",
        "name": "Microsoft.Extensions.Options.ConfigurationExtensions.wasm",
        "integrity": "sha256-3hHMwTwGq2ENRNRfqbteu11Ql89oGCOOA4qTO1UQ51o="
      },
      {
        "virtualPath": "Microsoft.Extensions.Primitives.wasm",
        "name": "Microsoft.Extensions.Primitives.wasm",
        "integrity": "sha256-57hl1S9rfSf1Z3Pq4unXknqN1SSqk4SYsCXrYFVhrt0="
      },
      {
        "virtualPath": "Microsoft.Extensions.Validation.wasm",
        "name": "Microsoft.Extensions.Validation.wasm",
        "integrity": "sha256-qT2aydmmggG8gBaHWUzvrKumK7J9YbGwyd9zdEVWZcA="
      },
      {
        "virtualPath": "Microsoft.JSInterop.wasm",
        "name": "Microsoft.JSInterop.wasm",
        "integrity": "sha256-ZMDJB7HAUuoLzQZRYnLkvVVaR0Aqx1O070OL2H0APzs="
      },
      {
        "virtualPath": "Microsoft.JSInterop.WebAssembly.wasm",
        "name": "Microsoft.JSInterop.WebAssembly.wasm",
        "integrity": "sha256-EQfaQose2do/RGDJFP6YWTTeOWA2gufnJurZZZh2XLU="
      },
      {
        "virtualPath": "WebExtensions.Net.wasm",
        "name": "WebExtensions.Net.wasm",
        "integrity": "sha256-oS1fxvJ+cnfLJAvLHB2FKNne/v21rYXDgUxwBa4P8cI="
      },
      {
        "virtualPath": "WebExtensions.Net.Extensions.DependencyInjection.wasm",
        "name": "WebExtensions.Net.Extensions.DependencyInjection.wasm",
        "integrity": "sha256-bxI1vTIa/FDZN98v1Ad2M/mjR7Wp+gtEB2zATXNwpLc="
      },
      {
        "virtualPath": "Microsoft.CSharp.wasm",
        "name": "Microsoft.CSharp.wasm",
        "integrity": "sha256-DYrTDwbyt3m7me0Lc6JdkjveSLmUZ2fLqs4ICdyJMeo="
      },
      {
        "virtualPath": "Microsoft.VisualBasic.Core.wasm",
        "name": "Microsoft.VisualBasic.Core.wasm",
        "integrity": "sha256-pz6Nq08pgLqbsP2d/Jn4EFsCe3gNpmHaap/Zxew/JK8="
      },
      {
        "virtualPath": "Microsoft.VisualBasic.wasm",
        "name": "Microsoft.VisualBasic.wasm",
        "integrity": "sha256-L2/WuM5KkmRbktqVoNgIFexMJisncaLvtkuDyqHbwO0="
      },
      {
        "virtualPath": "Microsoft.Win32.Primitives.wasm",
        "name": "Microsoft.Win32.Primitives.wasm",
        "integrity": "sha256-f6u/slPHfUjszv2EKsm2fQEKmmrPVH8VNUQjUGPmXh8="
      },
      {
        "virtualPath": "Microsoft.Win32.Registry.wasm",
        "name": "Microsoft.Win32.Registry.wasm",
        "integrity": "sha256-AxfLjbMc5l3NIsQdGtMX2fZ2hj+n1lFgIFBCEqrhUSU="
      },
      {
        "virtualPath": "System.AppContext.wasm",
        "name": "System.AppContext.wasm",
        "integrity": "sha256-/K8wKW5wf0vwTAjJqN2YhR0Sr8RxibLeyVmlwIrdDnA="
      },
      {
        "virtualPath": "System.Buffers.wasm",
        "name": "System.Buffers.wasm",
        "integrity": "sha256-IaL/kK1bEI/zWHYYy6XTumLTMCx6U3QnzAN0ZhZvTxk="
      },
      {
        "virtualPath": "System.Collections.Concurrent.wasm",
        "name": "System.Collections.Concurrent.wasm",
        "integrity": "sha256-0g6gWUQT/CM0STTkeMNDh/k58TERdqnV/u5BUiPgoX4="
      },
      {
        "virtualPath": "System.Collections.Immutable.wasm",
        "name": "System.Collections.Immutable.wasm",
        "integrity": "sha256-Tl4vPbIwiBiOanNfgKpIHEH8LHbkjhFdjVJhG1AZBwE="
      },
      {
        "virtualPath": "System.Collections.NonGeneric.wasm",
        "name": "System.Collections.NonGeneric.wasm",
        "integrity": "sha256-QCr/0s0flwGA/GCqLAAE4ON6WmVO491cSonE3bQ9IGc="
      },
      {
        "virtualPath": "System.Collections.Specialized.wasm",
        "name": "System.Collections.Specialized.wasm",
        "integrity": "sha256-to5p9xGZUq477KGEDpIfH3UJ4lPoeUNmxWJF1hYQL2E="
      },
      {
        "virtualPath": "System.Collections.wasm",
        "name": "System.Collections.wasm",
        "integrity": "sha256-JF1S6+O5rd//jR63yXjT8jzeJVLYhtC6Iomazyu+46Q="
      },
      {
        "virtualPath": "System.ComponentModel.Annotations.wasm",
        "name": "System.ComponentModel.Annotations.wasm",
        "integrity": "sha256-p1Lg6ia7+B8luWLdv25XkpevVOWp7kEpoW2ZG2JU4Sk="
      },
      {
        "virtualPath": "System.ComponentModel.DataAnnotations.wasm",
        "name": "System.ComponentModel.DataAnnotations.wasm",
        "integrity": "sha256-ZbQnUZmK7uOo5/7/OCDfEd4S+BUVzb13F3kfSTUvfgI="
      },
      {
        "virtualPath": "System.ComponentModel.EventBasedAsync.wasm",
        "name": "System.ComponentModel.EventBasedAsync.wasm",
        "integrity": "sha256-FopipCTTK1t50cVaouVGtVdvMDrIYyDoG/qzjV47ue8="
      },
      {
        "virtualPath": "System.ComponentModel.Primitives.wasm",
        "name": "System.ComponentModel.Primitives.wasm",
        "integrity": "sha256-P5ZvpWHH91ux6O6bOf8ynbRnw5AaIbR8pQvQvhfbFo4="
      },
      {
        "virtualPath": "System.ComponentModel.TypeConverter.wasm",
        "name": "System.ComponentModel.TypeConverter.wasm",
        "integrity": "sha256-D8pzZSwPMue+ZyITZ+ZAEMWcn+uefBsXKBH7sYN/4mY="
      },
      {
        "virtualPath": "System.ComponentModel.wasm",
        "name": "System.ComponentModel.wasm",
        "integrity": "sha256-YiKSA3c6DrWeQhnULB8W3aNEklFWk6nMq9LHXQIFBaQ="
      },
      {
        "virtualPath": "System.Configuration.wasm",
        "name": "System.Configuration.wasm",
        "integrity": "sha256-UNfMOINEZ4FKag9zZIx6s3h7ns5SfuugmXwU+8U/dV0="
      },
      {
        "virtualPath": "System.Console.wasm",
        "name": "System.Console.wasm",
        "integrity": "sha256-+a1me9l0qxQGQ21ZOXMg91hkMyWZWgMzJoKTxtGafRQ="
      },
      {
        "virtualPath": "System.Core.wasm",
        "name": "System.Core.wasm",
        "integrity": "sha256-N9SdhWyXlYrOsCF5r1Vdj2MX24SEPjfPHpsXTqmOzHM="
      },
      {
        "virtualPath": "System.Data.Common.wasm",
        "name": "System.Data.Common.wasm",
        "integrity": "sha256-RglA8/aUDu9A4xuejyzC501sqvNsZuPchDnUaXO0EoI="
      },
      {
        "virtualPath": "System.Data.DataSetExtensions.wasm",
        "name": "System.Data.DataSetExtensions.wasm",
        "integrity": "sha256-eQIbLxxsxeL42w74Tq/lXDmF0ynV+bgglc9X+0XLh28="
      },
      {
        "virtualPath": "System.Data.wasm",
        "name": "System.Data.wasm",
        "integrity": "sha256-nWAc+7AFH58HVBr63YYPxWNMbLGtKSZNmjfX75a4Fmk="
      },
      {
        "virtualPath": "System.Diagnostics.Contracts.wasm",
        "name": "System.Diagnostics.Contracts.wasm",
        "integrity": "sha256-fdLLIl/XKyAES/Vpsgv7XkMogMCDODrLHBZBAfQy15Q="
      },
      {
        "virtualPath": "System.Diagnostics.Debug.wasm",
        "name": "System.Diagnostics.Debug.wasm",
        "integrity": "sha256-dYjxHogP1J8fV6xyYPGZ+6N29+038atjxy+0Bx4JygY="
      },
      {
        "virtualPath": "System.Diagnostics.DiagnosticSource.wasm",
        "name": "System.Diagnostics.DiagnosticSource.wasm",
        "integrity": "sha256-YKhoNGFx1V1QFffrc8nzwFtpzeQwU8GsVMySyZvpbBI="
      },
      {
        "virtualPath": "System.Diagnostics.FileVersionInfo.wasm",
        "name": "System.Diagnostics.FileVersionInfo.wasm",
        "integrity": "sha256-KMj0UcwgkXCf1ylB6JWKzvV9OUW0NugjW1ZJh7Ev4wM="
      },
      {
        "virtualPath": "System.Diagnostics.Process.wasm",
        "name": "System.Diagnostics.Process.wasm",
        "integrity": "sha256-203JmtZD8wfzBSkTfUfU1GHb9AyLbbSygVRZO+TiCGs="
      },
      {
        "virtualPath": "System.Diagnostics.StackTrace.wasm",
        "name": "System.Diagnostics.StackTrace.wasm",
        "integrity": "sha256-vpLMKyIWA7x2n0Bsz9K5HoZ3ngjJ5NBCclrORmE+KmY="
      },
      {
        "virtualPath": "System.Diagnostics.TextWriterTraceListener.wasm",
        "name": "System.Diagnostics.TextWriterTraceListener.wasm",
        "integrity": "sha256-87AUYe4ysxcD0ko7e2ObnrEn5x+SPXaUAbeXhUY8dVE="
      },
      {
        "virtualPath": "System.Diagnostics.Tools.wasm",
        "name": "System.Diagnostics.Tools.wasm",
        "integrity": "sha256-z7lmrHX9vDxaWhlz1lbKVpvZ513Fb+Xw+Yl6rSiIu1M="
      },
      {
        "virtualPath": "System.Diagnostics.TraceSource.wasm",
        "name": "System.Diagnostics.TraceSource.wasm",
        "integrity": "sha256-tw/FLt5S2lY4KXfUy8nBDyqwj+zk5Xs7JIwpidOmM3U="
      },
      {
        "virtualPath": "System.Diagnostics.Tracing.wasm",
        "name": "System.Diagnostics.Tracing.wasm",
        "integrity": "sha256-1hZcocCbG0k/cE7HL5GHqzn/H5LAIqsRXDl76joHsu4="
      },
      {
        "virtualPath": "System.Drawing.Primitives.wasm",
        "name": "System.Drawing.Primitives.wasm",
        "integrity": "sha256-Akl3hiSkdbtaYYGIoYUjeyO//SKuN+iBRcgkxNYT8BI="
      },
      {
        "virtualPath": "System.Drawing.wasm",
        "name": "System.Drawing.wasm",
        "integrity": "sha256-r5E4jlAN3MoHR7CGVqYY7c6SjzbU0tOKOpK6HyHNpHo="
      },
      {
        "virtualPath": "System.Dynamic.Runtime.wasm",
        "name": "System.Dynamic.Runtime.wasm",
        "integrity": "sha256-SK7Rp1LlZeCM4aF9xv3+qB0GzGj4W3z9v+xSAyAtJpI="
      },
      {
        "virtualPath": "System.Formats.Asn1.wasm",
        "name": "System.Formats.Asn1.wasm",
        "integrity": "sha256-tSKaftmE+6oibzbPJ8RrVystM3q+Ig9vv2UIM1vbTZg="
      },
      {
        "virtualPath": "System.Formats.Tar.wasm",
        "name": "System.Formats.Tar.wasm",
        "integrity": "sha256-vcSKSfY4GCt79AW+Ou0PNWaEeLaiDIHi9/sJdJG/az0="
      },
      {
        "virtualPath": "System.Globalization.Calendars.wasm",
        "name": "System.Globalization.Calendars.wasm",
        "integrity": "sha256-ovUiGEaI708wBPkNBqnhJVjOtfJshPLtPAdk7IDq5rE="
      },
      {
        "virtualPath": "System.Globalization.Extensions.wasm",
        "name": "System.Globalization.Extensions.wasm",
        "integrity": "sha256-RbJFSGZfQU4dg7vZg0hOydbRGKGj7YgE6K/M7kwEnTo="
      },
      {
        "virtualPath": "System.Globalization.wasm",
        "name": "System.Globalization.wasm",
        "integrity": "sha256-K1lyyFLkCJLd5yY5976WrfLBIWlM+Hp7rXpC+0X82T4="
      },
      {
        "virtualPath": "System.IO.Compression.Brotli.wasm",
        "name": "System.IO.Compression.Brotli.wasm",
        "integrity": "sha256-VLJMKsqb/ahJC6wdMLIpzC3Ba17pMreLo6ABr2YaEBs="
      },
      {
        "virtualPath": "System.IO.Compression.FileSystem.wasm",
        "name": "System.IO.Compression.FileSystem.wasm",
        "integrity": "sha256-wPZuicWgYn53ZKpeG8rgTlzL30S6iVFUWgN/R3Pghjo="
      },
      {
        "virtualPath": "System.IO.Compression.ZipFile.wasm",
        "name": "System.IO.Compression.ZipFile.wasm",
        "integrity": "sha256-s4TtJcgT9w/91UL6CaceheKsChluKLRbOOzm10/qiPs="
      },
      {
        "virtualPath": "System.IO.Compression.wasm",
        "name": "System.IO.Compression.wasm",
        "integrity": "sha256-svN92AT3+BUYa1QtkLdk9RMxfI+zkBH7DiarN69nu6I="
      },
      {
        "virtualPath": "System.IO.FileSystem.AccessControl.wasm",
        "name": "System.IO.FileSystem.AccessControl.wasm",
        "integrity": "sha256-NF0+/VKsfVj0BiivY2UYtXKZFBqBjDpoBTziEp9WRdQ="
      },
      {
        "virtualPath": "System.IO.FileSystem.DriveInfo.wasm",
        "name": "System.IO.FileSystem.DriveInfo.wasm",
        "integrity": "sha256-ACjniuh1mOYJ8DzDXvcOxpfo62cJGJdVS9lPK3J84Ow="
      },
      {
        "virtualPath": "System.IO.FileSystem.Primitives.wasm",
        "name": "System.IO.FileSystem.Primitives.wasm",
        "integrity": "sha256-tj/OX0gw97/4j/xmnlepeUlLWa2vb1CncREZ/y2oCkg="
      },
      {
        "virtualPath": "System.IO.FileSystem.Watcher.wasm",
        "name": "System.IO.FileSystem.Watcher.wasm",
        "integrity": "sha256-u4elZM62YqQW3aOIkBuyqtG2dh22Q/OLxHP7mNgKbo0="
      },
      {
        "virtualPath": "System.IO.FileSystem.wasm",
        "name": "System.IO.FileSystem.wasm",
        "integrity": "sha256-1qzBK4xFdn4wzMHICchwvCbGMOaqQNcgqsp3SRJOMKE="
      },
      {
        "virtualPath": "System.IO.IsolatedStorage.wasm",
        "name": "System.IO.IsolatedStorage.wasm",
        "integrity": "sha256-hr+g8mbenPBU+e6Fnd1AgxfXkWXkTHBNTMdZ9HBNeH4="
      },
      {
        "virtualPath": "System.IO.MemoryMappedFiles.wasm",
        "name": "System.IO.MemoryMappedFiles.wasm",
        "integrity": "sha256-qXWhYhgIDyR7MQYlvG9cZ95TJXrGjK7ertrH0WHYCIk="
      },
      {
        "virtualPath": "System.IO.Pipelines.wasm",
        "name": "System.IO.Pipelines.wasm",
        "integrity": "sha256-OEtaHHhbPrV24wsVnhfA4PbJntaPbb7+igynNVvFXxw="
      },
      {
        "virtualPath": "System.IO.Pipes.AccessControl.wasm",
        "name": "System.IO.Pipes.AccessControl.wasm",
        "integrity": "sha256-9hUXtJqrWjPe4aLq89Wp/LlIBv8q7oqbRwEST0BqreM="
      },
      {
        "virtualPath": "System.IO.Pipes.wasm",
        "name": "System.IO.Pipes.wasm",
        "integrity": "sha256-Zr2cBhgS1wyjPdmHBK+VVgSbfY/odwPWe+PMnA4Bi24="
      },
      {
        "virtualPath": "System.IO.UnmanagedMemoryStream.wasm",
        "name": "System.IO.UnmanagedMemoryStream.wasm",
        "integrity": "sha256-hEk9jPa+QsFOE4mODDFbZMUMh9Cza9D7VM3J8ezXr8o="
      },
      {
        "virtualPath": "System.IO.wasm",
        "name": "System.IO.wasm",
        "integrity": "sha256-UxqjUSSEz7LfKGInDukxFxC8WIX5WFCauNNBghLtXGc="
      },
      {
        "virtualPath": "System.Linq.AsyncEnumerable.wasm",
        "name": "System.Linq.AsyncEnumerable.wasm",
        "integrity": "sha256-Hr7vFko1NtsUNvFMsGKF3gcQ46evU8eeKeO5DWdnYww="
      },
      {
        "virtualPath": "System.Linq.Expressions.wasm",
        "name": "System.Linq.Expressions.wasm",
        "integrity": "sha256-fwD/0YGVA2NtmzaB3kmK1VBquX5rCHs7Pgr8tQKKNUA="
      },
      {
        "virtualPath": "System.Linq.Parallel.wasm",
        "name": "System.Linq.Parallel.wasm",
        "integrity": "sha256-HL5m9ysqEVBiWOWsjxG6x1/p8Ax6i6HNxP1p2JK30vE="
      },
      {
        "virtualPath": "System.Linq.Queryable.wasm",
        "name": "System.Linq.Queryable.wasm",
        "integrity": "sha256-oGsvMGIFjxOinjBMGMfoREtSuPfmSm6a1qephV4cDhE="
      },
      {
        "virtualPath": "System.Linq.wasm",
        "name": "System.Linq.wasm",
        "integrity": "sha256-Ndq91UdOaePUPruH0XwhG8EfY9zHI9VjSDvaHyrU62A="
      },
      {
        "virtualPath": "System.Memory.wasm",
        "name": "System.Memory.wasm",
        "integrity": "sha256-QignbHihp8N/AHJbFxGSaKTTwip5OG1Ex3Xu+gnPd8o="
      },
      {
        "virtualPath": "System.Net.Http.Json.wasm",
        "name": "System.Net.Http.Json.wasm",
        "integrity": "sha256-q+fbtqH8Ng0VVrmZigvxi1DiYMOcGhwA9QYooGSkb24="
      },
      {
        "virtualPath": "System.Net.Http.wasm",
        "name": "System.Net.Http.wasm",
        "integrity": "sha256-MEXCxsa4MHoKtsmQYOJNqQiV2BIWopYdC7DQAcKxqy0="
      },
      {
        "virtualPath": "System.Net.HttpListener.wasm",
        "name": "System.Net.HttpListener.wasm",
        "integrity": "sha256-t2kK/4r7DO5hZBFT38HSNlvyi8bwkHV6MxF5EToXbg4="
      },
      {
        "virtualPath": "System.Net.Mail.wasm",
        "name": "System.Net.Mail.wasm",
        "integrity": "sha256-OaHyLRif055DU7n1jjKgzLZz2s4XjRs5BX4fo39CeKU="
      },
      {
        "virtualPath": "System.Net.NameResolution.wasm",
        "name": "System.Net.NameResolution.wasm",
        "integrity": "sha256-+0hB6vvHz/671Jf4yfKkXFKjse15zC/Kf7s9XE8ale8="
      },
      {
        "virtualPath": "System.Net.NetworkInformation.wasm",
        "name": "System.Net.NetworkInformation.wasm",
        "integrity": "sha256-JvIohIRZGlm/+IxsnPZKZ2Ps44BKVprgwehALa5th0g="
      },
      {
        "virtualPath": "System.Net.Ping.wasm",
        "name": "System.Net.Ping.wasm",
        "integrity": "sha256-kCXBIumyAHTtmm6vl2ZAhfXG2/Q1Tb1OqgZzuepbLg8="
      },
      {
        "virtualPath": "System.Net.Primitives.wasm",
        "name": "System.Net.Primitives.wasm",
        "integrity": "sha256-mHTKctintC1Wr9bR2ybPWGP8FXBiTehna1X3kNymSTs="
      },
      {
        "virtualPath": "System.Net.Quic.wasm",
        "name": "System.Net.Quic.wasm",
        "integrity": "sha256-JnAa5r/lZUsfFU7li/jbjq0LspPunJDrbDZItl6n5cI="
      },
      {
        "virtualPath": "System.Net.Requests.wasm",
        "name": "System.Net.Requests.wasm",
        "integrity": "sha256-sx8DBBYz/YFyK8b5r7vawbecA384e7zEKd81zD94Kkg="
      },
      {
        "virtualPath": "System.Net.Security.wasm",
        "name": "System.Net.Security.wasm",
        "integrity": "sha256-czeQag0zUvoNd+LIdV4jcMs47Y1Ek6CF0S+6ZaLpgLA="
      },
      {
        "virtualPath": "System.Net.ServerSentEvents.wasm",
        "name": "System.Net.ServerSentEvents.wasm",
        "integrity": "sha256-ROnnbLvTNWDOeScUlG9SDwLxvaz38ABUwVEyAnEGDic="
      },
      {
        "virtualPath": "System.Net.ServicePoint.wasm",
        "name": "System.Net.ServicePoint.wasm",
        "integrity": "sha256-5U313KmkSiOeCy+3brWCNcNtrt07brFNf+gVYCR2y4o="
      },
      {
        "virtualPath": "System.Net.Sockets.wasm",
        "name": "System.Net.Sockets.wasm",
        "integrity": "sha256-CY0MZ/+/k1OP+ZBjSWtjGWJQxLuMkT7Ag7QVXVzBAec="
      },
      {
        "virtualPath": "System.Net.WebClient.wasm",
        "name": "System.Net.WebClient.wasm",
        "integrity": "sha256-vKb16TQRF7NY7cSvnqIuYbT3cwV/+Y3xq2MpHIUwAoU="
      },
      {
        "virtualPath": "System.Net.WebHeaderCollection.wasm",
        "name": "System.Net.WebHeaderCollection.wasm",
        "integrity": "sha256-ydnCzipG3Q/N6B8l/i5+ICyls+k47V9X3XJhISGlqhs="
      },
      {
        "virtualPath": "System.Net.WebProxy.wasm",
        "name": "System.Net.WebProxy.wasm",
        "integrity": "sha256-dVRFFC8RdqOlzWEKQpG0pM85PFfc2OY2lJuTKNFwy+s="
      },
      {
        "virtualPath": "System.Net.WebSockets.Client.wasm",
        "name": "System.Net.WebSockets.Client.wasm",
        "integrity": "sha256-DkeBT1Pg0REE1NZFjxAer1/vHdWNMGpENDo5wgI3x/8="
      },
      {
        "virtualPath": "System.Net.WebSockets.wasm",
        "name": "System.Net.WebSockets.wasm",
        "integrity": "sha256-COiKH5sQr3MEOfCnC1RPormfSS7HlT4P9KCaOSN3pHU="
      },
      {
        "virtualPath": "System.Net.wasm",
        "name": "System.Net.wasm",
        "integrity": "sha256-tDtlMI5NKjn1XCfxKn4u4kEb1f7ViQlCo34kX8VCJV4="
      },
      {
        "virtualPath": "System.Numerics.Vectors.wasm",
        "name": "System.Numerics.Vectors.wasm",
        "integrity": "sha256-TSkQpffIW+0zm/VKS4iCUtr12Y6732xH89JbymLfA58="
      },
      {
        "virtualPath": "System.Numerics.wasm",
        "name": "System.Numerics.wasm",
        "integrity": "sha256-YsucGbZIhglan4Dr05M68J3wsVbeIVnY92h5eaM/274="
      },
      {
        "virtualPath": "System.ObjectModel.wasm",
        "name": "System.ObjectModel.wasm",
        "integrity": "sha256-qGPud04AIksV++yyYF0zE7gjmIhe9Uhr+Sjb9thAKXk="
      },
      {
        "virtualPath": "System.Private.DataContractSerialization.wasm",
        "name": "System.Private.DataContractSerialization.wasm",
        "integrity": "sha256-nCwGk+1Ei8db+rRyBbYVMjE7Oe0wZr9w2geHJQnLjn4="
      },
      {
        "virtualPath": "System.Private.Uri.wasm",
        "name": "System.Private.Uri.wasm",
        "integrity": "sha256-K/hRKjzMbXcgQmquOqff8l5abAM0bDpYZ8giwo1sCKo="
      },
      {
        "virtualPath": "System.Private.Xml.Linq.wasm",
        "name": "System.Private.Xml.Linq.wasm",
        "integrity": "sha256-D4/MIhb7PTDq4/+ra0e15LQlIwbeGuH3ksedF/AoWdo="
      },
      {
        "virtualPath": "System.Private.Xml.wasm",
        "name": "System.Private.Xml.wasm",
        "integrity": "sha256-5KJf/3xcuGV17lJVCiiCw7s1tZCl5+ELHZcRbzTIbwM="
      },
      {
        "virtualPath": "System.Reflection.DispatchProxy.wasm",
        "name": "System.Reflection.DispatchProxy.wasm",
        "integrity": "sha256-chZ/GwGqUZFjMR0NhbxhI2t+O5fGcWuV+gRP6QnhP94="
      },
      {
        "virtualPath": "System.Reflection.Emit.ILGeneration.wasm",
        "name": "System.Reflection.Emit.ILGeneration.wasm",
        "integrity": "sha256-PGh2/6TE8aEWRk894ZlBzhFNtpU6vjPZFpMqKapq6QU="
      },
      {
        "virtualPath": "System.Reflection.Emit.Lightweight.wasm",
        "name": "System.Reflection.Emit.Lightweight.wasm",
        "integrity": "sha256-vYIhnzkf5Ag/eg+Xd0JuR1JIrBYrmiKTGKqO5M+zgcU="
      },
      {
        "virtualPath": "System.Reflection.Emit.wasm",
        "name": "System.Reflection.Emit.wasm",
        "integrity": "sha256-zmBwIoocMYbTptjU2gbRUIXz07dHxbt5rvVVCFB4J0s="
      },
      {
        "virtualPath": "System.Reflection.Extensions.wasm",
        "name": "System.Reflection.Extensions.wasm",
        "integrity": "sha256-xEDQsF0JAVGHiP0UUg8LNZkicpuJyj0QcGhSkWNPWqQ="
      },
      {
        "virtualPath": "System.Reflection.Metadata.wasm",
        "name": "System.Reflection.Metadata.wasm",
        "integrity": "sha256-eD2DPloi86p0ROVFzHbfNZU6e1Ly4TPMdr2iBuImEk8="
      },
      {
        "virtualPath": "System.Reflection.Primitives.wasm",
        "name": "System.Reflection.Primitives.wasm",
        "integrity": "sha256-76KnuMlYrRFKgG/vaQBzaWHr3pPtfGKM8+eL1OpSAXw="
      },
      {
        "virtualPath": "System.Reflection.TypeExtensions.wasm",
        "name": "System.Reflection.TypeExtensions.wasm",
        "integrity": "sha256-mswpR2Zal1E7ubdSBCH9NU1CPNl9LhK5psIDlRtgXDA="
      },
      {
        "virtualPath": "System.Reflection.wasm",
        "name": "System.Reflection.wasm",
        "integrity": "sha256-EZal90o5b8F2uy8AlM8torrALvU1eKTb8KHgX2rajag="
      },
      {
        "virtualPath": "System.Resources.Reader.wasm",
        "name": "System.Resources.Reader.wasm",
        "integrity": "sha256-3KDhYHgXLUBc83+iLovVRwuxIBNkfu1Mv7yQ9SVJhfo="
      },
      {
        "virtualPath": "System.Resources.ResourceManager.wasm",
        "name": "System.Resources.ResourceManager.wasm",
        "integrity": "sha256-eTBjOO6rYoSrzx9S9Dv358zJKDWMTVrLjwCpRPqNhFs="
      },
      {
        "virtualPath": "System.Resources.Writer.wasm",
        "name": "System.Resources.Writer.wasm",
        "integrity": "sha256-50HY5j2XCtRweQ6f5k5xWEQWT9o5UhvyMvmHrj1q6zk="
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.Unsafe.wasm",
        "name": "System.Runtime.CompilerServices.Unsafe.wasm",
        "integrity": "sha256-NCqP7cLbmnc7ZJCoxAISLDvqyJqjOg+/Ue2kC+Yx6QU="
      },
      {
        "virtualPath": "System.Runtime.CompilerServices.VisualC.wasm",
        "name": "System.Runtime.CompilerServices.VisualC.wasm",
        "integrity": "sha256-xfRptfAquSCUgY2jjpM0ZeX6PM7BoMnh9WRSKipy3H8="
      },
      {
        "virtualPath": "System.Runtime.Extensions.wasm",
        "name": "System.Runtime.Extensions.wasm",
        "integrity": "sha256-hb139LM7Fg4fQ1OzSrbW1cmZB2Kev/7F9Jj/OKPKXYA="
      },
      {
        "virtualPath": "System.Runtime.Handles.wasm",
        "name": "System.Runtime.Handles.wasm",
        "integrity": "sha256-yKnNECFRT1B9euhzjT/5dSC1sJUoPfO6m2qkDLeGTYQ="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "name": "System.Runtime.InteropServices.RuntimeInformation.wasm",
        "integrity": "sha256-u39o0cpKkndMdK/4OyAxy+2qkc9PGw9H8JLbVLnx6pI="
      },
      {
        "virtualPath": "System.Runtime.InteropServices.wasm",
        "name": "System.Runtime.InteropServices.wasm",
        "integrity": "sha256-+on+uh3ABzIz7NaS0i3xbt2cIpDyhUT0y5JlJO/X84Q="
      },
      {
        "virtualPath": "System.Runtime.Intrinsics.wasm",
        "name": "System.Runtime.Intrinsics.wasm",
        "integrity": "sha256-tE5pijLzITXr2GNazqJfMxf/cUQnh4DpPpvrwXi+o3w="
      },
      {
        "virtualPath": "System.Runtime.Loader.wasm",
        "name": "System.Runtime.Loader.wasm",
        "integrity": "sha256-x91aidPCMaoWyaRMIgxW6p2d28VwkIuUBlypTqGceFw="
      },
      {
        "virtualPath": "System.Runtime.Numerics.wasm",
        "name": "System.Runtime.Numerics.wasm",
        "integrity": "sha256-N1Fe+j6anuFpO55l0zkEtjQMhoNxz2zleDCPbup1XpY="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Formatters.wasm",
        "name": "System.Runtime.Serialization.Formatters.wasm",
        "integrity": "sha256-aOsZY3nMr6z32t39pJR69/VMnGxeJzvEp0ETnxT3GmU="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Json.wasm",
        "name": "System.Runtime.Serialization.Json.wasm",
        "integrity": "sha256-zDYl84jM9auaAgtHUHoZJ6GTVRwa8WxsQMlBos7yZfw="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Primitives.wasm",
        "name": "System.Runtime.Serialization.Primitives.wasm",
        "integrity": "sha256-ONCren6sSBH/S6Lrdi02lcm7BEyEsrvDdhedXaPwX/M="
      },
      {
        "virtualPath": "System.Runtime.Serialization.Xml.wasm",
        "name": "System.Runtime.Serialization.Xml.wasm",
        "integrity": "sha256-p/WuCRmCujQfBUCe4wtQXRR9XcMzz2c0hWt7H+38DuI="
      },
      {
        "virtualPath": "System.Runtime.Serialization.wasm",
        "name": "System.Runtime.Serialization.wasm",
        "integrity": "sha256-MDKNYDBRCcTlV03EhLQLZbSeoFY+kI8U+lAU/viuNF0="
      },
      {
        "virtualPath": "System.Runtime.wasm",
        "name": "System.Runtime.wasm",
        "integrity": "sha256-ZDVnvJqlmlCfxYjN5fr+P0doPw46WTWaXRLcW5YRFIk="
      },
      {
        "virtualPath": "System.Security.AccessControl.wasm",
        "name": "System.Security.AccessControl.wasm",
        "integrity": "sha256-cU4IfLEkqllRw6droSxGbz3BUtQJHP8L8QwTGK58P40="
      },
      {
        "virtualPath": "System.Security.Claims.wasm",
        "name": "System.Security.Claims.wasm",
        "integrity": "sha256-O8tZsGr7ds++haAS+cf0wwHgax+RlcRNgoOk38EyR/o="
      },
      {
        "virtualPath": "System.Security.Cryptography.Algorithms.wasm",
        "name": "System.Security.Cryptography.Algorithms.wasm",
        "integrity": "sha256-dXe3LsqJ1vNr/WFRatELAVLh1CP2PwfQXASDrSfunAg="
      },
      {
        "virtualPath": "System.Security.Cryptography.Cng.wasm",
        "name": "System.Security.Cryptography.Cng.wasm",
        "integrity": "sha256-7LgAp+0po71GWfP8ZuvRYIyjsF1gHKZJ3352ulzjb/0="
      },
      {
        "virtualPath": "System.Security.Cryptography.Csp.wasm",
        "name": "System.Security.Cryptography.Csp.wasm",
        "integrity": "sha256-gbvQ/uAStjISX/CISFTZj9Rjbcp1BewADcXCef0QV5E="
      },
      {
        "virtualPath": "System.Security.Cryptography.Encoding.wasm",
        "name": "System.Security.Cryptography.Encoding.wasm",
        "integrity": "sha256-MvT0VFnceq8eJcNM1q/yclUNhjtcKfZ1sq+1yOY8Qqc="
      },
      {
        "virtualPath": "System.Security.Cryptography.OpenSsl.wasm",
        "name": "System.Security.Cryptography.OpenSsl.wasm",
        "integrity": "sha256-VQArOf/OSDP6hdRPrFn8/6yG0/OY3DkjZETENRIvKls="
      },
      {
        "virtualPath": "System.Security.Cryptography.Primitives.wasm",
        "name": "System.Security.Cryptography.Primitives.wasm",
        "integrity": "sha256-BQ6O6oEE2uisVe5cYv2pXq2W+3Au0Mreg58sBuPdp00="
      },
      {
        "virtualPath": "System.Security.Cryptography.X509Certificates.wasm",
        "name": "System.Security.Cryptography.X509Certificates.wasm",
        "integrity": "sha256-h4O+YpHSawujBDPC6VIgdrvFG/DwhmLtKQWaWrPvffQ="
      },
      {
        "virtualPath": "System.Security.Cryptography.wasm",
        "name": "System.Security.Cryptography.wasm",
        "integrity": "sha256-QJpzemleE1G7DoWqPxhIsz0VGQ39onjjkxCZIBSAgWY="
      },
      {
        "virtualPath": "System.Security.Principal.Windows.wasm",
        "name": "System.Security.Principal.Windows.wasm",
        "integrity": "sha256-GU8SeAu2VYxmSyTNbCKkx7Prg6hGGp1JclbRo9lnbiU="
      },
      {
        "virtualPath": "System.Security.Principal.wasm",
        "name": "System.Security.Principal.wasm",
        "integrity": "sha256-GhgxN265Hnrb++RANZUp/PjjUmCHd5q+rju9sFLStyg="
      },
      {
        "virtualPath": "System.Security.SecureString.wasm",
        "name": "System.Security.SecureString.wasm",
        "integrity": "sha256-dhu3HwNFqdM6H4nln0ILjPR8bh9H+zMFMy3ajbl5TEs="
      },
      {
        "virtualPath": "System.Security.wasm",
        "name": "System.Security.wasm",
        "integrity": "sha256-W4rsIX/JstFGb9BuFPEshwSqlqbmaZHYNrF7aRxYggI="
      },
      {
        "virtualPath": "System.ServiceModel.Web.wasm",
        "name": "System.ServiceModel.Web.wasm",
        "integrity": "sha256-kBbb3QDrvSCgSerndOm7zlCCo4AANOUw3EoJ4bWO6p8="
      },
      {
        "virtualPath": "System.ServiceProcess.wasm",
        "name": "System.ServiceProcess.wasm",
        "integrity": "sha256-cj8Q4z7X9AoM9eqcJgDEGh/Y0+3tCS3i1WjuODB39Uw="
      },
      {
        "virtualPath": "System.Text.Encoding.CodePages.wasm",
        "name": "System.Text.Encoding.CodePages.wasm",
        "integrity": "sha256-OuzhS1UJERfXfxJNFeB90xsx3+ZVkGOpXrDCXAKrirU="
      },
      {
        "virtualPath": "System.Text.Encoding.Extensions.wasm",
        "name": "System.Text.Encoding.Extensions.wasm",
        "integrity": "sha256-srV09G1PP9FVqF0aeuMZJq06N4tct5hcZ+CwpuqhqxY="
      },
      {
        "virtualPath": "System.Text.Encoding.wasm",
        "name": "System.Text.Encoding.wasm",
        "integrity": "sha256-MLyR55YLzFGLmUJhYXAgL1eSlVsoLM9DZ9AF3yjHjek="
      },
      {
        "virtualPath": "System.Text.Encodings.Web.wasm",
        "name": "System.Text.Encodings.Web.wasm",
        "integrity": "sha256-TkUE2WeUuuig9GrdHEkGpl+x/jBXcGm7808V2hVagOo="
      },
      {
        "virtualPath": "System.Text.Json.wasm",
        "name": "System.Text.Json.wasm",
        "integrity": "sha256-5RTaN0JxaGJllfLtZwuEDWQg9xaBZGpF+tIrpPlkdTc="
      },
      {
        "virtualPath": "System.Text.RegularExpressions.wasm",
        "name": "System.Text.RegularExpressions.wasm",
        "integrity": "sha256-AqWnwO3chHjgXyNSmYw2kuDbdhDPsnvczcm7WMD62i8="
      },
      {
        "virtualPath": "System.Threading.AccessControl.wasm",
        "name": "System.Threading.AccessControl.wasm",
        "integrity": "sha256-9oC+LgyLlyfh/dxbG4/74EmhJnjGL8b1pOxfyvTMpwo="
      },
      {
        "virtualPath": "System.Threading.Channels.wasm",
        "name": "System.Threading.Channels.wasm",
        "integrity": "sha256-I6Ic+FPml+Z8jhdiwJXYiv/Ai1yAyc5I3kqF4r0JrAY="
      },
      {
        "virtualPath": "System.Threading.Overlapped.wasm",
        "name": "System.Threading.Overlapped.wasm",
        "integrity": "sha256-javxIrC+o96lJ4/nvMq/pvpVcgpjQrzd5XH9g9C4u4k="
      },
      {
        "virtualPath": "System.Threading.Tasks.Dataflow.wasm",
        "name": "System.Threading.Tasks.Dataflow.wasm",
        "integrity": "sha256-98XOM2TEKDKy4hA9Ti0hd5xbl0h/4ZQ/0P23RwITACA="
      },
      {
        "virtualPath": "System.Threading.Tasks.Extensions.wasm",
        "name": "System.Threading.Tasks.Extensions.wasm",
        "integrity": "sha256-+m5PwTeyBG2NOkwZKSnkYQcotGYGm6/TdclnpdFli40="
      },
      {
        "virtualPath": "System.Threading.Tasks.Parallel.wasm",
        "name": "System.Threading.Tasks.Parallel.wasm",
        "integrity": "sha256-ciLKVq3LBPOvNgR9AdzC4wfh6EEPb+08tCTjpXd5Nks="
      },
      {
        "virtualPath": "System.Threading.Tasks.wasm",
        "name": "System.Threading.Tasks.wasm",
        "integrity": "sha256-r9oq5YYeKRo+Xs1RLyHLlcociyVPcRJiSnJ4lrJUyDo="
      },
      {
        "virtualPath": "System.Threading.Thread.wasm",
        "name": "System.Threading.Thread.wasm",
        "integrity": "sha256-bgh6805hir/uiGP4SdKhOF7HcW2z/Af4xypRqBAhj/o="
      },
      {
        "virtualPath": "System.Threading.ThreadPool.wasm",
        "name": "System.Threading.ThreadPool.wasm",
        "integrity": "sha256-pKi/o3tTV4J6JY18/UXmERqG+9Ei9kjCJcsin7SJoOE="
      },
      {
        "virtualPath": "System.Threading.Timer.wasm",
        "name": "System.Threading.Timer.wasm",
        "integrity": "sha256-I6/NajKCnP5eXpeMKILLzGttnQ+BmwDAgDWRPRgj8gg="
      },
      {
        "virtualPath": "System.Threading.wasm",
        "name": "System.Threading.wasm",
        "integrity": "sha256-pRGrYZ78tSeq+9d6cFTCUhRxYJwRGX3dSWCEJb33xSo="
      },
      {
        "virtualPath": "System.Transactions.Local.wasm",
        "name": "System.Transactions.Local.wasm",
        "integrity": "sha256-auz8FcE2SKFTLameaNOZCiNisRJGnS8bYCHx7haHoIQ="
      },
      {
        "virtualPath": "System.Transactions.wasm",
        "name": "System.Transactions.wasm",
        "integrity": "sha256-Nei1TQva4sHGLKlPi/GvdwNdOTUPVfNs405///tsN7A="
      },
      {
        "virtualPath": "System.ValueTuple.wasm",
        "name": "System.ValueTuple.wasm",
        "integrity": "sha256-blDN8OhZRiSF187D0z1M5o2M5aHP9rxvXIGxv130CwE="
      },
      {
        "virtualPath": "System.Web.HttpUtility.wasm",
        "name": "System.Web.HttpUtility.wasm",
        "integrity": "sha256-cAqx0jsCodOgbls9FDyplzXB6ocmboR/yQx/mQSRWl4="
      },
      {
        "virtualPath": "System.Web.wasm",
        "name": "System.Web.wasm",
        "integrity": "sha256-QvbCXGr8iqtW9AN3b6v8Lzet6LLM33ySfjJ0v1LM1Bs="
      },
      {
        "virtualPath": "System.Windows.wasm",
        "name": "System.Windows.wasm",
        "integrity": "sha256-KVE8aUAPPnPmLeWrhqZRqHfx5moeoEoXkZWjXswPO/o="
      },
      {
        "virtualPath": "System.Xml.Linq.wasm",
        "name": "System.Xml.Linq.wasm",
        "integrity": "sha256-HzUzg4lR8XskvD/2IthZHe4JiUrSB9NPfzJNKnL1cdc="
      },
      {
        "virtualPath": "System.Xml.ReaderWriter.wasm",
        "name": "System.Xml.ReaderWriter.wasm",
        "integrity": "sha256-A+c69Te7Z6eqB2tvckBdVM5rTy5lfolUwUsGZ0jvpyg="
      },
      {
        "virtualPath": "System.Xml.Serialization.wasm",
        "name": "System.Xml.Serialization.wasm",
        "integrity": "sha256-zG6ZkeNKtHZbGyusdUopn9HLcfZYyiG90ZOsAh0WP/s="
      },
      {
        "virtualPath": "System.Xml.XDocument.wasm",
        "name": "System.Xml.XDocument.wasm",
        "integrity": "sha256-am11JOmO484uml+v90svFmWD0obrJeQ7lxGBCWOc+wI="
      },
      {
        "virtualPath": "System.Xml.XPath.XDocument.wasm",
        "name": "System.Xml.XPath.XDocument.wasm",
        "integrity": "sha256-uzLGbcvk9kZ0baKEO11TpSI93Y5oMrmkaM0mx7Ne0f4="
      },
      {
        "virtualPath": "System.Xml.XPath.wasm",
        "name": "System.Xml.XPath.wasm",
        "integrity": "sha256-6vJuPXqveQAcCnwxUnRUHAaf9JJyKEPRwDdZEDM1utI="
      },
      {
        "virtualPath": "System.Xml.XmlDocument.wasm",
        "name": "System.Xml.XmlDocument.wasm",
        "integrity": "sha256-2AMukrRhIuFp1rkDraESwzmZbaqOoa6kz++bxtm3jHE="
      },
      {
        "virtualPath": "System.Xml.XmlSerializer.wasm",
        "name": "System.Xml.XmlSerializer.wasm",
        "integrity": "sha256-V/GIQFT2gkPoQGlXHjLoQ2Yev2nBFSC2tfDXNRKYCGc="
      },
      {
        "virtualPath": "System.Xml.wasm",
        "name": "System.Xml.wasm",
        "integrity": "sha256-9ThjkczNOE9N4dDG94cO+MDWKNziO6N71wzXaLcvvrA="
      },
      {
        "virtualPath": "System.wasm",
        "name": "System.wasm",
        "integrity": "sha256-6NTPYNI6n3oO57u2wa7lzDTHPFL2ZX2i25hpw7j7xDU="
      },
      {
        "virtualPath": "WindowsBase.wasm",
        "name": "WindowsBase.wasm",
        "integrity": "sha256-AAqTAi+vgOcStGpiy9Y9e1b6rGzlfaEPdg3wtsG0yIM="
      },
      {
        "virtualPath": "mscorlib.wasm",
        "name": "mscorlib.wasm",
        "integrity": "sha256-82UMflQuWomOXTd29akEcY13QLehNcDOVqIwvKLH/kQ="
      },
      {
        "virtualPath": "netstandard.wasm",
        "name": "netstandard.wasm",
        "integrity": "sha256-qvS8z84YdecQR/SxYISAg7okb66AKCp1kOEtPuat9hs="
      },
      {
        "virtualPath": "redTomato.wasm",
        "name": "redTomato.wasm",
        "integrity": "sha256-YANM95zio0j7AU6WG6LRy0xkseSSqLZWT7oQk3DECCA="
      }
    ],
    "pdb": [
      {
        "virtualPath": "redTomato.pdb",
        "name": "redTomato.pdb",
        "integrity": "sha256-V1YdT+bXSWSQ/V5N5MXvFV0e13WvwW42Lv+nG56++BQ="
      }
    ],
    "libraryInitializers": [
      {
        "name": "content/Microsoft.DotNet.HotReload.WebAssembly.Browser/Microsoft.DotNet.HotReload.WebAssembly.Browser.99zm1jdh75.lib.module.js"
      },
      {
        "name": "content/JsBind.Net/JsBind.Net.lib.module.js"
      },
      {
        "name": "content/Blazor.BrowserExtension/Blazor.BrowserExtension.lib.module.js"
      }
    ],
    "modulesAfterConfigLoaded": [
      {
        "name": "../content/Microsoft.DotNet.HotReload.WebAssembly.Browser/Microsoft.DotNet.HotReload.WebAssembly.Browser.99zm1jdh75.lib.module.js"
      },
      {
        "name": "../content/JsBind.Net/JsBind.Net.lib.module.js"
      },
      {
        "name": "../content/Blazor.BrowserExtension/Blazor.BrowserExtension.lib.module.js"
      }
    ]
  },
  "debugLevel": -1,
  "globalizationMode": "sharded",
  "extensions": {
    "blazor": {}
  },
  "runtimeConfig": {
    "runtimeOptions": {
      "configProperties": {
        "Microsoft.AspNetCore.Components.Routing.RegexConstraintSupport": false,
        "Microsoft.Extensions.DependencyInjection.VerifyOpenGenericServiceTrimmability": true,
        "System.ComponentModel.DefaultValueAttribute.IsSupported": false,
        "System.ComponentModel.Design.IDesignerHost.IsSupported": false,
        "System.ComponentModel.TypeConverter.EnableUnsafeBinaryFormatterInDesigntimeLicenseContextSerialization": false,
        "System.ComponentModel.TypeDescriptor.IsComObjectDescriptorSupported": false,
        "System.Data.DataSet.XmlSerializationIsSupported": false,
        "System.Diagnostics.Metrics.Meter.IsSupported": false,
        "System.Diagnostics.Tracing.EventSource.IsSupported": false,
        "System.GC.Server": true,
        "System.Globalization.Invariant": false,
        "System.TimeZoneInfo.Invariant": false,
        "System.Linq.Enumerable.IsSizeOptimized": true,
        "System.Net.Http.EnableActivityPropagation": false,
        "System.Net.Http.WasmEnableStreamingResponse": true,
        "System.Net.SocketsHttpHandler.Http3Support": false,
        "System.Reflection.Metadata.MetadataUpdater.IsSupported": false,
        "System.Resources.ResourceManager.AllowCustomResourceTypes": false,
        "System.Resources.UseSystemResourceKeys": true,
        "System.Runtime.CompilerServices.RuntimeFeature.IsDynamicCodeSupported": true,
        "System.Runtime.InteropServices.BuiltInComInterop.IsSupported": false,
        "System.Runtime.InteropServices.EnableConsumingManagedCodeFromNativeHosting": false,
        "System.Runtime.InteropServices.EnableCppCLIHostActivation": false,
        "System.Runtime.InteropServices.Marshalling.EnableGeneratedComInterfaceComImportInterop": false,
        "System.Runtime.Serialization.EnableUnsafeBinaryFormatterSerialization": false,
        "System.StartupHookProvider.IsSupported": false,
        "System.Text.Encoding.EnableUnsafeUTF7Encoding": false,
        "System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault": true,
        "System.Threading.Thread.EnableAutoreleasePool": false,
        "Microsoft.AspNetCore.Components.Endpoints.NavigationManager.DisableThrowNavigationException": false
      }
    }
  }
}/*json-end*/);export{gt as default,ft as dotnet,mt as exit};
