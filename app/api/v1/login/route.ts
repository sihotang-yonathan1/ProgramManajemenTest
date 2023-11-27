import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

class InvalidLoginException extends Error {
    constructor(message: string){
        super(message)
        this.name = 'InvalidLogin'
        this.message = message
    }
}

export async function GET(){
    let data = await prisma.credential.findMany({
        select: {
            username: true
        }
    })
    return new NextResponse(JSON.stringify(data))
}

export async function POST(request: NextRequest){
    let request_json = await request.json()

    // TODO: set HTTP 403 when username or password invalid
    try {
        let data = await prisma.credential.findMany({
            select: {
                username: true
            },
            where: {
                username: request_json['username'],
                password: request_json['password']
            }} ?? []
        )
            if (data.length == 0){
                throw new InvalidLoginException('Invalid username or password')
            }
            return new NextResponse(JSON.stringify(data))
    } catch (error) {
        let data;
        let response_status = {
            'http_code': 403
        }
        
        console.error(error)
        await prisma.$disconnect()

        if (error instanceof InvalidLoginException){
            data = {
                'success': false, 
                'error_data': {
                    'message': error.message
                },
                'error_type': error.name
        }
        
        return new NextResponse(JSON.stringify(data || {}), {
            status: response_status.http_code
        })
    }
}}