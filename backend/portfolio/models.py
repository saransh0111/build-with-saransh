from django.db import models
from django.contrib.postgres.fields import JSONField  # Use if available, else fallback to TextField

class Project(models.Model):
    title = models.CharField(max_length=200, help_text="Project title. Example: ‘WOFA – Work From Anywhere’.")
    slug = models.SlugField(unique=True, help_text="Used in URL. Auto-filled from title. Example: ‘wofa’.")
    short_description = models.TextField(help_text="1–2 lines shown under the title. Keep it concise.")
    hero_image = models.ImageField(upload_to='projects/hero/', blank=True, null=True, help_text="Upload a large hero image (preferred). Use this OR Hero Image URL.")
    hero_image_url = models.URLField(blank=True, null=True, help_text="OR paste an absolute image URL, e.g. https://... (takes priority if provided)")
    logo = models.ImageField(upload_to='projects/logos/', blank=True, null=True, help_text="Upload a small logo/icon for the project (shown above the title).")
    logo_url = models.URLField(blank=True, null=True, help_text="OR paste a logo URL. If both set, uploaded logo is used.")
    industry = models.CharField(max_length=100, blank=True, help_text="Comma-separated or short label. Example: ‘iOS, Product Design’.")
    video = models.FileField(upload_to='projects/videos/', blank=True, null=True, help_text="Optional hero video. Use this OR Video URL.")
    video_url = models.URLField(blank=True, null=True, help_text="OR paste a video URL.")
    client = models.CharField(max_length=200, blank=True, help_text="Client or brand. Example: ‘Hasheky Inc.’")
    date = models.CharField(max_length=50, blank=True, help_text="Friendly date or year. Example: ‘Aug 2025’ or ‘2024 – Present’.")
    website_url = models.URLField(blank=True, null=True, help_text="External website or app store URL.")
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
        ("features", "Features Grid"),
        ("metrics", "Metrics"),
        ("media_tabs", "Media Tabs"),
        ("quote", "Quote"),
        ("list", "List"),
        ("custom", "Custom/Other"),
    ]
    project = models.ForeignKey(Project, related_name="sections", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0, help_text="Display order. Lower numbers appear first.")
    type = models.CharField(max_length=20, choices=SECTION_TYPES, help_text="Choose the kind of section you want to add (like Notion blocks).")
    title = models.CharField(max_length=200, blank=True, help_text="Optional large heading for this section.")
    subtitle = models.CharField(max_length=300, blank=True, help_text="Optional supporting subheading.")
    content = models.TextField(blank=True, null=True, help_text="Main body text (if any).")
    theme = models.CharField(
        max_length=20,
        blank=True,
        choices=[("light", "Light"), ("dark", "Dark"), ("accent", "Accent")],
        help_text="Visual theme. Defaults to page theme."
    )
    cta_text = models.CharField(max_length=100, blank=True, help_text="Optional button text.")
    cta_url = models.URLField(blank=True, null=True, help_text="Optional button link.")
    image = models.ImageField(upload_to="projects/sections/images/", blank=True, null=True, help_text="Upload an image (optional). Use this OR Image URL.")
    image_url = models.URLField(blank=True, null=True, help_text="OR paste an absolute image URL, e.g. https://... (takes priority if provided)")
    video = models.FileField(upload_to="projects/sections/videos/", blank=True, null=True, help_text="Upload a video (mp4). Use this OR Video URL.")
    video_url = models.URLField(blank=True, null=True, help_text="OR paste a video URL (mp4/stream).")
    extra = models.JSONField(blank=True, null=True, help_text="Advanced options as JSON. Examples: for list: {\"items\":[\"One\",\"Two\"]} • for gallery: {\"images\":[\"https://...\",\"/media/...\"]}")  # For gallery images, feature lists, etc.

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.project.title} - {self.get_type_display()} #{self.order}"


