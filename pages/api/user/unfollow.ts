import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/utils/serverAuth";
import handleError from "@/error/handleError";
import ApiError from "@/error/ApiError";
import { prisma } from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const currentUser = await serverAuth(req, res);
    if (!currentUser) return;
    const { id } = req.body;
    const userToUnfollow = await prisma?.user.findUnique({
      where:{id}
    })
    if(!userToUnfollow)throw ApiError.badRequest("User not exists :(");
    const user = await prisma?.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        followingIds: currentUser.followingIds.filter((item) => item !== id),
      },
    });
    await prisma?.user.update({
      where: {
        id,
      },
      data: {
        followersIds: userToUnfollow.followersIds.filter((item) => item !== currentUser.id),
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    handleError(error, res);
  }
}
