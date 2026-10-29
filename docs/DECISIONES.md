# Decisiones y cambios

Registro de lo que se decidió y por qué, y de cualquier cambio de `id`.
Una línea por decisión. Lo más nuevo arriba.

## Cambios de id

Los `id` (archivos de evento, tipos de evento) no se cambian. Si alguna vez hace falta, se anota aquí **antes** de hacerlo: fecha, id viejo → id nuevo, motivo, qué enlaces o datos se ven afectados.

| Fecha | Viejo | Nuevo | Motivo | Afecta |
| --- | --- | --- | --- | --- |
| — | — | — | (ninguno todavía) | — |

## Decisiones

| Fecha | Decisión | Por qué | Techo conocido |
| --- | --- | --- | --- |
| 2026-10-29 | **Se quita Astro: HTML/CSS/JS sin compilación**, pedido de Alejandro para poder leer y mantener el código directo. Techo: la vista previa en WhatsApp de cada evento muestra la tarjeta general; encabezado y pie repetidos en 3 archivos | Astro sumaba una capa de compilación que impedía editar directamente los archivos en producción | Para agregar un evento se edita `js/data/eventos.js` sin compilar |
| 2026-10-28 | **Diseño minimalista aprobado** (lienzo "San Jorge Conecta — Diseños"): fondo blanco, gris suave para alternar secciones, negro y amarillo solo en detalles | La primera versión (negro y amarillo dominantes, títulos en mayúsculas) parecía una página de apuestas. La fundación usa mucho el blanco | Cualquier pantalla nueva sigue ese lienzo; se diseña antes de codificar |
| 2026-10-28 | Una sola tipografía: **Nunito Sans** (se quitó Montserrat del brief) | Montserrat 800 en mayúsculas era lo que más endurecía el diseño. Una familia redondeada es más amable y legible para adultos mayores | — |
| 2026-10-28 | Verde solo para WhatsApp; terracota solo como punto de "Medicinas"; tipos de evento como punto de color + nombre escrito | Menos colores; nunca depender solo del color | — |
| 2026-10-28 | Logo provisional en WebP (192 px) a partir del JPG entregado | Ya se puede ver la marca real | Tiene fondo blanco: en el pie se funde con `mix-blend-mode`. Pedir PNG o SVG transparente |
| 2026-10-28 | **Astro** (JavaScript, sin TypeScript) en vez de HTML suelto o React | Genera HTML estático (rápido en 3G, funciona sin JS) pero con componentes y una página real por evento. Escala a más páginas sin rehacer la base | El voluntario no edita código: necesita un panel (ver pendiente abajo) |
| 2026-10-28 | Sin Bootstrap | El diseño es propio; Bootstrap sumaba ~25 KB de CSS sin usar | Si se quiere mostrar en la electiva, se puede explicar el grid propio |
| 2026-10-28 | Una página HTML por evento (`/eventos/<id>`) | WhatsApp no ejecuta JavaScript: solo así el enlace compartido muestra el título del evento | Cada evento nuevo requiere recompilar (Netlify lo hace solo al publicar) |
| 2026-10-28 | Eventos como archivos JSON en el repositorio, detrás de `src/fuentes/eventos.js` | Arrancar hoy sin depender de cuentas de la fundación. Cambiar de fuente toca un solo archivo | Por ahora solo Alejandro puede agregar eventos |
| 2026-10-28 | "Hoy" y eventos vencidos se calculan en el teléfono, con fecha local | El sitio se publica una vez y se mira cualquier día. Nunca `toISOString()` (en UTC-4 el día cambia a las 8 p.m.) | Si el teléfono tiene mal la fecha, "Hoy" sale mal |
| 2026-10-28 | WhatsApp por enlaces `wa.me` | No requiere API, cuenta Business ni costo. Abre el chat con el mensaje escrito | No hay respuestas automáticas (eso sería otro proyecto) |
| 2026-10-28 | Sin formularios en "Solicitar ayuda" | No hay dónde guardar de forma segura datos de personas vulnerables | — |
| 2026-10-28 | Menú desplegado desde 992 px (el brief decía 768) | Seis enlaces + marca + A+ no caben en 768 px sin apretar la letra | — |
| 2026-10-28 | Netlify (plan gratis) | Pedido de Alejandro: mejor imagen que GitHub Pages | Plan gratis: 300 créditos/mes, cada publicación cuesta 15 (≈ 20 al mes). Si se acaban, **el sitio se apaga** hasta el mes siguiente. Las vistas previas de rama no gastan |

## Contraste verificado (WCAG, mínimo 4.5:1)

Negro sobre blanco 17.0 · amarillo con texto negro 10.4 · gris #5C5650 sobre blanco 7.2 y sobre gris suave #F7F5F0 6.6 · verde con blanco 7.6 · negro sobre resaltado #FFF4CC 15.5.
El gris medio #8A8379 solo se usa en puntos y bordes punteados, nunca para texto.
**Prohibido:** amarillo sobre blanco (1.6) y gris sobre amarillo (4.4).

## Pendientes de decisión

- **Cómo publica eventos la fundación sin tocar código.** Opción preferida: panel `/admin` (Sveltia CMS o Decap CMS) que escribe los mismos JSON con formulario, calendario y lista de tipos. Alternativa: hoja de Google leída al compilar. Ambas encajan en `src/fuentes/eventos.js` sin cambiar el resto. Hay que verificar cómo inicia sesión el personal y cuántas publicaciones al mes genera (límite de Netlify).
