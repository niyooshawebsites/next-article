"use server";

import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import crypto from "crypto";
import { sendVerificationEmail } from "@/lib/mail";
import { signIn, signOut } from "@/lib/auth";

interface ActionState {
  success: boolean;
  msg: string;
}

// Register action
export async function registerUser(prevState: ActionState, formData: FormData) {
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
    // check existing user
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return {
        success: false,
        msg: "Account already exists. Please login.",
      };
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerified: null,
      },
    });

    // generate token
    const token = await crypto.randomBytes(32).toString("hex");

    // save token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires: new Date(Date.now() + 1000 * 60 * 60), // 1 hour
      },
    });

    // verification url
    const verifyUrl = `${process.env.APP_URL}/api/verify-email?token=${token}&email=${email}`;

    // send email
    await sendVerificationEmail(email, verifyUrl);

    return {
      success: true,
      msg: "Check your email to verify account",
    };
  } catch (err) {
    console.log(err instanceof Error ? err.message : "Something went wrong");
    return {
      success: false,
      msg: "Registration failed. Please try again",
    };
  }
}

// Login action
export async function loginUser(prevState: ActionState, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      success: false,
      msg: "All credentials are required!",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });

    return {
      success: true,
      msg: "Login successfully",
    };
  } catch (err) {
    console.log(err instanceof Error ? err.message : "Something went wrong");
    return {
      success: false,
      msg: "Login failed. Please try again!",
    };
  }
}

// logout action
export async function logOutUser() {
  await signOut({
    redirectTo: "/login",
  });
}
