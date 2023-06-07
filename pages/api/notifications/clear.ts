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

    await prisma?.user.update({
      where: { username: currentUser?.username as string },
      data: {
        hasNotification: false,
      },
    });

    return res.status(200).json("ok");
  } catch (error) {
    handleError(error, res);
  }
}
