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
    const { username }: any = req.query;
    if (!username) throw ApiError.badRequest("Info not provided");
    const user = await prisma?.user.findUnique({
      where: {
        username,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    return handleError(error, res);
  }
}
