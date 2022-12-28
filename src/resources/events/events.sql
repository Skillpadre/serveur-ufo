CREATE TABLE events (
_id SERIAL,
name VARCHAR(25) NOT NULL,
location VARCHAR(25) NOT NULL,
description VARCHAR(255),
date_start DATE NOT NULL,
date_end DATE NOT NULL,
_date_insert DATE NOT NULL,
teams integer[],
activities integer[],
locked boolean NOT NULL DEFAULT FALSE,
PRIMARY KEY(_id)
);
