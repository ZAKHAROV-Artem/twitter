import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import prisma from "@/libs/prismadb";
import handleError from "@/error/handleError";
import ApiError from "@/error/ApiError";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { name, email, username, birthDate, password } = req.body;
    if (!name || !email || !username || !birthDate || !password)
      throw ApiError.badRequest("Not enought data to create user :(");

    const hashedPassword = await hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        username,
        birthDate,
        hashedPassword,
        infoProvided: true,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    handleError(error, res);
  }
}
