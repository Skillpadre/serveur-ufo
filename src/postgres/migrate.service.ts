import { pool } from './config'

const textCreateTableEvents = `CREATE TABLE events (
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
    PRIMARY KEY(_id))
    `

    const textCreateTableActivities = `CREATE TABLE activities (
        _id SERIAL,
        name VARCHAR(25) NOT NULL,
        nb_fields INT,
        nb_teams INT,
        points INT,
        planning VARCHAR(255),
        id_event INT REFERENCES events (_id),
        PRIMARY KEY(_id))
        `

const text2 = "CREATE SCHEMA public"
const text3 = "SELECT * FROM events"
const text4 = "DROP TABLE events"
const text5 = "INSERT INTO events (name) VALUES ('Deuxième event') RETURNING *"

export class MigrateService {

    deleteColumnFromTable = async (req: any, res: any) => {
        pool.query(
            `ALTER TABLE ${req.query.table} DROP COLUMN ${req.query.column}`,
        )
        .then((result: any) => res.status(200).send(`Column ${req.query.column} deleted from table ${req.query.table} `))
        .catch((error: any) => console.error(error.stack))
    }

    addColumnToTable = async (req: any, res: any) => {
        pool.query(
            `ALTER TABLE ${req.query.table} ADD ${req.query.column} ${req.query.type}`,
        )
        .then((result: any) => res.status(200).send(`Column ${req.query.column}: ${req.query.type} added to table ${req.query.table} `))
        .catch((error: any) => console.error(error.stack))
    }

    clearTable = (req: any, res: any) => {
        pool.query(
            `TRUNCATE TABLE ${req.query.table}`
        )
        .then((result: any) => res.status(200).send(`Table ${req.query.table} clear`))
        .catch((error: any) => console.error(error.stack))
    }

    createTableEvents = async (req: any, res: any) => {
        try {
            pool.query(textCreateTableEvents)
                .then((results: any) => (res.status(200).json(results.rows)))
                .catch((e: any) => console.error(e.stack))
        } catch (error) {
            console.log(error)
        } finally {
        }
        //res.send('createTableEvents')
    }

    createTableActivities = async (req: any, res: any) => {
        try {
            pool.query(textCreateTableActivities)
                .then((results: any) => (res.status(200).json(results)))
                .catch((e: any) => console.error(e.stack))
        } catch (error) {
            console.log(error)
        } finally {
        }
        //res.send('createTableActivities')
    }

    dropTableActivities = async (req: any, res: any) => {
        try {
            pool.query("DROP TABLE activities")
                .then((results: any) => (res.status(200).json(results.rows)))
                .catch((e: any) => console.error(e.stack))
        } catch (error) {
            console.log(error)
        } finally {
        }
        //res.send('dropTableActivities')
    }
}