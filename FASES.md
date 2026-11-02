# FASES.md — ROADMAP DE CONSTRUCCIÓN

Documento rector de fases de LIMINAL SPACE. Se lee junto con `AGENTS.md`, `REGLAS.md` y `MEMORY.md`.

Cada fase define un objetivo cerrado, entregables verificables y criterios de aceptación. Ninguna fase se considera terminada sin pruebas ejecutadas y `MEMORY.md` actualizado.

---

## 0. ESTADO ACTUAL

| Campo | Valor |
|---|---|
| Hito activo | THE ENTRANCE |
| Fase actual | FASE 4 - Navegación y colisiones (implementada; validación interactiva con pointer lock pendiente) |
| Estado | Implementada y validada en headless: PBR procedural, luminarias emisivas con housing/diffuser e iluminación fluorescente; FASE 4 implementada con build y render headless validados. Siguiente: FASE 5. |
| Proyecto inicializado | Sí |
| Última revisión del roadmap | 2026-11-01 |

---

## 1. PRINCIPIOS DEL ROADMAP

1. **Incremental:** una fase por vez. No se implementan funcionalidades de fases futuras.
2. **Ejecutable:** al cerrar cada fase, `npm run dev` y `npm run build` funcionan sin errores de consola.
3. **Verificable:** cada criterio de aceptación debe poder comprobarse objetivamente.
4. **Sin regresiones:** una fase no se cierra si rompe lo validado en fases anteriores.
5. **Alcance cerrado:** si aparece una mejora fuera de alcance, se documenta en `MEMORY.md` y se pospone.
6. **Documentación obligatoria:** cada cierre actualiza `MEMORY.md` (fecha, cambios, archivos, decisiones, pruebas, pendientes).

---

## 2. ESTRUCTURA DE DIRECTORIOS OBJETIVO

Estructura propuesta. Se ajusta solo con justificación técnica documentada.

```
liminal-space/
├─ index.html
├─ package.json
├─ vite.config.js
├─ public/
│  ├─ textures/
│  ├─ hdri/
│  ├─ audio/
│  └─ fonts/
├─ src/
│  ├─ main.js
│  ├─ config/
│  │  └─ constants.js
│  ├─ core/
│  │  ├─ renderer.js
│  │  ├─ scene.js
│  │  ├─ loop.js
│  │  └─ resize.js
│  ├─ world/
│  │  ├─ corridor.js
│  │  ├─ props.js
│  │  ├─ materials.js
│  │  └─ lights.js
│  ├─ player/
│  │  ├─ controls.js
│  │  └─ collision.js
│  ├─ atmosphere/
│  │  ├─ fog.js
│  │  └─ postprocessing.js
│  ├─ audio/
│  │  └─ audio.js
│  ├─ events/
│  │  └─ anomalies.js
│  └─ styles/
│     └─ main.css
└─ docs del proyecto en raíz: AGENTS.md, REGLAS.md, MEMORY.md, FASES.md
```

Regla: un archivo, una responsabilidad. Si un archivo supera las 1.000 líneas, se audita y divide (REGLAS §3).

---

## 3. RESUMEN DE FASES

| Fase | Nombre | Objetivo | Estado |
|---|---|---|---|
| 0 | Fundación del proyecto | Entorno Vite + Three.js ejecutable | Completada (2026-11-01) |
| 1 | Núcleo de renderizado | Renderer, escena, cámara y loop estables | Implementada (FPS en GPU real pendiente) |
| 2 | Arquitectura de THE ENTRANCE | Corredor modular a escala real | Completada (2026-11-01, revisada) |
| 3 | Materiales, texturas e iluminación | Aspecto PBR fotorealista y fluorescente | Implementada (2026-11-01); FPS en GPU real pendiente |
| 4 | Navegación y colisiones | FPS con pointer lock y colisión sólida | Implementada (2026-11-01; validación interactiva con pointer lock pendiente) |
| 5 | Atmósfera y post-procesado | Profundidad, niebla y acabado cinematográfico controlado | Completada (2026-11-01; Task 3 validación GPU real pendiente) |
| 6 | Interactividad y eventos | Anomalías ambientales sutiles | Completada (2026-11-01; validación interactiva pendiente) |
| 7 | Audio espacial | Soundscape diegético posicional | Completada (2026-11-01; reproducción pendiente de validación interactiva) |
| 8 | Narrativa ambiental y transiciones | Capa conceptual y arquitectura imposible | En progreso (Tasks 1-4 implementadas; revisión visual y recorrido pendientes) |
| 9 | Optimización y auditoría | Rendimiento, limpieza y calidad final | En progreso (auditoría estática y métricas estimadas; perfilado real y navegadores pendientes) |
| 10 | Cierre del hito | THE ENTRANCE terminado y documentado | Parcial (build de producción y documentación validados; QA interactivo y tag pendientes) |

