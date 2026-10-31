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
| v1.7 | 2026-10-30 | Arrastre horizontal por fila, con toque corto, toque largo de velocidad y Deshacer en una acción; motor intacto. |
| v1.8 | 2026-10-30 | Navegación principal agrupada en Crear, Canción, Mezcla y Proyecto. Mix, FX, EQ y Canal comparten el espacio Mezcla; se recuerda el último subapartado. Acceso guardar renombrado Proyecto. Motor intacto. |
| v1.9 | 2026-10-30 | Parámetros detallados de cada FX plegables; controles de encendido y gráfico siempre visibles, acceso desde el navegador de efectos y estado abierto preservado al ajustar parámetros. Sin cambios en el motor de audio. |

## v2.0 (2026-10-30)
- Guarda como perfil EQ predeterminado las curvas ajustadas para cada sonido: Kick, Snare, Clap, Hat, Open Hat, Tom, Sub, Acid y Stab; master plano.
- Añade **EQ Bypass · NO/SÍ** para alternar la EQ global entre activa y bypass. Conserva los valores de todas las bandas y recuerda la preferencia en el navegador.
- Reutiliza los nodos de EQ existentes; sin cambios en voces, scheduler, mezcla, efectos ni generación de sonido.
## v2.1 (2026-10-30)
- Añade una biblioteca local para guardar, aplicar y eliminar kits de batería personales con los ajustes de tono, caída, drive y las muestras cargadas en los seis canales de batería.
- Limita los kits a 24 MB y conserva las muestras fuera del proyecto JSON. Se bloquea la aplicación del kit durante la reproducción para evitar cambios de sonido en mitad del compás.
- El cambio no altera patrones ni modifica la estructura del motor de audio.
## v2.2 (2026-10-30)
- Añade herramientas táctiles para copiar, mover y repetir compases del arreglo, incluyendo los patrones asignados y la activación de las dos pistas de audio.
- Incluye deshacer específico para la última edición de compases.
- El apartado Proyecto muestra cuándo se han guardado los cambios y avisa si hay cambios pendientes o no se pudo guardar en este dispositivo.
- Repara el marcador del estado de guardado para conservar el listado de proyectos y la inicialización del resto de controles.
- Corrige el recorrido de pestañas con teclado y conserva el clic normal.
- Sin cambios en el motor de audio.
## v2.3 (2026-10-30)
- La navegación principal y las herramientas secundarias se anuncian como pestañas accesibles, con paneles asociados y selección actual explícita.
- Añade navegación por teclado con flechas, Inicio y Fin; los botones táctiles siguen funcionando igual.
- Sin cambios en el motor de audio.
- Navegación por teclado verificada en GitHub Pages (30-10-2026): pestañas principales y secundarias responden a flechas, Inicio y Fin; resultado correcto.

## v2.4 (2026-10-30)
- Separa la estructura HTML, los estilos y la lógica JavaScript en archivos independientes. La versión archivada conserva el documento autónomo.
- Sin cambios intencionales en funciones ni en el motor de audio. Comprobación funcional pendiente para una sesión posterior.

## v2.5 (2026-10-30)
- Añade una vibración breve al tocar pasos y pads en dispositivos que admiten la API háptica del navegador.
- Sin cambios intencionales en el motor de audio. Comprobación funcional pendiente para una sesión posterior.

## v2.6 (2026-10-30) — Claude
- Verificadas v2.4 y v2.5 en navegador (400 px): sin errores de consola, pestañas, subpestañas, reproducción, pads y vibración funcionan.
- Canción: al mantener pulsada una casilla de patrón se abre ese patrón en el secuenciador (pendiente heredado de v1.2). Un toque corto sigue cambiando A→B→C→D→vacío.
- Deshacer ya tenía 100 pasos y rehacer; no requiere cambios.
- Para revertir: git revert del commit v2.6.

