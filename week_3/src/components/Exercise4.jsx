import React, { useEffect, useState } from 'react'
import Direction from './Direction'

function Exercise4() {
  const [posts, setPosts] = React.useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
          setError("Error fetching posts");
          return;
        }
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(search.toLowerCase())
    );
    if (filteredPosts.length === 0) {
      setError("No posts found");
    } else {
      setError(null);
      setPosts(filteredPosts);
    }
  };
  
  return (
    <>
      <Direction prevPage={"/ex3"} nextPage={"/ex5"} />
      <h2>Exercise 4</h2>
      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button type='submit'>
          Search
        </button>
      </form>
      <h2>Post List</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {!loading && !error && (
        <ul>
          {posts.map(post => (
            <li key={post.id} style={{ marginBottom: 12 }}>
              <h3>{post.title}</h3>
            </li>
          ))}
        </ul>
      )}
    </>
  )
};

export default Exercise4;