import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import ApiError from "@/error/ApiError";
import { signOut } from "next-auth/react";
import handleError from "@/error/handleError";

export default async function serverAuth(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) throw ApiError.isNotAuth("Not authenticated");
    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });
    if (!currentUser) {
      throw ApiError.isNotAuth("Not auth");
    }
    return currentUser;
  } catch (error) {
    handleError(error, res);
  }
}
