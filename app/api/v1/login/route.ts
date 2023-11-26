import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../(db_related)/configure_db";
import { SqlError } from "mariadb";

class InvalidLoginException extends Error {
    constructor(message: string){
        super(message)
        this.name = 'InvalidLogin'
        this.message = message
    }
}

export async function GET(){
    let data = await pool.query("SELECT username FROM credential");
    return new NextResponse(JSON.stringify(data))
}

export async function POST(request: NextRequest){
    let request_json = await request.json()

    // TODO: set HTTP 403 when username or password invalid
    try {
        let data: Array<Map<string, string>> = await pool.query(
            "SELECT username FROM credential WHERE username = ? AND password = ?", 
            [request_json['username'], request_json['password']]) ?? []
            if (data.length == 0){
                throw new InvalidLoginException('Invalid username or password')
            }
            return new NextResponse(JSON.stringify(data))
    } catch (error) {
        let data;
        let response_status = {
            'http_code': 403
        }
        if (error instanceof SqlError){
            data = {
                'success': false, 
                'error_data': {
                    'sql_state': error.sqlState,
                    'isFatal': error.fatal,
                    'error_number': error.errno
                },
                'error_type': error.name
        }}
        else if (error instanceof InvalidLoginException){
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