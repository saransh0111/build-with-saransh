from django.db import models
from ckeditor.fields import RichTextField
from django.utils.text import slugify

# Create your models here.

class BlogPost(models.Model):
    BLOG_TAG_CHOICES = [
        ("tech", "Tech"),
        ("design", "Design"),
        ("process", "Process"),
        ("other", "Other"),
    ]
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    excerpt = models.TextField(blank=True)
    content = RichTextField()
    cover_image = models.ImageField(upload_to='blogs/covers/', blank=True, null=True)
    tags = models.CharField(max_length=100, blank=True, help_text="Comma-separated tags")
    estimated_read_time = models.CharField(max_length=20, blank=True, help_text="e.g. '5 min read'")
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
