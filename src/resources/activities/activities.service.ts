import { Request, Response } from 'express'
import { pool } from '~/postgres/config'

// sekect all activities from event table
// "SELECT * FROM activities WHERE _id IN (SELECT unnest(activities) FROM events WHERE _id = $1)"

export class ActivitiesService {

    // Dispatch according to the query
    getActivities = (req: Request, res: Response) => {
        if(req.query.name)
            this.getActivitiesByName(req, res)
        else if(req.query.id)
            this.getActivityById(req, res)
        else
            this.getAllActivities(req, res)
    }

    getAllActivities = (req: Request, res: Response) => {
        try {
            pool.query("SELECT * FROM activities")
                .then((results: any) => (res.status(200).json(results.rows)))
                .catch((e: any) => console.error(e.stack))
        }
        catch (error) {
            console.log(error)
        }
    }

    createActivity = (req: Request, res: Response) => {
        const { name, nb_fields, nb_teams, category } = req.body

        try {
            pool.query(
                "INSERT INTO activities (name, nb_fields, nb_teams, category) VALUES ($1, $2, $3, $4) RETURNING *",
                [name, nb_fields, nb_teams, category]
                )
                .then((results: any) => (res.status(200).json(results.rows[0])))
                .catch((e: any) => console.error(e.stack))
        }
        catch (error) {
            console.log(error)
        }
    }

    updateActivity = (req: Request, res: Response) => {
        const { name, nb_fields, nb_teams, category } = req.body

        pool.query(
            "UPDATE activities set name = $1, nb_fields = $2, nb_teams = $3, category = $4 WHERE _id = $5 RETURNING *",
            [name, nb_fields, nb_teams, category, req.params.id]
        )
        .then((results: any) => (res.status(200).json(results.rows)))
        .catch((e: any) => console.error(e.stack))
    }

    getActivityById = (req: Request, res: Response) => {
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


    getActivitiesByName = (req: Request, res: Response) => {
        pool.query(
            "SELECT * FROM activities WHERE name = $1",
            [req.query.name]
        )
        .then((results: any) => (res.status(200).json(results.rows)))
        .catch((e: any) => console.error(e.stack))
    }



    deleteActivity = (req: Request, res: Response) => {
        pool.query(
            "DELETE FROM activities WHERE _id = $1 RETURNING *",
            [req.params.id]
        )
        .then((results: any) => (res.status(200).json(results.rows)))
        .catch((e: any) => console.error(e.stack))
    }

}