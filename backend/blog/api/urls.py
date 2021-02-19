from django.urls import path
from .views import CategoryListView, PostListView, PostDetailView, TagListView

urlpatterns = [
    path('post-list/', PostListView.as_view(), name='post-list'),
    path('category-list/', CategoryListView.as_view(), name='category-list'),
    path('tag-list/', TagListView.as_view(), name='tag-list'),
    path('post-details/<pk>/', PostDetailView.as_view(), name='post-details'),
]