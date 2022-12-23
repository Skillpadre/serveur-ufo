import { Router } from 'express'
import { TeamsService } from './teams.controller';

const TeamsRoutes = Router()
const service = new TeamsService()


TeamsRoutes.route('/').get(service.getAllTeams).post(service.createTeam);
TeamsRoutes.route('/:id').get(service.getTeam).put(service.updateTeam).delete(service.deleteTeam);
 
export { TeamsRoutes };
