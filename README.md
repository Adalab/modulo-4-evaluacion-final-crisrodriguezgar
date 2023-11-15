# Evaluación final modulo 4

¡Hola soy Cristina! Bienvenida a mi evaluación final del módulo 4 del bootcamp de Adalab

## :stars: Descripción del proyecto

Me han pedido desarrollar una API, con un tema a elegir por mi. Consiste en una listado de obras de arte, y algunos detalles de las mismas como ```bash title, style, year, image, description``` para poder gestionar una web de búsqueda de obras de arte. He creado una relación entre ellos porque una obra de arte podrá tener un solo artista, pero un artista podrá tener muchas obras de arte ubicadas en un solo museo o galería.

He creado un servidor con EXPRESS, generado la base de datos en MySQL, y hecho la conexion entre ambos.

La manera de comunicarnos con nuestra base de datos y hacer consultas o cambios en la misma es mediante unas estructuras de codigo llamadas "ENDPOINTS".

## Endopoints

La API de Arte proporciona los siguientes endpoints:

### Consultar todas las obras de arte

```bash         
GET/artwork
```bash
Este endpoint devuelve una lista de todas las obras de arte de la base de datos:

```bash         
{
  "info": {
    "count": 3
  },
  "artworkList": [
    {
      "id": 12,
      "title": "La Mona Lisa",
      "style": "Renacimiento",
      "year": 1517,
      "image": null,
      "description": "Retrato de una mujer con una enigmática sonrisa",
      "artist_id": 1,
      "artspaces_id": 11
    },
    {
      "id": 13,
      "title": "Noche Estrellada",
      "style": "Postimpresionismo",
      "year": 1889,
      "image": null,
      "description": "Paisaje nocturno con un cielo estrellado",
      "artist_id": 3,
      "artspaces_id": null
    },
    {
      "id": 14,
      "title": "Guernica",
      "style": "Cubismo",
      "year": 1937,
      "image": null,
      "description": "Pintura que representa el bombardeo de la ciudad de Guernica durante la Guerra Civil Española",
      "artist_id": 2,
      "artspaces_id": null
    }
  ]
}
```
### Obetener una obra por su ID

```bash         
GET/artwork/12
```

Este endpoint devuelve una obra de arte por su ID. Si la obra de arte no existe en la base de datos, se devuelve una respuesta JSON de error. 
```bash
{
  "success": false,
  "message": "la obra de arte que buscas no existe."
}
```

Si existe la obra de arte da respuesta en formato JSON:

```bash         
{
  "artworkList": {
    "id": 20,
    "title": "La Anunciación",
    "style": "Quattrocento",
    "year": 1435,
    "image": null,
    "description": "Frescos divinos capturan el anuncio celestial a la Virgen María.",
    "artist_id": null,
    "artspaces_id": null
  }
```
## Insertar una nueva obra de arte

```bash         
POST/artwork
```
Este endpoint inserta una nueva obra de arte en la base de datos, con un mensaje para saber que todo ha ido bien.

```bash  
{
  "success": true,
  "id": 24,
  "message": "La obra de arte se ha insertado correctamente"
}
```

## Actualizar una obra existente 

```bash         
PUT/artwork/:id
```
Este endpoint actualiza una una obra de arte ya existente en la base de datos. El ID se debe de especificar en la URL.Si la actualización se ha hecho correctamente mostrará este mensaje, en formato JSON:
```bash 
{
  "success": true,
  "message": "Actualizado correctamente"
}
```
Sin embargo, si la obra de arte no existe en la base de datos y no puede actualizarlo, se devuelve esta respuesta JSON de error.

```bash 
{
  "success": false,
  "message": "No se encontró el artwork con el ID especificado"
}
```

## Eliminar una obra de arte

```bash         
DELETE/artwork/:id
```
Este endpoint elimina una obra de arte ya existente de la base de datos. El ID de la obra de arte se debe de especificar en la URL. Si todo ha ido bien y se elimina debe de mostar un mensaje en formato json como este:
```bash  
{
  "success": true,
  "message": "Eliminado correctamente"
}
```


Sin embargo, si la obra de arte no existe en la base de datos, se devuelve una respuesta JSON de error, como este:
```bash  
{
  "success": false,
  "message": "No se encontró la obra de arte con el ID especificado, por tanto no se ha podido eliminar"
}
```

## :hammer_and_wrench: Herramientas utilizadas

1. **Visual Studio Code** - Editor de código.
2. **Git** - Para el control de versiones.
3. **Github** - Como repositorio remoto.
4. **MySQL Workbench** -  sistema de gestión de bases de datos que funciona como cliente de MySQL

## :hammer_and_wrench: Tecnologías utilizadas:

1. **Express.js** para el servidor.
2. **Node.js** para el backend.
3. **MySQL** para la base de datos.

## Autora

[![Autor](https://img.shields.io/badge/-%20Cristina%20Rodriguez%20-%20pink?logo=github&labelColor=grey&color=rgb(240%2C%2093%2C%20215))](https://github.com/crisrodriguezgar)