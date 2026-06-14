+++
title = "Atajo de IOS para enviar mensajes a Whatsapp"
slug = "atajo-de-ios-para-enviar-mensajes-a-whatsapp"
date = 2024-06-06T13:00:00+00:00
description = "Cómo crear un atajo de iOS para iniciar conversaciones de WhatsApp con números que no están guardados en la agenda del teléfono."
draft = false
lang = "es-AR"

[taxonomies]
tags = ["atajo", "tutorial"]

[extra]
make_discoverable = true
is_page = false
meta_image = "https://pasteboard.co/MTCCru0e91yh.jpg"
+++

Bueno, aqui la sencilla solución que encontré para enviar mensajes de Whatsapp a números que no tengo agendados en el teléfono.

Básicamente me valgo de la api de Whatsapp para crear el enlace ingresando solo el número de teléfono.

Aclaro que para formar el enlace se debe anteponer el código del país, en mi caso el **54** para ==**Argentina** 🇦🇷==.

Al tener ya el enlace creado, el atajo interpreta la URL formada y abre la aplicación de Whatsapp (ya tiene que estar instalada) en la pantalla lista para enviar un mensaje nuevo al número ingresado.

Y eso es todo.

```html
https://api.whatsapp.com/send?phone=54 + NUMERO_TELÉFONO
```

![Configuración del Atajo en Shortcuts](https://gcdnb.pbrd.co/images/MTCCru0e91yh.jpg)

💾 [Descargar Atajo](https://www.icloud.com/shortcuts/03f05e151c464a67a3723dc81e1ca91e)
