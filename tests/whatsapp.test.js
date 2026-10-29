import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizarNumero, enlaceWhatsApp } from '../js/lib/whatsapp.js';

test('normalizarNumero acepta las formas comunes de escribir un número venezolano', () => {
  assert.equal(normalizarNumero('0414-123.45.67'), '584141234567');
  assert.equal(normalizarNumero('+58 414 1234567'), '584141234567');
  assert.equal(normalizarNumero('4141234567'), '584141234567');
  assert.equal(normalizarNumero('(0243) 555 1234'), '582435551234');
});

test('normalizarNumero rechaza números incompletos', () => {
  assert.equal(normalizarNumero('0414-123'), null);
  assert.equal(normalizarNumero(''), null);
  assert.equal(normalizarNumero(null), null);
});

test('enlaceWhatsApp codifica el mensaje y devuelve null sin número', () => {
  assert.equal(
    enlaceWhatsApp('04141234567', 'Hola, quiero donar'),
    'https://wa.me/584141234567?text=Hola%2C%20quiero%20donar',
  );
  assert.equal(enlaceWhatsApp('04141234567'), 'https://wa.me/584141234567');
  assert.equal(enlaceWhatsApp(null, 'Hola'), null);
});
