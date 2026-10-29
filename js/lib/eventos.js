// Reglas de los eventos. Lógica pura: recibe una lista y devuelve otra.
//
// Esta capa no sabe de dónde vienen los eventos (archivos del repositorio
// hoy; un panel de administración o una hoja mañana). Si cambia la fuente,
// solo se escribe un adaptador que entregue objetos con esta misma forma:
//   { id, titulo, tipo, fecha 'AAAA-MM-DD', horaInicio 'HH:MM', horaFin?,
//     lugar, descripcion, queLlevar?, foto?, contacto?, publicado, ejemplo }

import { TIPOS_EVENTO } from '../data/tipos-evento.js';

const porFechaYHora = (a, b) =>
  a.fecha.localeCompare(b.fecha) || (a.horaInicio ?? '').localeCompare(b.horaInicio ?? '');

/** Eventos publicados de hoy en adelante, del más cercano al más lejano. */
export function eventosProximos(eventos, hoyISO) {
  return eventos
    .filter((e) => e.publicado && e.fecha >= hoyISO)
    .sort(porFechaYHora);
}

/** Eventos publicados que ya pasaron, del más reciente al más viejo. */
export function eventosPasados(eventos, hoyISO) {
  return eventos
    .filter((e) => e.publicado && e.fecha < hoyISO)
    .sort((a, b) => porFechaYHora(b, a));
}

/**
 * Busca un tipo por id. Si el id no existe (un error al cargar el evento),
 * devuelve un tipo genérico en vez de romper la página.
 */
export function tipoPorId(id) {
  return TIPOS_EVENTO.find((t) => t.id === id) ?? { id, nombre: 'Evento', color: 'gris' };
}

/** Tipos que tienen al menos un evento en la lista (para no mostrar filtros vacíos). */
export function tiposPresentes(eventos) {
  const ids = new Set(eventos.map((e) => e.tipo));
  return TIPOS_EVENTO.filter((t) => ids.has(t.id));
}
