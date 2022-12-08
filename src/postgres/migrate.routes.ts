import { Router } from "express"
import { MigrateService } from '~/postgres/migrate.service'

import { BadRequestException, NotFoundException } from '~/utils/exceptions'

const MigrateRoutes = Router()

const service = new MigrateService()

MigrateRoutes.route('/events').get(service.createTableEvents)

export { MigrateRoutes }