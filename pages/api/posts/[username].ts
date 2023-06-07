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
    const { username, page }: any = req.query;
    if (!username) throw ApiError.badRequest("Can't get user by username :(");

    const posts = await prisma?.post.findMany({
      skip: (page - 1) * 10,
      take: 10,
      where: {
        username,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(posts);
  } catch (error) {
    handleError(error, res);
  }
}
