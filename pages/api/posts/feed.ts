import { NextApiRequest, NextApiResponse } from "next";
import handleError from "@/error/handleError";
import ApiError from "@/error/ApiError";
import serverAuth from "@/utils/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const currentUser = await serverAuth(req, res);
    const { page }:any = req.query;

    if (!page) throw ApiError.badRequest("Can not get feed :(");
    const posts = await prisma?.post.findMany({
      where: {
        userId: {
          in: currentUser?.followingIds,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip: (page - 1) * 10,
      take: 10,
    });

    return res.status(200).json(posts);
  } catch (error) {
    handleError(error, res);
  }
}
