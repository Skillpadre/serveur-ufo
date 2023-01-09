CREATE TABLE activities (
_id SERIAL,
name VARCHAR(25) NOT NULL,
nb_fields INT,
nb_teams INT,
points INT,
category VARCHAR(50),
animateurs VARCHAR(255)[]
planning VARCHAR(255),
id_event INT REFERENCES events (_id),
PRIMARY KEY(_id)
);