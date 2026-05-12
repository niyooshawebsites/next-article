import prisma from "./prisma";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),

    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials) throw new Error("Credentials missing");

        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!email || !password) throw new Error("All fields are required");

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) throw new Error("Invalid credentails");

        if (user.emailVerified == null) throw new Error("Email your email!");

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) throw new Error("Invalid credentials");

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
});
