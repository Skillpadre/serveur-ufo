import { Router } from 'express'
import { pool } from '~/postgres/config'
import { BadRequestException, NotFoundException } from '~/utils/exceptions'

/**
 * Nous créeons un `Router` Express, il nous permet de créer des routes en dehors du fichier `src/index.ts`
 */
 const UsersController = Router()

 const getUsers = (request: any, response: any) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error: any, results: any) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  } 

 /**
  * Instance de notre service
  */
 //const service = new TwitchService()
 
 /**
  * Trouve tous les animaux
  */
 UsersController.get('/',  getUsers)
  
 /**
  * On expose notre controller pour l'utiliser dans `src/index.ts`
  */
 export { UsersController }