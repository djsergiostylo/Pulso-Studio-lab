# Manual de Pulso Studio

Pulso Studio es una **groovebox para el móvil** que funciona en el navegador: baterías, bajos y sintes, patrones, efectos y exportación a WAV, todo sin instalar nada.

Este manual explica cada pantalla con capturas. Las capturas usan la carátula **Neón**, pero todo funciona igual con las demás.

> **Versión:** en la pantallita de la app, arriba a la derecha, pone la versión que tienes cargada (por ejemplo `v2.74`).

## 1. Primeros pasos

Abre la web en el navegador del móvil. Verás la pantalla de **Crear**: arriba la pantallita con el tempo, debajo los botones de transporte, la fila de patrones y la rejilla de pasos.

![Pantalla Crear: pantallita, transporte, patrones, rejilla, panel Sonido y barra inferior](manual/img/01-crear.jpg)

La pantalla se divide en cuatro zonas:

- **Pantallita (LCD):** muestra el canal y el patrón elegidos, el estado y el tempo en BPM. Desliza el dedo por ella para cambiar de patrón A–D. Toca para cambiar entre onda y espectro.
- **Transporte y patrones:** Play, Azar, Borrar, deshacer, rehacer, tempo y los patrones A B C D.
- **Rejilla:** 10 pistas (canales) con sus pasos.
- **Panel Sonido y barra inferior:** el panel Sonido (Macro, Canal, Mix, FX, EQ) y las cuatro pestañas **Crear, Canción, Proyecto y Aspecto**.

> **Consejo:** para usarla como una app, añade la web a la pantalla de inicio desde el menú del navegador. Se abre sin barras y a pantalla casi completa.

## 2. El secuenciador

La rejilla tiene **10 pistas**, una por fila: seis baterías (**KICK, SNRE, CLAP, HAT, OPEN, TOM**) y cuatro melódicas (**SUB, ACID, STAB, LEAD**). Cada fila tiene 16 pasos, que se reparten en cuatro tiempos.

![Rejilla de pasos con las pistas y sus botones M y S](manual/img/03-rejilla.jpg)

- **Tocar un paso** lo enciende o lo apaga.
- **Arrastrar en horizontal** pinta varios pasos de una pasada.
- **Mantener pulsado** un paso encendido cambia su fuerza (suave, normal o fuerte).
- **M** silencia la pista (mute) y **S** la deja sola (solo).
- **Tocar el nombre** de la pista la elige: los controles del panel Sonido pasan a ese canal.
- En las pistas melódicas, la fila **NOTA** debajo de la rejilla elige la nota de cada paso.

### Modos de paso

El botón **Modo: Paso** abre una hoja con lo que hace tocar un paso. Con cada modo, tocar un paso encendido le añade algo:

![Hoja con los modos de paso](manual/img/04-modos.jpg)

- **Paso:** enciende y apaga.
- **Acento:** el paso suena más fuerte.
- **Redoble:** el golpe se repite dentro del paso (×2, ×3, ×4).
- **Nudge:** adelanta o retrasa un poco el golpe.
- **Slide:** enlaza una nota con la siguiente. Solo en ACID.
- **Prob.:** probabilidad de que el paso suene.
- **Euclíd.:** reparte los golpes de forma uniforme por el patrón.

### Más herramientas

Bajo la rejilla, **Más herramientas** guarda funciones menos frecuentes:

- **LEN:** cambia el largo de la pista elegida. ACID puede tener hasta 32 pasos, con dos páginas (1–16 y 17–32).
- **Pista / Patrón / Pegar:** copia la pista o el patrón entero y lo pega en otro sitio.

## 3. Transporte y herramientas rápidas

![Transporte, patrones y botones de vista](manual/img/02-transporte.jpg)

- **Play / Stop:** el botón grande. De color de acento para reproducir y rojo al sonar. Parar y volver a pulsar **empieza desde el principio**.
- **Azar:** rellena la pista elegida con un patrón al azar, usando la escala del proyecto.
- **Borrar:** vacía la pista elegida del patrón actual.
- **Deshacer y rehacer:** ver más abajo.
- **Tempo:** `−` y `+` cambian el BPM de uno en uno. Toca el número varias veces al ritmo que quieras para marcar el tempo (**TAP**). El tempo por defecto es **132**.
- **A B C D:** los cuatro patrones. El patrón que suena lleva una marca.
- **Altavoz:** si está resaltado, el sonido de pulsar un paso está apagado.
- **Escenario:** esconde herramientas para tocar en directo con las casillas grandes. Se sale con **Salir**.
- **Pantalla completa:** oculta las barras del navegador. **En iPhone no existe**, porque Apple no lo permite en páginas web; usa «Añadir a pantalla de inicio».
- **Modo:** la hoja de los modos de paso.

### Deshacer y rehacer

Deshacer y rehacer guardan **todo el proyecto**, no solo las notas: secuencia, canales, mezcla, FX, EQ de canal y de master, canción, tempo y escala.

