import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostDetails from "./components/PostDetails";
import EditPost from "./components/EditPost";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import TravelBlogs from "./blogs/travel";
import CookingBlogs from "./blogs/cooking";
import SportsBlogs from "./blogs/sports";
import SocialBlogs from "./blogs/social";
import Blog from "./images/blog";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/postslist" element={<PostList/>}/>
         <Route path="/create" element={<PostForm />} />
        <Route path="/posts/:id" element={<PostDetails />} />
        <Route path="/posts/:id/edit" element={<EditPost />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/travelblogs" element={<TravelBlogs/>}/>
        <Route path="/cookingblogs" element={<CookingBlogs/>}/>
        <Route path="/sportsblogs" element={<SportsBlogs/>}/>
        <Route path="/socialblogs" element={<SocialBlogs/>}/>
        <Route path="/blog" element={<Blog></Blog>}/>
      </Routes>
    </Router>
  );
}

export default App;
