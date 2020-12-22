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


CREATE TABLE players (
	id INT AUTO_INCREMENT NOT NULL,
	description VARCHAR(255),
    lastName VARCHAR(255),    
    firstName VARCHAR(255),
	starter BOOLEAN DEFAULT true,    
	createdat TIMESTAMP NOT NULL,
	PRIMARY KEY(id)
)