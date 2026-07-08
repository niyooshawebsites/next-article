"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useActionState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { updatePassword } from "@/app/actions/auth-actions";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { signOut } from "next-auth/react";
import { getPresignedUrl } from "@/app/actions/upload-action";
import Image from "next/image";

const initialState = {
  success: false,
  msg: "",
};

export default function EditProfile() {
  const { data: session } = useSession();
  const userId = session?.user.id;

  const action = updatePassword.bind(null, userId as string);
  const [state, formAction] = useActionState(action, initialState);

  async function handleFileUpload() {}

  useEffect(() => {
    if (!state.msg) return;

    if (state.success) {
      toast.success(state.msg, { position: "top-center" });

      const timer = setTimeout(async () => {
        await signOut({
          callbackUrl: "/login",
        });
      }, 1500);

      return () => clearTimeout(timer);
    }

    toast.error(state.msg, { position: "top-center" });
  }, [state]);

  return (
    <div className="flex flex-col justify-start min-h-screen">
      <h1 className="text-2xl font-bold mb-4 content-end">Update Profile</h1>
      <div className="flex justify-center items-center w-4/12 md-w-full border border-gray-300 rounded-lg">
        <div className="w-full bg-gray-50 p-5 rounded-lg space-y-3">
          <h1>Fill out the details to update your profile: </h1>
          <form action={formAction} className="space-y-4">
            <Field>
              <FieldLabel htmlFor="image">Profile Picture: </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  type="file"
                  placeholder="Upload profile picture"
                  name="image"
                  accept="image/*"
                  className="border-gray-300 focus:outline-none focus:ring-0 focus-visible:ring-0 focus:border-gray-500"
                  onChange={handleFileUpload}
                  required
                />
              </InputGroup>
            </Field>

            <Button
              type="submit"
              variant={"default"}
              className="cursor-pointer bg-gray-800 text-white hover:bg-gray-900"
            >
              Update Profile Picture
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
