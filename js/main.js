// Lo poco que necesita JavaScript en el teléfono. Todo es mejora: si este
// archivo no carga, la página sigue completa y usable.
// Las reglas viven en js/lib/ (probadas con node); aquí solo se conectan
// con la página.

import { fechaLocalISO, fechaLarga, rangoHoras, fechaCorta, horaLegible } from './lib/fechas.js';
import { programacionDelDia } from './lib/programacion.js';
import { eventosProximos, tipoPorId, tiposPresentes } from './lib/eventos.js';
import { enlaceWhatsApp } from './lib/whatsapp.js';
import { EVENTOS } from './data/eventos.js';
import { CONTACTO } from './data/contacto.js';

const hoy = fechaLocalISO();

// --- Botón A+ --------------------------------------------------------------
function iniciarTextoGrande() {
  const boton = document.querySelector('[data-texto-grande]');
  if (!boton) return;
  const raiz = document.documentElement;
  boton.setAttribute('aria-pressed', String(raiz.classList.contains('texto-grande')));
  boton.addEventListener('click', () => {
    const activo = raiz.classList.toggle('texto-grande');
    boton.setAttribute('aria-pressed', String(activo));
    // localStorage puede fallar (modo privado, almacenamiento bloqueado):
    // el botón funciona igual, solo no se recuerda para la próxima visita.
    try { localStorage.setItem('sj-texto-grande', activo ? '1' : '0'); } catch (e) {}
  });
}

// --- Menú del teléfono -----------------------------------------------------
function iniciarMenu() {
  const boton = document.querySelector('[data-menu-boton]');
  const menu = document.getElementById('menu-principal');
  if (!boton || !menu) return;
  const texto = boton.querySelector('[data-menu-texto]');
  const poner = (abierto) => {
    menu.classList.toggle('abierto', abierto);
    boton.setAttribute('aria-expanded', String(abierto));
    if (texto) texto.textContent = abierto ? 'Cerrar' : 'Menú';
  };
  boton.addEventListener('click', () => poner(!menu.classList.contains('abierto')));
  // Al elegir una sección, cerrar el menú para que se vea a dónde saltó.
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) poner(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') poner(false); });
}

// --- Tarjeta "Hoy" y día resaltado en la semana ----------------------------
// La programación semanal se lee del DOM (la lista .semana con data-dia):
// única fuente de verdad, sin duplicar los datos en JavaScript.
function iniciarHoy() {
  const programacion = [...document.querySelectorAll('.semana [data-dia]')].map((el) => ({
    dia: Number(el.dataset.dia),
    actividades: [...el.querySelectorAll('.semana__actividades li')].map((li) => li.textContent.trim()),
  }));

  const delDia = programacionDelDia(hoy, programacion);
  const dia = document.querySelector('[data-hoy-dia]');
  const horario = document.querySelector('[data-hoy-horario]');
  const lista = document.querySelector('[data-hoy-lista]');

  if (dia && horario && lista) {
    if (delDia) {
      // "Miércoles 28 de octubre": el nombre del día con mayúscula inicial.
      const larga = fechaLarga(hoy);
      dia.textContent = larga[0].toUpperCase() + larga.slice(1);
      horario.textContent = rangoHoras('08:00', '14:00');
      // Las actividades van antes del enlace "Ver toda la semana".
      const enlace = lista.lastElementChild;
      for (const a of delDia.actividades) {
        const li = document.createElement('li');
        li.textContent = a;
        lista.insertBefore(li, enlace);
      }
    } else {
      dia.textContent = 'Hoy no abrimos';
      horario.textContent = `Volvemos el lunes a las ${rangoHoras('08:00')}`;
    }
  }

  if (delDia) {
    const fila = document.querySelector(`.semana [data-dia="${delDia.dia}"]`);
    if (fila) {
      fila.classList.add('es-hoy');
      fila.querySelector('.semana__hoy')?.removeAttribute('hidden');
    }
  }
}

