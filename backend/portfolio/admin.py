from django.contrib import admin
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

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 1
    verbose_name = "Gallery Image"
    verbose_name_plural = "Gallery Images"


class ProjectSectionInline(admin.StackedInline):
    model = ProjectSection
    extra = 0
    show_change_link = True
    fields = ("order", "type", "title", "subtitle", "content", "theme", "cta_text", "cta_url", "image", "image_url", "video", "video_url", "extra")
    ordering = ("order",)

class SectionMetricInline(admin.TabularInline):
    model = SectionMetric
    extra = 0
    fields = ("order", "value", "label", "description")
    ordering = ("order",)


class SectionFeatureInline(admin.StackedInline):
    model = SectionFeature
    extra = 0
    fields = (
        "order",
        "title",
        "description",
        "icon_text",
        "icon_image",
        "style",
        "background_image",
        "background_image_url",
        "background_color",
        "text_color",
        "modal_title",
        "modal_description",
        "modal_image",
        "modal_video_url",
        "modal_content",
    )
    ordering = ("order",)

class SectionTileInline(admin.TabularInline):
    model = SectionTile
    extra = 0
    fields = ("order", "icon_text", "icon_image", "title", "body", "action_text", "action_url")
    ordering = ("order",)

class SectionSpecInline(admin.TabularInline):
    model = SectionSpec
    extra = 0
    fields = ("order", "label", "value")
    ordering = ("order",)

class SectionFAQInline(admin.StackedInline):
    model = SectionFAQ
    extra = 0
    fields = ("order", "question", "answer")
    ordering = ("order",)

class SectionMediaTabInline(admin.StackedInline):
    model = SectionMediaTab
    extra = 0
    fields = ("order", "title", "subtitle", "description", "image", "image_url", "video_url")
    ordering = ("order",)


class ProjectSectionAdmin(admin.ModelAdmin):
    list_display = ("project", "order", "type")
    list_filter = ("type", "project")
    ordering = ("project", "order")
    inlines = ()

    def get_inline_instances(self, request, obj=None):
        inline_instances = []
        # When adding, show both inlines so user can choose; when editing, conditionally show
        if obj is None:
            inline_instances.append(SectionMetricInline(self.model, self.admin_site))
            inline_instances.append(SectionFeatureInline(self.model, self.admin_site))
            inline_instances.append(SectionTileInline(self.model, self.admin_site))
            inline_instances.append(SectionSpecInline(self.model, self.admin_site))
            inline_instances.append(SectionFAQInline(self.model, self.admin_site))
            inline_instances.append(SectionMediaTabInline(self.model, self.admin_site))
            return inline_instances
        if obj and obj.type == 'metrics':
            inline_instances.append(SectionMetricInline(self.model, self.admin_site))
        if obj and obj.type == 'features':
            inline_instances.append(SectionFeatureInline(self.model, self.admin_site))
        if obj and obj.type == 'media_tabs':
            inline_instances.append(SectionMediaTabInline(self.model, self.admin_site))
        if obj and obj.type in ('heading', 'paragraph', 'gallery', 'custom'):
            inline_instances.append(SectionTileInline(self.model, self.admin_site))
        if obj and obj.type == 'list':
            inline_instances.append(SectionFAQInline(self.model, self.admin_site))
        if obj and obj.type in ('paragraph', 'custom'):
            inline_instances.append(SectionSpecInline(self.model, self.admin_site))
        return inline_instances

    def get_fields(self, request, obj=None):
        base = ["project", "order", "type"]
        # Default fields for text-based sections
        if obj is None:
            # When creating, show everything sensible
            return base + ["content", "image", "image_url", "video", "video_url", "extra"]
        if obj.type in ("heading", "paragraph", "quote"):
            return base + ["content", "extra"]
        if obj.type == "image":
            return base + ["image", "image_url", "extra"]
        if obj.type == "video":
            return base + ["video", "video_url", "extra"]
        if obj.type == "gallery":
            return base + ["extra"]  # expect extra = { images: [..] }
        if obj.type in ("features", "metrics"):
            return base + ["content"]  # manage items via inlines
        if obj.type == "list":
            return base + ["extra"]  # expect extra = { items: [..] }
        return base + ["content", "extra"]

class ProjectAdmin(admin.ModelAdmin):
    inlines = [ProjectImageInline, ProjectSectionInline]
    list_display = ("title", "slug", "client", "industry", "created_at")
    search_fields = ("title", "slug", "client", "industry")
    prepopulated_fields = {"slug": ("title",)}
    fieldsets = (
        (None, {"fields": ("title", "slug", "short_description")}),
        ("Branding & Meta", {"fields": ("logo", "logo_url", "industry", "client", "date", "website_url")}),
        ("Hero Media", {"fields": ("hero_image", "hero_image_url", "video", "video_url")}),
    )

admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectImage)
admin.site.register(ProjectSection, ProjectSectionAdmin)
