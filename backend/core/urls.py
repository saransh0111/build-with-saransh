# core/urls.py
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers
from portfolio.views import ProjectViewSet
from blog.views import BlogPostViewSet
from inquiries.views import InquiryViewSet

router = routers.DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'blogposts', BlogPostViewSet)
router.register(r'inquiries', InquiryViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
