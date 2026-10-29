import Script from "next/script";

export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID;
  if (!id) return null;
  return <><Script id="consent-default" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});` }} /><Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" /><Script id="ga4" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});` }} /></>;
}