## v2.7 (2026-10-30) — Claude
- ACID de 32 pasos: en Más herramientas, LEN sube hasta 32 solo para ACID (tocar LEN alterna 16/32). Aparece el selector Pasos 1–16 / 17–32 sobre la rejilla.
- Datos: todas las filas guardan ahora 32 pasos. Los proyectos, guardados y códigos PS1 antiguos de 16 pasos se amplían solos (fixP) y siguen funcionando.
- Aleatorio, Euclídeo y copiar/pegar pista respetan el largo de 32.
- En modo canción/cadena, los pasos 17–32 de ACID se leen del patrón que suena en los compases pares.
- Probado: migración de guardado antiguo, edición en la página 2, reproducción, código PS1 (crear e importar), sin errores de consola.
- Para revertir: git revert del commit v2.7.

## v2.8 (2026-10-30) — Claude
- Kits de sonido listos en Canal (con una batería elegida): Original, 808, 909, Lo-fi, Seco, Techno. Cada kit mueve tono, caída, filtro, drive, reverb y delay de las 6 baterías a la vez. `Original` los devuelve a los valores iniciales.
- Presets por canal melódico (al elegir SUB, ACID o STAB): SUB (Sub sine, Saw sucio, Pluck, 808 largo, Glide), ACID (Clásico, Squelch, Suave, Duro), STAB (Rave, Seco corto, Pad largo, Dub). Cambian onda y mandos de ese canal.
- No cambia el motor de audio ni el formato de guardado: solo mueve mandos que ya existían.
- Valores elegidos sin escucharlos en un móvil: ajústalos a oído.
- Probado: aplicar kits y presets, mandos y guardado se actualizan, sin errores de consola.
- Para revertir: git revert del commit v2.8.

## v2.9 (2026-10-30) — Claude
- Nuevo canal melódico LEAD (10.ª pista): dos osciladores desafinados, filtro con envolvente, glide, acento, onda elegible. Mandos: Corte, Ancho, Glide, Largo, Filtro, Drive, Reverb, Delay. Presets: Saw lead, Square, Pluck, Glide.
- Datos: cada patrón guarda ahora también las notas de LEAD (`cn`/`cv`). Proyectos y códigos antiguos de 9 pistas se amplían solos (fixP) y siguen funcionando. Nuevo ajuste `lwave` (onda del LEAD).
- Entra en rejilla, mezclador, EQ, canal, aleatorio, euclídeo y copiar/pegar sin cambios extra.
- Probado: aparece la pista, se editan pasos, se guarda, suena Play y los mandos/presets cambian, sin errores de consola. No escuchado en móvil.
- Para revertir: git revert del commit v2.9 (los patrones ya guardados conservan las notas de LEAD sin usarlas).

## v2.10 (2026-10-30) — Claude
- Pantalla completa en móvil (ancho ≤ 700 px): sin marco, sin sombra, sin esquinas redondeadas y con solo 6 px de margen. La rejilla gana ~15 % de ancho en un móvil de 375 px. Escritorio y tablet no cambian.
- Botón **Pantalla completa** en ⚙ Aspecto · Estilo · Ayuda (se oculta si el navegador no la ofrece).
- Preparada para instalarse como app: `manifest.webmanifest` (modo fullscreen) e `icon.svg`, más meta de tema. Para que se ofrezca instalar hace falta servirla por HTTPS (p. ej. GitHub Pages); no verificado.
- iPhone: Safari no tiene pantalla completa por botón; usa Compartir → Añadir a pantalla de inicio.
- Probado a 375 px: sin scroll horizontal y sin errores. No probado en móvil real.
- Para revertir: git revert del commit v2.10.

## v2.11 (2026-10-30) — Claude
- Capas en las 6 baterías: en Mezcla → Canal, tarjeta **Capas**. Cada batería puede sumar una segunda voz (por ejemplo Kick + Tom, Snare + Clap) dentro del mismo canal, con su nivel ajustable. La voz de la capa usa el tono y la caída de su propia batería y pasa por el volumen, EQ y efectos del canal que la lleva.
- Datos: cada canal guarda `ly` (voz de la capa, -1 = sin capa) y `lv` (nivel). Proyectos antiguos se completan solos (`fixC`).
- La capa no corta el Open con el Hat ni se encadena con otras capas.
- Probado: elegir capa, nivel, guardado, Play sin errores. No escuchado en móvil.
- Para revertir: git revert del commit v2.11.

