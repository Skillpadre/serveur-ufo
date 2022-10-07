import { pathToFileURL } from 'url'
import { pool } from '~/postgres/config'

export class EventsService {

  // GET /events - Récupérer tous les événements
getAllEvents = (req: any, res: any) => {
    pool.query('SELECT * FROM events ORDER BY _id DESC', (error: any, results: any) => {
      if (error) {
        throw error
      }
      res.status(200).json(results.rows)
    })
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
    console.log(req.query)
    const { name, location, start_date, end_date } = req.query
    const insert_date = new Date();
    console.log(insert_date)
    pool.query('INSERT INTO events(name, location, date_start, date_end, _date_insert) VALUES($1, $2, $3, $4, $5) RETURNING *', [name, location, start_date, end_date, insert_date],  (error: any, results: any) => {
      if (error) { 
        throw error
      } else {
        console.log(`Added with id : ${results.rows[0]._id}`)
        // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
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
    res.send('updateEvent')
  }

  // DELETE Request to delete an event
  deleteEvent = (req: any, res: any) => {
    res.send('deleteEvent')
  }

}