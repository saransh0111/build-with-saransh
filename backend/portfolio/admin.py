from django.contrib import admin
from .models import Project, ProjectImage, ProjectSection

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1

class ProjectSectionInline(admin.StackedInline):
    model = ProjectSection
    extra = 1
    fields = ("order", "type", "content", "image", "video", "extra")
    ordering = ("order",)

class ProjectAdmin(admin.ModelAdmin):
    inlines = [ProjectImageInline, ProjectSectionInline]

admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectImage)
admin.site.register(ProjectSection)
