function UserProfile(props) {

    const [user, setUser] = React.useState("")

    React.useEffect(() => {
        fetch(`/api/get/user/${props.id}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setUser(response)
            })
    }, [])

    if (!user) {
        return <div></div>;
    }

    return (
        <div>
            <div>user: {user.user}</div>
            <div>following: {user.following_count}</div>
            <div>followers: {user.followers_count}</div>
        </div>
    )

}

function UserPosts(props) {

    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        fetch(`/api/get/posts/${props.id}`, {
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
                    <div>user: {post.user}</div>
                    <div>content: {post.content}</div>
                    <div>time: {post.timestamp}</div>
                    <div>likes: {post.likes_count}</div>
                </div>

            ))}
        </div>
    )

}