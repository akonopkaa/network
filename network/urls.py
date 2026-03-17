from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("api/create", views.create_post, name="create_post"),
    path("api/get/posts/all", views.get_all_posts, name="get_all_posts"),
    path("api/get/user/<int:id>", views.get_user_data, name="get_user_data"),
    path("api/get/posts/<int:id>", views.get_user_posts, name="get_user_posts"),
    path("api/get/posts/following", views.get_following_posts, name="get_following_posts"),
    path("api/put/user/<int:id>", views.follow_user, name="follow_user"),
    path("api/put/post/<int:id>", views.like_post, name="like_post")
]