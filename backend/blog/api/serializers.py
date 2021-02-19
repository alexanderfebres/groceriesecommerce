from rest_framework import serializers

from ..models import Category, Post, Tag

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', )

class TagSerialzier(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('id', 'name', )

class PostSerializer(serializers.ModelSerializer):
    tags = TagSerialzier(many=True, read_only=True)
    category = serializers.SlugRelatedField(read_only=True, slug_field='name')
    user = serializers.SlugRelatedField(read_only=True, slug_field='first_name')
    
    class Meta:
        model = Post
        fields = ('id', 'user', 'title', 'overview', 'body', 'category', 'tags', 'thumbnail', 'timestamp' )