## v2.12 (2026-10-30) — Claude
- Canción: 4 pistas de audio en vez de 2 (AUDIO 1–4), cada una con su archivo, BPM original, bucle y volumen. Copiar, mover, repetir y deshacer compás las incluyen.
- Datos: `lanes` guarda ahora a1–a4. Los proyectos antiguos de 2 pistas se completan solos (`fixSong`). Los audios se guardan en este móvil, igual que antes.
- Probado: 4 filas en la cuadrícula, marcar compases, copiar/deshacer, cargar un audio de prueba en AUDIO 4, reproducir en modo canción y quitar el audio, sin errores. No probado el export WAV con las 4 pistas ni en móvil.
- Para revertir: git revert del commit v2.12.

## v2.13 (2026-10-30) — Claude
- Gesto: deslizar el dedo en horizontal por la pantalla LCD cambia de patrón (← siguiente, → anterior, vuelve de D a A). Un toque corto sigue alternando info / onda / espectro. Vibración breve al cambiar.
- Verificado también: el export WAV completo funciona con LEAD, capas y las 4 pistas de audio (6 MB, sin errores).
- Probado con eventos simulados; en móvil real hay que comprobar que el navegador no se queda el gesto (se pidió touch-action: pan-y en el LCD).
- Para revertir: git revert del commit v2.13.

## v2.14 (2026-10-30) — Claude
- Módulos separados: transporte, secuenciador, selector de patrón, tarjetas y mezclador son ahora paneles con borde y relieve, con título en serigrafía (marca de color a la izquierda). Teclas del transporte con relieve; Play en color de acento.
- Carátulas: 10 aspectos cambiables. Nuevas: **Plata 303**, **Gris MPC** y **Papel**; retocadas Neón y Naranja. Siguen Auto, Oscuro, Claro, Violeta y Verde.
- El selector de carátula pasa a la pestaña 💾 Proyecto (tarjeta **Carátula**, con muestra de color), ya no está escondido abajo. El estilo Hardware (con tornillos) sigue en ⚙ Aspecto · Estilo · Ayuda.
- Solo CSS y 2 líneas de JS (~3 KB). No cambia el audio ni el formato de guardado.
- Probado a 390 px con Plata, MPC y Papel; sin errores. Los nombres de pista se aclararon para que se lean sobre fondos grises.
- Para revertir: git revert del commit v2.14.

## v2.15 (2026-10-30) — Claude
- Ajustes de diseño tras revisar todas las pantallas con las carátulas:
  - Gris MPC: los nombres de canal (KICK, SNRE…) del mezclador y la rejilla ya se leen.
  - FX: los 6 mandos de macros (DJ, Reverb, Delay, Drive, Sidechain, Master) forman un módulo **Macros** con panel y título.
  - Canción: nuevos módulos **Patrones** y **Reproducción** (agrupa PATRÓN/CANCIÓN y 8/16/32 compases).
- Solo CSS y una tarjeta en el HTML. No cambia audio ni datos.
- Para revertir: git revert del commit v2.15.

## v2.16 (2026-10-30) — Claude
- Contraste de botones y letras: medí en las 10 carátulas y 6 pantallas (Crear, Canción, Mix, FX, Canal, Proyecto) el contraste entre texto y fondo. Arreglados los que estaban por debajo de 4,5:1.
  - **Plata, Papel, Claro, Auto, Naranja, Gris MPC:** Play, pestañas de abajo y subpestañas, nombres de canal, etiquetas de mandos, notas y resúmenes.
  - El botón Play en reposo usa el color del texto y una barra de acento debajo; el color de acento se reserva para los botones activados.
  - En Claro, Auto, Papel y Gris MPC los botones activados (acento) tienen texto con contraste suficiente.
  - Los botones de estilo del pie (⚙ Aspecto · Estilo · Ayuda) se leen en todas las carátulas.
- Resultado: Neón, Oscuro, Verde y Violeta ya estaban bien. Tras los cambios solo quedan lecturas de 4,3:1 en Gris MPC, que he subido con un fondo algo más oscuro.
- Solo CSS. No cambia audio ni datos.
- Para revertir: git revert del commit v2.16.

