// Eventos de la fundación. Un objeto por evento.
// Para agregar un evento, añadir un objeto al array EVENTOS.
// El campo `id` es el identificador único; NUNCA se cambia una vez publicado.
// `tipo` debe ser uno de los ids de js/data/tipos-evento.js.
// `publicado: false` lo oculta sin borrarlo.
// `ejemplo: true` lo marca con la etiqueta "Ejemplo" y lo excluye de Google.

export const EVENTOS = [
  {
    id: 'ejemplo-presentacion-voces',
    titulo: 'Presentación de Voces de San Jorge',
    tipo: 'voces',
    fecha: '2026-11-13',
    horaInicio: '10:00',
    horaFin: '11:30',
    lugar: 'Comedor Fundación San Jorge',
    descripcion: 'Evento de ejemplo para mostrar cómo se verá una tarjeta. Música terapéutica con la Orquesta Sinfónica y la Dama Voluntaria.',
    publicado: true,
    ejemplo: true,
  },
  {
    id: 'ejemplo-recoleccion-medicinas',
    titulo: 'Jornada de recolección de medicinas',
    tipo: 'medicinas',
    fecha: '2026-11-18',
    horaInicio: '08:00',
    horaFin: '14:00',
    lugar: 'Comedor Fundación San Jorge',
    descripcion: 'Evento de ejemplo. Así se anunciaría una jornada para recibir medicinas en donación.',
    queLlevar: 'Medicinas vigentes, en su empaque original',
    publicado: true,
    ejemplo: true,
  },
  {
    id: 'ejemplo-misa-mensual',
    titulo: 'Misa mensual',
    tipo: 'religioso',
    fecha: '2026-11-25',
    horaInicio: '09:00',
    lugar: 'Comedor Fundación San Jorge',
    descripcion: 'Evento de ejemplo. La misa que se celebra una vez al mes junto a la Iglesia de las Mercedes.',
    publicado: true,
    ejemplo: true,
  },
];
