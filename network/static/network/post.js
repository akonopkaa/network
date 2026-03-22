function Post(props) {
    const [likes, setLikes] = React.useState(props.post.likes_count)
    const [isLiked, setIsLiked] = React.useState(props.post.is_liked_by_me)

    function handleLike() {
        fetch(`/api/put/like/post/${props.post.id}`, {
            method: "PUT"
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (isLiked) {
                    setLikes(likes => likes - 1)
                } else {
                    setLikes(likes => likes + 1)
                }
                setIsLiked(!isLiked)
            })
    }

    function handleEdit() {
        props.onEditClick(props.post);
    }

    return (
        <div className="card mb-3">
            <div className="card-header">
                <a href="#" onClick={(event) => {
                    event.preventDefault();
                    props.onUserClick(props.post.user_id)
                }}>
                    <strong>
                        {props.post.user}
                    </strong>
                </a>
            </div>
            <div className="card-body">
                {props.post.content}
            </div>
            <div className="card-footer text-muted d-flex justify-content-between">
                <div>
                    {props.post.timestamp}
                </div>
                <div>
                    {props.post.is_mine && (
                        <button
                            className="btn btn-sm btn-primary mx-2"
                            onClick={handleEdit}>
                            Edit
                        </button>
                    )}
                    <button
                        className="btn btn-sm btn-primary mx-2"
                        onClick={handleLike}
                        disabled={props.post.is_mine}>
                        {isLiked ? "👎" : "👍"}
                        {likes}
                    </button>
                </div>
            </div>
        </div>
    )
}