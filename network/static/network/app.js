function App() {

    const [page, setPage] = React.useState("index")
    const [selectedUser, setSelectedUser] = React.useState(null)
    const [refreshTrigger, setRefreshTrigger] = React.useState(0);

    window.setHomePage = setHomePage;
    window.setFollowingPage = setFollowingPage;
    window.onUserClick = onUserClick;

    function setHomePage() {
        setSelectedUser(null)
        setPage("index")
    }

    function setFollowingPage() {
        setSelectedUser(null)
        setPage("following")
    }

    function onUserClick(id) {
        setSelectedUser(id)
        setPage("profile")
    }

    function handlePostCreated() {
        setRefreshTrigger((oldValue) => {
            return oldValue + 1
        });
    }

    if (page === "index") {
        return (
            <div>
                <CreatePost
                    onPostCreated={handlePostCreated}
                />
                <GetAllPosts
                    onUserClick={onUserClick}
                    trigger={refreshTrigger}
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
                    onUserClick={onUserClick}
                />
            </div>
        );
    }

    if (page === "following") {
        return (
            <div>
                <GetFollowingPosts
                    onUserClick={onUserClick}
                />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector("#app"));