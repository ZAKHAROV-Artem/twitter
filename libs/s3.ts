import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
  region: process.env.NEXT_PUBLIC_S3_REGION,
  signatureVersion: process.env.NEXT_PUBLIC_S3_V,
});
const s3 = new AWS.S3();

export default s3;
