import { pool } from '~/postgres/config'

export class UsersService {

    getUser() {
        return pool.query('SELECT * FROM users ORDER BY id ASC')
    }

    getUserById(id: string) {
        return pool.query('SELECT * FROM users WHERE id = $1', [id])
    }
}