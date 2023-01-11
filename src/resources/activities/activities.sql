CREATE TABLE activities (
_id SERIAL,
name VARCHAR(25) NOT NULL,
nb_fields INT,
nb_teams INT,
category VARCHAR(50),
PRIMARY KEY(_id)
);