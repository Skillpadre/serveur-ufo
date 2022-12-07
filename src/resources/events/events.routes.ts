import { Router } from 'express'
import { EventsService } from '~/resources/events/events.service'

import { BadRequestException, NotFoundException } from '~/utils/exceptions'

/**
 * Nous créeons un `Router` Express, il nous permet de créer des routes en dehors du fichier `src/index.ts`
 */
 const EventsRoutes = Router()
 /**
  * Instance de notre service
  */
 const service = new EventsService()
 
 /**
  * Toutes les routes de notre `Router` seront préfixées par `/events`
  */
 EventsRoutes.route('/').get(service.getAllEvents).post(service.createEvent)
 EventsRoutes.route('/:id').get(service.getEvent).patch(service.updateEvent).delete(service.deleteEvent)
 EventsRoutes.route('/lock/:id').patch(service.lockEvent)
 /**
  * On expose notre controller pour l'utiliser dans `src/index.ts`
  */
 export { EventsRoutes }