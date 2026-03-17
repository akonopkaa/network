function Post(props) {
    const [likes, setLikes] = React.useState(props.post.likes_count)
    const [isLiked, setIsLiked] = React.useState(props.post.is_liked_by_me);

    function handleLike() {
        fetch(`/api/put/post/${props.post.id}`, {
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

    return (
        <div>
            <div>
                <a href="#" onClick={(event) => {
                    event.preventDefault();
                    props.onUserClick(props.post.user_id)
                }}>
                    user: {props.post.user}
                </a>
            </div>
            <div>content: {props.post.content}</div>
            <div>time: {props.post.timestamp}</div>
            <div>
                <button onClick={handleLike}>
                    {isLiked ? "❤️" : "🤍"}
                    {likes}
                </button>
            </div>
        </div>
    )
}