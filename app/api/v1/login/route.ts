import { NextResponse } from "next/server";

export function GET(){
    return new NextResponse('Hello')
}

export function POST(){
    return new NextResponse('Post')
}