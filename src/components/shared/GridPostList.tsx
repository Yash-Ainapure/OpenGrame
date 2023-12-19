import { Models } from "appwrite";
import { Link } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import PostStats from "./PostStats";

type GridPostListProps = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({
  posts,
  showUser = true,
  showStats = true,
}: GridPostListProps) => {
  const { user } = useUserContext();

  console.log("...........................................................");
  console.log(posts[1]?.creator); // Use optional chaining to handle potential undefined values
  console.log("...........................................................");

  return (
    <ul className="grid-container">
      {posts.map((post) => (
        <li key={post.$id} className="relative min-w-80 h-80">
          <Link to={`/posts/${post.$id}`} className="grid-post_link">
            <img
              src={post.imageUrl} // Use 'post' instead of 'posts[0]'
              alt="post"
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="grid-post_user">
            {showUser && (
              <div className="flex items-center justify-start gap-2 flex-1">
                <img
                  src={
                    post.creator?.imageUrl || // Use optional chaining for 'creator'
                    "/assets/icons/profile-placeholder.svg"
                  }
                  alt="creator"
                  className="w-8 h-8 rounded-full"
                />
                <p className="line-clamp-1">{post.creator?.$id}</p> {/* Use optional chaining for '$id' */}
              </div>
            )}
            {showStats && <PostStats post={post} userId={user?.id} />} {/* Use optional chaining for 'user' */}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList;
