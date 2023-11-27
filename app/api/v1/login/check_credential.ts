
"use server"

import { prisma } from "../../../(db_related)/configure_db"

class InvalidLoginException extends Error {
    constructor(message: string){
        super(message)
        this.name = 'InvalidLogin'
        this.message = message
    }
}

export async function sendLoginInfo(username: string, password: string){
    await prisma.$connect()
    let data = await prisma.credential.findFirst({
        select: {
            username: true
        },
        where: {
            username: username,
            password: password
        }
    })

    if (data == null){
        throw new InvalidLoginException('Invalid username or password')
    }

    await prisma.$disconnect()
    return data
}