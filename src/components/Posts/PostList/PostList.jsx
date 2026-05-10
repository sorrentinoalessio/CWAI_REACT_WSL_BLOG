
const PostList = ({ posts, user }) => {
    return (
        <ul>
            {posts.length > 0 ?
                posts.map(post => (
                    <li key={post._id}>
                        <h4>Id</h4>
                        <h5>{post._id}</h5>
                        <h2>Titolo post</h2>
                        <h3>{post.title}</h3>
                        <h2>Testo post</h2>
                        <p>{post.description}</p>
                        <p>Creato il: {new Date(post.creationDate).toLocaleDateString('it-IT')}</p>
                        <div><h5>Tags: </h5>
                            {post.tag.map(t => (
                                <span key={t._id}>{t.tag}</span>
                            ))}
                        </div>
                        {user && <h5>Creato da {user}</h5>}
                    </li>
                )) : <p>Nessun post disponibile</p>}
        </ul>
    );
};
export default PostList;