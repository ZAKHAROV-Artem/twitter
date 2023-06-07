import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/utils/serverAuth";
import handleError from "@/error/handleError";
import ApiError from "@/error/ApiError";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const currentUser = await serverAuth(req, res);
    if (req.method === "POST") {
      const { type,postId,username } = req.body;
      if (!type || !username)
        throw ApiError.badRequest("Can't create notification :(");
        let notification;
        if(type === "like" || type === "comment"){
          if(!postId)
          throw ApiError.badRequest("Can't create notification :(");
          const post = await prisma?.post.findUnique({where:{id:postId}});
          if(!post)
          throw ApiError.badRequest("Can't create notification :(");
          if(currentUser?.username === username)return res.status(200).json({});

          if(type === "like"){
            notification = await prisma?.notification.create({
            data: {
              body:`User ${currentUser?.username} liked your post "${post.body.slice(0,30)}..."`,
              image:post.image,
              username: post.username,
            },
          });
          }else{
            notification = await prisma?.notification.create({
              data: {
                body:`User ${currentUser?.username} wrote comment to your post "${post.body.slice(0,30)}..."`,
                username: post.username,
              },
            });
          }
          
      }else{
        notification = await prisma?.notification.create({
          data: {
            body:`User ${currentUser?.username} followed to you`,
            username:username as string,
          },
        });
      }
      await prisma?.user.update({
        where: { username:username as string },
        data: { hasNotification: true },
      });
      

      return res.status(200).json(notification);
    } else if (req.method === "GET") {
      const { page }: any = req.query;
      if (!page) res.status(200).json([]);

      const notifications = await prisma?.notification.findMany({
        where: { username:currentUser?.username as string },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * 20,
        take: 20,
      });
      return res.status(200).json(notifications);
    } else {
      return res.status(405).end();
    }
  } catch (error) {
    console.log(error)
    handleError(error, res);
  }
}
