const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

//arrancar el servidor
const server = express();

//configurar
server.use(cors());
server.use(express.json());

// puerto
const serverPort = 4001;
server.listen(serverPort, () => {
  console.log(`Servidor iniciado en http://localhost:${serverPort}`);
});

// conexion con la BD
async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'Localhost',
    user: 'root',
    password: process.env.PASS,
    database: 'art',
  });
  await connection.connect();
  console.log(
    `Conexión establecida con la base de datos (identificador=${connection.threadId})`
  );

  return connection;
}

/***** ENPOINTS *****/

// 1. Insertar una entrada en la entidad principal.

//Añadir una nueva obra de arte (POST)
server.post('/artwork', async (req, res) => {
  const dataArtwork = req.body;
  const {title, style, year, description} = dataArtwork;

  let sqlInsert =
    'INSERT INTO `art`.`artwork` (`title`, `style`, `year`, `description`) VALUES (?, ?, ?, ?)';

  try {
    const conn = await getConnection();
    const [artworkList] = await conn.query(sqlInsert, [
      title,
      style,
      year,
      description,
    ]);

    if (artworkList.affectedRows === 0) {
      res.json({
        success: false,
        message: 'No se ha podido insertar',
      });
      return;
    }

    res.json({
      success: true,
      id: artworkList.insertId,
      message: `La obra de arte se ha insertado correctamente`
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Ha ocurrido un error${error}`,
    });
  }
});

//2. Leer/Listar todas las entradas existentes.

//Obtener toda INFO de las tablas (GET)
server.get('/artwork', async (req, res) => {
  const conn = await getConnection();

  try {
    const queryArtwork = 'SELECT * FROM artwork';
    const queryArtSpaces = 'SELECT * FROM artspaces';
    const queryArtArtist = 'SELECT * FROM artist';

    const [artworkList] = await conn.query(queryArtwork);
    const [artSpacesList] = await conn.query(queryArtSpaces);
    const [artArtistList] = await conn.query(queryArtArtist);

    const numOfArtwork = artworkList.length;

    res.json({
      info: { count: numOfArtwork },
      artworkList: artworkList,
      artspacesList: artSpacesList,
      artArtistList: artArtistList
    });
  } catch (error) {
    // Manejo de errores
    console.error('Error:', error);
    res.status(500).json({ error: 'Hubo un error al obtener los datos.' });
  } finally {
    conn.release(); // Cierro conexión
  }
});


//Obtener la INFO de una obra (GET)
/* Ejemplo

http://localhost:4001/artwork/12*/

server.get('/artwork/:id', async (req, res) => {
  const idArtwork = req.params.id;
  let conn;

  try {
    if (isNaN(parseInt(idArtwork))) {
      res.json({
        success: false,
        error: 'To find your spell the id must be a number',
      });
      return;
    }

    let queryArtwork = 'SELECT * FROM artwork WHERE id =?';

    conn = await getConnection();

    const [artworkList] = await conn.query(queryArtwork, [idArtwork]);
    const numOfArtwork = artworkList.length;

    if (numOfArtwork === 0) {
      res.json({
        success: false,
        message: 'la obra de arte que buscas no existe.',
      });
      return;
      
    }
    res.json({
      artworkList: artworkList[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Ha ocurrido un error.',
    });
  } finally {
    conn.end(); // Cierro conexión
  }
});

//3. Actualizar una obra de arte ya existente.

/*Ejemplo

http://localhost:4001/artwork/20

{
      "title": "La Anunciación",
      "style": "Quattrocento",
      "year": 1435,
      "image": null,
      "description": "Frescos divinos capturan el anuncio celestial a la Virgen María."
    }

*/

server.put('/artwork/:id', async (req, res) => {
  const dataArtwork = req.body;
  const { title, style, year, description } = dataArtwork;
  const idArtwork = req.params.id;

  const queryArtwork =
    'UPDATE artwork SET title = ?, style = ?, year = ?, description = ? WHERE id = ?';

  const conn = await getConnection();

  try {
    const [artworkList] = await conn.query(queryArtwork, [title, style, year, description, idArtwork]);

    if (artworkList.affectedRows > 0) {
      res.json({
        success: true,
        message: 'Actualizado correctamente',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No se encontró el artwork con el ID especificado',
      });
    }
  } catch (error) {
    // Manejo de errores
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Error al actualizar el artwork.' });
  } finally {
    conn.end();// Cierro conexión
  }
});


//4. Eliminar una obra de arte existente.

/* Ejemplo 
  http://localhost:4001/artwork/22
*/

server.delete('/artwork/:id', async (req, res) => {
  const idArtwork = req.params.id;
  let queryArtwork = 'DELETE FROM artwork WHERE id=?';

  const conn = await getConnection();

  try {
    const [artworkList] = await conn.query(queryArtwork, [idArtwork]);

    if (artworkList.affectedRows > 0) {
      res.json({
        success: true,
        message: 'Eliminado correctamente',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'No se encontró la obra de arte con el ID especificado, por tanto no se ha podido eliminar',
      });
    }
  } catch (error) {
    // Manejo de errores
    console.error('Error:', error);
    res.status(500).json({ success: false, error: 'Error al eliminar el artwork.' });
  } finally {
    conn.end(); // Cierro conexión
  }
});