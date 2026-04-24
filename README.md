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
