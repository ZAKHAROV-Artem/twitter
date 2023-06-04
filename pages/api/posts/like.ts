import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/utils/serverAuth";
import handleError from "@/error/handleError";
import ApiError from "@/error/ApiError";

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

    if (!postId) throw ApiError.badRequest("Can't like this post :(");
    const post = await prisma?.post.findUnique({ where: { id: postId } });
    if (!post) throw ApiError.badRequest("Post not exixt :(");
    await prisma?.post.update({
      where: {
        id: postId,
      },
      data: {
        likedIds: [...post.likedIds, currentUser?.id as string],
      },
    });

    return res.status(200);
  } catch (error) {
    handleError(error, res);
  }
}
