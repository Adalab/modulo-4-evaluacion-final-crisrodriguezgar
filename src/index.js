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

// 1. Insertar una entrada en su entidad principal.

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
    });
  } catch (error) {
    res.json({
      success: false,
      message: `Ha ocurrido un error${error}`,
    });
  }
});

//2. Leer/Listar todas las entradas existentes.

//Obtener toda INFO de las obras de arte (GET)
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
    conn.release(); 
  }
});


//3. Actualizar una obra de arte ya existente.

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
    conn.release();
  }
});


//4. Eliminar una obra de arte existente.

