// Datos generales de la fundación. Es el único archivo que hay que tocar
// cuando cambia un texto institucional, una cifra o un dato de contacto.
//
// Todo lo que vale `null` es un dato PENDIENTE de la fundación. La página
// lo muestra como un recuadro "Pendiente" y, en cuanto se rellena aquí,
// el recuadro desaparece solo. No inventar estos valores.

export const SITIO = {
  nombre: 'Fundación San Jorge',
  nombreCorto: 'San Jorge',
  lema: 'Alimentamos corazones',
  frase: 'Un brillo de luz en la oscuridad',
  mision: 'Alimento para el cuerpo y para el alma.',
  ubicacion: 'La Victoria, municipio José Félix Ribas, Aragua',

  // SEO: lo que sale en Google y al compartir el enlace.
  tituloSeo: 'Fundación San Jorge | Comedor y labor social en La Victoria, Aragua',
  descripcionSeo:
    'Comedor para adultos mayores en La Victoria, Aragua. Conoce las actividades de cada día, los próximos eventos y cómo donar o ser voluntario.',

  historia: [
    'Desde hace 29 años, la Fundación San Jorge acompaña a las personas que más lo necesitan en La Victoria. Hace 17 años abrió su comedor, que hoy atiende de lunes a viernes a cientos de personas.',
    'La mayoría son adultos mayores: muchos viven en situación de calle y otros llegan buscando compañía.',
  ],

  cifras: [
    { valor: '29', texto: 'años de la fundación' },
    { valor: '17', texto: 'años del comedor' },
    { valor: '400+', texto: 'personas al día' },
  ],

  contacto: {
    whatsapp: null, // PENDIENTE: número oficial, ej. '0414-1234567'
    instagram: null, // PENDIENTE: usuario sin @, ej. 'fundacionsanjorge'
    direccion: null, // PENDIENTE: dirección exacta
    mapaUrl: null, // PENDIENTE: enlace de Google Maps
  },

  // Logo provisional: JPG con fondo blanco. PENDIENTE: PNG o SVG con fondo transparente.
  logo: '/logo-san-jorge.webp',
  fotoPortada: null, // PENDIENTE: '/fotos/patio.webp' (foto del patio con los murales)
};
