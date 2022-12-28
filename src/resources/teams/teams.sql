CREATE TABLE teams (
_id SERIAL,
structure VARCHAR(25),
name VARCHAR(25),
categories VARCHAR(25),
state VARCHAR(25),
observations VARCHAR(255),
contact VARCHAR(100),
id_event INT REFERENCES events (_id),
PRIMARY KEY(_id)
);