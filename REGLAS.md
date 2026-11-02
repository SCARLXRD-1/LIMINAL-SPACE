ENGINEERING STANDARDS & AGENT GOVERNANCE

Estas reglas son obligatorias para todos los agentes que participen en LIMINAL SPACE.

1. ANÁLISIS ANTES DE IMPLEMENTAR

Nunca comenzar a escribir código sin comprender el contexto de la tarea.

Antes de modificar:

Inspeccionar los archivos relacionados.

Comprender la arquitectura existente.

Identificar dependencias.

Localizar implementaciones reutilizables.

Evaluar posibles efectos secundarios.

Determinar el alcance mínimo necesario.

Elegir la solución técnicamente más adecuada.

No modificar código por suposiciones.

2. CÓDIGO LIMPIO Y SIN EXCESOS

La prioridad es producir código necesario, legible y mantenible.

Está prohibido:

Generar código innecesario.

Duplicar funcionalidades.

Crear archivos sin una responsabilidad clara.

Añadir abstracciones sin justificación.

Introducir dependencias por comodidad.

Mantener implementaciones obsoletas.

Crear funciones que nunca se utilizan.

Implementar funcionalidades no solicitadas sin justificación.

Antes de crear una nueva función, clase o módulo, comprobar si ya existe una implementación apropiada.

Preferir la reutilización y la simplicidad.

3. CONTROL DE ARCHIVOS EXTENSOS

Cuando un archivo supere las 1.000 líneas, realizar una auditoría estructural obligatoria.

Analizar:

Responsabilidades.

Cohesión.

Acoplamiento.

Funciones extensas.

Código repetido.

Dependencias.

Dificultad de mantenimiento.

Determinar si es conveniente dividirlo en módulos más pequeños.

No dividir archivos artificialmente ni crear fragmentación excesiva.

También revisar archivos menores cuando presenten problemas de organización.

4. COMENTARIOS EN EL CÓDIGO

Los comentarios deben ser discretos, profesionales y concisos.

Ejemplos:

// INITIALIZE SCENE
// UPDATE LIGHTING
// HANDLE COLLISIONS

Reglas:

No explicar instrucciones evidentes.

No comentar cada variable.

No escribir párrafos innecesarios.

Explicar únicamente decisiones técnicas importantes.

Eliminar comentarios obsoletos.

Mantener consistencia en el idioma de los comentarios.

Los comentarios no deben sustituir nombres descriptivos ni código legible.

5. ARQUITECTURA Y RESPONSABILIDADES

Cada módulo debe tener una responsabilidad definida.

Evitar:

Clases que administren demasiados sistemas.

Dependencias circulares.

Variables globales innecesarias.

Acoplamiento excesivo.

Código duplicado entre módulos.

Lógica de renderizado mezclada con interfaz sin justificación.

Mantener una arquitectura modular, sencilla y escalable.

No introducir patrones de diseño complejos cuando una solución simple sea suficiente.

6. CALIDAD VISUAL Y RENDERIZADO 3D

La calidad visual es una prioridad del proyecto.

Evaluar cuidadosamente:

Materiales PBR.

Texturas.

Escala arquitectónica.

Iluminación.

Sombras.

Reflejos.

Profundidad atmosférica.

Geometría.

Composición visual.

Evitar escenarios que parezcan prototipos básicos cuando se busca realismo.

No confundir cantidad de polígonos con calidad visual.

Utilizar recursos externos, geometría procedural o modelos creados en Blender según convenga.

7. RENDIMIENTO Y OPTIMIZACIÓN

El rendimiento debe considerarse desde el inicio.

Evitar operaciones costosas innecesarias en cada frame.

Optimizar geometrías.

Reducir draw calls cuando sea posible.

Utilizar instancing cuando corresponda.

Controlar resolución de texturas.

Gestionar correctamente recursos GPU.

Evitar fugas de memoria.

Optimizar sombras dinámicas.

Utilizar carga diferida cuando sea conveniente.

Vigilar el consumo de memoria.

No sacrificar estabilidad por efectos visuales innecesarios.

8. GESTIÓN DE RECURSOS

Antes de incorporar modelos, texturas, HDRI, fuentes o sonidos externos:

Identificar su procedencia.

Verificar su licencia.

Comprobar su calidad.

Evaluar su tamaño.

Confirmar que realmente aporta valor.

No incorporar recursos de procedencia desconocida.

No utilizar recursos protegidos sin autorización.

