// Lo poco que necesita JavaScript en el teléfono. Todo es mejora: si este
// archivo no carga, la página sigue completa y usable.
// Las reglas viven en src/lib/ (probadas con node); aquí solo se conectan
// con la página.

import { fechaLocalISO, fechaLarga, rangoHoras } from '../lib/fechas.js';
import { programacionDelDia } from '../lib/programacion.js';
import { PROGRAMACION, HORARIO } from '../data/programacion.js';

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
function iniciarHoy() {
  const delDia = programacionDelDia(hoy, PROGRAMACION);
  const dia = document.querySelector('[data-hoy-dia]');
  const horario = document.querySelector('[data-hoy-horario]');
  const lista = document.querySelector('[data-hoy-lista]');

  if (dia && horario && lista) {
    if (delDia) {
      // "Miércoles 28 de octubre": el nombre del día con mayúscula inicial.
      const larga = fechaLarga(hoy);
      dia.textContent = larga[0].toUpperCase() + larga.slice(1);
      horario.textContent = rangoHoras(HORARIO.apertura, HORARIO.cierre);
      // Las actividades van antes del enlace "Ver toda la semana".
      const enlace = lista.lastElementChild;
      for (const a of delDia.actividades) {
        const li = document.createElement('li');
        li.textContent = a;
        lista.insertBefore(li, enlace);
      }
    } else {
      dia.textContent = 'Hoy no abrimos';
      horario.textContent = `Volvemos el lunes a las ${rangoHoras(HORARIO.apertura)}`;
    }
  }

  if (delDia) {
    const fila = document.querySelector(`[data-dia="${delDia.dia}"]`);
    if (fila) {
      fila.classList.add('es-hoy');
      fila.querySelector('.semana__hoy')?.removeAttribute('hidden');
    }
  }
}

// --- Eventos: esconder vencidos y filtrar por tipo -------------------------
function iniciarEventos() {
  const lista = document.querySelector('[data-eventos]');
  if (!lista) return;
  const items = [...lista.children];
  const vacio = document.querySelector('[data-eventos-vacio]');
  const filtros = document.querySelector('[data-filtros]');

  // Un evento que pasó después de publicar el sitio se quita de la lista.
  items.filter((li) => li.dataset.fecha < hoy).forEach((li) => li.remove());
  const vigentes = items.filter((li) => li.isConnected);

  const aplicar = (tipo) => {
    let visibles = 0;
    for (const li of vigentes) {
      li.hidden = tipo !== 'todos' && li.dataset.tipo !== tipo;
      if (!li.hidden) visibles++;
    }
    if (vacio) vacio.hidden = visibles > 0;
  };

  if (filtros && vigentes.length > 1) {
    // Quitar botones de tipos que se quedaron sin eventos vigentes.
    const tiposVivos = new Set(vigentes.map((li) => li.dataset.tipo));
    filtros.querySelectorAll('[data-filtro]').forEach((b) => {
      if (b.dataset.filtro !== 'todos' && !tiposVivos.has(b.dataset.filtro)) b.remove();
    });
    filtros.hidden = false;
    filtros.addEventListener('click', (e) => {
      const b = e.target.closest('[data-filtro]');
      if (!b) return;
      filtros.querySelectorAll('[data-filtro]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      aplicar(b.dataset.filtro);
    });
  }
  aplicar('todos');
}

iniciarTextoGrande();
iniciarMenu();
iniciarHoy();
iniciarEventos();
