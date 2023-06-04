import { NextApiRequest, NextApiResponse } from "next";
import handleError from "@/error/handleError";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const {query} = req.query;

    if (!query) return [];
    const users = await prisma?.user.findMany({
      where:{
        username:{
          contains:query as string
        }
      },
      take: 5,
    });
    return res.status(200).json(users);
  } catch (error) {
    handleError(error, res);
  }
}
