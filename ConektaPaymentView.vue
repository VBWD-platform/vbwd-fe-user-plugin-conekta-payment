<template>
  <div class="conekta-payment">
    <div v-if="loading">
      {{ $t('conekta.payment.loading') }}
    </div>
    <div
      v-else-if="error"
      class="error"
    >
      {{ error }}
    </div>

    <form
      v-else
      @submit.prevent="onSubmit"
    >
      <label>{{ $t('conekta.payment.method') }}</label>
      <select v-model="method">
        <option value="card">
          {{ $t('conekta.payment.card') }}
        </option>
        <option value="oxxo_cash">
          {{ $t('conekta.payment.oxxo') }}
        </option>
        <option value="spei">
          {{ $t('conekta.payment.spei') }}
        </option>
      </select>

      <div v-if="method === 'card'">
        <input
          v-model="tokenId"
          :placeholder="$t('conekta.payment.token')"
          required
        >
        <select v-model="msi">
          <option :value="1">
            {{ $t('conekta.payment.fullPayment') }}
          </option>
          <option :value="3">
            3 MSI
          </option>
          <option :value="6">
            6 MSI
          </option>
          <option :value="9">
            9 MSI
          </option>
          <option :value="12">
            12 MSI
          </option>
        </select>
      </div>

      <button
        class="btn btn-primary"
        type="submit"
      >
        {{ $t('conekta.payment.pay') }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from '@/api';

// Relative to the api client's `/api/v1` baseURL.
const API_PREFIX = '/plugins/conekta';

const route = useRoute();
const router = useRouter();
const loading = ref(false);
const error = ref<string | null>(null);
const method = ref<'card' | 'oxxo_cash' | 'spei'>('card');
const tokenId = ref('');
const msi = ref(1);

async function onSubmit() {
  const invoiceNo = (route.query.invoice as string) || '';
  if (!invoiceNo) {
    error.value = 'No invoice';
    return;
  }
  loading.value = true;
  try {
    await api.post(`${API_PREFIX}/orders`, {
      invoice_no: invoiceNo,
      amount: route.query.amount,
      currency: 'MXN',
      method: method.value,
      customer_email: route.query.email || 'customer@example.com',
      customer_name: route.query.name || 'Customer',
      token_id: method.value === 'card' ? tokenId.value : undefined,
      msi: method.value === 'card' && msi.value > 1 ? msi.value : undefined,
    });
    if (method.value === 'card') {
      router.push({ name: 'conekta-success' });
    } else {
      router.push({
        name: 'conekta-voucher',
        query: { invoice: invoiceNo, method: method.value },
      });
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'failed';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.conekta-payment { max-width: 480px; margin: 2rem auto; padding: 1.5rem; }
.error { color: var(--vbwd-color-danger, #b22); }
form > * { display: block; margin-bottom: 0.75rem; }
</style>
