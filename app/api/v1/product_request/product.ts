"use server"

import { prisma } from "../../../(db_related)/configure_db"

export async function getPendingProductRequest(){
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
    return result
}