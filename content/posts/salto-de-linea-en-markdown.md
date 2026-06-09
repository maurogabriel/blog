+++
title = "Salto de linea en Markdown"
slug = "salto-de-linea-en-markdown"
date = 2024-07-27T17:07:48+00:00
draft = false
lang = "es-AR"

[taxonomies]
tags = ["blog", "markdown"]

[extra]
make_discoverable = true
is_page = false
+++

El otro día estuve escribiendo algunos informes en [Drafts](https://getdrafts.com), la app que uso como inicio de escritura para todos mis trabajos.  

Es un gran editor que se potencia con un sin fin de complementos y que simplifíca muchísimo las tareas que hago.  

Pero el problema que tenía era que no entendía como manejaba los saltos de línea usando [Markdown](https://www.markdownguide.org) como sintaxis.  

Tenía entendido que para hacer un salto de línea debía dejar siempre una línea en blanco entre cada párrafo:  

Línea 1

Línea 2  

Y el resultado era:

```text
Línea 1   
	‏‎
Línea 2
```

Pero a veces tenía que hacer algunas anotaciones sencillas, por ejemplo anotar precios de algunos productos:

Producto 1 	        $ 100  
Producto 2		$ 200  
Producto 3		$ 300  

Pero a la hora de renderizar el archivo me aparecía esa simple lista en una sola línea: 

`Producto 1 	$ 100 Producto 2 	$ 200 Producto 3 	$ 300`

Encontré por ahí varias opciones para el salto de línea, como usar la etiqueta html `<br>` o la barra invertida `\` como acostumbran a usar algunos.

Pero luego leyendo las [mejores prácticas sobre el uso de Markdown](https://www.markdownguide.org/basic-syntax/#line-break-best-practices) encontré la opción que me parece la mejor de todas, usar los dos espacios al final de cada línea.

`Párrafo.  (doble espacio)`

Con esto resolví el problema de las sencillas listas y ya habiéndome acostumbrado a su uso, aplicar dos espacios al final de cada párrafo, me aseguro de tener el salto de línea incluido, sin preocuparme al momento de renderizar el archivo y exportarlo a PDF u otros formatos.
