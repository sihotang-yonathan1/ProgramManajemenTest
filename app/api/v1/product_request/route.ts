import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../(db_related)/configure_db";

export async function POST(request: NextRequest){
    let request_data = await request.json()

    let query = pool.query(`
        INSERT INTO product_request_queue 
        (product_id, product_name, product_quantity, username, type)
        VALUES (?, ?, ?, ?, ?)`, [
            request_data['product_id'],
            request_data['product_name'],
            request_data['product_quantity'],
            request_data['username'],
            request_data['type']
        ])
    return new NextResponse(JSON.stringify({
        'message': 'data successfully requested'
    }))
}