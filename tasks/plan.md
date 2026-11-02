# Implementation Plan — FASE 4 (LIMINAL SPACE)

## Overview
Implementar exploración en primera persona sobre el corredor THE ENTRANCE: movimiento WASD con pointer lock y colisión sólida contra las paredes, suelo y techo del escenario, más overlay de entrada/liberación.

## Architecture Decisions
- `src/player/controls.js` será el módulo de input/movimiento; `src/player/collision.js` la resolución de colisiones.
- El jugador se modela con AABB simplificado en `src/player/collision.js`; el movimiento se aplica sobre la cámara y se resuelve contra los bounds.

## Task List
- [x] Task 1: Entrada y movimiento del jugador.
- [x] Task 2: Colisiones contra el corredor.
- [x] Task 3: Overlay de inicio/liberación y fallback.
- [x] Task 4: Integración en bucle y verificación.

## Risks and Mitigations
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Validación interactiva con pointer lock | Alto | Requiere navegador real; headless solo valida render. |

## Open Questions
- Velocidad y sprint: valores iniciales definidos en FASE 4.