Dependencias: `0 → 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10`.
Las fases 6, 7 y 8 pueden reordenarse entre sí si la validación visual lo exige, pero ninguna puede iniciarse antes de la 4.

---

## 4. FASES EN DETALLE

### FASE 0 — FUNDACIÓN DEL PROYECTO

**Objetivo:** disponer de un entorno de desarrollo mínimo, reproducible y limpio.

**Alcance:**
- Inicializar Vite con JavaScript vanilla y ES Modules.
- Instalar Three.js.
- Crear estructura de carpetas.
- Página base con canvas a pantalla completa.

**Entregables:**
- `package.json` con scripts `dev`, `build`, `preview`.
- `vite.config.js`.
- `index.html` con canvas y contenedor.
- `src/main.js` mínimo.
- `src/styles/main.css` base.
- `.gitignore`.

**Criterios de aceptación:**
- [ ] `npm install` finaliza sin errores.
- [ ] `npm run dev` sirve la aplicación en localhost.
- [ ] `npm run build` genera build de producción.
- [ ] Consola del navegador sin errores.
- [ ] Versiones de Vite y Three.js registradas en `MEMORY.md`.
- [ ] Estructura de directorios creada y documentada.

**Pruebas:** arranque en dev, build y preview.

**Skills:** `incremental-implementation`, `context-engineering`.

**Riesgos:** incompatibilidad de versiones. Fijar versiones exactas y documentarlas.

---

### FASE 1 — NÚCLEO DE RENDERIZADO

**Objetivo:** base de render estable, correcta en color, resize y ciclo de vida.

**Alcance:**
- `WebGLRenderer` con antialias, `pixelRatio` limitado, tone mapping y color space correctos.
- Escena, cámara y bucle de render con delta acotado.
- Gestión de resize y pausa al ocultar pestaña.

**Entregables:**
- `src/core/renderer.js`.
- `src/core/scene.js`.
- `src/core/loop.js`.
- `src/core/resize.js`.
- `src/config/constants.js`.
- Objeto de prueba visible.

**Criterios de aceptación:**
- [ ] Objeto de prueba visible y correctamente iluminado.
- [ ] Resize sin deformación ni pixelado excesivo.
- [ ] Delta acotado; sin saltos tras alt-tab o pestaña oculta.
- [ ] Sombras configuradas pero aún sin coste innecesario.
- [ ] Consola limpia; sin warnings de Three.js.
- [ ] 60 FPS estables en escritorio con la escena de prueba.

**Pruebas:** DevTools (consola, rendimiento, resize, cambio de pestaña).

**Skills:** `browser-testing-with-devtools`, `performance-optimization`, `source-driven-development`.

---

### FASE 2 — ARQUITECTURA DE THE ENTRANCE

**Objetivo:** corredor creíble, modular y a escala humana real.

**Alcance:**
- Suelo, techo, paredes, zócalos, molduras y techo registrable.
- Puertas selladas y luminarias como geometría.
- Segmentación modular reutilizable.
- Cámara a altura humana (1,65 m) para validar escala.

**Entregables:**
- `src/world/corridor.js`.
- `src/world/props.js`.
- Constantes de escala en `src/config/constants.js`.

**Criterios de aceptación:**
- [ ] Proporciones creíbles (ancho ≈ 2,4 m, alto ≈ 2,7 m, largo definido).
- [ ] Sin huecos, sin z-fighting, sin caras invertidas.
- [ ] Recorrido completo del corredor sin obstáculos geométricos.
- [ ] Geometría optimizada: instancing o merge donde aplique.
- [ ] Draw calls controladas y documentadas.

