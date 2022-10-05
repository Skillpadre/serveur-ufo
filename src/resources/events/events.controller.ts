import { Router } from 'express'
import { EventsService } from '~/resources/events/events.service'

import { BadRequestException, NotFoundException } from '~/utils/exceptions'

/**
 * Nous créeons un `Router` Express, il nous permet de créer des routes en dehors du fichier `src/index.ts`
 */
 const EventsController = Router()

 const service = new EventsService()

 /**
  * Instance de notre service
  */
 //const service = new TwitchService()
 
 /**
  * Trouve tous les animaux
  */
 EventsController.get('/',  service.getEvents)

 EventsController.get('/:id', service.getEventById)

 EventsController.post('/add', service.addEventTest)

  
 /**
  * On expose notre controller pour l'utiliser dans `src/index.ts`
  */
 export { EventsController }