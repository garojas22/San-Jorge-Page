# San Jorge Conecta

Sitio web de la **Fundación San Jorge** (La Victoria, Aragua): programación semanal, eventos, servicios y cómo ayudar o pedir ayuda.
Proyecto de Servicio Comunitario UBA de Gabriel Alejandro Rojas González.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm test` | Prueba la lógica pura (`js/lib/`) |

Para ver el sitio, abre `index.html` con **Live Server** (VS Code) o con:

```
npx serve .
```

No hace falta compilar nada.

## Estructura

| Carpeta / archivo | Qué va ahí |
| --- | --- |
| `index.html` | Portada (una sola página larga con todas las secciones) |
| `evento.html` | Plantilla de detalle de evento (`?id=<id>`) |
| `404.html` | Página de error |
| `css/` | Un archivo CSS por área; `variables.css` define toda la paleta y medidas |
| `js/lib/` | Lógica pura: fechas, eventos, WhatsApp, programación. Sin DOM, con pruebas |
| `js/data/` | Datos editables: `eventos.js`, `contacto.js`, `tipos-evento.js` |
| `js/main.js` | Mejoras progresivas para `index.html` (menú, Hoy, eventos, WhatsApp) |
| `js/evento.js` | Arma `evento.html` a partir de `?id=` |
| `fonts/` | Nunito Sans 400/700/800 (latin), servidas localmente |
| `img/` | Logo, imagen OG y favicon |
| `tests/` | Pruebas de `js/lib/` con Node.js nativo |
| `docs/` | Decisiones y bitácora del proyecto |

## Agregar un evento

Abrir `js/data/eventos.js` y agregar un objeto al array `EVENTOS`:

```js
{
  id: 'jornada-medicinas-2026-12',   // único, nunca se cambia después de publicar
  titulo: 'Jornada de recolección de medicinas',
  tipo: 'medicinas',                  // ver tipos-evento.js para los ids válidos
  fecha: '2026-12-05',
  horaInicio: '08:00',
  horaFin: '12:00',                   // opcional
  lugar: 'Comedor Fundación San Jorge',
  descripcion: 'Máximo 200 caracteres.',
  queLlevar: 'Opcional',              // opcional
  publicado: true,
}
```

`tipo` debe ser uno de: `adultos-mayores`, `ninos`, `medicinas`, `voces`, `religioso`, `comunidad`.

## Activar WhatsApp

Editar `js/data/contacto.js` y poner el número oficial:

```js
export const CONTACTO = {
  whatsapp: '0414-1234567',   // ← aquí
  ...
};
```

Los botones de las secciones "Cómo ayudar" y "Solicitar ayuda" se activan solos.

Decisiones y cambios de id: [`docs/DECISIONES.md`](docs/DECISIONES.md). Horas del servicio: [`docs/BITACORA.md`](docs/BITACORA.md).