## v2.17 (2026-10-30) — Claude
- **Mezcla → Mix** en bloques con color: **Baterías** (naranja: Kick, Snare, Clap, Hat, Open, Tom) y **Sintes y master** (violeta: Sub, Acid, Stab, Lead, Mst). Los 11 faders caben en una pantalla sin desplazarse (antes 2 filas desiguales y master suelto).
- La fila de patrones A·B·C·D de la cabecera se oculta en Mezcla (Mix/FX/EQ/Canal) y Proyecto, donde no sirve: ~44 px más de sitio.
- **Canción** de ~2300 px a ~1250 px, en bloques con color: **Patrones** (turquesa, en una fila), **Reproducción · compases** (amarillo, en una línea), **Arreglo** (rosa: cuadrícula + Rellenar/Vaciar). **Editar compases** pasa a estar plegado.
- Las 4 pistas de audio son filas plegables con su color: nombre, archivo y botones Cargar/Quitar siempre a la vista; BPM original, bucle, volumen y onda se abren al tocar la fila.
- Probado a 390 px: mute, fader, abrir canal desde la mezcla, abrir/cerrar pistas de audio, modo canción y editar compases; sin errores.
- Para revertir: git revert del commit v2.17.

## v2.18 (2026-10-30) — Claude
- **FX** en acordeón y por grupos: **Master**, **Espacio** (Reverb, Delay), **Color y modulación** (Chorus, Filtro, Bitcrush) y **Dinámica** (Sidechain, Compresor). Solo se muestra abierto el gráfico de un efecto a la vez; el resto queda en una fila con su interruptor On/Off. Tocar la fila (o su chip arriba) lo abre. De ~1990 px a ~1230 px.
- **Canal**: las pestañas de canal ya no repiten M/S (están en Mix) y **Sample propio** y **Mis kits guardados** quedan plegados. De ~1360 px a ~950 px.
- Probado: abrir/cerrar efectos, interruptor On/Off sin cerrar el acordeón, cambio de canal; sin errores.
- Para revertir: git revert del commit v2.18.

## v2.19 (2026-10-30) — Claude
- **Pads** en un bloque con título: 6 baterías en 3×2 y los 4 sintes (Sub, Acid, Stab, Lead) en una fila de 4. Todo cabe en una pantalla sin desplazarse (antes LEAD quedaba solo en una cuarta fila).
- **Proyecto** en bloques con color: **Carátula** (turquesa), **Guardar en este móvil** (amarillo), **Copias y compartir** (rosa; une Archivo de proyecto y Compartir beat) y **Exportar audio** (violeta). Botones de carátula más pequeños y textos más cortos.
- Corregida la nota de Exportar audio, que decía que el WAV iba dentro de un .zip: fuera de Claude se descarga como .wav.
- Probado: tocar un pad, guardar proyecto, crear e importar código; sin errores.
- Para revertir: git revert del commit v2.19.

## v2.20 (2026-10-30) — Claude
- **Crear**: el selector de páginas del ACID de 32 (Pasos 1–16 / 17–32) pasa a la misma fila que **Vista táctil**, a la derecha. La rejilla sube unos 50 px y se ve más del secuenciador sin desplazarse.
- Botones de esa fila algo más bajos (36 px).
- Probado: ACID 16↔32, cambio de página, Vista táctil; sin errores.
- Para revertir: git revert del commit v2.20.

## v2.21 (2026-10-30) — Claude
- **Compartir por enlace**: en 💾 Proyecto → Copias y compartir, nuevo botón **🔗 Enlace**. Crea una dirección de la web con el beat dentro (`...#PS1:código`) y abre el menú de compartir del móvil (o la copia al portapapeles). Quien abra el enlace ve un aviso "Este enlace trae un beat. ¿Cargarlo?" y, si acepta, el beat se carga y se puede deshacer con ↶.
- Los botones quedan en "Código · 🔗 Enlace · Importar". El formato del código no cambia: los códigos antiguos siguen funcionando.
- Probado: crear enlace, cambiar el tempo, abrir el enlace en la misma página y volver al beat original (aviso mostrado una vez, dirección limpiada, sin errores). No probado abriendo el enlace en una pestaña nueva ni con el menú de compartir real del móvil.
- Para revertir: git revert del commit v2.21.

