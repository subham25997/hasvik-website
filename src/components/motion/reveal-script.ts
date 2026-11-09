/**
 * Inline scroll-reveal bootstrap, injected into <head> via next/script (beforeInteractive); it waits for DOMContentLoaded.
 * It runs as soon as the HTML is parsed — before hydration — so above-the-fold
 * content is revealed on the first frame and never waits for React (LCP).
 * <RevealObserver/> calls `window.__hasvikReveal()` again after client navigations.
 * Revealed elements get a `data-revealed` attribute; reveal elements suppress
 * hydration warnings for this intentional pre-hydration DOM mutation.
 */
export const revealScript = `(function(){
var d=document;if(!('IntersectionObserver' in window)){d.documentElement.classList.remove('js');return;}
var io=new IntersectionObserver(function(es){for(var i=0;i<es.length;i++){var e=es[i];if(e.isIntersecting){e.target.setAttribute('data-revealed','');io.unobserve(e.target);}}},{rootMargin:'0px 0px -8% 0px',threshold:0.01});
window.__hasvikReveal=function(){d.querySelectorAll('[data-reveal]:not([data-revealed])').forEach(function(el){io.observe(el);});};
if(d.readyState==='loading'){d.addEventListener('DOMContentLoaded',window.__hasvikReveal);}else{window.__hasvikReveal();}
})();`;
