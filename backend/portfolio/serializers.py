# portfolio/serializers.py
from rest_framework import serializers
from .models import (
    Project,
    ProjectImage,
    ProjectSection,
    SectionMetric,
    SectionFeature,
    SectionTile,
    SectionSpec,
    SectionFAQ,
    SectionMediaTab,
)

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

class SectionMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = SectionMetric
        fields = ["id", "order", "value", "label", "description"]


class SectionFeatureSerializer(serializers.ModelSerializer):
    icon_image = serializers.SerializerMethodField()
    modal_image = serializers.SerializerMethodField()
    background_image = serializers.SerializerMethodField()

    class Meta:
        model = SectionFeature
        fields = [
            "id",
            "order",
            "title",
            "description",
            "icon_text",
            "icon_image",
            "style",
            "background_image",
            "background_color",
            "text_color",
            "modal_title",
            "modal_description",
            "modal_image",
            "modal_video_url",
            "modal_content",
        ]

    def get_icon_image(self, obj):
        if obj.icon_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.icon_image.url)
            return obj.icon_image.url
        return None

    def get_modal_image(self, obj):
        if obj.modal_image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.modal_image.url)
            return obj.modal_image.url
        return None

    def get_background_image(self, obj):
        image_field = obj.background_image
        if image_field:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(image_field.url)
            return image_field.url
        if obj.background_image_url:
            return obj.background_image_url
        return None


class SectionMediaTabSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = SectionMediaTab
        fields = [
            'id', 'order', 'title', 'subtitle', 'description', 'image', 'video_url'
        ]

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url

class ProjectSectionSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    video = serializers.SerializerMethodField()
    metrics = SectionMetricSerializer(many=True, read_only=True)
    features = SectionFeatureSerializer(many=True, read_only=True)
    media_tabs = SectionMediaTabSerializer(many=True, read_only=True)
    tiles = serializers.SerializerMethodField()
    specs = serializers.SerializerMethodField()
    faqs = serializers.SerializerMethodField()
    
    class Meta:
        model = ProjectSection
        fields = [
            'id', 'order', 'type', 'title', 'subtitle', 'content', 'theme',
            'cta_text', 'cta_url', 'image', 'video', 'extra',
            'metrics', 'features', 'media_tabs', 'tiles', 'specs', 'faqs'
        ]
    
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

    def get_tiles(self, obj):
        tiles = obj.tiles.all()
        return [
            {
                'id': t.id,
                'order': t.order,
                'icon_text': t.icon_text,
                'icon_image': self._abs_url(t.icon_image.url) if t.icon_image else None,
                'title': t.title,
                'body': t.body,
                'action_text': t.action_text,
                'action_url': t.action_url,
            }
            for t in tiles
        ]

    def get_specs(self, obj):
        return [ { 'id': s.id, 'order': s.order, 'label': s.label, 'value': s.value } for s in obj.specs.all() ]

    def get_faqs(self, obj):
        return [ { 'id': f.id, 'order': f.order, 'question': f.question, 'answer': f.answer } for f in obj.faqs.all() ]

    def _abs_url(self, path):
        request = self.context.get('request')
        if request and path:
            return request.build_absolute_uri(path)
        return path

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
