// Adaptador de la fuente de eventos. Va en src/fuentes/ y no en src/lib/
// porque depende de Astro: src/lib/ es solo lógica pura que se prueba con node.
// Es la ÚNICA pieza que sabe de dónde salen los eventos.
// Hoy: archivos JSON en src/content/eventos/ (colección de Astro).
// Mañana: si la fuente cambia (panel de administración, hoja de cálculo),
// se reescribe solo este archivo y el resto del sitio no se entera.

import { getCollection } from 'astro:content';

export async function cargarEventos() {
  const entradas = await getCollection('eventos');
  return entradas.map((e) => ({ id: e.id, ...e.data }));
}
