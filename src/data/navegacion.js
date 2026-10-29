// Enlaces del menú. Empiezan con "/" para que funcionen también desde la
// página de un evento, no solo desde la portada.
// `soloMenu`: aparece en el menú del teléfono pero no en la barra de la
// computadora (ahí no cabe y "Quiénes somos" está justo debajo de la portada).
export const NAVEGACION = [
  { href: '/#programacion', texto: 'Actividades' },
  { href: '/#eventos', texto: 'Eventos' },
  { href: '/#quienes-somos', texto: 'Quiénes somos', soloMenu: true },
  { href: '/#servicios', texto: 'Servicios' },
  { href: '/#como-ayudar', texto: 'Cómo ayudar' },
  { href: '/#solicitar-ayuda', texto: 'Solicitar ayuda' },
  { href: '/#contacto', texto: 'Contacto' },
];
