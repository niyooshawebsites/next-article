"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registerUser } from "../actions/auth-actions";
import { useActionState } from "react";
import Link from "next/link";

const initialState = {
  success: false,
  msg: "",
};

export default function RegisterForm() {
  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <div className="flex justify-center items-center w-3/12 border border-gray-300 rounded-lg">
      <div className="bg-gray-50 p-5 rounded-lg space-y-3 w-full">
        <h1 className="text-2xl">Register</h1>
        <Button
          type="button"
          variant={"secondary"}
          className="w-full bg-gray-900 text-white hover:bg-gray-950 cursor-pointer"
          onClick={() => signIn("google")}
        >
          Register with <span className="text-orange-500">Google</span>
        </Button>

        <hr className="text-gray-200" />

        <form action={formAction} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input type="text" id="name" placeholder="John Doe" name="name" />
          </Field>

          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              type="email"
              id="email"
              placeholder="john@example.com"
              name="email"
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="***************"
            />
          </Field>

          {state.success ? (
            <p className="text-green-500 text-sm">{state.msg}</p>
          ) : (
            <p className="text-red-500 text-sm">{state.msg}</p>
          )}

          <Button type="submit" className="cursor-pointer" variant={"outline"}>
            Register
          </Button>
        </form>

        <p className="text-gray-500 text-sm">
          Aready havean account?{" "}
          <span className="text-blue-500">
            <Link href="/login">Sign In</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
