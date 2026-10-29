// Tipos de evento y el color de su etiqueta (según el brief).
//
// REGLA: el `id` NUNCA se cambia. Cada evento guarda el id, no el nombre.
// El `nombre` sí se puede cambiar libremente (es solo lo que se lee).
// Si un tipo cambia de significado, se crea un id nuevo, el viejo se deja
// de usar y se anota en docs/DECISIONES.md.
//
// `color` es una clave de la paleta (ver css/variables.css), no un hex:
// así el color de cada tipo vive en un solo lugar.

export const TIPOS_EVENTO = [
  { id: 'adultos-mayores', nombre: 'Adultos mayores', color: 'amarillo' },
  { id: 'ninos', nombre: 'Niños', color: 'verde' },
  { id: 'medicinas', nombre: 'Medicinas', color: 'terracota' },
  { id: 'voces', nombre: 'Voces de San Jorge', color: 'negro' },
  { id: 'religioso', nombre: 'Religioso', color: 'gris' },
  { id: 'comunidad', nombre: 'Comunidad', color: 'gris' },
];

export const IDS_TIPO = TIPOS_EVENTO.map((t) => t.id);
