export function validarCosto(numero) {
  if (numero <= 0 || !Number.isFinite(numero)) {
    return false;
  } else {
    return true;
  }
}
