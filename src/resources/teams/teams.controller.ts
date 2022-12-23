import { pool } from '~/postgres/config'

export class TeamsService {

    getAllTeams = async (req: any, res: any) => {
        res.send('Get all teams');
    }

    createTeam = async (req: any, res: any) => {
        res.send('Create team');
    }

    getTeam = async (req: any, res: any) => {
        res.send('Get team');
    }

    updateTeam = async (req: any, res: any) => {
        res.send('Update team');
    }

    deleteTeam = async (req: any, res: any) => {
        res.send('Delete team');
    }
}