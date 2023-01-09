import { pool } from '~/postgres/config'

// sekect all activities from event table
// "SELECT * FROM activities WHERE _id IN (SELECT unnest(activities) FROM events WHERE _id = $1)"

export class ActivitiesService {

    // Dispatch according to the query
    getActivities = async (req: any, res: any) => {
        if(req.query.eventid)
            this.getActivitiesByEventId(req, res)
        else if(req.query.name)
            this.getActivitiesByName(req, res)
        else if(req.query.id)
            this.getActivityById(req, res)
        else
            this.getAllActivities(req, res)
    }

    getAllActivities = async (req: any, res: any) => {
        try {
            pool.query("SELECT * FROM activities")
                .then((results: any) => (res.status(200).json(results.rows)))
                .catch((e: any) => console.error(e.stack))
        }
        catch (error) {
            console.log(error)
        }
    }

    createActivity = async (req: any, res: any) => {
        const { name, nb_fields, nb_teams, points, planning, id_event } = req.body

        try {
            pool.query(
                "INSERT INTO activities (name, nb_fields, nb_teams, points, planning, id_event) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [name, nb_fields, nb_teams, points, planning, id_event]
                )
                .then((results: any) => (res.status(200).json(results.rows[0])))
                .catch((e: any) => console.error(e.stack))
            
        }
        catch (error) {
            console.log(error)
        }
    }

    updateActivity = async (req: any, res: any) => {
        const { name, nb_fields, nb_teams, points, planning, id_event } = req.body

        pool.query(
            "UPDATE activities set name = $1, nb_fields = $2, nb_teams = $3, points = $4, planning = $5, id_event = $6 WHERE _id = $7 RETURNING *",
            [name, nb_fields, nb_teams, points, planning, id_event, req.params.id]
        )
        .then((results: any) => (res.status(200).json(results.rows)))
        .catch((e: any) => console.error(e.stack))
    }

    getActivityById = async (req: any, res: any) => {
        let id;
        if(req.params.id)
            id = req.params.id
        else
            id = req.query.id


        pool.query(
            "SELECT * FROM activities WHERE _id = $1",
            [id]
        )
        .then((results: any) => (res.status(200).json(results.rows)))
        .catch((e: any) => console.error(e.stack))
    }

    getActivitiesByEventId = async (req: any, res: any) => {
        pool.query(
            "SELECT * FROM activities WHERE id_event = $1",
            [req.query.eventid]
        )
        .then((results: any) => (res.status(200).json(results.rows)))
        .catch((e: any) => console.error(e.stack))
    }

    getActivitiesByName = async (req: any, res: any) => {
        pool.query(
            "SELECT * FROM activities WHERE name = $1",
            [req.query.name]
        )
        .then((results: any) => (res.status(200).json(results.rows)))
        .catch((e: any) => console.error(e.stack))
    }



    deleteActivity = async (req: any, res: any) => {
        pool.query(
            "DELETE FROM activities WHERE _id = $1 RETURNING *",
            [req.params.id]
        )
        .then((results: any) => (res.status(200).json(results.rows)))
        .catch((e: any) => console.error(e.stack))
    }

}