**Pruebas:** inspección visual en primera persona, revisión de normales y draw calls.

**Skills:** `source-driven-development`, `incremental-implementation`.

---

### FASE 3 — MATERIALES, TEXTURAS E ILUMINACIÓN

**Objetivo:** aspecto PBR fotorealista con iluminación fluorescente creíble.

**Alcance:**
- Materiales PBR (roughness, metalness, normal maps).
- Texturas procedurales o de Poly Haven (licencia CC0 verificada).
- Fluorescentes con emisión y sombras coherentes.
- Ajuste de tone mapping y exposición.

**Entregables:**
- `src/world/materials.js`.
- `src/world/lights.js`.
- Texturas en `public/textures/` (con licencia documentada).
- HDRI o iluminación de entorno sutil.

**Criterios de aceptación:**
- [x] Materiales sin tiling evidente ni superficies plásticas.
- [x] Sombras suaves y coherentes con las luminarias.
- [x] Sin banding; blancos no quemados.
- [x] Presupuesto de texturas ≤ 2K salvo justificación.
- [x] Licencias de assets registradas en `MEMORY.md`.
- [ ] 60 FPS estables.

**Estado de implementación (2026-11-01):** texturas procedurales 512 tileables (color, roughness y normal), materiales PBR por superficie, luminarias con housing metálico y diffuser emisivo, 7 `RectAreaLight` de relleno, 3 `SpotLight` con sombras en luminarias alternas, `RoomEnvironment` vía PMREM y hemisphere de rebote. Se corrigió la orientación de suelo/techo (estaban rotados 90° respecto al corredor). Validado con build y render headless; FPS en GPU real pendiente.

**Pruebas:** comparación visual, inspección de materiales, medición de FPS y memoria de texturas.

**Skills:** `source-driven-development`, `performance-optimization`.

---

### FASE 4 — NAVEGACIÓN Y COLISIONES

**Objetivo:** exploración en primera persona sólida y controlable.

**Estado:** Implementada (2026-11-01; validación interactiva con pointer lock pendiente).

**Alcance:**
- Pointer lock, WASD, correr, headbob sutil opcional.
- Colisiones contra paredes, suelo y techo.
- Overlay de inicio y liberación con ESC.
- Mensaje de fallback para dispositivos sin pointer lock.

**Entregables:**
- `src/player/controls.js`.
- `src/player/collision.js`.
- Configuración de velocidad, altura y radio del jugador.
- UI mínima de entrada.

**Criterios de aceptación:**
- [ ] No se atraviesan paredes ni suelo.
- [ ] Deslizamiento correcto en esquinas y paredes.
- [ ] ESC libera el puntero y la interfaz recupera el control.
- [ ] Movimiento estable con delta variable.
- [ ] Sin captura del puntero al cargar; requiere gesto del usuario.
- [ ] `prefers-reduced-motion` desactiva headbob.

**Pruebas:** recorrido completo, esquinas, puertas, alt-tab, resize, teclado y ratón.

**Skills:** `browser-testing-with-devtools`, `test-driven-development`.

---

### FASE 5 — ATMÓSFERA Y POST-PROCESADO

**Objetivo:** profundidad atmosférica y acabado cinematográfico controlado.

**Alcance:**
- Niebla exponencial o volumétrica simulada.
- Bloom sutil, viñeta, grano y aberración cromática leve.
- Niveles de calidad para degradar efectos.

**Entregables:**
- `src/atmosphere/fog.js`.
- `src/atmosphere/postprocessing.js`.
- Configuración de calidad en constantes.

**Criterios de aceptación:**
- [ ] Niebla sin bandas ni artefactos.
- [ ] Bloom contenido en las luminarias.
- [ ] Grano sutil, no invasivo.
- [ ] Coste de post-procesado medido (< 2 ms objetivo).
- [ ] Efectos desactivables en calidad baja.

**Pruebas:** comparación visual con y sin efectos, medición de frame time.

**Skills:** `performance-optimization`, `browser-testing-with-devtools`.

---

### FASE 6 — INTERACTIVIDAD Y EVENTOS

**Objetivo:** anomalías ambientales sutiles que refuercen la sensación de espacio incorrecto.

