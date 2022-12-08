import { pool, client } from './config'

export class MigrateService {

    createTableEvents = async (req: any, res: any) => {
        try {
            client
                .connect()
                .then(() => console.log('connected'))
                .catch((err: any) => console.error('connection error', err.stack))
            
            client.end()

        } catch (error) {
            console.log(error)
        } finally {
            client.end()
        }

        res.send('createTableEvents')

        // pool.query('CREATE TABLE events', (error: any, results: any) =>
        // {
        //     if (error) {
        //         throw error
        //     }
        //     res.status(200).json(results.rows)
        // })
    }
}