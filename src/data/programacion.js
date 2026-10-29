// Programación semanal fija del comedor (entrevista con la Sra. Laura Rodríguez).
//
// `dia` usa la misma numeración que Date.getDay(): 0 = domingo, 1 = lunes...
// Así no hay que traducir números en ningún lado.

export const HORARIO = {
  dias: 'Lunes a viernes',
  apertura: '08:00',
  cierre: '14:00',
};

export const PROGRAMACION = [
  {
    dia: 1,
    nombre: 'Lunes',
    actividades: [
      'Terapias personales',
      'Juegos de mesa: dominó y ajedrez',
      'Música',
      'Ensayo de Voces de San Jorge',
    ],
  },
  {
    dia: 2,
    nombre: 'Martes',
    actividades: [
      'Desayuno de arepas',
      'Iglesia Evangélica con el Pastor Luis Córdoba',
      'Terapias familiares y grupales con la Lcda. Xiomara',
    ],
  },
  {
    dia: 3,
    nombre: 'Miércoles',
    actividades: [
      'Rosario con la Iglesia de las Mercedes',
      'Misa (una vez al mes)',
    ],
  },
  {
    dia: 4,
    nombre: 'Jueves',
    actividades: [
      'Gimnasia cerebral',
      'Dominó, ajedrez, ludo y bingo con premios',
    ],
  },
  {
    dia: 5,
    nombre: 'Viernes',
    actividades: [
      'Bingo',
      'Mañana de karaoke con Simón',
    ],
  },
];
