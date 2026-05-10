import { TabPanel, Tabs } from "../../Tabs/Tabs";
import PostList from "../PostList/PostList";
import { getPost } from "../../services/post.service";
import { useEffect, useState } from "react";
import Loader from "../../Loader/Loader.component";

const STATUS = [
    { value: "draft",    label: "Bozze"      },
    { value: "public",   label: "Pubblicati"  },
    { value: "archived", label: "Archiviate"  },
];

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const user = localStorage.getItem("user");
    const [isloading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        const retrievePosts = async () => {
            setIsLoading(true);
            try {
                const data = await getPost(token);
                setPosts(data);
            } catch (error) {
                console.error('Errore nel recupero dei post:', error);
            }
            setIsLoading(false);
        };

        retrievePosts();
    }, []);

    return <>
        <button type="button" className="myButton">Aggiungi Post</button>
        <Tabs>
            {STATUS.map(s => (
                <TabPanel header={s.label} key={s.value}>
                    {!isloading ? 
                    <PostList
                        posts={posts.filter(p => p.status === s.value)}
                        user={user}
                    /> : <Loader />}
                </TabPanel>
            ))}
        </Tabs>
    </>;
};

export default PostPage;