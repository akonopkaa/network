function UserProfile(props) {

    const [user, setUser] = React.useState("")
    const [status, setStatus] = React.useState("enabled")

    function handleSubmit(event) {
        event.preventDefault()
        setStatus("submitting")
        if (!props.id) {
            return
        }
        fetch(`/api/put/user/${props.id}`, {
            method: "PUT",
            body: JSON.stringify({
                is_followed: !user.is_followed
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                fetch(`/api/get/user/${props.id}`)
                    .then(response => response.json())
                    .then(response => {
                        setUser(response)
                        setStatus("enabled")
                    })
            })
    }

    React.useEffect(() => {
        if (!props.id) {
            return
        }
        fetch(`/api/get/user/${props.id}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setUser(response)
            })
    }, [props.id])

    if (!user) {
        return <div></div>
    }

    return (
        <div>
            <div>user: {user.user}</div>
            <div>following: {user.following_count}</div>
            <div>followers: {user.followers_count}</div>
            {!user.is_me && (
                <form onSubmit={handleSubmit}>
                    <button
                        disabled={status === "submitting"}>
                        {user.is_followed ? "Unfollow" : "Follow"}
                    </button>
                </form>
            )}
        </div>
    )
}

function UserPosts(props) {

    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        if (!props.id) {
            return
        }
        fetch(`/api/get/posts/${props.id}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setPosts(response)
            })
    }, [props.id])

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