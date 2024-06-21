import CreatePost from "./components/CreatePost";
import Posts from "./components/Posts";
import { SocialMediaProvider } from "./store/context";

function App() {
  return (
    <SocialMediaProvider>
      <CreatePost />
      <Posts />
    </SocialMediaProvider>
  );
}

export default App;
