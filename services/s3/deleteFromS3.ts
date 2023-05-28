import s3 from "@/libs/s3";
import { DeleteObjectRequest } from "aws-sdk/clients/s3";

export default async function deleteFromS3(key: string) {
  if (!key) return "";

  const params: DeleteObjectRequest = {
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME as string,
    Key: key,
  };

  await s3.deleteObject(params).promise();
}
