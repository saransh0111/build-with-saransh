from django.db import models
from django.contrib.postgres.fields import JSONField  # Use if available, else fallback to TextField

class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    short_description = models.TextField()
    hero_image = models.ImageField(upload_to='projects/hero/', blank=True, null=True)
    hero_image_url = models.URLField(blank=True, null=True, help_text="Alternative to uploaded image")
    logo = models.ImageField(upload_to='projects/logos/', blank=True, null=True)
    logo_url = models.URLField(blank=True, null=True, help_text="Alternative to uploaded logo")
    industry = models.CharField(max_length=100, blank=True)
    video = models.FileField(upload_to='projects/videos/', blank=True, null=True)
    video_url = models.URLField(blank=True, null=True, help_text="Alternative to uploaded video")
    client = models.CharField(max_length=200, blank=True)
    date = models.CharField(max_length=50, blank=True)
    website_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    
    def get_hero_image_url(self):
        if self.hero_image:
            return self.hero_image.url
        return self.hero_image_url
    
    def get_logo_url(self):
        if self.logo:
            return self.logo.url
        return self.logo_url

class ProjectImage(models.Model):
    project = models.ForeignKey(Project, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='projects/images/')
    is_gif = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.project.title}"

class ProjectSection(models.Model):
    SECTION_TYPES = [
        ("heading", "Heading"),
        ("paragraph", "Paragraph"),
        ("image", "Image"),
        ("gallery", "Gallery"),
        ("video", "Video"),
        ("feature", "Feature"),
        ("quote", "Quote"),
        ("list", "List"),
        ("custom", "Custom/Other"),
    ]
    project = models.ForeignKey(Project, related_name="sections", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    type = models.CharField(max_length=20, choices=SECTION_TYPES)
    content = models.TextField(blank=True, null=True)  # For text, rich text, or JSON as string
    image = models.ImageField(upload_to="projects/sections/images/", blank=True, null=True)
    image_url = models.URLField(blank=True, null=True, help_text="Alternative to uploaded image")
    video = models.FileField(upload_to="projects/sections/videos/", blank=True, null=True)
    video_url = models.URLField(blank=True, null=True, help_text="Alternative to uploaded video")
    extra = models.JSONField(blank=True, null=True)  # For gallery images, feature lists, etc.

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.project.title} - {self.get_type_display()} #{self.order}"
