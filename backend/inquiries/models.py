from django.db import models

# Create your models here.

class Inquiry(models.Model):
    INQUIRY_TYPE_CHOICES = [
        ("app_development", "App Development"),
        ("mvp", "MVP"),
        ("uiux", "UI/UX"),
        ("other", "Other"),
    ]
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    type = models.CharField(max_length=30, choices=INQUIRY_TYPE_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.get_type_display()})"
