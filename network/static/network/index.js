function CreatePost(props) {

    const [post, setPost] = React.useState("")
    const [status, setStatus] = React.useState("typing")

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

    function handleTextAreaChange(event) {

        setPost(event.target.value)

    }

    return (

        <div>
            <form onSubmit={handleSubmit}>
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