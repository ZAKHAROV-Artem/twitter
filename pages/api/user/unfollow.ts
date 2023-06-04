import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/utils/serverAuth";
import handleError from "@/error/handleError";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const currentUser = await serverAuth(req, res);
    if (!currentUser) return;
    const { id } = req.body;
    const user = await prisma?.user.update({
      where: {
        id: currentUser?.id,
      },
      data: {
        followingIds: currentUser.followingIds.filter((item) => item !== id),
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    handleError(error, res);
  }
}
