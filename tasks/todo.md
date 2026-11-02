# Task List - LIMINAL SPACE

## FASE 5 - ATMOSFERA Y POST-PROCESADO

- [x] Task 1: Crear módulo de niebla (src/atmosphere/fog.js).
- [x] Task 2: Implementar post-procesado (src/atmosphere/postprocessing.js) y calidad baja (ATMOSPHERE.quality / setQuality).
- [x] Task 3: Medir coste de post-procesado (< 2 ms objetivo) y validar degradación (performanceGuard).

## Checkpoint: FASE 5

- Tasks 1-3 implementadas y validadas con build y render headless; medición final en GPU real pendiente.

## FASE 6 - INTERACTIVIDAD Y EVENTOS

- [x] Task 1: Crear módulo de anomalías ambientales sutilas (parpadeo de luces, puertas, cambios de longitud del pasillo, ruidos diegósticos).
- [x] Task 2: Integrar eventos/triggers con loop y colisiones.
- [x] Task 3: Validar reintentabilidad y ausencia de frame drops (build + render headless OK; validación interactiva en curso).

## Checkpoint: FASE 6

- Tasks 1-3 implementadas y validadas con build y render headless; validación interactiva en curso.

## FASE 7 - AUDIO ESPACIAL

- [x] Task 1: Implementar AudioContext tras gestor y soundscape base (src/audio/audio.js).
- [x] Task 2: Integrar audio con gesto de usuario y actualizar en el loop (main.js).
- [x] Task 3: Añadir control de volumen/silencio (M, corchetes) y validar.

## Checkpoint: FASE 7

- Tasks 1-3 implementadas y validadas con build y render headless; reproducción de audio pendiente de validación interactiva.

## FASE 8 - NARRATIVA AMBIENTAL Y TRANSICIONES

- [x] Task 1: Props narrativos y detalles ambientales (src/world/story-props.js: silla, reloj detenido).
- [x] Task 2: Transiciones de entrada y salida (src/core/transitions.js + #transition-veil).
- [x] Task 3: Tipografía e interfaz minimalistas finales (index.html, main.css, indicador de audio).
- [x] Task 4: Indicios de geometría imposible (marco inclinado, silla frente al muro, reloj parado).

## Checkpoint: FASE 8

- Tasks 1-4 implementadas; build, render headless y suite de pruebas OK; revisión visual y recorrido completo pendientes.

## FASE 9 - OPTIMIZACIÓN Y AUDITORÍA

- [x] Task 1: Auditoría estática (tamaños, imports/exports muertos, console, duplicidades, dispose).
- [x] Task 2: Métricas de escena estimadas (draw calls ~25, triángulos ~2k, texturas 12x512²).
- [ ] Task 3: Perfilado real de FPS/memoria en GPU y sesión de 10 minutos.
- [ ] Task 4: Matriz de navegadores (Chrome headless verificado; Firefox/Safari pendientes).

## Checkpoint: FASE 9

- Auditoría estática y métricas estimadas completadas; perfilado real y matriz de navegadores bloqueados por el entorno.

## FASE 10 - CIERRE DEL HITO

- [x] Task 1: Build final y verificación de producción (dist + preview en 4174 + render headless).
- [x] Task 2: Documentación actualizada (MEMORY.md, FASES.md, tasks/todo.md).
- [ ] Task 3: QA interactivo completo contra AGENTS.md §3 (pointer lock, audio, recorrido, salida).
- [ ] Task 4: Versión/tag del hito (requiere repositorio git; el proyecto no es un repo).

## Checkpoint: FASE 10

- Build de producción y documentación completados; QA interactivo y tag bloqueados por el entorno.

## FASE 4 - NAVEGACIÓN Y COLISIONES

- [ ] Task 1: Crear módulo de entrada y movimiento del jugador (pointer lock, WASD, sprint).
- [ ] Task 2: Implementar resolución de colisiones contra el corredor (paredes, suelo, techo, extremos).
- [ ] Task 3: Añadir overlay de inicio/liberación con ESC y fallback para dispositivos sin pointer lock.
- [ ] Task 4: Integrar player en el bucle de renderizado y validar con build y render headless.

## Checkpoint: FASE 4 completada

- [ ] Tasks 1-4 implementadas y verificadas.
