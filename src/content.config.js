// Forma de un evento. Si un archivo de evento no cumple esta forma, la
// compilación FALLA y Netlify no publica: preferimos eso a publicar un
// evento con la fecha mal escrita.
//
// El `id` de cada evento es el nombre de su archivo (sin .json) y es la
// dirección de su página: /eventos/<id>. NUNCA se renombra un archivo de
// evento ya publicado: los enlaces compartidos por WhatsApp dejarían de
// funcionar. Si hay que cambiarlo, se anota en docs/DECISIONES.md.

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { IDS_TIPO } from './data/tipos-evento.js';

const hora = z.string().regex(/^\d{2}:\d{2}$/, 'Hora en formato HH:MM, ej. 09:00');

const eventos = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/eventos' }),
  schema: z.object({
    titulo: z.string().min(3),
    tipo: z.enum(IDS_TIPO),
    fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha en formato AAAA-MM-DD'),
    horaInicio: hora,
    horaFin: hora.optional(),
    lugar: z.string(),
    descripcion: z.string().max(200, 'Máximo 200 caracteres'),
    queLlevar: z.string().optional(),
    foto: z.string().optional(),
    contacto: z.string().optional(),
    publicado: z.boolean().default(true),
    // Eventos inventados para mostrar el diseño. Se ven con la etiqueta
    // "Ejemplo" y no se anuncian a Google. Se borran al cargar los reales.
    ejemplo: z.boolean().default(false),
  }),
});

export const collections = { eventos };
