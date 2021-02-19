from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework import permissions

from ..models import Category, Post, Tag
from .serializers import PostSerializer, CategorySerializer, TagSerialzier

class PostDetailView(generics.RetrieveAPIView):
    '''Provide detailed data for a single post'''

    permission_classes = [ permissions.AllowAny ]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CategoryListView(generics.ListAPIView):
    '''Provide full list of post categories'''
    
    permission_classes = [ permissions.AllowAny ]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class TagListView(generics.ListAPIView):
    '''Provide full list of post tags'''
    
    permission_classes = [ permissions.AllowAny ]
    queryset = Tag.objects.all()
    serializer_class = TagSerialzier

class PostListView(APIView):
    '''
    Provide Post list. Full or filtered list depending on the filter criteria. 
    Can be filtered by title, tags or category
    '''
    def get(self, request):
        # Get search params
        filter_criteria = request.GET.get('filterCriteria', None)
        search_value = request.GET.get('value', None)

        # Full post list --Default--
        posts = Post.objects.all()
        posts = PostSerializer(posts, many=True).data
        data = { 'posts': posts }
        
        # Category or Tag key sent
        if filter_criteria is not None:
            # If filter criteria lenght greater than 3, category name was sent so it'll filter by it
            if len(filter_criteria) > 3:
                posts = Post.objects.filter(category__name=filter_criteria)
                posts = PostSerializer(posts, many=True).data
                data = { 'posts': posts }
                
            # If filter criteria lenght lesser than 3, tag keys were sent so it'll filter by it
            else:
                posts = Post.objects.filter(tags__in=[filter_criteria])
                posts = PostSerializer(posts, many=True).data
                data = { 'posts': posts }
        
        # Search param sent
        if search_value is not None:
            try:
                # search value is a number, product category key were sent so we dont need to provide any posts
                int(search_value)
                data = {'posts': [] }
            except:
                # check if keyword is contained within post title
                posts = Post.objects.filter(title__icontains=search_value)
                posts = PostSerializer(posts, many=True).data
                data = { 'posts' : posts }

        return Response(data, status=status.HTTP_200_OK)
