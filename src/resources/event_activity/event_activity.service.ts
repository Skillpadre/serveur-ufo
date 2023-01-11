import { Request, Response } from 'express'
import { pool } from '~/postgres/config'

// Class to create liaison between events and activities in table event_activity
export class Event_ActivityService {

    getAllEventActivityLinks = (req: Request, res: Response) => {
        pool.query(
            `SELECT * FROM event_activity`
        )
        .then((results: any) => (res.status(200).json(results.rows)))
        .catch((e: any) => console.error(e.stack))
    }

    linkEventActivity = (req: Request, res: Response) => {
        pool.query(
            `INSERT INTO event_activity (event_id, activity_id) VALUES ($1, $2) RETURNING *`,
            [req.body.event_id, req.body.activity_id],
        )
        .then((results: any) => (res.status(200).json(results.rows)))
        .catch((e: any) => console.error(e.stack))
    }

    unlinkEventActivity = (req: Request, res: Response) => {
        pool.query(
            `DELETE FROM event_activity WHERE event_id = $1 AND activity_id = $2`,
            [req.body.event_id, req.body.activity_id],
        )
        .then((results: any) => (res.status(200).json(results.rows)))
        .catch((e: any) => console.error(e.stack))
    }

}