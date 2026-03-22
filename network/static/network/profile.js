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
        <div
            className="container text-center my-3">
            <h2
                className="mb-3">
                {user.user}
            </h2>
            <div
                className="d-flex justify-content-center mb-3">
                <div
                    className="mx-3">
                    <span
                        className="text-muted">
                        Following:
                    </span>
                    {user.following_count}
                </div>
                <div
                    className="mx-3">
                    <span
                        className="text-muted">
                        Followers:
                    </span>
                    {user.followers_count}
                </div>
            </div>
            {!user.is_me && (
                <form onSubmit={handleSubmit}>
                    <button
                        className="btn btn-primary btn-lg"
                        disabled={status === "submitting"}>
                        {user.is_followed ? "Unfollow" : "Follow"}
                    </button>
                </form>
            )}
        </div >
    )
}

function UserPosts(props) {

    const [posts, setPosts] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(1)

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
                setCurrentPage(1)
            })
    }, [props.id])

    const indexOfLastPost = currentPage * 10
    const indexOfFirstPost = indexOfLastPost - 10
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    return (
        <div
            className="container">
            {currentPosts.map(post => (
                <Post
                    post={post}
                    onUserClick={props.onUserClick}
                    onEditClick={props.onEditClick}
                />
            ))}
            {posts.length > 10 && (
                <div
                    className="card-body mb-3 d-flex justify-content-center align-items-center">
                    <button
                        className="btn btn-primary btn-sm mx-2"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}>
                        Previous
                    </button>
                    <span>Page {currentPage}</span>
                    <button
                        className="btn btn-primary btn-sm mx-2"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={indexOfLastPost >= posts.length}>
                        Next
                    </button>
                </div>
            )}
        </div>
    )
}