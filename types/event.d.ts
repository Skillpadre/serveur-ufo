type event = {
    _id?: number
    name: string
    location: string
    description?: string
    date_start: Date | string
    date_end: Date | string
    _date_insert?: Date
    teams?: any[]
    activities?: any[]
    locked: boolean
}