// --- Eventos: pintar tarjetas, filtrar por tipo ----------------------------
function crearTarjetaEvento(evento) {
  const corta = fechaCorta(evento.fecha);
  const larga = fechaLarga(evento.fecha);
  const cuando = `${larga[0].toUpperCase()}${larga.slice(1)}, ${horaLegible(evento.horaInicio)}`;
  const tipo = tipoPorId(evento.tipo);

  const li = document.createElement('li');
  li.dataset.fecha = evento.fecha;
  li.dataset.tipo = evento.tipo;

  li.innerHTML = `<article class="evento" aria-labelledby="ev-${evento.id}">
  <div class="evento__fecha" aria-hidden="true">
    <span class="evento__num">${corta.dia}</span>
    <span class="evento__mes">${corta.mes}</span>
  </div>
  <div>
    <p class="evento__etiquetas">
      <span class="tipo"><span class="tipo__punto tipo__punto--${tipo.color}" aria-hidden="true"></span>${tipo.nombre}</span>${evento.ejemplo ? '<span class="evento__ejemplo">Ejemplo</span>' : ''}
    </p>
    <h3 id="ev-${evento.id}" class="evento__titulo">
      <a href="evento.html?id=${evento.id}">${evento.titulo}</a>
    </h3>
    <p class="evento__dato">${cuando}</p>
    <p class="evento__dato evento__lugar">${evento.lugar}</p>
  </div>
</article>`;

  return li;
}

function iniciarEventos() {
  const lista = document.querySelector('[data-eventos]');
  if (!lista) return;
  const vacio = document.querySelector('[data-eventos-vacio]');
  const contenedorFiltros = document.querySelector('[data-filtros]');

  const proximos = eventosProximos(EVENTOS, hoy);

  // Pintar las tarjetas.
  for (const e of proximos) {
    lista.appendChild(crearTarjetaEvento(e));
  }
  if (vacio) vacio.hidden = proximos.length > 0;

  // Filtros: solo si hay más de un evento y más de un tipo.
  if (proximos.length > 1 && contenedorFiltros) {
    const tipos = tiposPresentes(proximos);
    if (tipos.length > 1) {
      // Construir botones de filtro.
      const todosBtn = document.createElement('button');
      todosBtn.type = 'button';
      todosBtn.className = 'filtro';
      todosBtn.dataset.filtro = 'todos';
      todosBtn.setAttribute('aria-pressed', 'true');
      todosBtn.textContent = 'Todos';
      contenedorFiltros.appendChild(todosBtn);

      for (const t of tipos) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'filtro';
        btn.dataset.filtro = t.id;
        btn.setAttribute('aria-pressed', 'false');
        btn.textContent = t.nombre;
        contenedorFiltros.appendChild(btn);
      }

      contenedorFiltros.hidden = false;

      const vigentes = [...lista.children];
      const aplicar = (tipo) => {
        let visibles = 0;
        for (const li of vigentes) {
          li.hidden = tipo !== 'todos' && li.dataset.tipo !== tipo;
          if (!li.hidden) visibles++;
        }
        if (vacio) vacio.hidden = visibles > 0;
      };

      contenedorFiltros.addEventListener('click', (e) => {
        const b = e.target.closest('[data-filtro]');
        if (!b) return;
        contenedorFiltros.querySelectorAll('[data-filtro]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        aplicar(b.dataset.filtro);
      });
    }
  }
}

// --- WhatsApp: activa botones con data-whatsapp-mensaje --------------------
// El número vive en js/data/contacto.js. Sin número, los botones
// permanecen ocultos (un botón que no lleva a ningún lado es peor que ninguno).
function iniciarWhatsApp() {
  const numero = CONTACTO.whatsapp;

  // Botones de las secciones "Cómo ayudar" y "Solicitar ayuda".
  document.querySelectorAll('[data-whatsapp-mensaje]').forEach((el) => {
    const enlace = enlaceWhatsApp(numero, el.dataset.whatsappMensaje);
    if (enlace) {
      el.href = enlace;
      el.hidden = false;
    }
  });

  // Ocultar el aviso "Pendiente: número de WhatsApp" si ya hay número.
  if (numero) {
    const pendiente = document.querySelector('[data-pendiente-whatsapp]');
    if (pendiente) pendiente.hidden = true;
  }

  // Barra inferior y botón flotante.
  const wa = enlaceWhatsApp(numero, 'Hola, quisiera información sobre la Fundación San Jorge.');
  if (!wa) return;

  const barraCta = document.querySelector('[data-barra-contacto]');
  const barraWa = document.querySelector('[data-barra-whatsapp]');
  if (barraCta) barraCta.hidden = true;
  if (barraWa) { barraWa.href = wa; barraWa.hidden = false; }

  const flotante = document.querySelector('[data-flotante-whatsapp]');
  if (flotante) { flotante.href = wa; flotante.hidden = false; }
}

iniciarTextoGrande();
iniciarMenu();
iniciarHoy();
iniciarEventos();
iniciarWhatsApp();
