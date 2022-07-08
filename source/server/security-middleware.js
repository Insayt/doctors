const isTrueProd =
  process.env.NODE_ENV === 'production' && process.env.APP_ENV === 'production';

/* eslint-disable quotes */
const CSP_PROPS = {
  isReportsOnly: false,
  policies: {
    'report-uri': [
      isTrueProd
        ? 'https://budu.ru/_csp_report?budub2b'
        : 'https://dummy.budu.ru/_csp_report?budub2b',
    ],
    'font-src': ["'self'", 'fonts.gstatic.com'],
    'manifest-src': ["'self'", 'budu.ru'],
    'default-src': [
      "'self'",
      "'unsafe-inline'",
      "'unsafe-eval'",
      'data:',
      'blob:',
      'android-webview-video-poster:',
      'budu.ru',
      '*.budu.ru',
      'wss://budu.ru',
      'wss://*.budu.ru',
      '*.googleapis.com',
      'maps.gstatic.com',
      'www.gstatic.com',
      'ren-health.firebaseio.com',
      'www.facebook.com',
      'top-fwz1.mail.ru',
      'www.google.com',
      'www.google.ru',
      'www.googletagmanager.com',
      'www.google-analytics.com',
      'static.doubleclick.net',
      'mc.yandex.ru',
      'mc.yandex.com',
      'mc.yandex.md',
      'connect.facebook.net',
      'i.ytimg.com',
      'googlevideo.com',
      'www.youtube.com',
      '*.ggpht.com',
      'vk.com',
      'login.vk.com',
      'hybrid.ai',
      '*.hybrid.ai',
      'ads.betweendigital.com',
      'ssp.adriver.ru',
      'ssp.bestssp.com',
      'x01.aidata.io',
      'u.openx.net',
      'ib.adnxs.com',
      'pixel.onaudience.com',
      'dmg.digitaltarget.ru',
      'ad.mail.ru',
      'an.yandex.ru',
      'inv-nets.admixer.net',
      'x.bidswitch.net',
      'pixel.rubiconproject.com',
      'redirect.frontend.weborama.fr',
      'sync.1dmp.io',
      'rtb-csync.smartadserver.com',
      'cm.adform.net',
      'ad.360yield.com',
      'rtb.gumgum.com',
      '*.appsflyer.com',
      '*.ops.beeline.ru',
      'kraken.rambler.ru',
      '*.rutarget.ru',
      'st.top100.ru',
      'relap.io',
      '*.gotechnology.io',
      '*.fls.doubleclick.net',
      '*.g.doubleclick.net',
      'sync-t1.taboola.com',
      'wa.onelink.me',
      '*.ucweb.com',
      '*.yandex.net',
      'simage2.pubmatic.com',
      '*.dmg.digitaltarget.ru',
      'wa.onelink.me',
    ],
  },
};

const CSP = {
  key: CSP_PROPS.isReportsOnly
    ? 'Content-Security-Policy-Report-Only'
    : 'Content-Security-Policy',
  value: Object.entries(CSP_PROPS.policies)
    .map(([rule, values]) => `${rule} ${values.join(' ')}`)
    .join('; '),
};

export default function (req, res, next) {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Feature-Policy', "geolocation 'self'");
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('x-frame-options', 'SAMEORIGIN');
  res.setHeader(CSP.key, CSP.value);
  next();
}
