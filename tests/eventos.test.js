import { test } from 'node:test';
import assert from 'node:assert/strict';
import { eventosProximos, eventosPasados, tipoPorId, tiposPresentes } from '../src/lib/eventos.js';
import { programacionDelDia } from '../src/lib/programacion.js';
import { PROGRAMACION } from '../src/data/programacion.js';
import { IDS_TIPO } from '../src/data/tipos-evento.js';

const ev = (id, fecha, horaInicio, extra = {}) => ({
  id, titulo: id, tipo: 'comunidad', fecha, horaInicio, publicado: true, ...extra,
});

const lista = [
  ev('c', '2026-11-10', '09:00'),
  ev('a', '2026-11-06', '10:00'),
  ev('b', '2026-11-06', '08:00'),
  ev('viejo', '2026-10-01', '09:00'),
  ev('oculto', '2026-11-20', '09:00', { publicado: false }),
];

test('eventosProximos: solo publicados desde hoy, ordenados por fecha y hora', () => {
  assert.deepEqual(eventosProximos(lista, '2026-11-06').map((e) => e.id), ['b', 'a', 'c']);
});

test('eventosProximos incluye los de hoy y excluye los de ayer', () => {
  assert.deepEqual(eventosProximos(lista, '2026-11-07').map((e) => e.id), ['c']);
});

test('eventosPasados: del más reciente al más viejo, sin ocultos', () => {
  assert.deepEqual(eventosPasados(lista, '2026-11-08').map((e) => e.id), ['a', 'b', 'viejo']);
});

test('tipoPorId no rompe con un id desconocido', () => {
  assert.equal(tipoPorId('voces').nombre, 'Voces de San Jorge');
  assert.equal(tipoPorId('no-existe').color, 'gris');
});

test('tiposPresentes respeta el orden de la lista de tipos', () => {
  const t = tiposPresentes([{ tipo: 'religioso' }, { tipo: 'adultos-mayores' }]);
  assert.deepEqual(t.map((x) => x.id), ['adultos-mayores', 'religioso']);
});

test('los ids de tipo son únicos', () => {
  assert.equal(new Set(IDS_TIPO).size, IDS_TIPO.length);
});

test('programacionDelDia: lunes a viernes sí, fin de semana no', () => {
  assert.equal(programacionDelDia('2026-11-02', PROGRAMACION).nombre, 'Lunes');
  assert.equal(programacionDelDia('2026-11-06', PROGRAMACION).nombre, 'Viernes');
  assert.equal(programacionDelDia('2026-11-07', PROGRAMACION), null); // sábado
  assert.equal(programacionDelDia('2026-11-08', PROGRAMACION), null); // domingo
});
