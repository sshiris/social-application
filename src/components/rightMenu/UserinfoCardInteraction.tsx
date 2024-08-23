"use client";

import { switchBlock, switchFollow } from "@/lib/actions";
import prisma from "@/lib/client";
import { useOptimistic, useState } from "react";

const UserinfoCardInteraction = ({
  userId,
  isUserBlocked,
  isFollowing,
  isFollowingSent,
}: {
  userId: string;
  isUserBlocked: Boolean;
  isFollowing: Boolean;
  isFollowingSent: Boolean;
}) => {
  const [userState, setUserState] = useState({
    following: isFollowing,
    blocked: isUserBlocked,
    followingRequestSent: isFollowingSent,
  });
  const follow = async () => {
    switchOptimisticState("follow");
    try {
      await switchFollow(userId);
      setUserState((pre) => ({
        ...pre,
        following: pre.following && false,
        followingRequestSent:
          !pre.following && !pre.followingRequestSent ? true : false,
      }));
    } catch (error) {}
  };

  const block = async () => {
    switchOptimisticState("block");

    try {
      await switchBlock(userId);
      setUserState((pre) => ({
        ...pre,
        blocked: !pre.blocked,
      }));
    } catch (error) {}
  };
  const [optimisticState, switchOptimisticState] = useOptimistic(
    userState,
    (state, value: "follow" | "block") =>
      value === "follow"
        ? {
            ...state,
            following: state.following && false,
            followingRequestSent:
              !state.following && !state.followingRequestSent ? true : false,
          }
        : { ...state, blocked: !state.blocked }
  );
  return (
    <>
      <form action={follow}>
        <button className="w-full bg-blue-500 text-white rounded-md text-sm p-1">
          {optimisticState.following
            ? "Following"
            : optimisticState.followingRequestSent
            ? "Friend Request Sent"
            : "Follow"}
        </button>
      </form>
      <form className="self-end" action={block}>
        <button>
          <span className="text-red-400 text-xs cursor-pointer">
            {optimisticState.blocked ? "Unblock User" : "Block User"}
          </span>
        </button>
      </form>
    </>
  );
};

export default UserinfoCardInteraction;
