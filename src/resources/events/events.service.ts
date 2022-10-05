import { pathToFileURL } from 'url'
import { pool } from '~/postgres/config'

export class EventsService {

getEvents = (request: any, response: any) => {
    pool.query('SELECT * FROM events ORDER BY id DESC', (error: any, results: any) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }


  getEventById = (request: any, response: any) => {
    pool.query('SELECT * FROM events WHERE id = $1', [request.params.id], (error: any, results: any) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  //POST Request to test add event
  addEventTest = (request: any, response: any) => {
    //const { title, description, date, time, location, image } = request.body

    pool.query('INSERT INTO events(name) VALUES($1) RETURNING *', ['event name'],  (error: any, results: any) => {
      if (error) { 
        throw error
      } else {
        console.log(results.rows[0])
        // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
      }
      response.status(200).send(`Event added with ID: ${results.rows[0].id}`)
    })
  }

  // POST Request to add an event
  // addEvent = (request: any, response: any) => {
  //   const { title, description, date, time, location, image } = request.body

  //   pool.query('INSERT INTO events (title, description, date, time, location, image) VALUES ($1, $2, $3, $4, $5, $6)', [title, description, date, time, location, image], (error: any, results: any) => {
  //     if (error) {
  //       throw error
  //     }
  //     response.status(201).send(`Event added with ID: ${results.insertId}`)
  //   })
  // }

//   getEventById(id: string) {
//     return pool.query('SELECT * FROM event WHERE id = $1', [id])
// }

}