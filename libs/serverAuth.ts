import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import ApiError from "@/error/ApiError";

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.email) throw ApiError.isNotAuth("Not authenticated");
  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!currentUser) throw ApiError.isNotAuth("Not authenticated");
  return { currentUser };
};

export default serverAuth;
