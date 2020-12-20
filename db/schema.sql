CREATE DATABASE nba;
USE nba;

CREATE TABLE players (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    position VARCHAR(255),
    team VARCHAR(255),
    PRIMARY KEY (id)
);

