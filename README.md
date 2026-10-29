# San Jorge Conecta

Sitio web de la **Fundación San Jorge** (La Victoria, Aragua): programación semanal, eventos, servicios y cómo ayudar o pedir ayuda.
Proyecto de Servicio Comunitario UBA de Gabriel Alejandro Rojas González.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm install` | Instala dependencias (una vez) |
| `npm run dev` | Servidor local en http://localhost:4321 |
| `npm test` | Prueba la lógica pura (`src/lib/`) |
| `npm run build` | Genera el sitio en `dist/` (lo mismo que hace Netlify) |

## Estructura (de adentro hacia afuera)

| Carpeta | Qué va ahí | Regla |
| --- | --- | --- |
| `src/data/` | Textos, programación, tipos de evento, contacto | Lo único que se toca si cambian los datos. `null` = pendiente |
| `src/content/eventos/` | Un archivo `.json` por evento | El nombre del archivo es el `id`: **nunca se renombra** |
| `src/lib/` | Lógica pura: fechas, eventos, WhatsApp | Sin Astro, sin DOM, sin localStorage. Con pruebas en `tests/` |
| `src/fuentes/` | De dónde salen los eventos | Si cambia la fuente, solo cambia este archivo |
| `src/components/` | Secciones y piezas | Reciben datos, no calculan reglas |
| `src/scripts/cliente.js` | Lo único que corre en el teléfono | Todo es mejora: sin JS la página sigue completa |
| `src/styles/` | `variables.css` (paleta, tamaños) y `base.css` | Ningún color fuera de `variables.css` |

## Agregar un evento (mientras no haya panel)

Crear `src/content/eventos/<id>.json`, por ejemplo `jornada-medicinas-2026-12.json`:

```json
{
  "titulo": "Jornada de recolección de medicinas",
  "tipo": "medicinas",
  "fecha": "2026-12-05",
  "horaInicio": "08:00",
  "horaFin": "12:00",
  "lugar": "Comedor Fundación San Jorge",
  "descripcion": "Máximo 200 caracteres.",
  "queLlevar": "Opcional",
  "publicado": true
}
```

`tipo` debe ser uno de: `adultos-mayores`, `ninos`, `medicinas`, `voces`, `religioso`, `comunidad`.
Si algo está mal escrito, `npm run build` falla y dice qué campo: eso es a propósito.

Decisiones y cambios de id: [`docs/DECISIONES.md`](docs/DECISIONES.md). Horas del servicio: [`docs/BITACORA.md`](docs/BITACORA.md).
