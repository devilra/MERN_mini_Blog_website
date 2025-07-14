import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import API from "../utils/axios";

const EditPost = () => {
  const [input, setInput] = useState({
    title: "",
    content: "",
    category: "",
  });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [enable, setEnable] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnable(true);
    try {
      API.put(`/posts/${id}`, input, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success("Post Updated Successfully");
      setTimeout(() => {
        navigate("/");
        setEnable(false);
      }, 2000);
    } catch (error) {}
  };

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then((res) => {
        setInput(res.data);
        setLoading(false);
      })
      .catch((err) => toast.error(err.message));
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          ✏️ Edit Post
        </h2>
        <input
          name="title"
          value={input.title}
          placeholder="Title"
          required
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="content"
          value={input.content}
          placeholder="Content"
          required
          rows={6}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          name="category"
          value={input.category}
          required
          onChange={handleChange}
          placeholder="Category (e.g. Tech, Travel)"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={enable}
          className={`w-full  font-semibold py-2 rounded-md transition duration-300 ${
            enable
              ? "bg-opacity-30 cursor-not-allowed bg-green-600 text-white"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}>
          ✅ Update Post
        </button>
      </form>
      <ToastContainer position="bottom-right" autoClose="1000" />
    </div>
  );
};

export default EditPost;
