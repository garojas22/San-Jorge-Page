// Enlaces de WhatsApp. No hace falta ninguna API ni cuenta especial:
// un enlace https://wa.me/<número>?text=<mensaje> abre el chat con la
// fundación y el mensaje ya escrito. Funciona igual en teléfono y computadora.

/**
 * Convierte un número venezolano escrito como sea ('0414-123.45.67',
 * '+58 414 1234567') al formato internacional sin signos: '584141234567'.
 * Devuelve null si no parece un número válido.
 */
export function normalizarNumero(numero) {
  if (typeof numero !== 'string') return null;
  let digitos = numero.replace(/\D/g, '');
  if (digitos.startsWith('0')) digitos = '58' + digitos.slice(1);
  if (!digitos.startsWith('58')) digitos = '58' + digitos;
  // 58 + código de 3 dígitos + 7 dígitos = 12
  return /^58\d{10}$/.test(digitos) ? digitos : null;
}

/** Enlace wa.me con mensaje opcional, o null si no hay número válido. */
export function enlaceWhatsApp(numero, mensaje = '') {
  const n = normalizarNumero(numero);
  if (!n) return null;
  return mensaje ? `https://wa.me/${n}?text=${encodeURIComponent(mensaje)}` : `https://wa.me/${n}`;
}
