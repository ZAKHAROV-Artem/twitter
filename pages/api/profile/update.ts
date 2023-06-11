import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/utils/serverAuth";
import {prisma} from "@/libs/prismadb";
import ApiError from "@/error/ApiError";
import handleError from "@/error/handleError";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb", // Set desired value here
    },
  },
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const currentUser = await serverAuth(req, res);
    const { name, bio, location, site, profileImage, coverImage } = req.body;
    if (
      name === undefined ||
      bio === undefined ||
      location === undefined ||
      site === undefined ||
      profileImage === undefined ||
      coverImage === undefined
    )
      throw ApiError.badRequest("I have no data to update :(");

    const user = await prisma.user.update({
      where: {
        email: currentUser?.email as string,
      },
      data: {
        name,
        bio,
        location,
        site,
        profileImage,
        coverImage,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    handleError(error, res);
  }
}
