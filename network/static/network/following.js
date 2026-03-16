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

                <div>
                    <div> <a onClick={() => props.onUserClick(post.user_id)}> user: {post.user} </a> </div>
                    <div>content: {post.content}</div>
                    <div>time: {post.timestamp}</div>
                    <div>likes: {post.likes_count}</div>
                </div>

            ))}
        </div>
    )

}