## v2.22 (2026-10-30) — Claude
- **Panel Sonido fijo bajo el secuenciador**: **Canal, Mix, FX y EQ** ya no están en una pestaña aparte. Viven en un panel pegado abajo, encima de la barra de pestañas, dentro de **Crear** (secuenciador y pads). Mientras editas el sonido sigues viendo el secuenciador y puedes cambiar de patrón A–D, tocar pasos, dar a Play y ver los pilotos.
- El panel se despliega con **▴ Sonido · CANAL** y se pliega al tocarlo de nuevo; las pestañas del panel (Canal · Mix · FX · EQ) lo abren. Recuerda si estaba abierto y qué vista tenía. Al elegir un canal en la rejilla, el panel muestra ese canal; tocar el nombre de un canal en la Mix abre su Canal.
- La barra de abajo pasa a 3 pestañas: **Crear · Canción · Proyecto** (se quita Mezcla).
- Con el panel abierto, la pantalla LCD se compacta un poco para dejar sitio a la rejilla.
- Datos nuevos guardados en este móvil: `snd` (vista) y `dockOpen`. No cambia el formato de proyectos, audio ni códigos.
- Probado a 390 px: abrir/cerrar, cambiar entre Canal/Mix/FX/EQ, editar un mando de Canal, aplicar un kit, cambiar de patrón con el panel abierto, Play, panel en Pads, desaparición en Canción; sin errores. Pendiente de probar en móvil real el espacio útil (con el panel abierto se ven unas 5–6 pistas a la vez y el resto se desplaza).
- Para revertir: git revert del commit v2.22 (vuelve la pestaña Mezcla).

## v2.23 (2026-10-30) — Claude
- El panel **Sonido** (Canal · Mix · FX · EQ) tiene su **propio color**, distinto del acento del secuenciador, para que se vea como un conjunto aparte: borde superior grueso, cabecera tintada, botón Sonido, pestañas, canal elegido, mandos de Canal y marcas de título.
- Color por carátula: naranja en Neón, Oscuro, Auto oscuro, Violeta y Verde; violeta en Claro y Papel; azul en Plata; cian en Gris MPC; gris casi negro en Naranja.
- Solo CSS. Probado en Neón; las otras carátulas se comprobaron por valores (contraste de texto sobre el color del panel, todos por encima de 4,5:1).
- Para revertir: git revert del commit v2.23.

## v2.24 (2026-10-30) — Claude
- Dentro del panel **Sonido**, cada canal conserva **su color** (el mismo que en el secuenciador):
  - **Canal:** botones KICK, SNRE, CLAP… con su color (borde inferior y texto); el canal elegido se rellena con su color. Mandos, botón Sidechain, título y presets usan el color del canal elegido.
  - **Mix:** cada tira con borde superior y nombre teñidos de su color; Mute/Solo activados en el color del canal.
  - **EQ:** ya lo tenía; se mantiene.
  - El rótulo **Sonido · CANAL** del panel toma el color del canal elegido.
- El conjunto Sonido sigue con su color propio (naranja/violeta/azul/cian según carátula) en borde, cabecera y pestañas.
- Solo CSS. Probado en Neón con ACID y en Mix; sin errores.
- Para revertir: git revert del commit v2.24.

## v2.25 (2026-10-30) — Claude
- **Altura del panel Sonido a tu gusto**: asa (barrita) arriba del panel. Arrástrala hacia arriba para ver más del panel o hacia abajo para ver más secuenciador; doble toque la devuelve a la altura normal; con teclado, flechas ↑↓. Se recuerda en este móvil (`dockH`). Si el panel está plegado, tocar o arrastrar el asa lo abre.
- Probado: arrastre (208→328 px), teclado, doble toque y que se guarda; sin errores.
- Para revertir: git revert del commit v2.25.

## v2.26 (2026-10-30) — Claude
- La etiqueta de versión de la pantalla LCD ya no tapa el BPM: pasa a la línea de abajo, a la izquierda del tempo. Comprobado en las tres vistas de la pantalla (info, onda y espectro).
- Para revertir: git revert del commit v2.26.

