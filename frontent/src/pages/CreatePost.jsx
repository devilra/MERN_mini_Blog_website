import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [input, setInput] = useState({ title: "", content: "", category: "" });
  const { user } = useContext(AuthContext);
  const [enable, setEnable] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnable(true);
    if (!user) return toast.error("Please login first!");

    try {
      const res = await axios.post("http://localhost:4000/api/posts", input, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success("Post Created!");
      setTimeout(() => {
        navigate("/");
        setEnable(false);
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-xl space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create New Post
        </h2>

        <input
          name="title"
          onChange={handleChange}
          required
          placeholder="Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          name="content"
          required
          onChange={handleChange}
          placeholder="Content"
          rows="6"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        <input
          name="category"
          onChange={handleChange}
          required
          placeholder="Category (e.g. Tech, Travel)"
          className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={enable}
          className={`w-full  font-semibold py-2 rounded-xl transition duration-300 ${
            enable
              ? "bg-opacity-30 cursor-not-allowed bg-blue-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}>
          Create Post
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}

export default CreatePost;
