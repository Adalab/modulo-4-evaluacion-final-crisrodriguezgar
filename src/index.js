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
    const [results] = await conn.query(sqlInsert, [
      title,
      style,
      year,
      description,
    ]);

    if (results.affectedRows === 0) {
      res.json({
        success: false,
        message: 'No se ha podido insertar',
      });
      return;
    }

    res.json({
      success: true,
      id: results.insertId,
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

//3. Actualizar una entrada existente.
//4. Eliminar una entrada existente.
