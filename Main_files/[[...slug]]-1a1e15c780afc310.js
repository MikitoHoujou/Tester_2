(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6120],{41848:function(e){e.exports=function(e,n,t,r){for(var a=e.length,i=t+(r?1:-1);r?i--:++i<a;)if(n(e[i],i,e))return i;return -1}},27561:function(e,n,t){var r=t(67990),a=/^\s+/;e.exports=function(e){return e?e.slice(0,r(e)+1).replace(a,""):e}},67740:function(e,n,t){var r=t(67206),a=t(98612),i=t(3674);e.exports=function(e){return function(n,t,o){var u=Object(n);if(!a(n)){var l=r(t,3);n=i(n),t=function(e){return l(u[e],e,u)}}var c=e(n,t,o);return c>-1?u[l?n[c]:c]:void 0}}},67990:function(e){var n=/\s/;e.exports=function(e){for(var t=e.length;t--&&n.test(e.charAt(t)););return t}},13311:function(e,n,t){var r=t(67740)(t(30998));e.exports=r},30998:function(e,n,t){var r=t(41848),a=t(67206),i=t(40554),o=Math.max;e.exports=function(e,n,t){var u=null==e?0:e.length;if(!u)return -1;var l=null==t?0:i(t);return l<0&&(l=o(u+l,0)),r(e,a(n,3),l)}},18601:function(e,n,t){var r=t(14841),a=1/0;e.exports=function(e){return e?(e=r(e))===a||e===-a?(e<0?-1:1)*17976931348623157e292:e==e?e:0:0===e?e:0}},40554:function(e,n,t){var r=t(18601);e.exports=function(e){var n=r(e),t=n%1;return n==n?t?n-t:n:0}},14841:function(e,n,t){var r=t(27561),a=t(13218),i=t(33448),o=0/0,u=/^[-+]0x[0-9a-f]+$/i,l=/^0b[01]+$/i,c=/^0o[0-7]+$/i,s=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(i(e))return o;if(a(e)){var n="function"==typeof e.valueOf?e.valueOf():e;e=a(n)?n+"":n}if("string"!=typeof e)return 0===e?e:+e;e=r(e);var t=l.test(e);return t||c.test(e)?s(e.slice(2),t?2:8):u.test(e)?o:+e}},95759:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/[[...slug]]",function(){return t(78070)}])},23618:function(e,n,t){"use strict";t.d(n,{Z:function(){return p}});var r={};t.r(r),t.d(r,{ContentPage:function(){return c},NewsItemPage:function(){return l},PlaceholderPage:function(){return f},SectionPage:function(){return s},StoryPage:function(){return d}});var a=t(85893),i=t(67294),o=t(5152),u=t.n(o);let l=u()(()=>t.e(1919).then(t.bind(t,61919)),{loadableGenerated:{webpack:()=>[61919]}}),c=u()(()=>t.e(3112).then(t.bind(t,73112)),{loadableGenerated:{webpack:()=>[73112]}}),s=u()(()=>t.e(7477).then(t.bind(t,27477)),{loadableGenerated:{webpack:()=>[27477]}}),d=u()(()=>t.e(8280).then(t.bind(t,58280)),{loadableGenerated:{webpack:()=>[58280]}}),f=u()(()=>Promise.all([t.e(8100),t.e(1117)]).then(t.bind(t,21117)),{loadableGenerated:{webpack:()=>[21117]}});var v=t(7636),p=function(e){let{pageData:n}=e,t=function(e){if(!e)return null;let n=r[(0,v.k)(e._type)];return n||(console.error("Cant find page",e.slug),null)}(n);return((0,i.useEffect)(()=>{t||(document.body.className="errorpage")},[t]),(0,i.useEffect)(()=>{document.body.className=n._type.toLowerCase()},[n._type]),n)?t?(0,i.createElement)(t,{...n,key:n._key}):(0,a.jsx)("main",{className:"main inner",children:(0,a.jsx)("h1",{className:"sectionpage__header",children:"Page not found."})}):(console.error("Missing template"),(0,a.jsx)("div",{children:"Missing template"}))}},78070:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return N},default:function(){return j}});var r=t(85893),a=t(52082),i=t(23618),o=t(67294),u=t(80129),l=t.n(u);let c=e=>{var n;let{homepage:t,siteSettings:r,pageData:a,isForQueryString:i}=e,o=null==r?void 0:r.contentSettings.find(e=>"siteGlobalContentBlock"===e._type);return{homepageId:null==t?void 0:t._id,homepageUrl:null==t?void 0:t.friendlyUrl.current,breadcrumbIncludeStartPage:null==o?void 0:o.breadcrumbIncludeStartPage,newsListingPageLink:null==o?void 0:null===(n=o.newsListingPageLink)||void 0===n?void 0:n.friendlyUrl.current,ourStoriesSectionHeadingAsString:null==o?void 0:o.ourStoriesSectionHeadingAsString,pageDataId:null==a?void 0:a._id,pageLanguage:null==a?void 0:a.language,canonicalUrl:i?"":null==a?void 0:a.canonicalUrl}},s=e=>{var n,t;let[r,a]=(0,o.useState)(null==e?void 0:null===(n=e.pageData)||void 0===n?void 0:n.breadcrumbItems),i=c({...e,isForQueryString:!0}),u=async()=>{let e=await fetch("/api/breadcrumbs?".concat(l().stringify(i))).then(e=>e.json()).then(e=>e);a(e)};return(0,o.useEffect)(()=>{(null==e?void 0:e.withStackbit)&&u()},[...Object.values(i)]),(null==e?void 0:e.withStackbit)?r:null==e?void 0:null===(t=e.pageData)||void 0===t?void 0:t.breadcrumbItems};var d=t(66604),f=t.n(d),v=t(13218),p=t.n(v),g=t(13311),b=t.n(g),h=t(82289),w=t(96514);let m=e=>n=>{let t=p()(n)&&(0,w.Z)(e._id)===(0,w.Z)(n._id);return t?e:n},y=(e,n)=>f()(e,m(n)),_=async(e,n)=>await fetch("/api/resolve-document",{method:"POST",body:JSON.stringify({document:n,options:c(e)}),headers:{"Content-Type":"application/json"}}).then(e=>e.json()),S=()=>h.S.sanity.isSanityPreview&&window.parent!==window,x=e=>{let[n,t]=(0,o.useState)(e);return(0,o.useEffect)(()=>{if(!S())return;let n=async n=>{try{if(n.origin!==h.S.sanity.studioUrl)return;let r=JSON.parse(n.data),a=Boolean(b()(e,e=>{let{_id:n}=e;return(0,w.Z)(n)===(0,w.Z)(r._id)}));if(!a)return;let i=await _(e,r);t(y(e,i))}catch(e){console.error(e)}};return window.addEventListener("message",n,!1),window.parent.postMessage("ready","*"),()=>window.removeEventListener("message",n,!1)},[]),{props:S()?n:e,arePropsReady:S()?Boolean(n):Boolean(e)}};var k=t(92547);let P=e=>{let{props:n,arePropsReady:t}=x(e),o=s(n);return(0,r.jsx)(r.Fragment,{children:t&&(0,r.jsx)(k.Mi,{value:n,children:(0,r.jsx)(a.Z,{...n.pageData,children:(0,r.jsx)(i.Z,{pageData:{...n.pageData,breadcrumbItems:o}})})})})};var N=!0,j=P}},function(e){e.O(0,[884,1378,9774,2888,179],function(){return e(e.s=95759)}),_N_E=e.O()}]);