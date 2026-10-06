/**
 * Regression: the host api client already carries baseURL `/api/v1`, so the
 * view must pass paths relative to it. A `/api/v1/...` literal produced
 * `/api/v1/api/v1/...` -> 404 in production.
 *
 * The fake sits at the transport (axios adapter) so the asserted path is the
 * one that would actually hit the wire.
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { api } from '@/api';
import ConektaPaymentView from '../ConektaPaymentView.vue';
import ConektaVoucherView from '../ConektaVoucherView.vue';

const { routerPush, routeQuery } = vi.hoisted(() => ({
  routerPush: vi.fn(),
  routeQuery: { invoice: 'INV-1', amount: '100.00', method: 'oxxo_cash' },
}));
vi.mock('vue-router', () => ({
  useRoute: () => ({ query: routeQuery }),
  useRouter: () => ({ push: routerPush }),
}));

// The production baseURL (vue/src/api/index.ts fallback); pinned so a local
// VITE_API_URL override cannot mask a doubled prefix.
const PRODUCTION_BASE_URL = '/api/v1';
const requestedPaths: string[] = [];

function installFakeTransport(responseFor: (path: string) => unknown): void {
  const transport = (api as unknown as { axiosInstance: AxiosInstance }).axiosInstance;
  transport.defaults.baseURL = PRODUCTION_BASE_URL;
  transport.defaults.adapter = async (config: InternalAxiosRequestConfig) => {
    const path = `${config.baseURL ?? ''}${config.url ?? ''}`;
    requestedPaths.push(path);
    return { data: responseFor(path), status: 200, statusText: 'OK', headers: {}, config };
  };
}

const ORDER = { method: 'oxxo_cash', reference: 'OXXO-REF-1' };
const mountOptions = { global: { mocks: { $t: (key: string) => key } } };

describe('Conekta views api paths', () => {
  beforeEach(() => {
    requestedPaths.length = 0;
    routerPush.mockReset();
    installFakeTransport(() => ORDER);
  });

  it('creates the order on the single-prefixed backend route', async () => {
    const wrapper = mount(ConektaPaymentView, mountOptions);
    await wrapper.find('form').trigger('submit');
    await flushPromises();

    expect(requestedPaths).toEqual(['/api/v1/plugins/conekta/orders']);
    expect(routerPush).toHaveBeenCalledWith({ name: 'conekta-success' });
  });

  it('loads the voucher from the single-prefixed status route', async () => {
    const wrapper = mount(ConektaVoucherView, mountOptions);
    await flushPromises();

    expect(requestedPaths).toEqual(['/api/v1/plugins/conekta/orders/INV-1/status']);
    expect(wrapper.text()).toContain('OXXO-REF-1');
  });
});
