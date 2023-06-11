import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/utils/serverAuth";
import handleError from "@/error/handleError";
import ApiError from "@/error/ApiError";
import { prisma } from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const currentUser = await serverAuth(req, res);
    if (req.method === "POST") {
      const { body, postId } = req.body;
      if (!body) throw ApiError.badRequest("Can't create empty comment :(");
      if (!postId)
        throw ApiError.badRequest("I don't know post where create comment :(");

      const comment = await prisma?.comment.create({
        data: {
          body,
          username: currentUser?.username as string,
          postId,
        },
      });

      return res.status(200).json(comment);
    } else if (req.method === "GET") {
      const { postId }: any = req.query;
      if (!postId) res.status(200).json([]);

      const comments = await prisma?.comment.findMany({
        where: { postId },
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json(comments);
    } else {
      return res.status(405).end();
    }
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
}
