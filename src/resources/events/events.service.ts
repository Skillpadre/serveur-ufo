import { pathToFileURL } from 'url'
import { pool } from '~/postgres/config'

import type { event } from '~~/types/event'

export class EventsService {

  // GET /events - Récupérer tous les événements
  getAllEvents = (req: any, res: any) => {
    try {

      pool.query('SELECT * FROM events ORDER BY _id DESC', (error: any, results: any) => {
        if (error) {
          console.log(error)
          throw new Error("Erreur lors de la récupération des événements")
        }
        console.log('get all events')
        res.status(200).json(results.rows)
      })
    }
    catch (error) {
      console.log(error)
    }
  }


  // GET /events/:id - Récupérer un événement par son id
  getEvent = (req: any, res: any) => {
    pool.query('SELECT * FROM events WHERE _id = $1', [req.params.id], (error: any, results: any) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
  }

  //POST Request to add an event
  createEvent = (req: any, res: any) => {
    console.log("query : ", req.query)
    console.log("body : ", req.body)
    const { name, location, start_date, end_date, state } = req.body
    const insert_date = new Date();
    console.log("insert date : ", insert_date)
    pool.query('INSERT INTO events(name, location, date_start, date_end, _date_insert, state) VALUES($1, $2, $3, $4, $5, $6) RETURNING *', [name, location, start_date, end_date, insert_date, state], (error: any, results: any) => {
      if (error) {
        throw error
      } else {
        console.log(`Added with id : ${results.rows[0]._id}`)

      }
      res.status(200).json(results.rows[0])
    })
  }

  // POST Request to add an event
  // addEvent = (req: any, res: any) => {
  //   const { title, description, date, time, location, image } = req.body

  //   pool.query('INSERT INTO events (title, description, date, time, location, image) VALUES ($1, $2, $3, $4, $5, $6)', [title, description, date, time, location, image], (error: any, results: any) => {
  //     if (error) {
  //       throw error
  //     }
  //     res.status(201).send(`Event added with ID: ${results.insertId}`)
  //   })
  // }

  // PUT Request to update an event
  updateEvent = (req: any, res: any) => {
    const eventId = parseInt(req.params.id)
    const title = req.query.name
    console.log(eventId, title)
    res.send('updateEvent')
  }

  // DELETE Request to delete an event
  deleteEvent = (req: any, res: any) => {
    const eventId = parseInt(req.params.id)
    pool.query('DELETE FROM events WHERE _id =$1 RETURNING *', [eventId], (error: any, results: any) => {
      if (error) {
        throw error
      }
      res.status(200).json({ deletedEvent: results.rows[0] })
    })
    // res.send('deleteEvent')
  }

}