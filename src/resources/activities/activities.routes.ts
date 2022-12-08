import { Router } from "express"
import { ActivitiesService } from '~/resources/activities/activities.service'

import { BadRequestException, NotFoundException } from '~/utils/exceptions'

const ActivitiesRoutes = Router()

const service = new ActivitiesService()

ActivitiesRoutes.route('/').get(service.getAllActivities).post(service.createActivity)
ActivitiesRoutes.route('/:id').get(service.getActivity).patch(service.updateActivity).delete(service.deleteActivity)