import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../(db_related)/configure_db";

// TODO: check authorization and authentication
export async function GET(){
    let result = await pool.query(`
        SELECT 
            product_id, product_name, product_quantity, username, type 
        FROM product_request_queue WHERE status = ?`, ['pending']) ?? []
    return new NextResponse(JSON.stringify(result))
}

export async function POST(request: NextRequest){
    let request_data = await request.json()

    await pool.query(`CALL delete_non_pending_request()`)
    await pool.query(`
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

export async function PATCH(request: NextRequest){
    let request_data = await request.json()

    await pool.query(`
        UPDATE product_request_queue SET status = ? WHERE product_id = ?
    `, [request_data['new_status'], request_data['product_id']])

    return new NextResponse(JSON.stringify({
        'message': 'Data updated successfully'
    }))
}