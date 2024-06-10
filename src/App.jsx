import { useState } from "react";
import { useEffect } from "react";
import LoginForm from "./componenets/LoginForm";
import SignUpForm from "./componenets/SignUpForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserContext } from "./componenets/UserContext";
import { auth } from "./firebase";
import blogData from "./Data.json";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import AllBlogs from "./pages/AllBlogs";

function App() {
  const [blogPosts, setBlogPosts] = useState(
    JSON.parse(localStorage.getItem("blogPosts")) || blogData
  );
  const [user, setUser] = useState(null);
  const [showSignUp, setShowSignUp] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(blogPosts));
  }, [blogPosts]);

  const addComment = (postId, comment) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, comments: [...(post.comments || []), comment] } : post
      )
    );
  };

  const addBlog = async (newBlog) => {
    const docRef = await firestore.collection("blogPosts").add(newBlog);
    const blogWithId = { id: docRef.id, ...newBlog };
    setBlogPosts((prevPosts) => [...prevPosts, blogWithId]);
  };

  const editBlog = (postId, newText) => {
    setBlogPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, blogText: newText } : post
      )
    );
  };

  const removeBlog = (id) => {
    const updatedBlogs = blogPosts.filter((blog) => blog.id !== id);
    setBlogPosts(updatedBlogs);
  };

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <Router>
      <UserContext.Provider value={{ user }}>
        {user ? (
          <Routes>
          <Route
              path="/"
              element={
                <Home
                  blogPosts={blogPosts}
                  removeBlog={removeBlog}
                  addComment={addComment}
                  editBlog={editBlog} // Pass editBlog function as prop
                />
              }
            />
            <Route
              path="/allblogs"
              element={
                <AllBlogs
                  blogPosts={blogPosts}
                  removeBlog={removeBlog}
                  addComment={addComment}
                  editBlog={editBlog} // Pass editBlog function as prop
                />
              }
            />
            <Route
              path="/createpost"
              element={
                <CreatePost
                  onAddBlog={(newBlog) => {
                    setBlogPosts([...blogPosts, { id: blogPosts.length + 1, ...newBlog }]);
                  }}
                />
              }
            />
            <Route
              path="/createpost"
              element={<CreatePost onAddBlog={addBlog} />}
            />
          </Routes>
        ) : (
          <div>
            <LoginForm toggleSignUp={toggleSignUp} />
            {showSignUp && <SignUpForm />}
          </div>
        )}
      </UserContext.Provider>
    </Router>
  );
}

export default App;
