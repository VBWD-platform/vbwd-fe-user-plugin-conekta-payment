# Conekta Payment Plugin (fe-user)

Vue 3 plugin for Conekta (Mexico): card + OXXO voucher + SPEI CLABE
checkout flows.

## Routes

| Path | Purpose |
|------|---------|
| `/pay/conekta` | Method picker + token entry |
| `/pay/conekta/voucher` | OXXO reference / SPEI CLABE display |
| `/pay/conekta/success` | Card-flow success |

## i18n

`en`, `es` (Mexican Spanish baseline).

## Backend

Pairs with [`vbwd-plugin-conekta`](https://github.com/VBWD-platform/vbwd-plugin-conekta).

---

**Core:** [vbwd-fe-user](https://github.com/VBWD-platform/vbwd-fe-user)

## Documentation

Full platform documentation lives at **[vbwd.cc/docs](https://vbwd.cc/docs)**.

- [Frontend plugins](https://vbwd.cc/docs-frontend-plugins) — how fe-admin / fe-user plugins are built and mounted
- [Payments](https://vbwd.cc/docs-core-payments) — documentation for this plugin's domain
- [Architecture](https://vbwd.cc/docs-architecture) — platform layering and the core-agnosticism rule
- [Getting started](https://vbwd.cc/docs-getting-started) — install a VBWD instance and enable plugins
