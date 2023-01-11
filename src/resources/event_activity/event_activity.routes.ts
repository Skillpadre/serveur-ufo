import { Router } from 'express';
import { Event_ActivityService } from '~/resources/event_activity/event_activity.service';


const Event_ActivityRoutes = Router();

const service = new Event_ActivityService();

Event_ActivityRoutes.route('/').get(service.getAllEventActivityLinks).post(service.linkEventActivity).delete(service.unlinkEventActivity);

export { Event_ActivityRoutes };