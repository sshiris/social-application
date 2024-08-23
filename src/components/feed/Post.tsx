import Image from "next/image";
import Comments from "./Comments";
import { Post as PostType, User } from "@prisma/client";
import PostInteraction from "./PostInteraction";
import { Suspense } from "react";
import PostInfo from "./PostInfo";
import { auth } from "@clerk/nextjs/server";

type postType = PostType & { user: User } & { likes: [{ userId: string }] } & {
  _count: { commets: number };
};

const Post = ({ post }: { post: postType }) => {
  const { userId } = auth();
  return (
    <div className="flex flex-col gap-4">
      {/* User */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={post.user.avatar || "/noAvatar.png"}
            alt=""
            className="w-4 h-4 rounded-full object-cover"
            width={40}
            height={40}
          />
          <span>
            {post.user.name && post.user.surname
              ? post.user.name + " " + post.user.surname
              : post.user.username}
          </span>
        </div>
        <div className="">
          {userId === post.user.id && <PostInfo postId={post.id} />}
        </div>
      </div>
      {/* Description */}
      <div className="flex flex-col gap-4">
        {post.img && (
          <div className="w-full min-h-96 relative">
            <Image
              src={post.img}
              alt=" "
              fill
              className="object-cover rounded-md"
            />
          </div>
        )}

        <p>{post.desc}</p>
      </div>
      <Suspense fallback="Loading">
        <PostInteraction
          postId={post.id}
          likes={post.likes.map((like) => like.userId)}
          commentNumber={post._count.commets}
        />
      </Suspense>
      <Suspense fallback="Loading...">
        <Comments postId={post.id} />
      </Suspense>
    </div>
  );
};

export default Post;
