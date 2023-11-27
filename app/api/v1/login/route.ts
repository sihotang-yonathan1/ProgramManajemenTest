import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../(db_related)/configure_db";
import { sendLoginInfo } from "./check_credential";

class InvalidLoginException extends Error {
    constructor(message: string){
        super(message)
        this.name = 'InvalidLogin'
        this.message = message
    }
}

export async function POST(request: NextRequest){
    let request_json = await request.json()

    // TODO: set HTTP 403 when username or password invalid
    try {
        let data = sendLoginInfo(request_json['username'], request_json['password'])
        return new NextResponse(JSON.stringify(data));
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