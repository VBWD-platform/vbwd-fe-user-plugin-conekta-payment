<template>
  <div class="conekta-voucher">
    <h2>{{ title }}</h2>
    <div v-if="loading">
      {{ $t('conekta.voucher.loading') }}
    </div>
    <div v-else-if="order">
      <div v-if="order.method === 'oxxo_cash'">
        <p>{{ $t('conekta.voucher.oxxoInstructions') }}</p>
        <code class="reference">{{ order.reference }}</code>
      </div>
      <div v-else-if="order.method === 'spei'">
        <p>{{ $t('conekta.voucher.speiInstructions') }}</p>
        <code class="clabe">{{ order.clabe }}</code>
      </div>
      <p
        v-if="order.expires_at"
        class="expiry"
      >
        {{ $t('conekta.voucher.expires') }}: {{ formatDate(order.expires_at) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '@/api';

interface Order {
  method: string;
  reference?: string;
  clabe?: string;
  expires_at?: string;
}

const route = useRoute();
const loading = ref(true);
const order = ref<Order | null>(null);

const title = computed(() => {
  const method = (route.query.method as string) || '';
  if (method === 'oxxo_cash') return 'OXXO Pay';
  if (method === 'spei') return 'SPEI';
  return 'Voucher';
});

onMounted(async () => {
  const invoice = route.query.invoice as string;
  try {
    const resp = await api.get(
      `/api/v1/plugins/conekta/orders/${invoice}/status`,
    );
    order.value = await resp.json();
  } finally {
    loading.value = false;
  }
});

function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}
</script>

<style scoped>
.conekta-voucher { max-width: 480px; margin: 2rem auto; padding: 1.5rem; text-align: center; }
.reference, .clabe { font-family: monospace; font-size: 1.25rem; display: block; padding: 1rem; background: var(--vbwd-color-surface, #f5f5f5); margin: 1rem 0; }
</style>