**Alcance:**
- Parpadeo de luces, puertas, cambios de longitud del pasillo, ruidos diegéticos.
- Zonas de activación (triggers) deterministas.
- Estado de eventos reintentable y sin efectos acumulativos.

**Entregables:**
- `src/events/anomalies.js`.
- Integración con el loop y con colisiones.

**Criterios de aceptación:**
- [ ] Los eventos no rompen colisiones ni navegación.
- [ ] Sin frame drops perceptibles al activarse.
- [ ] Reintentables y sin estados inconsistentes.
- [ ] Coherentes con la dirección creativa, sin sustos gratuitos.

**Pruebas:** activación repetida, recorrido completo, observación de rendimiento.

**Skills:** `incremental-implementation`, `debugging-and-error-recovery`.

---

### FASE 7 — AUDIO ESPACIAL

**Objetivo:** soundscape diegético que refuerce la inmersión.

**Alcance:**
- `AudioContext` iniciado tras gesto del usuario.
- Sonido posicional sincronizado con la cámara.
- Ambiente base y zumbido de fluorescentes.
- Control de volumen y silencio.

**Entregables:**
- `src/audio/audio.js`.
- Recursos de audio con licencia documentada en `public/audio/`.

**Criterios de aceptación:**
- [ ] Audio inicia solo tras interacción del usuario.
- [ ] Posicionamiento correcto respecto a la cámara.
- [ ] Sin clics, pops ni bucles defectuosos.
- [ ] Silencio accesible y persistente.
- [ ] Licencias registradas en `MEMORY.md`.

**Pruebas:** auriculares y altavoces, movimiento alrededor de fuentes, silencio y reanudación.

**Skills:** `frontend-ui-engineering`, `browser-testing-with-devtools`.

---

### FASE 8 — NARRATIVA AMBIENTAL Y TRANSICIONES

**Objetivo:** capa conceptual y arquitectura imposible sin sacrificar estabilidad.

**Alcance:**
- Props narrativos y detalles ambientales.
- Transiciones de entrada y salida.
- Tipografía e interfaz minimalistas.
- Indicios de geometría imposible.

**Entregables:**
- Ampliación de `src/world/props.js`.
- Transiciones en el flujo principal.
- Estilos finales de interfaz.

**Criterios de aceptación:**
- [ ] Coherencia con la dirección creativa de `AGENTS.md`.
- [ ] Sin romper la inmersión ni el rendimiento.
- [ ] Transiciones sin saltos visuales ni bloqueos.
- [ ] Interfaz mínima, legible y recuperable.

**Pruebas:** recorrido completo, entrada y salida, revisión visual.

**Skills:** `frontend-ui-engineering`, `code-review-and-quality`.

---

### FASE 9 — OPTIMIZACIÓN Y AUDITORÍA

**Objetivo:** rendimiento estable, código limpio y calidad verificada.

**Alcance:**
- Auditoría de draw calls, triángulos, texturas y sombras.
- Instancing, LOD y carga diferida donde corresponda.
- Revisión de fugas de memoria y `dispose`.
- Pruebas en navegadores y resoluciones.
- Auditoría de código según `REGLAS.md`.

**Entregables:**
- Correcciones de rendimiento.
- Informe de auditoría en `MEMORY.md`.
- Checklist de `REGLAS.md` cumplido.

**Criterios de aceptación:**
- [ ] 60 FPS objetivo en escritorio; degradación controlada en equipos modestos.
- [ ] Sin fugas de memoria en sesiones de 10 minutos.
- [ ] Consola limpia en producción.
- [ ] Archivos < 1.000 líneas o divididos con justificación.
- [ ] Sin código muerto ni duplicidades.
- [ ] Comprobado en Chrome y al menos un navegador adicional.

**Pruebas:** perfilado, sesión prolongada, matriz de navegadores y resoluciones.

**Skills:** `performance-optimization`, `code-review-and-quality`, `code-simplification`, `browser-testing-with-devtools`.

---

### FASE 10 — CIERRE DEL HITO

**Objetivo:** THE ENTRANCE terminado, documentado y reproducible.

