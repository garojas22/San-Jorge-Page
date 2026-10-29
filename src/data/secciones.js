// Contenido de las secciones de servicios, Voces de San Jorge, ayuda y donaciones.
// `icono` es el nombre de un ícono de components/Icono.astro.
// `null` = dato pendiente de la fundación (se muestra como "Pendiente").

export const SERVICIOS = [
  { icono: 'activity', titulo: 'Fisioterapia', texto: 'Sesiones para mantener el movimiento y aliviar dolores.' },
  { icono: 'scissors', titulo: 'Barbería', texto: 'Corte de cabello y afeitado.' },
  { icono: 'sparkles', titulo: 'Belleza integral', texto: 'Cuidado personal para sentirse bien.' },
  { icono: 'pill', titulo: 'Medicinas donadas', texto: 'Entrega de medicinas recibidas en donación.' },
  { icono: 'smile', titulo: 'Terapias', texto: 'Personales, familiares y grupales.' },
];

export const VOCES = {
  texto: [
    'Voces de San Jorge es el proyecto de música terapéutica de la fundación, junto a la Orquesta Sinfónica y la Dama Voluntaria.',
    'Ensayan los lunes en el comedor.',
  ],
  presentaciones: null, // PENDIENTE: dónde y cuándo se presentan
};

// Formas de ayudar. `mensaje` es el texto que aparece ya escrito al abrir WhatsApp.
export const FORMAS_DE_AYUDAR = [
  {
    id: 'donar',
    icono: 'package',
    titulo: 'Donar',
    texto: 'Medicinas, artículos de higiene y otros insumos para el comedor.',
    detalle: null, // PENDIENTE: qué se recibe exactamente, dónde y en qué horario
    mensaje: 'Hola, quiero hacer una donación a la Fundación San Jorge.',
  },
  {
    id: 'voluntario',
    icono: 'hand-helping',
    titulo: 'Ser voluntario',
    texto: 'Acompaña, sirve o comparte lo que sabes hacer.',
    detalle: null, // PENDIENTE: requisitos y a quién contactar
    mensaje: 'Hola, me gustaría ser voluntario en la Fundación San Jorge.',
  },
  {
    id: 'aliado',
    icono: 'users',
    titulo: 'Aliarse',
    texto: 'Iglesias, hospitales, empresas e instituciones que quieran sumar esfuerzos.',
    detalle: null,
    mensaje: 'Hola, represento a una institución y nos gustaría aliarnos con la Fundación San Jorge.',
  },
];

export const SOLICITAR_AYUDA = {
  intro:
    'Si necesitas exámenes, consultas médicas u otro apoyo, la fundación puede orientarte a través de Bera Transforma y Bera Salud.',
  pasos: null, // PENDIENTE: pasos reales, a quién va dirigida la carta y qué documentos llevar
  mensaje: 'Hola, quisiera información para solicitar ayuda a la Fundación San Jorge.',
};
