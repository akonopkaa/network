function GetPosts(props) {

    const page = props.page === "home" ? "all" : "following"
    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        fetch(`/api/get/posts/${page}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setPosts(response)
            })
    }, [props.page])

    return (
        <div>
            {posts.map(post => (
                <Post
                    post={post}
                    onUserClick={props.onUserClick}
                    onEditClick={props.onEditClick}
                />
            ))}
        </div>
    )
}