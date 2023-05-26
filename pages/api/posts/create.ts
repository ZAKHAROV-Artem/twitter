import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
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
    const { currentUser } = await serverAuth(req, res);
    const { body } = req.body;

    if (!body) throw ApiError.badRequest("Info not provided");

    const post = await prisma?.post.create({
      data: {
        body,
        username: currentUser.username as string,
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    return handleError(error, res);
  }
}
