import { NextApiRequest, NextApiResponse } from "next";
import handleError from "@/error/handleError";
import ApiError from "@/error/ApiError";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { postId }: any = req.query;

    if (!postId) throw ApiError.badRequest("Can't get post without it's id :(");

    const post = await prisma?.post.findUnique({
      where: {
        id: postId,
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    handleError(error, res);
  }
}
