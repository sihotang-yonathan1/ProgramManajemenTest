import { createPool } from "mariadb";

import {PrismaClient} from "@prisma/client";

export const pool = createPool({
    host: process.env.DB_HOST,
    port:  Number(process.env.DB_PORT), // may error if not number
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

export const prisma = new PrismaClient()