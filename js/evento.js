// Arma la página evento.html a partir del parámetro ?id=<id>.
// Si el id no existe, muestra un mensaje de 404 con enlace al inicio.
// El <title> se actualiza para que el navegador lo muestre en la pestaña.

import { fechaLarga, rangoHoras, horaLegible } from './lib/fechas.js';
import { tipoPorId } from './lib/eventos.js';
import { enlaceWhatsApp } from './lib/whatsapp.js';
import { EVENTOS } from './data/eventos.js';
import { CONTACTO } from './data/contacto.js';

// --- SVG de íconos inline (aria-hidden, tamaño variable) ------------------
function icono(nombre, tam = 24) {
  const SVGS = {
    'chevron-left': `<path d="m15 18-6-6 6-6"/>`,
    'calendar': `<path d="M8 2v3"/><path d="M16 2v3"/><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/>`,
    'map-pin': `<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>`,
    'package': `<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>`,
    'message-circle': `<path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>`,
    'share-2': `<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>`,
  };
  const inner = SVGS[nombre] ?? '';
  return `<svg aria-hidden="true" focusable="false" class="icono" xmlns="http://www.w3.org/2000/svg" width="${tam}" height="${tam}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
}

// --- Render principal -------------------------------------------------------
const main = document.getElementById('contenido');
if (!main) throw new Error('No se encontró #contenido');

const id = new URLSearchParams(location.search).get('id');
const evento = EVENTOS.find((e) => e.id === id && e.publicado);

if (!evento) {
  // 404 inline: el id no existe o no está publicado.
  document.title = 'Evento no encontrado | Fundación San Jorge';
  main.innerHTML = `<section class="contenedor no-encontrada">
  <h1>Esta página no existe</h1>
  <p>Puede que el evento ya haya pasado o que el enlace esté incompleto.</p>
  <a class="boton boton--principal" href="index.html">Ir al inicio</a>
</section>`;
} else {
  const larga = fechaLarga(evento.fecha);
  const diaTexto = larga[0].toUpperCase() + larga.slice(1);
  const horas = rangoHoras(evento.horaInicio, evento.horaFin);
  const cuando = `${larga}, ${horas}`;
  const tipo = tipoPorId(evento.tipo);

  // Compartir no necesita el número de la fundación.
  const compartir = `https://wa.me/?text=${encodeURIComponent(`${evento.titulo}, ${cuando}. ${location.href}`)}`;
  const preguntar = enlaceWhatsApp(CONTACTO.whatsapp, `Hola, quisiera información sobre el evento "${evento.titulo}" del ${larga}.`);

  document.title = `${evento.titulo} | Fundación San Jorge`;

  // Meta description para el historial del navegador (no para rastreadores: llega tarde).
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = `${cuando}. ${evento.descripcion}`;

  // Schema.org Event (solo eventos reales, no ejemplos).
  if (!evento.ejemplo) {
    const ld = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: evento.titulo,
      description: evento.descripcion,
      startDate: `${evento.fecha}T${evento.horaInicio}:00-04:00`,
      ...(evento.horaFin && { endDate: `${evento.fecha}T${evento.horaFin}:00-04:00` }),
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: { '@type': 'Place', name: evento.lugar },
      organizer: { '@type': 'NGO', name: 'Fundación San Jorge' },
      isAccessibleForFree: true,
    };
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.textContent = JSON.stringify(ld);
    document.head.appendChild(s);
  } else {
    // Los eventos de ejemplo no se anuncian a Google.
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex';
    document.head.appendChild(meta);
  }

  const fotoHTML = evento.foto
    ? `<img src="${evento.foto}" alt="" width="900" height="600" />`
    : `<div class="pendiente pendiente--foto"><span>[Foto del evento, opcional]</span></div>`;

  const queLlevarHTML = evento.queLlevar ? `<div>
      ${icono('package', 22)}
      <div><dt>Qué llevar</dt><dd>${evento.queLlevar}</dd></div>
    </div>` : '';

  const contactoHTML = evento.contacto ? `<div>
      ${icono('message-circle', 22)}
      <div><dt>Contacto</dt><dd>${evento.contacto}</dd></div>
    </div>` : '';

  const preguntarHTML = preguntar ? `<a class="boton boton--secundario" href="${preguntar}" target="_blank" rel="noopener">Preguntar a la fundación</a>` : '';

  main.innerHTML = `<article class="detalle contenedor">
  <a href="index.html#eventos" class="detalle__volver">${icono('chevron-left', 20)}Todos los eventos</a>

  <p class="detalle__etiquetas">
    <span class="tipo"><span class="tipo__punto tipo__punto--${tipo.color}" aria-hidden="true"></span>${tipo.nombre}</span>${evento.ejemplo ? '<span class="detalle__ejemplo">Evento de ejemplo</span>' : ''}
  </p>
  <h1>${evento.titulo}</h1>

  <div class="detalle__foto">${fotoHTML}</div>

  <dl class="detalle__datos">
    <div>
      ${icono('calendar', 22)}
      <div><dt>Cuándo</dt><dd>${diaTexto}<br>${horas}</dd></div>
    </div>
    <div>
      ${icono('map-pin', 22)}
      <div><dt>Dónde</dt><dd>${evento.lugar}</dd></div>
    </div>
    ${queLlevarHTML}
    ${contactoHTML}
  </dl>

  <p class="detalle__descripcion">${evento.descripcion}</p>

  <div class="detalle__botones">
    <a class="boton boton--whatsapp" href="${compartir}" target="_blank" rel="noopener">${icono('share-2', 20)}<span>Compartir por WhatsApp</span></a>
    ${preguntarHTML}
  </div>
</article>`;
}