class SectionMetric(models.Model):
    section = models.ForeignKey(ProjectSection, related_name="metrics", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    value = models.CharField(max_length=50, help_text="Value e.g. ‘18 hrs’, ‘23x’, ‘4.7x’.")
    label = models.CharField(max_length=200, help_text="Short label e.g. ‘battery life’, ‘faster than M1’.")
    description = models.CharField(max_length=300, blank=True, help_text="Optional context shown below label.")

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"Metric: {self.value} — {self.label}"


class SectionFeature(models.Model):
    section = models.ForeignKey(ProjectSection, related_name="features", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    title = models.CharField(max_length=150, help_text="Feature title e.g. ‘Hyperlocal Discovery’.")
    description = models.TextField(blank=True, help_text="One or two lines describing the feature.")
    icon_text = models.CharField(max_length=8, blank=True, help_text="Emoji or short text icon, e.g. ‘⚡️’ or ‘AI’. Leave empty if using an image.")
    icon_image = models.ImageField(upload_to="projects/sections/features/", blank=True, null=True, help_text="Optional icon image (takes priority over emoji)")
    # Card presentation
    style = models.CharField(
        max_length=20,
        choices=[("portrait", "Portrait (tall)"), ("square", "Square (default)")],
        default="square",
        help_text="Choose portrait to mimic Apple’s tall cards, or square for compact cards."
    )
    background_image = models.ImageField(upload_to="projects/sections/features/backgrounds/", blank=True, null=True, help_text="Optional background image for the card.")
    background_image_url = models.URLField(blank=True, null=True, help_text="Alternative to uploaded background image.")
    background_color = models.CharField(max_length=20, blank=True, help_text="Tailwind-compatible color or hex, e.g. #111 or bg-gray-900.")
    text_color = models.CharField(max_length=20, blank=True, help_text="Hex or CSS color for overlaid title text, default uses theme.")
    # Optional modal/overlay content for Apple-style expandable cards
    modal_title = models.CharField(max_length=200, blank=True, help_text="Modal title shown when the card is opened. Leave empty to disable modal.")
    modal_description = models.TextField(blank=True, help_text="Longer rich description for the modal body.")
    modal_image = models.ImageField(upload_to="projects/sections/features/modals/", blank=True, null=True, help_text="Modal image (optional).")
    modal_video_url = models.URLField(blank=True, null=True, help_text="Modal video URL (mp4/stream).")
    modal_content = models.TextField(blank=True, help_text="Optional HTML content for the modal body. Use sparingly.")


class SectionTile(models.Model):
    section = models.ForeignKey(ProjectSection, related_name="tiles", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    icon_text = models.CharField(max_length=8, blank=True, help_text="Emoji or SF Symbol text.")
    icon_image = models.ImageField(upload_to="projects/sections/tiles/", blank=True, null=True)
    title = models.CharField(max_length=150)
    body = models.TextField(blank=True)
    action_text = models.CharField(max_length=50, blank=True)
    action_url = models.URLField(blank=True, null=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"Tile: {self.title}"


class SectionSpec(models.Model):
    section = models.ForeignKey(ProjectSection, related_name="specs", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    label = models.CharField(max_length=150)
    value = models.CharField(max_length=150)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"Spec: {self.label}"


class SectionFAQ(models.Model):
    section = models.ForeignKey(ProjectSection, related_name="faqs", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    question = models.CharField(max_length=200)
    answer = models.TextField()

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"FAQ: {self.question}"


class SectionMediaTab(models.Model):
    """
    Items for the 'media_tabs' section type. Each tab has a title, optional
    subtitle/description, and associated media to display on the opposite side.
    """
    section = models.ForeignKey(ProjectSection, related_name="media_tabs", on_delete=models.CASCADE)
    order = models.PositiveIntegerField(default=0)
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=300, blank=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="projects/sections/media_tabs/", blank=True, null=True)
    image_url = models.URLField(blank=True, null=True)
    video_url = models.URLField(blank=True, null=True)

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"MediaTab: {self.title}"
