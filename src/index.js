const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

// crear y configurar el servidor
const server = express();
server.use(cors());
server.use(express.json());

// puerto
const serverPort = 4001;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// conexion con la BD
async function getConnection() {
  const connection = await mysql.createConnection({
    host: 'Localhost',
    user: 'root',
    password: process.env.PASS,
    database: process.env.DATABASE,
  });
  await connection.connect();
  console.log(
    `Conexión establecida con la base de datos (identificador=${connection.threadId})`
  );

  return connection;
}

// endpoint
