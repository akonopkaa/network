function GetPosts(props) {

    const page = props.page === "home" ? "all" : "following"
    const [posts, setPosts] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(1)

    React.useEffect(() => {
        fetch(`/api/get/posts/${page}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setPosts(response)
                setCurrentPage(1)
            })
    }, [props.page])

    const indexOfLastPost = currentPage * 10
    const indexOfFirstPost = indexOfLastPost - 10
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    if (posts.length === 0) {
        return (
            <div
                className="container">
                <div
                    className="alert alert-info text-center mt-3">
                    No posts yet!
                </div>
            </div>
        )
    }

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