import { pool } from './config'

const text = "CREATE TABLE events (_id SERIAL, name VARCHAR(25) NOT NULL, PRIMARY KEY(_id))"
export class MigrateService {

    createTableEvents = async (req: any, res: any) => {
        try {
            pool.query(text)
                .then((results: any) => (res.status(200).json(results.rows)))
                .catch((e: any) => console.error(e.stack))

       
        } catch (error) {
            console.log(error)
        } finally {
        }

        //res.send('createTableEvents')

        
    }
}