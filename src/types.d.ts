export interface Note {
    id?: MongoId
    readonly title: string
    readonly content: string
    readonly history?: Array<NoteHistory>
}

export type NoteWithoutHistory = Omit<Note, 'history'>

export interface User {
    readonly _id: MongoId
    readonly role?: 'admin' | 'standard'
    readonly email: EmailFormat
    readonly password: string
    readonly notes?: Array<Note>
}

export type UserNotesHistory = Pick<User, 'notes'>

export type UserWithoutPassword = Omit<User, 'password'>


export interface StatusResponses {
    readonly status: number
    readonly message?: string
    readonly data?: Array<object> | object
    readonly authenticated?: boolean
    readonly token?: string

}