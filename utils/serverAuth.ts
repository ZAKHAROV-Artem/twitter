import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import ApiError from "@/error/ApiError";
import { signOut } from "next-auth/react";

export default async function serverAuth(req: NextApiRequest, res: NextApiResponse){
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) throw ApiError.isNotAuth("Not authenticated");
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!currentUser) {
    signOut();
    return;
  }
  return currentUser;
};
