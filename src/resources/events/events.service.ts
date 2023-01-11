import {Request, Response} from 'express'
import { pool } from '~/postgres/config'

export class EventsService {

  // GET /events - Récupérer tous les événements
  getAllEvents = (req: Request, res: Response) => {
    try {

      pool.query('SELECT * FROM events ORDER BY date_end DESC', (error: any, results: any) => {
        if (error) {
          console.log(error)
          throw new Error("Erreur lors de la récupération des événements")
        }
        res.status(200).json(results.rows)
      })
    }
    catch (error) {
      console.log(error)
    }
  }


  // GET /events/:id - Récupérer un événement par son id
  getEvent = (req: Request, res: Response) => {
    pool.query('SELECT * FROM events WHERE _id = $1', [req.params.id], (error: any, results: any) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows[0])
    })
  }

  //POST Request to add an event
  createEvent = (req: any, res: any) => {
    console.log("query : ", req.query)
    console.log("body : ", req.body)
    const { name, location, description, start_date, end_date } = req.body
    const insert_date = new Date();
    console.log("insert date : ", insert_date)
    pool.query('INSERT INTO events(name, location, description, date_start, date_end, _date_insert) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', 
      [name, location, description, start_date, end_date, insert_date], 
      (error: any, results: any) => {
        if (error) {
          throw error
        } else {
          console.log(`Added with id : ${results.rows[0]._id}`)
        }
        res.status(200).json(results.rows[0])
    })
  }


  // PUT Request to update an event
  updateEvent = (req: Request, res: Response) => {
    const eventId = parseInt(req.params.id)
    const title = req.query.name
    console.log(eventId, title)
    const { name, location, description, date_start, date_end, id } = req.body
    console.log(req.body)

    pool.query(
      'UPDATE events SET name = $1, location = $2, description = $3, date_start = $4, date_end = $5 WHERE _id = $6 RETURNING *',
      [name, location, description, date_start, date_end, id],
      (error: any, results: any) => {
        if (error) {
          throw error
        } else {
          console.log(`updated id : ${results.rows[0]._id}`)

        }
        res.status(200).json(results.rows[0])
    })

    //res.send('updateEvent')
  }

  // DELETE Request to delete an event
  deleteEvent = (req: Request, res: Response) => {
    const eventId = parseInt(req.params.id)
    pool.query('DELETE FROM events WHERE _id =$1 RETURNING *', [eventId], (error: any, results: any) => {
      if (error) {
        throw error
      }
      res.status(200).json({ deletedEvent: results.rows[0] })
    })
    // res.send('deleteEvent')
  }

  lockEvent = (req: Request, res: Response) => {

    const eventId = parseInt(req.params.id)
    const { id, date_end } = req.body

    // Condition to check if id in body and id in url are the same
    if(id != eventId) {
      res.status(400).send("Bad request : id in body and id in url are different")
    } else {
      pool.query('UPDATE events SET locked = $2 WHERE _id = $1 RETURNING *',
        [id, true,],
        (error: any, results: any) => {
          if (error) {
            throw error
          } else {
            console.log(`Event id : ${results.rows[0]._id} locked`)

          }
          res.status(200).json(results.rows[0])
      })
    }

  }

  // activities in events had to deleted 
  addActivity = (req: any, res: any) => {
    pool.query(
      "UPDATE events set activities = array_append(activities, $1) WHERE _id = $2 RETURNING *",
      [req.body.activityId, req.params.id],
    )
    .then((result: any) => res.status(200).json(result.rows[0]))
    .catch((error: any) => console.error(error.stack))
  }

  // activities in events had to deleted 
  removeActivity = (req: any, res: any) => {
    pool.query (
      "UPDATE events set activities = array_remove(activities, $1) WHERE _id = $2 RETURNING *",
      [req.body.activityId, req.params.id],
    )
    .then((result: any) => res.status(200).json(result.rows[0]))
    .catch((error: any) => console.error(error.stack))
  }

    // activities in events had to deleted 
  cleanActivitiesInAllEvents = (req: any, res: any) => {
    pool.query (
      "UPDATE events SET activities = NULL RETURNING *",
    )
    .then((result: any) => res.status(200).json(result.rows))
    .catch((error: any) => console.error(error.stack))
  }

    // activities in events had to deleted 
  deleteNullValue = (req: any, res: any) => {
    pool.query(
      "UPDATE events set activities = array_replace(activities, null,0) WHERE _id = $1 RETURNING *",
      [req.params.id],
      )
      .then((result: any) => res.status(200).json(result.rows[0]))
      .catch((error: any) => console.error(error.stack))
    }
    
    cleanTeamsInAllEvents = (req: any, res: any) => {
      pool.query (
        "UPDATE events SET teams = NULL RETURNING *",
      )
      .then((result: any) => res.status(200).json(result.rows))
      .catch((error: any) => console.error(error.stack))
    }
}