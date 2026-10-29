// Qué actividades tocan un día dado. Lógica pura.

import { diaSemana } from './fechas.js';

/**
 * Devuelve la entrada de la programación para la fecha 'AAAA-MM-DD',
 * o null si ese día no abre el comedor (sábado y domingo).
 */
export function programacionDelDia(iso, programacion) {
  const dia = diaSemana(iso);
  return programacion.find((p) => p.dia === dia) ?? null;
}
