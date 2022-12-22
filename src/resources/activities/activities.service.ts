import { pool } from '~/postgres/config'

export class ActivitiesService {

    getAllActivities = async (req: any, res: any) => {
        try {
            pool.query("SELECT * FROM activities")
                .then((results: any) => (res.status(200).json(results.rows)))
                .catch((e: any) => console.error(e.stack))
        }
        catch (error) {
            console.log(error)
        }
    }

    createActivity = async (req: any, res: any) => {
        try {
            pool.query("INSERT INTO activities (name) VALUES ('Deuxième event') RETURNING *")
                .then((results: any) => (res.status(200).json(results.rows)))
                .catch((e: any) => console.error(e.stack))
            
        }
        catch (error) {
            console.log(error)
        }
    }

    getActivity = async (req: any, res: any) => {
        try {
            
        }
        catch (error) {
            console.log(error)
        }
    }

    updateActivity = async (req: any, res: any) => {
        try {
            
        }
        catch (error) {
            console.log(error)
        }
    }

    deleteActivity = async (req: any, res: any) => {
        try {
            
        }
        catch (error) {
            console.log(error)
        }
    }

}