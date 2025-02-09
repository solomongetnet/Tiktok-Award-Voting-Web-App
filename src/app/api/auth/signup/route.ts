import { NextRequest, NextResponse } from "next/server";
import prisma from "@/server/config/prisma";

const DefaultAvatarUrl =
  "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?ssl=1";

export const POST = async (req: NextRequest) => {
  try {
    const { email, name, password } = (await req.json()) as any;

    if (!email || !name || !password) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    const isEmailExist = await prisma.user.findUnique({
      where: { email: email },
    });

    if (isEmailExist) {
      return NextResponse.json(
        { message: "Email is already taken" },
        { status: 409 }
      );
    }

    // Saving the user in the db
    await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password,
        provider: "CREDENTIALS",
        role: "ADMIN",
      },
    });

    return NextResponse.json({ message: "Register succesfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong please try agian" },
      { status: 500 }
    );
  }
};
