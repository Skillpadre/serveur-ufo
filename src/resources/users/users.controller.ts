import { Router } from 'express'
import { pool } from '~/postgres/config'
import { BadRequestException, NotFoundException } from '~/utils/exceptions'
import { UsersService } from './users.service'

/**
 * Nous créeons un `Router` Express, il nous permet de créer des routes en dehors du fichier `src/index.ts`
 */
const UsersController = Router()

/**
 * Instance de notre service
 */
const service = new UsersService()

/**
 * Trouve tous les animaux
 */
//UsersController.get('/', getUsers)

UsersController.get('/', async (req, res) => {
  const result = await service.getUser();
  console.log(result)
  return res
    .status(200)
    .json(result.rows)
})

UsersController.get('/:id', async (req, res) => {
  const result = await service.getUserById(req.params.id);
  console.log(result)
  return res
    .status(200)
    .json(result.rows)
})


/**
 * On expose notre controller pour l'utiliser dans `src/index.ts`
 */
export { UsersController }