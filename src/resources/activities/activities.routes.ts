import { Router } from "express"
import { ActivitiesService } from '~/resources/activities/activities.service'

import { BadRequestException, NotFoundException } from '~/utils/exceptions'

const ActivitiesRoutes = Router()

const service = new ActivitiesService()

ActivitiesRoutes.route('/').get(service.getActivities).post(service.createActivity)
ActivitiesRoutes.route('/:id').get(service.getActivityById).patch(service.updateActivity).delete(service.deleteActivity)
ActivitiesRoutes.route('/:eventid').get(service.getActivitiesByEventId)
ActivitiesRoutes.route('/:name').get(service.getActivitiesByName)

export {ActivitiesRoutes}