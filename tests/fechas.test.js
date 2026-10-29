import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  fechaLocalISO, normalizarFecha, diaYMes, diaSemana, fechaLarga, fechaCorta, horaLegible, rangoHoras,
} from '../src/lib/fechas.js';

test('fechaLocalISO usa la fecha local, no UTC', () => {
  // 9:30 p.m. del 6 de noviembre: con toISOString() en UTC-4 saldría el 7.
  assert.equal(fechaLocalISO(new Date(2026, 10, 6, 21, 30)), '2026-11-06');
  assert.equal(fechaLocalISO(new Date(2026, 0, 1, 0, 0)), '2026-01-01');
});

test('normalizarFecha acepta AAAA-MM-DD y DD/MM/AAAA', () => {
  assert.equal(normalizarFecha('2026-11-06'), '2026-11-06');
  assert.equal(normalizarFecha('6/11/2026'), '2026-11-06');
  assert.equal(normalizarFecha(' 06/11/2026 '), '2026-11-06');
  assert.equal(normalizarFecha('2026-1-5'), '2026-01-05');
});

test('normalizarFecha rechaza fechas que no existen o mal escritas', () => {
  assert.equal(normalizarFecha('31/02/2026'), null);
  assert.equal(normalizarFecha('2026-13-01'), null);
  assert.equal(normalizarFecha('mañana'), null);
  assert.equal(normalizarFecha(''), null);
  assert.equal(normalizarFecha(undefined), null);
});

test('diaSemana y fechaLarga en español', () => {
  assert.equal(diaSemana('2026-11-06'), 5); // viernes
  assert.equal(fechaLarga('2026-11-06'), 'viernes 6 de noviembre');
  assert.equal(fechaLarga('2026-11-04'), 'miércoles 4 de noviembre');
  assert.equal(diaYMes('2026-11-06'), '6 de noviembre');
  assert.deepEqual(fechaCorta('2026-12-25'), { dia: '25', mes: 'dic' });
});

const _ = '\u00a0'; // espacio que no se corta

test('horaLegible en formato de 12 horas', () => {
  assert.equal(horaLegible('08:00'), `8:00${_}a.m.`);
  assert.equal(horaLegible('9:30'), `9:30${_}a.m.`);
  assert.equal(horaLegible('12:00'), `12:00${_}p.m.`);
  assert.equal(horaLegible('14:00'), `2:00${_}p.m.`);
  assert.equal(horaLegible('00:15'), `12:15${_}a.m.`);
  assert.equal(horaLegible('nueve'), '');
  assert.equal(rangoHoras('08:00', '14:00'), `8:00${_}a.m. a 2:00${_}p.m.`);
  assert.equal(rangoHoras('09:00'), `9:00${_}a.m.`);
});
