import { asyncHandler } from "@/src/lib/asyncHandler";
import { prisma } from "@/src/lib/prisma";
import { NextRequest } from "next/server";


export const GET = asyncHandler(async(req:NextRequest)=>{
    const users = await prisma.user.findMany({})
})