**Alcance:**
- Build final y verificación de producción.
- QA completo contra los criterios de `AGENTS.md §3`.
- Documentación actualizada.
- Material de presentación (capturas o vídeo).

**Entregables:**
- Build de producción validado.
- `MEMORY.md` completo.
- Checklist final firmado.
- Versión o tag del hito.

**Criterios de aceptación:**
- [ ] Build reproducible desde cero.
- [ ] Sin errores ni warnings relevantes.
- [ ] Todos los criterios de THE ENTRANCE cumplidos.
- [ ] Documentación al día y útil para otro agente.
- [ ] Rendimiento y estabilidad verificados.

**Pruebas:** instalación limpia, build, preview, recorrido completo.

**Skills:** `shipping-and-launch`, `code-review-and-quality`.

---

## 5. DEFINITION OF DONE GLOBAL

Una fase está terminada solo si:

1. Se cumplen todos sus criterios de aceptación.
2. `npm run dev` y `npm run build` funcionan sin errores.
3. La consola no muestra errores ni warnings relevantes.
4. Se ejecutaron las pruebas indicadas y se registraron resultados.
5. No hay regresiones en fases anteriores.
6. `MEMORY.md` está actualizado (fecha, objetivo, cambios, archivos, decisiones, pruebas, pendientes).
7. El código respeta `REGLAS.md`.

---

## 6. MÉTRICAS OBJETIVO

Objetivos de referencia, no resultados medidos. Se validan y ajustan con datos reales.

| Métrica | Objetivo |
|---|---|
| FPS escritorio | 60 estables |
| Presupuesto de frame | ≤ 16,6 ms |
| Draw calls | < 150 |
| Triángulos visibles | < 500.000 |
| Memoria de texturas | < 200 MB |
| Tiempo de carga local | < 5 s |
| Errores de consola | 0 |

---

## 7. CÓMO CERRAR UNA FASE

1. Ejecutar las pruebas de la fase.
2. Revisar los archivos modificados (REGLAS §14).
3. Verificar que no hay regresiones.
4. Actualizar `MEMORY.md`.
5. Marcar la fase como cerrada en la tabla de progreso.
6. Iniciar únicamente la fase siguiente.

---

## 8. REGISTRO DE PROGRESO

| Fase | Fecha de cierre | Notas |
|---|---|---|
| 0 | 2026-11-01 | Vite + Three.js operativo; build y servidor verificados. |
| 1 | 2026-11-01 | Render core revisado; render headless y consola limpia; FPS en GPU real pendiente. |
| 2 | 2026-11-01 | Revisada: puertas selladas, techo registrable, molduras, zócalos segmentados; instancing; fixture/techo corregido. Validación en primera persona pendiente. |
| 3 | 2026-11-01 | Implementada: PBR procedural, luminarias housing/diffuser, 7 RectAreaLight + 3 SpotLight con sombras, entorno PMREM. Corregida orientación de suelo/techo y de RectAreaLight. Build y render headless verificados; FPS en GPU real pendiente. |
| 4 | — | — |
| 5 | — | — |
| 6 | Interactividad y eventos | Anomalías ambientales sutiles | Completada (2026-11-01; validación interactiva pendiente) |
| 7 | Audio espacial | Soundscape diegético posicional | Completada (2026-11-01; reproducción pendiente de validación interactiva) |
| 8 | — | — |
| 9 | — | — |
| 10 | — | — |

---

## 9. RIESGOS GLOBALES

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Sobrecarga visual y de rendimiento | Alto | Presupuesto por fase y medición continua |
| Assets con licencia dudosa | Alto | Verificar licencia antes de incorporar (REGLAS §8) |
| Archivos monolíticos | Medio | Auditoría a las 1.000 líneas |
| Regresiones silenciosas | Medio | Pruebas por fase y consola limpia |
| Deriva de alcance | Medio | Documentar y posponer lo no solicitado |
| Incompatibilidad entre navegadores | Medio | Matriz de pruebas en FASE 9 |

---

## 10. NO HACER

- Implementar fases futuras antes de cerrar la actual.
- Añadir dependencias sin justificación.
- Introducir frameworks frontend.
- Sacrificar estabilidad por efectos.
- Añadir assets sin licencia verificada.
- Avanzar sin actualizar `MEMORY.md`.