9. DEPENDENCIAS Y TECNOLOGÍAS

Antes de incorporar una dependencia:

Comprobar si el proyecto ya dispone de una solución.

Evaluar su mantenimiento.

Revisar compatibilidad.

Justificar su incorporación.

Evitar bibliotecas redundantes.

No cambiar el stack tecnológico sin autorización.

No incorporar frameworks frontend adicionales por iniciativa propia.

10. SEGURIDAD

No exponer credenciales.

No incluir secretos en el repositorio.

No ejecutar scripts desconocidos sin revisarlos.

Evitar dependencias sospechosas.

Validar entradas externas cuando corresponda.

Evitar peticiones innecesarias a servicios externos.

Mantener los recursos y configuraciones bajo control.

11. TESTING OBLIGATORIO

Después de cada modificación significativa:

Ejecutar las comprobaciones pertinentes.

Verificar errores de consola.

Comprobar que la aplicación inicia.

Validar las funcionalidades afectadas.

Revisar posibles regresiones.

Evaluar rendimiento si se modificó el renderizado.

Comprobar que los recursos se cargan correctamente.

No afirmar que algo funciona sin haberlo comprobado.

Si no es posible realizar una prueba, comunicarlo expresamente.

12. RESPONSIVE Y ACCESIBILIDAD

Aunque la experiencia principal esté diseñada para escritorio:

Evaluar dispositivos móviles.

Adaptar controles cuando corresponda.

Contemplar diferentes resoluciones.

Respetar preferencias de movimiento reducido.

Proporcionar controles comprensibles.

Permitir recuperar el control de la interfaz.

Gestionar correctamente la captura del puntero.

Ofrecer alternativas cuando una funcionalidad no esté disponible.

No asumir compatibilidad sin pruebas.

13. MEMORY.md OBLIGATORIO

MEMORY.md es la memoria persistente del proyecto.

Debe consultarse antes de iniciar una tarea y actualizarse después de cada avance significativo.

Registrar:

Fecha.

Objetivo.

Cambios realizados.

Archivos afectados.

Decisiones técnicas.

Skills utilizadas.

Dependencias añadidas.

Problemas detectados.

Soluciones implementadas.

Pruebas ejecutadas.

Pendientes.

Próximos pasos.

No inventar resultados.

No borrar el historial relevante.

No registrar repetidamente la misma información.

Mantener el documento conciso y útil para futuros agentes.

La actualización de MEMORY.md forma parte de la tarea, no es opcional.

14. AUDITORÍA DE MODIFICACIONES

Todo archivo modificado debe revisarse antes de finalizar.

Comprobar:

Correcta implementación.

Consistencia con la arquitectura.

Ausencia de duplicidades.

Limpieza del código.

Manejo de errores.

Compatibilidad.

Rendimiento.

Seguridad.

Documentación correspondiente.

No introducir refactorizaciones ajenas a la tarea sin justificación.

Si se encuentra un problema que no forma parte del alcance, documentarlo.

15. CONSERVACIÓN DEL TRABAJO EXISTENTE

No eliminar archivos sin justificación.

No sobrescribir trabajo existente sin revisar su contenido.

No reemplazar módulos completos cuando basta una modificación localizada.

No cambiar configuraciones globales innecesariamente.

No alterar funcionalidades existentes sin autorización.

No crear implementaciones paralelas.

Respetar siempre el estado actual del proyecto.

16. COMUNICACIÓN Y REPORTES

Al finalizar una tarea, proporcionar un informe breve con:

Objetivo completado.

Archivos modificados.

Cambios importantes.

Dependencias incorporadas.

Pruebas realizadas.

Resultados.

Problemas pendientes.

Actualización de MEMORY.md.

Diferenciar claramente entre tareas completadas, parciales y pendientes.

17. CRITERIO DE CALIDAD

Antes de aceptar una implementación, responder:

¿Es necesaria?

¿Es correcta?

¿Es mantenible?

¿Es eficiente?

¿Respeta la arquitectura?

¿Aporta valor real?

¿Está probada?

Si alguna respuesta es negativa, revisar la implementación.

PRINCIPIO FUNDAMENTAL

Menos código innecesario. Más ingeniería.

Menos efectos gratuitos. Más intención visual.

Menos improvisación. Más investigación y validación.

Cada modificación debe mejorar el proyecto sin comprometer su estabilidad, rendimiento o identidad.

Estas reglas son obligatorias para todos los agentes.