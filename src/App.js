import { useState, useEffect } from "react";
import { Pagination } from "./Pagination";

const URL = "https://jsonplaceholder.typicode.com/posts";

function App() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch(URL)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("something went wrong while requesting posts");
      })
      .then((posts) => setPosts(posts))
      .catch((error) => console.error(error));
  }, []);
  return (
    <div className="App">
      <Pagination pageDataLimit={5} posts={posts} />
    </div>
  );
}

export default App;
