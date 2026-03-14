function Create_post() {

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
            .then(response => console.log(response))
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

ReactDOM.render(<Create_post />, document.querySelector("#create_post"))