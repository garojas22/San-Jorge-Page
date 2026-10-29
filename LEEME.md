# LEEME — San Jorge Conecta (entrega 2: diseño minimalista)

## Qué trae

El repositorio completo con el **diseño aprobado** (fondo blanco, negro y amarillo solo en detalles, logo real, una sola tipografía).
Los datos, la lógica y las pruebas no cambiaron respecto a la entrega 1; cambió todo lo visual.

**Si ya subiste la entrega 1:** descomprime encima y deja que pise los archivos. Además:
- **Borrar** `public/og.png` (lo reemplaza `public/og.jpg`).
- `package.json` y `package-lock.json` cambian (se quitó Montserrat): corre `npm install` de nuevo.

**Si no la subiste:** este zip la reemplaza completa; sigue los pasos de abajo.

Archivos nuevos: `public/logo-san-jorge.webp`, `public/og.jpg`.

- Portada con las 13 secciones del brief, tarjeta "Hoy", programación semanal, 3 eventos de **ejemplo**, servicios, Voces, cómo ayudar, solicitar ayuda, galería y contacto.
- Página propia por evento (`/eventos/<id>`) con botón "Compartir por WhatsApp".
- Botón A+, menú de teléfono, barra inferior fija, filtros de eventos.
- 15 pruebas de la lógica (fechas, eventos, WhatsApp).
- `docs/DECISIONES.md` (decisiones y registro de cambios de id) y `docs/BITACORA.md` (horas).

Lo que falta de la fundación aparece en la página como recuadros **"Pendiente"**. Se quitan solos al rellenar `src/data/sitio.js` y `src/data/secciones.js`.

## Qué NO hacer

- No renombrar archivos de `src/content/eventos/`: el nombre es el id y la dirección de la página.
- No reencodear ni "limpiar" archivos: están en UTF-8 con acentos y eñes.
- No subir `node_modules/` ni `dist/` (ya están en `.gitignore`).

## Pasos

1. Crear en GitHub un repositorio **vacío** (sin README) llamado `san-jorge-conecta`.
2. Abrir un Codespace en ese repositorio, arrastrar el zip y descomprimirlo en la raíz.
3. Correr la verificación (abajo). Si sale bien, commit y push.
4. En Netlify: **Add new project → Import an existing project → GitHub →** elegir el repositorio. La configuración se lee sola de `netlify.toml`. **Deploy.**
5. En Netlify, **Site configuration → Change site name** → `fundacionsanjorge` (si está libre) para tener `fundacionsanjorge.netlify.app`.

## Prompt para Claude Code (si lo usas para aplicar)

> Descomprime este zip en la raíz del repo. Los archivos son completos y van tal cual — no los edites ni los mezcles. **No reencodees ni "limpies" la codificación: están en UTF-8 con acentos y eñes, cópialos byte a byte.** Luego corre la verificación de abajo. Si no salen "fail 0", "Complete!" y "codificacion OK", no subas nada y avisa.

## Verificación

```bash
npm install && npm test && npm run build && (grep -rl 'Ã\|Â\|â€' src/ || echo "codificacion OK")
```

Debe mostrar `# fail 0`, `[build] Complete!` y `codificacion OK`.
Para verla en el Codespace: `npm run dev` y abrir el puerto 4321.
