# network #

This project is a social network web application that allows users to create posts, follow other users, edit their own content, and like or unlike posts. It is built with Django on the backend and uses JavaScript, HTML, and CSS on the frontend to provide dynamic interactions without requiring full page reloads.

## Requirements: ##

### Backend: ###
- Python 3.14.0
- Django

### Frontend: ###
- JavaScript
- HTML
- CSS
- Bootstrap

## Functionality: ##

### Authentication: ###
Users can register an account, log in, and log out. Only authenticated users can create posts, follow other users, access the following feed, edit their own posts, and like or unlike posts.

### New Post: ###
Signed-in users can write a new text-based post by filling in a text area and submitting it. Once created, the post appears in the main feed.

### All Posts: ###
The "All Posts" page displays posts from all users, ordered from the most recent to the oldest. Each post includes the author's username, the post content, the date and time of publication, and the current number of likes.

### Profile Page: ###
Clicking on a username opens that user's profile page. This page shows the number of followers and following users, displays all posts created by that user in reverse chronological order, and allows other authenticated users to follow or unfollow that profile.

### Following: ###
The "Following" page displays posts only from users followed by the currently logged-in user. This page is available only to authenticated users and works the same way as the main feed.

### Pagination: ###
Posts are paginated, with 10 posts displayed per page. If more posts are available, users can navigate through them using "Next" and "Previous" buttons.

### Edit Post: ###
Users can edit only their own posts. Clicking the "Edit" option replaces the post content with a text area, allowing the user to update the post and save the changes asynchronously without reloading the entire page.

### Like and Unlike: ###
Users can like or unlike posts directly from the interface. The like count is updated asynchronously, so changes are visible immediately without a full page refresh.

## How to run: ##

1. Install dependencies: `pip install django`
4. Create migrations: `python manage.py makemigrations`
5. Apply migrations: `python manage.py migrate`
6. Run server: `python manage.py runserver`
7. Open the local address shown in the terminal in your browser.
