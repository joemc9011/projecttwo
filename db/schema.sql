DROP DATABASE IF EXISTS nba;
CREATE DATABASE nba;
USE nba;

CREATE TABLE players (
    id INT NOT NULL AUTO_INCREMENT,    
    lastName VARCHAR(255),    
    firstName VARCHAR(255),
	starter BOOLEAN DEFAULT true,    
    PRIMARY KEY (id)
);