## v2.27 (2026-10-30) — Claude
- **Menos luces, menos consumo**: al reproducir solo se anima el cursor del secuenciador. Se apagan por defecto los destellos de los LED de cada canal, el pulso de luz de la rejilla con el bombo, los destellos de pads y chips y los 16 puntos de la pantalla LCD (que además libera una línea de altura).
- Botón **Luces extra** en ⚙ Aspecto · Estilo · Ayuda para volver a encenderlas. Se recuerda (`lights`).
- Pantallas LCD de onda/espectro a 15 imágenes por segundo en vez de 30 (con Luces extra siguen a 30) y medidores de Mix a 20 por segundo.
- Medido con un contador de cambios en la página durante 4 s de Play: **661 cambios/s con luces → 272/s sin ellas (−59 %)**, y 248/s con la Mix abierta tras limitar los medidores. Medición de actividad del navegador, no de CPU ni de batería real.
- Para revertir: git revert del commit v2.27.

## v2.28 (2026-10-30) — Claude
- **Optimización de rendimiento** contra cortes de audio y lentitud:
  - Audio con más margen: la latencia por defecto pasa de «Rápido» a **«Equilibrado»** (botón **Audio: …** en ⚙ Aspecto · Estilo · Ayuda; Rápido / Equilibrado / Estable; se aplica al recargar). Con búferes más grandes el móvil tolera mejor los picos de carga.
  - Efectos apagados = **ramas desconectadas del grafo** (chorus, filtro LFO, bitcrusher, reverb, delay y compresor): el navegador ya no los calcula. Antes todos procesaban siempre aunque estuvieran en Off.
  - Menos sobremuestreo: el recorte final sin sobremuestreo (solo actúa cerca de 0 dBFS) y el drive de canal/master a 2x en vez de 4x; las baterías precalculadas a 2x en vez de 4x (la mitad de trabajo al arrancar y al mover Tono/Caída).
  - **Guardado agrupado**: antes cada toque escribía todo el proyecto en el móvil de forma inmediata; ahora se junta en una sola escritura 0,4 s después del último cambio y se fuerza al salir de la página.
  - EQ y FX en vivo a 20 imágenes/s (antes 30).
- Medido (exportando 2 vueltas con el mismo proyecto limpio): **3,7 s → 2,7 s (−27 %)**; con baterías de drive (kits 808/909/Techno) hasta **−50 %**. Nivel idéntico (pico 0,569, RMS −12,7 dB) en ambas versiones. No es una medición en un móvil real.
- Para revertir: git revert del commit v2.28.

## v2.29 (2026-10-30) — Claude
- **Quitada la Vista táctil** (botón, páginas 1–8/9–16, aviso de arrastre y todo su código y estilos): no se usaba y ocupaba una fila entera. El secuenciador sube ~40 px más.
- La fila de encima de la rejilla solo aparece cuando el ACID tiene 32 pasos (Pasos 1–16 / 17–32); si no, no ocupa sitio.
- Sigue funcionando tocar, mantener pulsado (fuerza) y arrastrar en horizontal para pintar varios pasos.
- Probado: tocar pasos, ACID 16↔32 (la fila aparece y desaparece), Play; sin errores.
- Para revertir: git revert del commit v2.29 (vuelve la Vista táctil).

## v2.30 (2026-10-30) — Claude
- **Capas en los sintes** (SUB, ACID, STAB, LEAD): en la tarjeta **Capas** de Canal, además de las baterías, cada sinte puede sumar su misma voz a otra altura: **+1 octava, −1 octava, +5.ª o +2 octavas**, con su nivel ajustable. SUB conserva además su "Capa +1 octava" de siempre.
- La voz de la capa no corta a la principal en los sintes monofónicos (SUB, ACID, LEAD) ni toca su legato/slide; el slide del ACID sigue en la voz principal.
- Datos: `lo` (semitonos de la capa) y `lv` (nivel) por canal; proyectos antiguos se completan solos.
- Coste: cada capa activa duplica las voces de ese canal. Medido con las 4 capas encendidas: 112 osciladores creados en 5 s frente a 47 sin capas. Si el móvil va justo, apaga capas o sube Audio a **Estable**.
- Probado: botones en los 4 sintes, guardado, batería sin cambios, Play con capas; sin errores. No escuchado en móvil.
- Para revertir: git revert del commit v2.30.

