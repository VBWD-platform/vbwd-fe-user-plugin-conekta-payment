<template>
  <div class="conekta-success">
    <h2>{{ $t('conekta.success.title') }}</h2>
    <p>{{ $t('conekta.success.message') }}</p>
    <router-link
      class="btn btn-primary"
      to="/dashboard"
    >
      {{ $t('conekta.success.dashboard') }}
    </router-link>
  </div>
</template>

<style scoped>
.conekta-success { max-width: 480px; margin: 4rem auto; text-align: center; }
</style>
