const getAllTeams = async (req: any, res: any) => {
    res.send('Get all teams');
}

const createTeam = async (req: any, res: any) => {
    res.send('Create team');
}

const getTeam = async (req: any, res: any) => {
    res.send('Get team');
}

const updateTeam = async (req: any, res: any) => {
    res.send('Update team');
}

const deleteTeam = async (req: any, res: any) => {
    res.send('Delete team');
}

export {
    getAllTeams,
    createTeam,
    getTeam,
    updateTeam,
    deleteTeam
}