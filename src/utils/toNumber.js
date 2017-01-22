// `toNumber` takes a value given as `numeric` parameter and tries to turn
// it into a number. If it is not possible it returns 0 (or other value
// given as `fallback`).
export default function toNumber(numeric, fallback) {
  numeric = Number(numeric)
  return Number.isNaN(numeric) ? (fallback || 0) : numeric
}
