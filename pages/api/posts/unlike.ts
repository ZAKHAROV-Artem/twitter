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
    const { postId } = req.body;

    if (!postId) throw ApiError.badRequest("Can't unlike this post :(");
    const post = await prisma?.post.findUnique({ where: { id: postId } });
    if (!post) throw ApiError.badRequest("Post not exixt :(");
    const postUpdated = await prisma?.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: post.likedIds.filter((id) => id !== currentUser?.id),
      },
    });

    return res.status(200).json(postUpdated);
  } catch (error) {
    handleError(error, res);
  }
}
