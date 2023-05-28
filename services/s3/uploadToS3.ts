import s3 from "@/libs/s3";
import { PutObjectRequest } from "aws-sdk/clients/s3";

export default async function uploadToS3(
  file: any,
  key: string
): Promise<string> {
  if (!file || !key) return "";

  file = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), "base64");
  const params: PutObjectRequest = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
    Key: key,
    ContentEncoding: "base64",
    ContentType: "image/jpeg",
    Body: file,
  };

  const { Location } = await s3.upload(params).promise();
  return Location;
}
