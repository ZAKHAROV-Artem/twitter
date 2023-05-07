import { NextApiRequest, NextApiResponse } from "next";
import { hash } from "bcrypt";
import prisma from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { name, email, username, birthDate, password } = req.body;
    if (!name || !email || !username || !birthDate || !password)
      return res.status(400).end();

    const hashedPassword = await hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, username, birthDate, hashedPassword },
    });
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}
