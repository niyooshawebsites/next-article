"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useActionState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { updatePassword } from "@/app/actions/auth-actions";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { EyeOffIcon, EyeIcon } from "lucide-react";

const initialState = {
  success: false,
  msg: "",
};

export default function EditPassword() {
  const { data: session } = useSession();
  const userId = session?.user.id;
  const action = updatePassword.bind(null, userId);
  const [state, formAction] = useActionState(action, initialState);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="flex justify-center items-center w-4/12 md-w-full border border-gray-300 rounded-lg">
      <div className="w-full bg-gray-50 p-5 rounded-lg space-y-3">
        <h1>Fill out the details to update your password: </h1>
        <form action={formAction} className="space-y-4">
          <Field>
            <FieldLabel htmlFor="password">Password: </FieldLabel>
            <InputGroup>
              <InputGroupInput
                type="password"
                placeholder="Enter password"
                name="password"
                className="border-gray-300 focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-gray-500"
              />
              <InputGroupAddon align={"inline-end"}>
                {showPassword ? (
                  <EyeOffIcon
                    className="cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                ) : (
                  <EyeIcon
                    className="cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                  />
                )}
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <Button
            type="submit"
            variant={"default"}
            className="cursor-pointer bg-gray-800 text-white hover:bg-gray-900"
          >
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
}