- Hasta **100 pasos** hacia atrás.
- Mover un deslizador **sin soltar** cuenta como un solo paso, aunque hagas pausas.
- Grabar con los pads es un solo paso.
- El mensaje de la pantallita dice qué se deshizo: SECUENCIA, MEZCLA, FX, EQ…
- **No entran** la carátula, el estilo, las luces, el audio ni Play y Stop.

## 4. Pads

La pestaña **Pads** se abre desde la fila Secuenciador | Pads. Cada pad toca el sonido de un canal en directo.

![Pantalla Pads](manual/img/05-pads.jpg)

- **● REC:** con Play activo, lo que toques se **graba** en el patrón que suena. Toda la grabación se deshace de una vez.
- **Cuantizar:** ajusta lo grabado al paso más cercano. Apagado, guarda la posición exacta.
- **🎹 Notas:** convierte los pads en un teclado para el canal melódico elegido.
- **Filtro DJ:** a la izquierda es un filtro de agudos (low pass) y a la derecha un filtro de graves (high pass). Doble toque lo centra.

## 5. Canción

Aquí se monta el tema encadenando patrones.

![Pantalla Canción](manual/img/06-cancion.jpg)

- **Reproducción:** **PATRÓN** repite el patrón elegido; **CANCIÓN** toca el arreglo compás a compás. El largo es de 8, 16 o 32 compases.
- **Arreglo:** cada casilla es un compás. Tócala para cambiar de patrón (A → B → C → D → vacío). **Mantén pulsada** una casilla para abrir ese patrón y editarlo.
- **Rellenar A·B·C·D** y **Vaciar** rellenan o limpian el arreglo entero.
- **Editar compases:** copiar, mover o repetir un compás. Cada acción se puede deshacer ahí mismo.
- **Cadena A-D:** encadena los cuatro patrones sin entrar en el modo canción.
- **Pistas de audio:** puedes cargar audios que suenan en los compases que marques y se ajustan al tempo según su BPM original.

## 6. Proyecto

Guarda, comparte y exporta lo que has hecho.

![Pantalla Proyecto](manual/img/07-proyecto.jpg)

- **Guardar en este móvil:** ponle nombre y pulsa **Guardar**. Además la app se guarda sola en este dispositivo cada vez que cambias algo.
- **Exportar .json / Cargar .json:** copia de seguridad del proyecto, o para pasarlo a otro móvil.
- **Código y Enlace:** genera un código o un enlace que puedes mandar por WhatsApp. Quien lo abra o pegue tendrá tu beat. No incluye samples propios.
- **Importar:** carga el código pegado en el cuadro.
- **Exportar audio:** elige 1, 2, 4 u 8 vueltas y pulsa **Exportar WAV**. Se calcula al instante, sin cortes, a 16 bits y a la frecuencia de tu móvil.
- **Grabar en tiempo real (.webm):** graba lo que suena mientras suena.

## 7. El panel Sonido

Bajo la rejilla siempre está el panel **Sonido**. Tócalo (la flecha) para abrirlo o cerrarlo. Arrastra la **asa** de arriba para cambiar su altura; doble toque la deja en la altura normal. Tiene cinco pestañas: **Macro, Canal, Mix, FX y EQ**.

### 7.1 Macro

Dos cosas: el **subidón** y los **seis macros**.

![Pestaña Macro: subidón](manual/img/09-macro.jpg)

**Subidón.** Un deslizador grande que mueves tú. Cuanto más a la derecha, más suben a la vez el **filtro de graves**, la **reverb**, el **delay** y el **drive**. Las barritas de debajo muestran cada uno en vivo.

- **Al soltar: Drop** vuelve todo de golpe a como estaba y suena un golpe. **Quedarse** deja el deslizador donde lo sueltes.
- **Curva:** Suave (sube pronto), Normal o Explosivo (sube al final).
- **Chips:** elige qué sube (Filtro, Reverb, Delay, Drive) y si quieres el **Golpe al caer**.

![Ajustes del subidón y los seis macros](manual/img/10-macro-ajustes.jpg)

Debajo hay **cinco ajustes** para dejar el subidón a tu gusto:

- **Filtro tope:** hasta qué frecuencia sube el filtro (de 1 a 10 kHz).
- **Resonancia:** cuánto silba el filtro al subir.
- **Pico resonancia:** en qué punto del recorrido es más fuerte (inicio, mitad o final).
- **Drive** y **Espacio:** hasta dónde suben el drive y la reverb con el delay.
- **Valores de fábrica** los restaura. Doble toque en un ajuste lo devuelve a su valor.

**Los seis macros** (DJ, Reverb, Delay, Drive, Sidechain y Master) están plegados bajo el nombre **Macros**. Tócalo para desplegarlos. Doble toque en un deslizador lo reinicia.

### 7.2 Canal

Todo sobre el canal que has elegido.

![Pestaña Canal](manual/img/11-canal.jpg)

