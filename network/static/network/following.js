function GetFollowingPosts(props) {

    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        fetch("api/get/posts/following", {
            method: "GET"
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setPosts(response)
            })
    }, [])

    return (
        <div>
            {posts.map(post => (
                <Post
                    post={post}
                    onUserClick={props.onUserClick}
                />
            ))}
        </div>
    )
}