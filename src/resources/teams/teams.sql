CREATE TABLE teams (
_id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
name VARCHAR(25),
structure VARCHAR(25),
id_event INT REFERENCES events (_id),
PRIMARY KEY(_id)
);