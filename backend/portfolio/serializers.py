# portfolio/serializers.py
from rest_framework import serializers
from .models import Project, ProjectImage, ProjectSection

class ProjectImageSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = ProjectImage
        fields = ['id', 'image', 'is_gif']
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class ProjectSectionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    video = serializers.SerializerMethodField()
    
    class Meta:
        model = ProjectSection
        fields = ['id', 'order', 'type', 'content', 'image', 'video', 'extra']
    
    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        elif obj.image_url:
            return obj.image_url
        return None
    
    def get_video(self, obj):
        if obj.video:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.video.url)
            return obj.video.url
        elif obj.video_url:
            return obj.video_url
        return None

class ProjectSerializer(serializers.ModelSerializer):
    images = ProjectImageSerializer(many=True, read_only=True)
    sections = ProjectSectionSerializer(many=True, read_only=True)
    hero_image = serializers.SerializerMethodField()
    logo = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = '__all__'
    
    def get_hero_image(self, obj):
        if obj.hero_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.hero_image.url)
            return obj.hero_image.url
        elif obj.hero_image_url:
            return obj.hero_image_url
        # Fallback to Apple-style placeholder
        return "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020.jpg.og.jpg"
    
    def get_logo(self, obj):
        if obj.logo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.logo.url)
            return obj.logo.url
        elif obj.logo_url:
            return obj.logo_url
        # Fallback to Apple logo
        return "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png"
