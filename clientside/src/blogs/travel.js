import React, { useEffect, useState } from "react";
import "./blog.css"

const TravelBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch("http://localhost:9090/blogs/travel")
            .then((response) => response.json())
            .then((data) => setBlogs(data))
            .catch((error) => console.error("Error fetching blogs:", error));
    }, []);

    return (
        <div className="blog-container">
            <h2 className="blog-title">Latest Blogs</h2>
            {blogs.map((blog) => (
                <div key={blog.id} className="blog-card">
                    <h3>{blog.title}</h3>
                    <p>{blog.content}</p>
                    <p className="blog-author">Author: {blog.author}</p>
                    <p className="blog-date">Published on: {new Date(blog.created_at).toLocaleDateString()}</p>
                    <button className="blog-btn">Read More</button>
                </div>
            ))}
        </div>
    );
};

export default TravelBlogs;
