interface Input {

}

interface Question {

}

interface Choice {

}

interface Client {
    id: number
    name: string
    deletedAt: string | null
}

interface Project {
    clientId: number
    id: number
    name: string
    deletedAt: string | null
}