## v2.31 (2026-10-30) — Claude
- **Más volumen sin saturar**: medí la salida del proyecto por defecto. El limitador final dejaba el pico en 0,569 (−4,9 dBFS), unos 5 dB por debajo del máximo. Subida de ganancia final de +2 dB: pico **0,684 (−3,3 dBFS)** y nivel medio **−11,3 dB** en vez de −13,7 dB (**+2,4 dB**), sin ninguna muestra cerca de 1,0. Afecta a todos los proyectos (también a la exportación).
- Capas: el nivel por defecto de una capa nueva baja del 50 % al **40 %** (las capas ya guardadas no cambian).
- Hallazgos de la medición (proyecto por defecto, cada canal en solo): Kick, Snare, SUB y ACID llegan al techo del limitador; la capa de octava/quinta apenas cambia el nivel porque el limitador la comprime; Hat y Stab quedan ~10–12 dB por debajo del pico del bombo (normal en hats; Stab algo bajo, se puede subir en Mix).
- No he escuchado el resultado: son ajustes basados en medidas. Si algo suena fuerte o duro, baja el Master en Mix o el limitador.
- Para revertir: git revert del commit v2.31.

## v2.32 (2026-10-30) — Claude
- **Graves del kick protegidos**: el sidechain (el kick baja a SUB, ACID y STAB) pasa de profundidad 55 % / liberación 30 % a **85 % / 55 %**: la caída es más profunda y dura más, así el kick manda los primeros ~100 ms. Se aplica también a los proyectos ya guardados.
- Niveles de fábrica: **SUB .85 → .72** y **ACID .62 → .55**, solo si sigues con el valor de fábrica (si los has movido, no se tocan).
- Qué medí: en el patrón por defecto, alineando bien el análisis con los golpes de bombo, el SUB queda 2,6–3,6 dB por debajo del kick justo después del golpe y la banda 30–70 Hz de la mezcla es igual a la del kick solo (63,6 frente a 63,8 dB), es decir **ahí no se tapan**. Mi primera medición estaba desalineada 0,15 s (la exportación recorta el margen inicial) y daba un resultado falso. Por eso no toco filtros ni el tono del ACID; si te pasa en tu proyecto, depende de tus notas, niveles o kit: mándame el código (Proyecto → Código) para medirlo con tu caso.
- Comprobado en directo que el sidechain funciona: la ganancia del SUB cae a 0,03 en cada golpe del kick y vuelve en ~0,5 s con liberación alta.
- Para revertir: git revert del commit v2.32.

## v2.33 (2026-10-31) — Claude
- Secuenciador: columna de nombres con barra de color del canal, nombre y botones M/S debajo (antes ocultos). Filas algo mas altas.
- Para revertir: git revert del commit v2.33.

## v2.34 (2026-10-31) — Claude
- Nombres y botones M/S del secuenciador legibles en las 10 caratulas y los 2 estilos (contraste medido >= 4,5:1, tambien con M/S activados).
- Proyecto: Caratula y Estilo (Hardware/Ableton) juntos en la tarjeta Aspecto. El desplegable de abajo pasa a Pantalla - Audio - Ayuda.
- Para revertir: git revert del commit v2.34.

## v2.35 (2026-10-31) — Claude
- Boton Audio: debajo del nombre muestra que hace cada modo (menos/medio/mas bufer, retraso, cortes). Se aplica al recargar.
- Para revertir: git revert del commit v2.35.

## v2.36 (2026-10-31) — Claude
- Audio ya no se corta al mover el panel Sonido (modo Escenario/pantalla completa): el secuenciador programa 0,6 s por adelantado mientras se arrastra, se abre/cierra el panel o cambia la ventana; el arrastre se limita a 1 vez por fotograma y guarda al soltar.
- Para revertir: git revert del commit v2.36.

## v2.37 (2026-10-31) — Claude
- BPM: el numero y TAP quedan centrados en vertical dentro de su boton.
- Para revertir: git revert del commit v2.37.

## v2.38 (2026-10-31) — Claude
- BPM por defecto 132 (proyectos nuevos o sin guardar; los ya guardados conservan su BPM).
- Para revertir: git revert del commit v2.38.

