import type { IPlugin, IPlatformSDK } from 'vbwd-view-component';
import en from './locales/en.json';
import es from './locales/es.json';

export const conektaPaymentPlugin: IPlugin = {
  name: 'conekta-payment',
  version: '1.0.0',
  description: 'Conekta (Mexico) — cards + MSI + OXXO + SPEI',
  _active: false,

  install(sdk: IPlatformSDK) {
    sdk.addRoute({
      path: '/pay/conekta',
      name: 'conekta-payment',
      component: () => import('./ConektaPaymentView.vue'),
      meta: { requiresAuth: true, noLayout: true },
    });
    sdk.addRoute({
      path: '/pay/conekta/voucher',
      name: 'conekta-voucher',
      component: () => import('./ConektaVoucherView.vue'),
      meta: { requiresAuth: true, noLayout: true },
    });
    sdk.addRoute({
      path: '/pay/conekta/success',
      name: 'conekta-success',
      component: () => import('./ConektaSuccessView.vue'),
      meta: { requiresAuth: true, noLayout: true },
    });
    sdk.addTranslations('en', en);
    sdk.addTranslations('es', es);
  },

  activate() { this._active = true; },
  deactivate() { this._active = false; },
};
