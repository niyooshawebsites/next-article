import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/mail";
import { signIn, signOut } from "@/lib/auth";

// Register action
export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return {
      success: false,
      msg: "All credentials are required!",
    };
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return {
        success: false,
        msg: "Account already exists. Please login.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: null,
      },
    });

    const token = await crypto.randomBytes(32).toString("hex");
    const verifyUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
    await sendVerificationEmail(email, verifyUrl);

    return {
      success: true,
      msg: "Check your email to verify account",
    };
  } catch (err) {
    console.log(err instanceof Error ? err.message : "Something went wrong");
    return {
      success: false,
      msg: "Something went wrong! Please try again",
    };
  }
}

// Login action
export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/dashboard",
  });
}

// logout action
export async function logOutUser() {
  await signOut({
    redirectTo: "/login",
  });
}
