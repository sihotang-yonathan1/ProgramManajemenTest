import { NextResponse } from "next/server";
import { pool } from "../../../(db_related)/configure_db";

// TODO: check auth
export async function GET(){
    let data = await pool.query("SELECT id, name, quantity FROM product") ?? [];
    return new NextResponse(JSON.stringify(data));
}