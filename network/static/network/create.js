function CreateOrEditPost(props) {

    const [post, setPost] = React.useState(props.post ? props.post.content : "")
    const [status, setStatus] = React.useState("typing")

    const url = props.post ? `api/put/edit/post/${props.post.id}` : "/api/create"
    const method = props.post ? "PUT" : "POST"

    function handleTextAreaChange(event) {
        setPost(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        setStatus("submitting")
        fetch(url, {
            method: method,
            body: JSON.stringify({
                content: post
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setPost("");
                props.setHomePage()
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