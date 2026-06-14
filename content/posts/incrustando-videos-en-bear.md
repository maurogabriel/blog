+++
title = "Incrustando videos en Bear"
slug = "incrustando-videos-en-bear"
date = 2024-06-14T09:15:00+00:00
description = "Cómo hacer que los videos incrustados en Bear Blog se adapten al ancho de la pantalla con CSS responsive y una relación de aspecto estable."
draft = false
lang = "es-AR"

[taxonomies]
tags = ["blog", "design"]

[extra]
make_discoverable = true
is_page = false
+++

Ayer mientras escribia la entrada sobre el [concierto de DIO](https://mauro.bearblog.dev/dio-en-arena-spectrum-filadelfia-1986/) noté que las dimensiones del video no se adaptaban a mi iPhone.

Buscando la manera de dimensionar o escalar automáticamente los videos embebidos en el blog, encontré la siguiente solución para agregar a la hoja de estilos en Bear.

Algo nuevo para mí 😁

```css
iframe {
  aspect-ratio: 16 / 9;
  width: 100%; /* change this to a fixed width, or create a container with a width. */
  height: 100%;
}
```
