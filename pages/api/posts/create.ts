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
    const { body, image } = req.body;
    if (!body) throw ApiError.badRequest("Can't create empty tweet :(");

    const post = await prisma?.post.create({
      data: {
        body,
        image,
        username: currentUser?.username as string,
        userId: currentUser?.id as string,
      },
    });

    return res.status(200).json(post);
  } catch (error) {
    handleError(error, res);
  }
}
