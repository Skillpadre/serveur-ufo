import { Router } from 'express'

const TeamsRoutes = Router()

const { getAllTeams, createTeam, getTeam, updateTeam, deleteTeam } = require('./teams.controller');

TeamsRoutes.route('/').get(getAllTeams).post(createTeam);
TeamsRoutes.route('/:id').get(getTeam).put(updateTeam).delete(deleteTeam);
 
export { TeamsRoutes };
