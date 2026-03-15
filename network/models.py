from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    following = models.ManyToManyField("self", symmetrical = False, related_name = "followers", blank = True)


    def get_following(self):
        users = []
        for user in self.following.all():
            users.append(user.username)
        return users


    def get_followers(self):
        users = []
        for user in self.followers.all():
            users.append(user.username)
        return users
    

    def serialize(self):
        return {
            "id": self.id,
            "user": self.username,
            "following_count": self.following.count(),
            "followers_count": self.followers.count(),
            "following": self.get_following(),
            "followers": self.get_followers()
        }


class Post(models.Model):
    user = models.ForeignKey("User", on_delete = models.CASCADE, related_name = "posts")
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add = True)
    likes = models.ManyToManyField("User", related_name = "post_likes", blank = True)


    def get_likers(self):
        users = []
        for user in self.likes.all():
            users.append(user.username)
        return users


    def serialize(self):
        return {
            "id": self.id,
            "user": self.user.username,
            "content": self.content,
            "timestamp": self.timestamp.strftime("%b %d %Y, %I:%M %p"),
            "likes_count": self.likes.count(),
            "likers": self.get_likers()
        }