import { useState, useContext } from "react";
import { UserContext } from "../componenets/UserContext";
import Layout from "../componenets/Layout";

const CreatePost = ({ onAddBlog }) => {
  const [title, setTitle] = useState("");
  const [blogText, setBlogText] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const { userName } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !blogText.trim() || !category) {
      alert("Please enter title, blog text, and select a category");
      return;
    }
    const newBlog = {  id: blogPosts.length + 1, title, thumbnail, blogText, author: userName, category, timestamp: new Date().toISOString(),};
    onAddBlog(newBlog);
    setTitle("");
    setBlogText("");
    setCategory("");
    setThumbnail(null);
  };

  return (
    <Layout>
      <div className="p-5 container mx-auto max-w-5xl py-6 shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1">
        <h2 className="mb-4 text-center text-2xl font-bold">Create Your Post</h2>
        <form onSubmit={handleSubmit} className="form">

          <div className="mb-2 font-semibold">
            <label >Title:</label>
            <input className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-2 font-semibold">
            {thumbnail && (
              <img
                className="w-full rounded-md mb-3"
                src={URL.createObjectURL(thumbnail)}
                alt="thumbnail"
              />
            )}
            <label>Thumbnail:</label>
            <input
              type="file"
              className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
              onChange={(e) => setThumbnail(e.target.files[0])}
            />
          </div>


          <div className="form-input mb-2 font-semibold">
            <label>Blog Text:</label>
            <textarea 
              className="shadow-[inset_0_0_4px_rgba(0,0,0,0.6)] placeholder-black w-full rounded-md p-1"
              value={blogText}
              onChange={(e) => setBlogText(e.target.value)}
            ></textarea>
          </div>
          
          <div className="form-input mb-2 font-semibold">
            <label>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="General">General</option>
              <option value="Adult ADHD">Adult ADHD</option>
              <option value="Kids ADHD">Kids ADHD</option>
            </select>
          </div>

          <p>Author: {userName} (You)</p>
          <button type="submit" className="mb-2 font-semibold submit-button w-full mt-5">Create</button>
        </form>
      </div>
    </Layout>
  );

};

export default CreatePost;
