import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../(db_related)/configure_db";

export async function GET(){
    let data = await pool.query("SELECT username FROM credential");
    return new NextResponse(JSON.stringify(data))
}

export async function POST(request: NextRequest){
    let request_json = await request.json()

    // TODO: set HTTP 403 when username or password invalid
    let data: Array<Map<string, string>> = await pool.query(
        "SELECT username FROM credential WHERE username = ? AND password = ?", 
        [request_json['username'], request_json['password']]) ?? []
    return new NextResponse(JSON.stringify(data))
}