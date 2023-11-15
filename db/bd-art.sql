CREATE DATABASE ART;
USE ART;

CREATE TABLE artwork (
    id INT auto_increment primary key,
    title VARCHAR(30) not null,
    artist VARCHAR(30) not null,
    style VARCHAR(30) not null,
    year int,
    image TEXT,
    description VARCHAR(400)
    );
    
ALTER TABLE artwork DROP COLUMN artist;
    
CREATE TABLE artist (
    id INT auto_increment primary key,
    name VARCHAR(30) not null,
    lastname VARCHAR(30),
    nacionality VARCHAR(30),
    style VARCHAR(30) not null
    );
ALTER TABLE artist DROP COLUMN lastname;
    
CREATE TABLE artSpaces (
    id INT auto_increment primary key,
    name VARCHAR(30) not null,
    country VARCHAR(30),
    city VARCHAR(30),
    category VARCHAR(30)
    );
    
INSERT INTO `art`.`artwork` (`title`, `style`, `year`, `description`) VALUES ('La Mona Lisa', 'Renacimiento', '1517', 'Retrato de una mujer con una enigmática sonrisa');
INSERT INTO `art`.`artwork` (`title`, `style`, `year`, `description`) VALUES ('Noche Estrellada', 'Postimpresionismo', '1889', 'Paisaje nocturno con un cielo estrellado');
INSERT INTO `art`.`artwork` (`title`, `style`, `year`, `description`) VALUES ('Guernica', 'Cubismo', '1937', 'Pintura que representa el bombardeo de la ciudad de Guernica durante la Guerra Civil Española');
INSERT INTO `art`.`artwork` (`title`, `style`, `year`, `description`) VALUES ('Las Meninas', 'Barroco', '1656', 'Pintura que muestra a la infanta Margarita y su séquito con la presencia del propio pintor');
INSERT INTO `art`.`artwork` (`title`, `style`, `year`, `description`) VALUES ('El tres de mayo', 'Romanticismo', '1814', 'Representa la ejecución de ciudadanos españoles por parte de soldados franceses durante la ocupación de España por Napoleón.');
INSERT INTO `art`.`artwork` (`title`, `style`, `year`, `description`) VALUES ('La visión después del sermón', 'Postimpresionismo', '1897', 'Representación de mujeres bretonas en un momento de fervor religioso después de escuchar un sermón sobre la lucha de Jacob con el ángel en el Antiguo Testamento.');
INSERT INTO `art`.`artwork` (`title`, `style`, `year`, `description`) VALUES ('Ceci n\'est pas une pipe', 'Surrealismo', '1929', 'Pintura de una pipa con el texto \"Esto no es una pipa\" en francés.');

INSERT INTO `art`.`artist` (`name`, `nacionality`, `style`) VALUES ('Leonardo da Vinci', 'Italiano', 'Renacimiento');
INSERT INTO `art`.`artist` (`name`, `nacionality`, `style`) VALUES ('Pablo Picasso', 'Español', 'Varios');
INSERT INTO `art`.`artist` (`name`, `nacionality`, `style`) VALUES ('Vincent van Gogh', 'Holandés', 'Postimpresionismo');
INSERT INTO `art`.`artist` (`name`, `nacionality`, `style`) VALUES ('Diego Velázquez', 'Español', 'Barroco');
INSERT INTO `art`.`artist` (`name`, `nacionality`, `style`) VALUES ('Francisco de Goya', 'Español', 'Varios');
INSERT INTO `art`.`artist` (`name`, `nacionality`, `style`) VALUES ('Paul Gauguin', 'Francés', 'Postimpresionismo');
INSERT INTO `art`.`artist` (`name`, `nacionality`, `style`) VALUES ('René Magritte', 'Belga', 'Surrealismo');

INSERT INTO `art`.`artspaces` (`name`, `country`, `city`, `category`) VALUES ('Los Ángeles County Museum', 'EEUU', 'Los Angeles', 'Museo');
INSERT INTO `art`.`artspaces` (`name`, `country`, `city`, `category`) VALUES ('Museo de Bellas Artes', 'EEUU', 'Boston', 'Museo');
INSERT INTO `art`.`artspaces` (`name`, `country`, `city`, `category`) VALUES ('Museo del Prado', 'España', 'Madrid', 'Museo');
INSERT INTO `art`.`artspaces` (`name`, `country`, `city`, `category`) VALUES ('Museo Reina Sofía', 'España', 'Madrid', 'Museo');
INSERT INTO `art`.`artspaces` (`name`, `country`, `city`, `category`) VALUES ('Museo de Arte Moderno', 'EEUU', 'Nueva York', 'Museo');
INSERT INTO `art`.`artspaces` (`name`, `country`, `city`, `category`) VALUES ('Museo del Louvre', 'Francia', 'París', 'Museo');

SELECT * FROM artwork;
SELECT * FROM artspaces;
SELECT * FROM artist;

ALTER TABLE `art`.`artwork` 
CHANGE COLUMN `title` `title` VARCHAR(40) NOT NULL ;

DELETE FROM artwork WHERE id=19;

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema art
-- -----------------------------------------------------

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

ALTER TABLE artwork
ADD COLUMN artist_id INT,
ADD COLUMN artspaces_id INT,
ADD FOREIGN KEY (artist_id) REFERENCES artists(id),
ADD FOREIGN KEY (artspaces_id) REFERENCES artspaces(id);

UPDATE `art`.`artwork` SET `artist_id` = '1', `artspaces_id` = '11' WHERE (`id` = '12');
UPDATE `art`.`artwork` SET `artist_id` = '3' WHERE (`id` = '13');
UPDATE `art`.`artwork` SET `artist_id` = '2' WHERE (`id` = '14');
UPDATE `art`.`artwork` SET `artist_id` = '4' WHERE (`id` = '15');
UPDATE `art`.`artwork` SET `artist_id` = '5' WHERE (`id` = '16');
UPDATE `art`.`artwork` SET `artist_id` = '6' WHERE (`id` = '17');
UPDATE `art`.`artwork` SET `artist_id` = '7' WHERE (`id` = '18');



