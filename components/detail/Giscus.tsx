import { useTheme } from 'next-themes';
import router from 'next/router';
import { useEffect, useRef } from 'react';

export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === 'dark' ? 'dark' : 'light';

  useEffect(() => {
    if (!ref.current || ref.current.hasChildNodes()) return;

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';

    scriptElem.setAttribute('data-repo', 'phnml1/phnml1.github.io');
    scriptElem.setAttribute('data-repo-id', 'R_kgDOKznePw');
    scriptElem.setAttribute('data-category', 'Announcements');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOKzneP84CcqiK');
    scriptElem.setAttribute('data-mapping', 'pathname');
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', '1');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'bottom');
    scriptElem.setAttribute('data-theme', theme);
    scriptElem.setAttribute('data-lang', 'ko');

    ref.current.appendChild(scriptElem);
  }, []);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app');
  }, [theme]);

  // https://github.com/giscus/giscus/blob/main/ADVANCED-USAGE.md#isetconfigmessage
  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { term: router.asPath } } }, 'https://giscus.app');
    console.log(router.asPath);
  }, [router.asPath]);

  return <section id='giscus' ref={ref} />;
}