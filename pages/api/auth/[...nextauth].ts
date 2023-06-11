import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {prisma} from "@/libs/prismadb";
import ApiError from "@/error/ApiError";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {},
  pages: {
    signIn: "/",
    error: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });
        if (!user) throw ApiError.badRequest("User not exist :(");
        const isCorrect = await compare(
          password,
          user.hashedPassword as string
        );
        if (!isCorrect) throw ApiError.badRequest("Incorect email or password");
        return user;
      },
    }),
  ],
};

export default NextAuth(authOptions);
