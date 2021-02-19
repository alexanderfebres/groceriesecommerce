from django.db import models
from authentication.models import CustomUser
from djrichtextfield.models import RichTextField


class Category(models.Model):
    name = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    overview = models.CharField(max_length=300)
    body = RichTextField() 
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag)
    thumbnail = models.ImageField()
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        order_with_respect_to = 'timestamp'

    def __str__(self):
        return self.title