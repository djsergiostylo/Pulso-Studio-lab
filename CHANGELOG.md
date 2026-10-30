# Pulso Studio — versiones

Regla: `index.html` = versión actual. Cada versión estable se guarda en `versions/pulso-studio-vX.Y.html` ANTES de tocar nada.

| Versión | Fecha | Qué incluye |
|---|---|---|
| v1.0 | 2026-10-29 | Base estable: fusión Pocket Sub + Pulso 16 + AbletoWeb, 9 canales, pestañas agrupadas, audio 48 kHz, STAB precalculado, limitador sin cambio en Play, export fuera de Claude. Suena OK en PC. |
| v1.1 | 2026-10-29 | EQ tipo Pro-Q: hasta 8 bandas por canal y master, campana/shelf/notch, cortes de graves y agudos 12–96 dB/oct, Q ajustable, 10 Hz–24 kHz, doble toque crea banda, presets Sin sub / Sin graves. Proyectos antiguos se migran solos. |
| v1.2 | 2026-10-30 | Layout compacto "Directo": secuenciador en 1 línea por pista, mezclador con faders + M/S y 6 macros (DJ, Reverb, Delay, Drive, Sidechain, Master) siempre visibles bajo el grid, herramientas y ajustes plegados. Arregla gráficas de FX/Master rotas en v1.1. |

## Pendiente → v1.2
- Deshacer 20 pasos, Song→abrir patrón, ACID 32 pasos.

## v1.2.1 (rama nueva en git)
Desde aquí cada cambio es un commit con etiqueta (c01, c02…). Revertir uno: `git revert <etiqueta>`. Volver a un punto: `git checkout <etiqueta>`.

| Etiqueta | Fecha | Qué cambia | Cómo revertir |
|---|---|---|---|
| v1.2.1 | 2026-10-30 | Punto de partida: copia de v1.2, solo cambia la etiqueta de versión | — |

Mejoras previstas: 1) pantalla completa y pestañas abajo, 2) gestos y vibración, 3) kits/presets de sonido, 4) más pistas y capas, 5) separar el código en archivos.

## v1.5 (2026-10-30)
- Añade Vista táctil para ampliar una pista y editar 8 pasos por página (1–8 / 9–16).
- Conserva las 9 pistas y el modo de 16 pasos; amplía el ancho disponible en pantallas grandes.
- Solo cambian la interfaz y los estilos; motor de audio intacto.


## v1.6 (2026-10-30)
- En pantallas de 360–420 px, los 8 pasos de Vista táctil se distribuyen en el ancho disponible y alcanzan 44 px de alto.
- En pantallas más estrechas se conserva el desplazamiento horizontal para mantener un tamaño de toque útil.
- Cambio exclusivamente visual; motor de audio y formato de proyecto intactos.


## v1.7 (2026-10-30)
- En modo Paso, arrastra horizontalmente por una pista para activar o borrar varios pasos de una vez; si el primero está encendido, el gesto apaga la fila atravesada.
- El toque corto sigue editando un paso y el toque largo sigue cambiando su velocidad; el gesto de arrastre se agrupa como una sola acción de deshacer.
- La vista táctil muestra una indicación breve y conserva el desplazamiento en pantallas de menos de 360 px.
- El motor de audio queda intacto; la preescucha reutiliza la función existente una vez por gesto.
