// Fechas y horas. Lógica pura: sin DOM, sin localStorage.
//
// Todas las fechas se manejan como texto 'AAAA-MM-DD' en HORA LOCAL.
// Nunca usar toISOString(): convierte a UTC y en Venezuela (UTC-4) el día
// cambiaría a las 8:00 p.m. Comparar dos textos 'AAAA-MM-DD' con < y >
// funciona porque el orden alfabético coincide con el cronológico.

const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

const dosDigitos = (n) => String(n).padStart(2, '0');

/** Date -> 'AAAA-MM-DD' con la fecha del dispositivo (hora local). */
export function fechaLocalISO(fecha = new Date()) {
  return `${fecha.getFullYear()}-${dosDigitos(fecha.getMonth() + 1)}-${dosDigitos(fecha.getDate())}`;
}

/**
 * Normaliza una fecha escrita a mano a 'AAAA-MM-DD'. Acepta 'AAAA-MM-DD' y
 * 'DD/MM/AAAA' (lo que muestra una hoja de cálculo en Venezuela).
 * Devuelve null si no es una fecha real: mejor no mostrar un evento que
 * mostrarlo el día equivocado.
 */
export function normalizarFecha(texto) {
  if (typeof texto !== 'string') return null;
  const t = texto.trim();
  let anio, mes, dia;
  let m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (m) {
    [, anio, mes, dia] = m.map(Number);
  } else if ((m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/))) {
    [, dia, mes, anio] = m.map(Number);
  } else {
    return null;
  }
  // new Date(2026, 1, 31) "se corrige" a marzo; si cambia, la fecha no existía.
  const d = new Date(anio, mes - 1, dia);
  if (d.getFullYear() !== anio || d.getMonth() !== mes - 1 || d.getDate() !== dia) return null;
  return `${anio}-${dosDigitos(mes)}-${dosDigitos(dia)}`;
}

/** 'AAAA-MM-DD' -> Date a medianoche local. */
export function aFecha(iso) {
  const [a, m, d] = iso.split('-').map(Number);
  return new Date(a, m - 1, d);
}

/** Día de la semana de una fecha 'AAAA-MM-DD' (0 = domingo). */
export function diaSemana(iso) {
  return aFecha(iso).getDay();
}

/** '2026-11-06' -> 'viernes 6 de noviembre'. Fechas completas, nunca '06/11'. */
export function fechaLarga(iso) {
  const d = aFecha(iso);
  return `${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]}`;
}

/** '2026-11-06' -> '6 de noviembre' (sin el día de la semana). */
export function diaYMes(iso) {
  const d = aFecha(iso);
  return `${d.getDate()} de ${MESES[d.getMonth()]}`;
}

/** '2026-11-06' -> { dia: '6', mes: 'nov' } para el bloque grande de la tarjeta. */
export function fechaCorta(iso) {
  const d = aFecha(iso);
  return { dia: String(d.getDate()), mes: MESES[d.getMonth()].slice(0, 3) };
}

/**
 * '09:00' -> '9:00 a.m.', '14:30' -> '2:30 p.m.', '12:00' -> '12:00 p.m.'
 * Entre la hora y el a.m./p.m. va un espacio que no se corta (\u00a0):
 * en un teléfono angosto "2:00" y "p.m." nunca quedan en líneas distintas.
 */
export function horaLegible(hhmm) {
  const m = typeof hhmm === 'string' && hhmm.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!m) return '';
  const h = Number(m[1]);
  const sufijo = h < 12 ? 'a.m.' : 'p.m.';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${m[2]}\u00a0${sufijo}`;
}

/** Rango de horas: '9:00 a.m. a 11:00 a.m.' o solo el inicio si no hay fin. */
export function rangoHoras(inicio, fin) {
  const a = horaLegible(inicio);
  const b = horaLegible(fin);
  return a && b ? `${a} a ${b}` : a;
}