- **Chips de canales:** cambia de canal. Cada uno tiene su **M** y su **S**.
- **Controles:** **Caída** (cuánto dura el sonido), **Tono**, **Filtro**, **Drive**, **Reverb** y **Delay** (los dos últimos son envíos).
- **Kits de sonido:** para las baterías, cambian tono, caída, filtro, drive y envíos de las 6 a la vez (Original, 808, 909, Lo-fi, Seco, Techno).
- **Presets:** en los sintes (SUB, ACID, STAB, LEAD) hay presets de sonido.
- **Capas:** suma una segunda voz al canal (por ejemplo Kick + Tom, o un sinte con su octava).
- **Sample propio:** carga un audio de hasta 8 segundos. Se guarda en este móvil.
- **Mis kits guardados:** guarda y recupera tus ajustes de baterías.
- **SUB y sintes:** onda (Sin, Tri, Saw, Sqr), tono y escala, y **Capa +1 octava**.

### 7.3 Mix

El mezclador.

![Pestaña Mix](manual/img/12-mix.jpg)

- **Fader:** el volumen de cada canal, con la escala en dB al lado.
- **Pan:** reparte el sonido entre izquierda y derecha.
- **M y S:** mute y solo.
- **Toca el nombre** para abrir ese canal en la pestaña Canal.
- **Doble toque** en un fader o en el pan lo reinicia.

### 7.4 FX

Los efectos, organizados como una cadena de módulos.

![Pestaña FX](manual/img/13-fx.jpg)

- **Tira de módulos:** **Envíos** (Reverb, Delay) y **Master** (Master, Chorus, Filtro, Crush, Sidechain, Compresor). Toca un módulo para ver solo ese efecto.
- **LED de cada módulo:** enciende o apaga el efecto sin cambiar de efecto.
- **Reverb y Delay** son **envíos**: se mandan desde cada canal con el control Reverb o Delay de la pestaña Canal.
- **Chorus/Flanger, Filtro LFO, Bitcrusher y Compresor** actúan sobre toda la mezcla.
- **Sidechain:** el kick baja el volumen de los canales marcados, para que los graves respiren.
- **Master:** volumen, filtros, medios, brillo, ancho estéreo, drive, swing, humanizar y limitador.
- **Doble toque** en un control lo devuelve a su valor.

### 7.5 EQ

El ecualizador, por canal y para el master.

![Pestaña EQ](manual/img/14-eq.jpg)

- Elige arriba el canal (o MST para el master).
- Cada canal tiene hasta **8 bandas**.
- **Tipos de banda:** campana, shelf y notch, además de cortes de graves y agudos.
- **ON** enciende o apaga la banda elegida; el cubo la borra.
- **EQ BYPASS** apaga toda la ecualización para comparar.

## 8. Aspecto

Esta pestaña cambia cómo se ve la app y da acceso a este manual.

![Pestaña Aspecto](manual/img/08-aspecto.jpg)

- **Carátula (colores):** diez carátulas, ordenadas de la más oscura a la más clara. **Auto** sigue el modo claro u oscuro de tu móvil.
- **Estilo:** **Hardware** (con tornillos y serigrafía) o **Ableton** (más limpio).
- **Luces extra:** destellos al sonar en pads, nombres y pantalla. Gastan batería, así que viene **apagado**. Si el audio suena entrecortado, déjalo apagado.
- **Audio:** **Rápido**, **Equilibrado** o **Estable**. Es el tamaño del búfer de audio: más búfer, más retraso al tocar pero menos cortes. El cambio se aplica **al recargar** la página.
- **Ayuda · Abrir el manual:** el botón que abre este manual, al final de la pestaña.

![Al final de Aspecto está el botón del manual](manual/img/08b-aspecto-manual.jpg)

## 9. Consejos y problemas habituales

**El audio se corta o chisporrotea.**
- En Aspecto, pon **Audio: Estable** y recarga la página.
- Deja **Luces extra** apagado.
- Cierra otras pestañas y apps que consuman.

**Los graves del kick suenan flojos.**
- El Sidechain debe estar encendido: es el que aparta el sub y el acid del kick.
- Prueba a silenciar ACID o a quitar la **Capa +1 octava** del SUB para ver cuál tapa.
- Los altavoces del móvil casi no reproducen graves; con auriculares se nota mucho más.

**No veo la última versión.**
- La página se guarda unos minutos en el móvil. Cierra la pestaña y vuelve a abrirla.
- La versión cargada aparece arriba en la pantallita.

**No encuentro pantalla completa en iPhone.**
- Apple no la permite en páginas web. Usa «Añadir a pantalla de inicio» desde el botón de compartir de Safari.

**¿Se pierde mi trabajo?**
- La app guarda sola en este móvil. Si cambias de móvil o borras los datos del navegador, **exporta un .json** o un código antes.
- Los samples propios no entran en el .json ni en el código.

**Me equivoqué con un deslizador o con un cambio.**
- Usa **Deshacer** (la flecha). Guarda hasta 100 pasos de todo el proyecto.

---

El código y el historial de cambios están en GitHub: <https://github.com/djsergiostylo/pulso-studio-claude>.
