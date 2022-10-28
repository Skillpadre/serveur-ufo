export type event = {
    _id?: number
    name: string
    location: string
    description?: string
    state: "En création" | "En cours" | "Terminé"
    date_start: Date | string
    date_end: Date | string
    _date_insert?: Date
    teams?: any[]
    activities?: any[]
}