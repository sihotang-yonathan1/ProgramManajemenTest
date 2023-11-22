import { NextResponse } from "next/server";
import { pool } from "../../../(db_related)/configure_db";

export async function GET(){
    let data = await pool.query("SELECT username FROM credential");
    return new NextResponse(JSON.stringify(data))
}

export async function POST(){
    return new NextResponse('Post')
}