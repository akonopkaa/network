function CreatePost(props) {

    const [post, setPost] = React.useState("")
    const [status, setStatus] = React.useState("typing")

    function handleTextAreaChange(event) {
        setPost(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        setStatus("submitting")
        fetch("/api/create", {
            method: "POST",
            body: JSON.stringify({
                content: post
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setPost("");
                setStatus("typing");
                props.onPostCreated()
            })
    }

    return (
        <div>
            <form
                onSubmit={handleSubmit}>
                <textarea
                    value={post}
                    onChange={handleTextAreaChange}
                    disabled={status === "submitting"}>
                </textarea>
                <button
                    disabled={post.length === 0 || status === "submitting"}>
                    Post
                </button>
            </form>
        </div>
    )
}

function GetAllPosts(props) {

    const [posts, setPosts] = React.useState([])

    React.useEffect(() => {
        fetch("/api/get/posts/all", {
            method: "GET"
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setPosts(response)
            })
    }, [props.trigger])

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