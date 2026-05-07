/**
 * Garage Boost — Analytics Loader
 * Injecte dynamiquement GA4, GSC verification, Clarity, etc. selon analytics-config.js
 * Aucune modification de pages requise — tout passe par window.GB_CONFIG
 */
(function() {
  if (typeof window.GB_CONFIG === 'undefined') return;
  const cfg = window.GB_CONFIG;

  // ========== Google Analytics 4 (gtag.js) ==========
  if (cfg.GA4_ID && cfg.GA4_ID.startsWith('G-')) {
    const s1 = document.createElement('script');
    s1.async = true;
    s1.src = 'https://www.googletagmanager.com/gtag/js?id=' + cfg.GA4_ID;
    document.head.appendChild(s1);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', cfg.GA4_ID, {
      anonymize_ip: true,
      cookie_flags: 'SameSite=None;Secure'
    });
  }

  // ========== Google Search Console verification ==========
  if (cfg.GSC_VERIFICATION) {
    const meta = document.createElement('meta');
    meta.name = 'google-site-verification';
    meta.content = cfg.GSC_VERIFICATION;
    document.head.appendChild(meta);
  }

  // ========== Bing Webmaster Tools verification ==========
  if (cfg.BING_VERIFICATION) {
    const meta = document.createElement('meta');
    meta.name = 'msvalidate.01';
    meta.content = cfg.BING_VERIFICATION;
    document.head.appendChild(meta);
  }

  // ========== Microsoft Clarity (heatmaps gratuits) ==========
  if (cfg.CLARITY_ID) {
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", cfg.CLARITY_ID);
  }

  // ========== Facebook Pixel ==========
  if (cfg.FB_PIXEL_ID) {
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return; n=f.fbq=function(){n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n; n.push=n; n.loaded=!0; n.version='2.0'; n.queue=[];
      t=b.createElement(e); t.async=!0; t.src=v;
      s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s);
    }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', cfg.FB_PIXEL_ID);
    fbq('track', 'PageView');
  }
})();
