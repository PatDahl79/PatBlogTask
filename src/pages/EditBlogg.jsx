import { useState, useContext } from "react";
import { UserContext } from "../componenets/UserContext";

const MakeBlogg = ({ onAddBlog }) => {
  const [title, setTitle] = useState("");
  const [blogText, setBlogText] = useState("");
  const { userName } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation could be added here if needed
    if (!title.trim() || !blogText.trim()) {
      alert("Please enter both title and blog text");
      return;
    }
    
    onAddBlog({ title, blogText, author: userName }); 
    setTitle("");
    setBlogText("");
  };

  return (
    <div className="form-container">
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-input">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-input">
          <label>Blog Text:</label>
          <textarea
          className="bloggTextInput"
            value={blogText}
            onChange={(e) => setBlogText(e.target.value)}
          ></textarea>
        </div>
        {/* Display the author */}
        <p>Author: (You)</p>
        <button type="submit" className="submit-button">Create</button>
      </form>
    </div>
  );
};

export default MakeBlogg;
