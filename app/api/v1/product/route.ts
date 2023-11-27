import { NextResponse } from "next/server";
import { prisma } from "../../../(db_related)/configure_db";

// TODO: check auth
export async function GET(){
    // let data = await pool.query("SELECT id, name, quantity FROM product") ?? [];
    await prisma.$connect()
    let data = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            quantity: true
        }
    })
    await prisma.$disconnect()
    return new NextResponse(JSON.stringify(data));
}