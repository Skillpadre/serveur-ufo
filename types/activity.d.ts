type activity = {
    _id: number
    name: string
    nb_fields: number
    nb_teams: number
    category: string
}

interface UfoActivity {
    _id: number
    name: string
    nb_fields: number
    nb_teams: number
    category: string
}

interface UfoNewActivity {
    name: string,
    nb_fields: number,
    nb_teams: number,
    category: string
}
