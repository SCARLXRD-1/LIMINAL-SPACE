# LIMINAL SPACE

**A place that shouldn't exist.**

Experiencia web inmersiva en primera persona: un corredor arquitectónico aparentemente ordinario, pero fundamentalmente inquietante. Construida con Three.js, Vite y JavaScript vanilla.

## Estado

Hito activo: **THE ENTRANCE**.

- FASE 0-2: fundación, núcleo de renderizado y arquitectura del corredor.
- FASE 3: materiales PBR procedurales, iluminación fluorescente y sombras.
- FASE 4: navegación en primera persona con pointer lock y colisiones.
- FASE 5: niebla, post-procesado y degradación adaptativa de calidad.
- FASE 6: anomalías ambientales (parpadeo de luminarias).
- FASE 7: audio espacial procedural (Web Audio, sin assets externos).
- FASE 8: narrativa ambiental, transiciones e interfaz minimalista.
- FASE 9: auditoría estática y métricas (perfilado en GPU real pendiente).
- FASE 10: build de producción validado (QA interactivo pendiente).

La validación interactiva completa (pointer lock, audio y recorrido) y la medición de FPS en GPU real siguen pendientes.

## Stack

- HTML5, CSS3 y JavaScript (ES Modules).
- Three.js 0.170.
- Vite 5.4.
- WebGL, GLSL y Web Audio API.

Sin frameworks de UI ni dependencias adicionales.

## Requisitos

- Node.js 18 o superior.
- Navegador de escritorio con WebGL 2.

## Uso

```bash
npm install
npm run dev       # http://localhost:4173
npm run build     # build de producción en dist/
npm run preview   # sirve dist/ en http://localhost:4174
npm test          # pruebas de regresión (node --test)
```

## Controles

- **Click** en la portada para entrar (pointer lock).
- **WASD**: movimiento.
- **Shift**: correr.
- **Ratón**: mirar.
- **M**: silenciar / activar audio.
- **[ ]**: bajar / subir volumen.
- **Esc**: liberar el puntero.

## Estructura

```
src/
  main.js                 bootstrap y bucle principal
  config/constants.js     escena, cámara, corredor, renderer, atmósfera
  core/                   renderer, escena, loop, resize, rendimiento, transiciones
  world/                  corredor, props, story-props, materiales, texturas, luces
  player/                 controles en primera persona y colisiones
  atmosphere/             niebla y post-procesado
  events/                 anomalías ambientales
  audio/                  audio procedural
  styles/                 hoja de estilos
tests/                    pruebas de regresión de utilidades core
public/                   recursos estáticos (vacío por ahora)
```

## Notas

- Todas las texturas y el audio son procedurales: no se usan assets externos ni con licencias de terceros.
- No se midieron 60 FPS en hardware GPU real; solo se validó Chromium headless (SwiftShader).
- Documentación interna de fases y estándares: `AGENTS.md`, `REGLAS.md`, `FASES.md` y `tasks/`.
- `MEMORY.md` es memoria local de agentes y está excluido de git.

**LIMINAL SPACE — A PLACE THAT SHOULDN'T EXIST.**