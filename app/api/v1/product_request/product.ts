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

type ProductRequestStatus = 'pending' | 'accepted' | 'rejected'

export async function updateProductRequest(productId: number, newStatus: ProductRequestStatus, username: string){
    await prisma.$connect()
    await prisma.$executeRaw`
        UPDATE product_request_queue 
            SET status = ${newStatus} 
        WHERE 
            product_id = ${productId} AND username = ${username}`
    await prisma.$disconnect()
    
    return {
        success: true
    }
}