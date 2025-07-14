import { Link } from "react-router-dom";

function PostCard({ post }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-6 mb-6 hover:shadow-lg transition duration-300">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h3>

      <p className="text-gray-600 mb-4">
        {post.content.length > 100
          ? post.content.substring(0, 100) + "..."
          : post.content}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <p className="italic">Author: {post.author?.name || "Unknown"}</p>
        <Link
          to={`/posts/${post._id}`}
          className="text-blue-600 font-medium hover:underline">
          Read More →
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
