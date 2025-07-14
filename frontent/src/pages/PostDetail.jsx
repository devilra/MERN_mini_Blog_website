import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(post);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => toast.error(err.message));
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      toast.success("Post Deleted Successfull");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!post)
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  const isOwner = user?._id === post.author?._id;

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h2>
        <div className="text-gray-600 mb-6 whitespace-pre-line">
          {post.content}
        </div>
        <div>
          <p>
            <span className="font-medium text-gray-700">Category:</span>{" "}
            {post.category}
          </p>
          <p>
            <span className="font-medium text-gray-700">Author:</span>{" "}
            {post.author?.name || "Unknown"}
          </p>
        </div>
        {isOwner && (
          <div className="flex gap-4 mt-6">
            <Link
              className="bg-blue-600 hover:bg-blue-700 font-bold text-white px-4 py-2 rounded-md transition"
              to={`/edit/${post._id}`}>
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 font-bold text-white px-4 py-2 rounded-md transition">
              Delete
            </button>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PostDetail;
