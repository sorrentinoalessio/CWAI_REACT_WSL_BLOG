import { TabPanel, Tabs } from "../../Tabs/Tabs";
import PostList from "../PostList/PostList";
import { useSocketEmit } from "@/socket/useSocketEmit";
import { useEffect, useState } from "react";
import Loader from "../../Loader/Loader.component";
import styles from "./PostPage.module.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSocket } from "@/socket/SocketContext";

const STATUS = [
  { value: "draft", label: "Bozze" },
  { value: "public", label: "Pubblicati" },
  { value: "archived", label: "Archiviate" },
];

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuth();
  const { connected } = useSocket();
  const { listPosts } = useSocketEmit();

  useEffect(() => {
    if (!connected) return;

    let cancelled = false;

    const retrievePosts = async () => {
      setIsLoading(true);
      try {
        const data = await listPosts();
        if (!cancelled) setPosts(data ?? []);
      } catch (error) {
        console.error("Errore nel recupero dei post:", error);
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    retrievePosts();

    return () => {
      cancelled = true;
    };
  }, [connected]);

  const handlePostStatusChange = (postId, newStatus) => {
    setPosts((prev) =>
      prev.map((p) => (p._id === postId ? { ...p, status: newStatus } : p))
    );
  };

  return (
    <div className={styles.page}>
      <section className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>I tuoi post</h1>
          <button type="button" onClick={() => navigate("/posts/addEditPost")} className={styles.addButton}>
            Aggiungi Post
          </button>
        </div>

        <div className={styles.tabsWrap}>
          <Tabs>
            {STATUS.map((s) => (
              <TabPanel header={s.label} key={s.value}>
                {!isLoading ? (
                  <PostList
                    posts={posts.filter((p) => p.status === s.value)}
                    user={user}
                    onPostStatusChange={handlePostStatusChange}
                  />
                ) : (
                  <Loader />
                )}
              </TabPanel>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default PostPage;