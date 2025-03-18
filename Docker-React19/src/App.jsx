import { useEffect,useState } from 'react'
import './App.css'

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/wp-json/wp/v2/posts?_embed')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((error) => console.error('Fetch error:', error));
  }, []);

  const postsJsx = posts.map((post) => (
    <li key={post.id} dangerouslySetInnerHTML={{ __html: post.content.rendered }}></li>
  ));

  return <ul>{postsJsx}</ul>;
}

export default App;