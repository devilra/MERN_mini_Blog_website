import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import API from "../utils/axios";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    API.get("/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, []);

  if (loading)
    return <p className="text-center text-gray-500 mt-10">Loading....</p>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          📝 All Blog Posts
        </h2>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
