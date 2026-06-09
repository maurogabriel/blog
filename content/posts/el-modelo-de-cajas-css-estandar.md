+++
title = "El modelo de cajas CSS estándar"
slug = "el-modelo-de-cajas-css-estandar"
date = 2024-07-06T21:54:03+00:00
draft = false
lang = "es-AR"

[taxonomies]
tags = ["css"]

[extra]
make_discoverable = true
is_page = false
+++

En el modelo de cajas estándar, cuando estableces los atributos width y height para una caja, defines el ancho y el alto del contenido de la caja. Cualquier área de relleno y borde se añade a ese ancho y alto para obtener el tamaño total que ocupa la caja.

Si suponemos que la caja tiene el CSS siguiente, que establece los valores para las propiedades width, height, margin, border, y padding:

```css
.box {
  width: 350px;
  height: 150px;
  margin: 10px;
  padding: 25px;
  border: 5px solid black;
}
```

