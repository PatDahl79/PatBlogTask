import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../componenets/UserContext";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import Layout from "../componenets/Layout";

const AllBlogs = () => {
  const { userName } = useContext(UserContext);
  const [editablePostId, setEditablePostId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [comments, setComments] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("latest");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);

  useEffect(() => {
    // Retrieve blog posts from local storage
    const storedPosts = JSON.parse(localStorage.getItem("blogPosts"));
    if (storedPosts) {
      setBlogPosts(storedPosts);
    }
  }, []);

  useEffect(() => {
    let filtered = blogPosts;
    if (selectedCategory) {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }
    filtered = filtered.sort((a, b) => {
      if (sortBy === "latest") {
        return new Date(b.timestamp) - new Date(a.timestamp);
      } else {
        return new Date(a.timestamp) - new Date(b.timestamp);
      }
    });

    setFilteredPosts(filtered);
  }, [blogPosts, selectedCategory, sortBy]);

  const addBlog = (post) => {
    const updatedPosts = [...blogPosts, post];
    setBlogPosts(updatedPosts);
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
  };

  const removeBlog = (postId) => {
    const updatedPosts = blogPosts.filter((post) => post.id !== postId);
    setBlogPosts(updatedPosts);
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
  };

  const editBlog = (postId, newText) => {
    const updatedPosts = blogPosts.map((post) =>
      post.id === postId ? { ...post, blogText: newText } : post
    );
    //UPDATE LOCAL STORAGE
    setBlogPosts(updatedPosts);
    localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
  };

  const handleEdit = (postId, text) => {
    setEditablePostId(postId);
    setEditedText(text);
  };

  const handleSave = (postId) => {
    editBlog(postId, editedText);
    setEditablePostId(null);
  };

  const handleKeyPress = (event, postId) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSave(postId);
    }
  };

  const handleCommentChange = (postId, event) => {
    const { value } = event.target;
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: value,
    }));
  };

  const handleCommentSubmit = (postId) => {
    const commentContent = comments[postId];
    if (commentContent) {
      const newComment = { userName, text: commentContent };
      const updatedPosts = blogPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...(post.comments || []), newComment] }
          : post
      );
      //UPDATE LOCAL STORAGE
      setBlogPosts(updatedPosts);
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: "",
      }));
    }
  };

  return (
    <Layout>
    <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap justify-center px-5 py-5 gap-4">
          <button
            className={`submit-button ${sortBy === "latest" ? "active" : ""}`}
            onClick={() => setSortBy("latest")}
          >
            Latest
          </button>
          <button
            className={`submit-button ${ sortBy === "oldest" ? "active" : ""}`}
            onClick={() => setSortBy("oldest")}
          >
            Oldest
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
            <button
              className={`submit-button ${ selectedCategory === "General" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("General")}
            >
              General
            </button>
            <button
              className={`submit-button ${ selectedCategory === "Adult ADHD" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("Adult ADHD")}
            >
              Adult ADHD
            </button>
            <button
              className={`submit-button ${ selectedCategory === "Kids ADHD" ? "active" : ""
              }`}
              onClick={() => setSelectedCategory("Kids ADHD")}
            >
              Kids ADHD
            </button>
            <button
              className={`submit-button ${!selectedCategory ? "active" : ""}`}
              onClick={() => setSelectedCategory(null)}
            >
              All Post
            </button>
        </div>

          {filteredPosts.map((post) => (
            <div className="container mx-auto py-4 h-full shadow-lg hover:-translate-y-1 hover:shadow-gray-400" key={post.id}>
              {post.thumbnail && (
                <img
                  className="w-full rounded-md mb-3"
                  src={URL.createObjectURL(post.thumbnail)}
                  alt="thumbnail"
                />
              )}
              <h2>
                {post.title}
                {post.author === userName && (
                  <>
                    <MdDeleteOutline
                      onClick={() => removeBlog(post.id)}
                      className="removeButton"
                    >
                      Remove
                    </MdDeleteOutline>
                    {editablePostId === post.id ? (
                      <MdEdit onClick={() => handleSave(post.id)} className="edit-icon"/>
                    ) : (
                      <MdEdit onClick={() => handleEdit(post.id, post.blogText)} className="edit-icon"/>
                    )}
                  </>
                )}
              </h2>
              <div className="blogContent">
                {editablePostId === post.id ? (
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    onKeyDown={(e) => handleKeyPress(e, post.id)}
                  />
                ) : (
                  <h3>{post.blogText}</h3>
                )}
                <p>Author: {post.author} {post.author === userName && "(You)"}</p>
                <p>Posted on: {new Date(post.timestamp).toLocaleDateString()}</p>
                <textarea
                  value={comments[post.id] || ""}
                  onChange={(event) => handleCommentChange(post.id, event)}
                  placeholder="Leave a comment..."
                />
                <button className="mb-2 submit-button w-full mt-5"
                  onClick={() => handleCommentSubmit(post.id)}
                  disabled={!comments[post.id]}
                >
                  Send
                </button>
              </div>
              <div className="commentSection" data-postid={post.id}>
                <h1>Comments:</h1>
                {post.comments && post.comments.map((comment, index) => (
                  <div className="commentWrapper" key={index}>
                    <h2>{comment.userName === userName ? "You" : comment.userName}</h2>
                    <p>{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

      </div>
    </Layout>
  );
};

export default AllBlogs;
