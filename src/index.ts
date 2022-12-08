import cors from 'cors'
import express from 'express'
import { config } from '~/config'
import { MigrateRoutes } from '~/postgres/migrate.routes'
import { EventsRoutes } from '~/resources/events/events.routes'
import { TeamsRoutes } from '~/resources/teams/teams.routes'
import { UsersController } from '~/resources/users/users.controller'
import { ExceptionsHandler } from '~/middlewares/exceptions.handler'
import { UnknownRoutesHandler } from '~/middlewares/unknownRoutes.handler'


/**
 * On créé une nouvelle "application" express
 */
const app = express()


/**
 * On dit à Express que l'on souhaite parser le body des requêtes en JSON
 *
 * @example app.post('/', (req) => req.body.prop)
 */
app.use(express.json())

/** For URL encoded bodies (the kind produced by HTTP form POSTs) */
app.use(express.urlencoded({
    extended: true
  }));
/**
 * On dit à Express que l'on souhaite autoriser tous les noms de domaines
 * à faire des requêtes sur notre API.
 */
app.use(cors())

app.use('/migrate', MigrateRoutes)

/**
 * Toutes les routes CRUD pour les users seronts préfixées par `/users`
 */
app.use('/users', UsersController)

/**
 * Toutes les routes CRUD pour les events seronts préfixées par `/events`
 */
 app.use('/events', EventsRoutes)

 app.use('/teams', TeamsRoutes)

/**
 * Homepage (uniquement necessaire pour cette demo)
 */
app.get('/', (req, res) => res.send('🏠'))

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
app.all('*', UnknownRoutesHandler)

/**
 * Gestion des erreurs
 * /!\ Cela doit être le dernier `app.use`
 */
app.use(ExceptionsHandler)

/**
 * On demande à Express d'ecouter les requêtes sur le port défini dans la config
 */
app.listen(config.API_PORT, () => console.log('Server started !'))