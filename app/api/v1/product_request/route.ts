import { NextRequest, NextResponse } from "next/server";
import { pool, prisma} from "../../../(db_related)/configure_db";

// TODO: check authorization and authentication
export async function GET(){
    await prisma.$connect()
    let result = await prisma.product_request_queue.findMany({
        select: {
            product_id: true,
            product_name: true,
            product_quantity: true,
            username: true,
            type: true
        },
        where: {
            status: 'pending'
        }
    })
    await prisma.$disconnect()
    return new NextResponse(JSON.stringify(result))
}

export async function POST(request: NextRequest){
    let request_data = await request.json()

    await prisma.$connect()
    
    await prisma.$executeRaw`DELETE FROM product_request_queue WHERE status != 'pending'`
    await prisma.product_request_queue.create({
        data: {
            product_id: request_data['product_id'],
            product_name: request_data['product_name'],
            product_quantity: request_data['product_quantity'],
            username: request_data['username'],
            type: request_data['type']
        }
    })

    await prisma.$disconnect()
    
    return new NextResponse(JSON.stringify({
        'message': 'data successfully requested'
    }))
}

export async function PATCH(request: NextRequest){
    let request_data = await request.json()

    await prisma.$connect()
    await prisma.$executeRaw`UPDATE product_request_queue SET status = ${request_data['new_status']} WHERE product_id = ${request_data['product_id']}`
    await prisma.$disconnect()
    
    return new NextResponse(JSON.stringify({
        'message': 'Data updated successfully'
    }))
}