CREATE DATABASE nba;
USE nba;

CREATE TABLE players (
    id INT NOT NULL AUTO_INCREMENT,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    activePlayer BOOLEAN,
    PositionCategory VARCHAR(255),
    PRIMARY KEY (id)
);