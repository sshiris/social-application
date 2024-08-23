"use client";

import { updateProfile } from "@/lib/actions";
import { User } from "@prisma/client";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import UpdateButton from "./UpdateButton";

const UpdateUser = ({ user }: { user: User }) => {
  const [open, setOpen] = useState(false);
  const [cover, setCover] = useState<any>(false);

  const [state, formState] = useActionState(updateProfile, {
    success: false,
    error: false,
  });

  const router = useRouter();

  const handleClose = () => {
    setOpen(false);
    state.success && router.refresh();
  };
  return (
    <div className="">
      <span
        className="text-blue-500 text-sm cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Update
      </span>
      {open && (
        <div
          className="absolute w-screen h-screen top-0 left-0 bg-black bg-opacity-65 z-50
      flex justify-center items-center"
        >
          <form
            action={(formdata) =>
              formState({ formdata, cover: cover?.secure_url })
            }
            className=" bg-white p-12 z-50 rounded-lg shadow-md gap-1 w-full md:w-1/2 xl:w-1/3 flex flex-col"
          >
            <div className="flex items-center justify-between">
              <h1>Update Profile</h1>
              <div onClick={handleClose}>X</div>
            </div>

            <div className="text-gray-500 text-sm mt-4">
              Use the navbar profile to change the avatar or username
            </div>

            <CldUploadWidget
              uploadPreset="social"
              onSuccess={(result) => setCover(result.info)}
            >
              {({ open }) => {
                return (
                  <div
                    className="flex flex-col gap-4 my-4"
                    onClick={() => open()}
                  >
                    <label htmlFor="">Cover Picture</label>
                    <div className="flex items-center gap-2 cursor-pointer">
                      <Image
                        src={user.cover || "/noCover.png"}
                        alt=""
                        width={48}
                        height={36}
                        className="w-12 h-9 rounded-md 
                object-cover"
                      />
                      <span className="text-xs underline text-gray-600">
                        Change
                      </span>
                    </div>
                  </div>
                );
              }}
            </CldUploadWidget>

            {/* input */}
            <div className="flex flex-wrap justify-between gap-2 xl:gap-4">
              <div className="flex flex-col gap-4">
                <label className="text-xs text-gray-500">First Name</label>
                <input
                  type="text"
                  className="ring-1 ring-gray-300 rounded-md text-sm p-[8px]"
                  placeholder={user.name || "John"}
                  name="name"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xs text-gray-500">Surname</label>
                <input
                  type="text"
                  className="ring-1 ring-gray-300 rounded-md text-sm p-[8px]"
                  placeholder={user.surname || "Lee"}
                  name="surname"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xs text-gray-500">Description </label>
                <input
                  type="text"
                  className="ring-1 ring-gray-300 rounded-md text-sm p-[8px]"
                  placeholder={user.description || "Life is beautiful..."}
                  name="description"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xs text-gray-500">City </label>
                <input
                  type="text"
                  className="ring-1 ring-gray-300 rounded-md text-sm p-[8px]"
                  placeholder={user.city || "Finland"}
                  name="city"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xs text-gray-500">School </label>
                <input
                  type="text"
                  className="ring-1 ring-gray-300 rounded-md text-sm p-[8px]"
                  placeholder={user.school || "VAMK"}
                  name="school"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xs text-gray-500">Work </label>
                <input
                  type="text"
                  className="ring-1 ring-gray-300 rounded-md text-sm p-[8px]"
                  placeholder={user.work || "Software Engineer"}
                  name="work"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-xs text-gray-500">Website</label>
                <input
                  type="text"
                  className="ring-1 ring-gray-300 rounded-md text-sm p-[8px]"
                  placeholder={user.website || "irissocial"}
                  name="website"
                />
              </div>
            </div>

            <UpdateButton />
            {state.success && (
              <span className="text-green-500">Profile has been updated!</span>
            )}
            {state.error && (
              <span className="text-red-500">Something went wrong!</span>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