## v2.39 (2026-10-31) — Claude
- La pantallita tambien muestra 132 desde el primer momento (en v2.38 se veia 110 un instante).
- Para revertir: git revert del commit v2.39.

## v2.40 (2026-10-31) — Claude
- Gris MPC: el rail de los deslizadores (Canal, Mix, FX) era casi invisible sobre el panel gris (1,2:1); ahora se ve (3,4:1).
- Para revertir: git revert del commit v2.40.

## v2.41 (2026-10-31) — Claude
- Caratula Naranja: chasis mandarina con degradado suave, paneles y teclas en crema; el naranja queda como marco y acento. Textos y botones comprobados >= 4,5:1 en Crear, Canal, Mix, FX, EQ, Pads, Cancion y Proyecto.
- Para revertir: git revert del commit v2.41.

## v2.42 (2026-10-31) — Claude
- Todas las caratulas: acentos de las oscuras (Neon, Oscuro, Violeta, Verde) y de Plata/Claro menos chillones, texto claro menos deslumbrante, rail de los deslizadores visible (--rail), nombres de canal y dB legibles en las claras. Contraste >= 4,5:1 medido en Crear, Canal, Mix, FX, EQ, Pads, Cancion y Proyecto en las 10 caratulas.
- Para revertir: git revert del commit v2.42.

## v2.43 (2026-10-31) — Claude
- FX compacto: cabeceras de grupo como franja de color, tarjetas con barra y fondo propios, efectos cerrados = una linea, parametros siempre visibles al abrir (sin 'Parametros avanzados'), grafica y deslizadores mas bajos. Contraste >= 4,5:1 en las 10 caratulas.
- Para revertir: git revert del commit v2.43.

## v2.44 (2026-10-31) — Claude
- FX con aspecto de modulo: cabecera con degradado del color del efecto, icono en insignia, interruptor con LED, pantalla con marco de color, deslizadores con relleno de color, valores en etiqueta. Misma estructura y funciones que v2.43; contraste >= 4,5:1 en las 10 caratulas.
- Para revertir: git revert del commit v2.44.

## v2.45 (2026-10-31) — Claude
- FX: los Macros se pliegan en una sola linea (34 px en vez de 130 px). Toca 'Macros' para desplegar; el estado se guarda (campo mfold, plegado por defecto).
- Para revertir: git revert del commit v2.45.

## v2.46 (2026-10-31) — Claude
- FX: la cadena de efectos es ahora una tira de modulos (Envios: Reverb, Delay · Master: Master, Chorus, Filtro, Crush, Sidechain, Compresor) con LED de encendido en cada uno. Se toca un modulo y solo se muestra ese efecto debajo; ya no hay que hacer scroll entre efectos. Toca el LED para encender o apagar sin cambiar de efecto.
- Para revertir: git revert del commit v2.46.

## v2.47 (2026-10-31) — Claude
- Doble toque para resetear (Macros, barra Master y deslizadores de FX): ahora solo cuenta un toque corto y quieto sobre el mismo control; un arrastre ya no cuenta, asi que ajustar varias veces seguidas no resetea por error ni afecta a otro macro.
- Para revertir: git revert del commit v2.47.

## v2.48 (2026-10-31) — Claude
- Cache: GitHub Pages guarda app.js y styles.css 10 minutos (max-age=600), por eso el navegador lateral y el movil iban por detras. index.html enlaza ahora app.js?v=2.48 y styles.css?v=2.48: cada version nueva cambia el numero y el navegador baja los archivos nuevos al instante. Al subir version hay que cambiarlo tambien.
- Para revertir: git revert del commit v2.48.

## v2.49 (2026-10-31) — Claude
- Modo escenario y Pantalla completa pasan a la fila de los patrones A B C D (iconos junto a Modo), visibles en Crear, Cancion y Proyecto, tambien dentro del modo escenario. Salen del desplegable del pie, que se llama ahora 'Pantalla y audio'.
- Para revertir: git revert del commit v2.49.

## v2.50 (2026-10-31) — Claude
- Deshacer y rehacer mas grandes (iconos de 20 px en botones de 34 px, antes 14,7 px y 26 px); la fila de transporte se reparte mejor (3:1 con el tempo) sin cortar PLAY ni BORRAR.
- Para revertir: git revert del commit v2.50.
