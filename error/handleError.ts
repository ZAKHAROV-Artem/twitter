import { NextApiResponse } from "next";
import ApiError from "@/error/ApiError";

export default function handleError(error: any, res: NextApiResponse) {
  console.log(error);
  if (error instanceof ApiError) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(500).send({ message: "Unpredicted error" });
}
