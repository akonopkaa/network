function App() {

    const [page, setPage] = React.useState("home")
    const [selectedUser, setSelectedUser] = React.useState(null)
    const [editingPost, setEditingPost] = React.useState(null)

    window.setHomePage = setHomePage;
    window.setFollowingPage = setFollowingPage;
    window.onUserClick = onUserClick;

    function setHomePage() {
        setSelectedUser(null)
        setPage("home")
    }

    function setFollowingPage() {
        setSelectedUser(null)
        setPage("following")
    }

    function onUserClick(id) {
        setSelectedUser(id)
        setPage("profile")
    }

    function handleCreate() {
        setSelectedUser(null)
        setPage("create")
    }

    function handleEdit(post) {
        setEditingPost(post)
        setPage("edit")
    }

    if (page === "home") {
        return (
            <div>
                <div
                    className="card-body mr-3 d-flex justify-content-center">
                    <button
                        className="btn btn-primary btn-lg"
                        onClick={handleCreate}>
                        Create Post!
                    </button>
                </div>
                <GetPosts
                    onUserClick={onUserClick}
                    onEditClick={handleEdit}
                    page={page}
                />
            </div>
        );
    }

    if (page === "profile") {
        return (
            <div>
                <UserProfile
                    id={selectedUser}
                />
                <UserPosts
                    id={selectedUser}
                    onEditClick={handleEdit}
                    onUserClick={onUserClick}
                />
            </div>
        );
    }

    if (page === "following") {
        return (
            <div>
                <GetPosts
                    onUserClick={onUserClick}
                    onEditClick={handleEdit}
                    page={page}
                />
            </div>
        )
    }

    if (page === "create") {
        return (
            <div>
                <CreateOrEditPost
                    setHomePage={setHomePage}
                />
            </div>
        )
    }

    if (page === "edit") {
        return <CreateOrEditPost
            post={editingPost}
            setHomePage={
                () => {
                    setPage("home")
                    setEditingPost(null)
                }
            }
        />
    }
}

ReactDOM.render(<App />, document.querySelector("#app"))