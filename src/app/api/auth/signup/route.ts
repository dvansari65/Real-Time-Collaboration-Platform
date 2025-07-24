import { asyncHandler } from "@/src/lib/asyncHandler";
import { prisma } from "@/src/lib/prisma";
import { signupProps } from "@/src/types/auth/authType";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(async (req: NextRequest) => {
  const body = await req.json();
  const { userName, password, email }: signupProps = body;
  if (!userName || !password || !email) {
    return NextResponse.json({
      message: "please provide all the fields!",
      success: false,
    });
  }
  const existingUser = await prisma.user.findUnique({
    where: {
      userName: userName,
    },
  });
  if (existingUser) {
    return NextResponse.json(
      {
        message: "please provide all the fields!",
        success: false,
      },
      {
        status: 409,
      }
    );
  }
  const bcrypt = await import("bcrypt");
  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      userName: userName,
      password: hashedPassword,
      email: email,
    },
  });
  return NextResponse.json({
    message:"user created successfully!",
    success:true
  });
});
