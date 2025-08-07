from django.core.management.base import BaseCommand
from portfolio.models import Project, ProjectSection

class Command(BaseCommand):
    help = 'Add Apple-style placeholder images and update project data'

    def handle(self, *args, **options):
        # Apple-inspired placeholder images
        apple_images = [
            "https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020.jpg.og.jpg",
            "https://www.apple.com/newsroom/images/product/mac/standard/Apple_new-macbookpro-wallpaper-screen_11102021.jpg.og.jpg",
            "https://www.apple.com/newsroom/images/product/ipad/standard/Apple_iPad-Pro-Spring21_Hero_04202021.jpg.og.jpg",
            "https://www.apple.com/newsroom/images/product/airpods/standard/Apple_AirPods-Pro_New-Design_091019.jpg.og.jpg",
            "https://www.apple.com/newsroom/images/product/watch/standard/Apple_watch-series6-aluminum-blue-case_09152020.jpg.og.jpg"
        ]

        apple_logos = [
            "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png",
            "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
        ]

        # Update existing projects with placeholder data
        projects_data = [
            {
                'slug': 'wofa',
                'hero_image_url': apple_images[0],
                'logo_url': apple_logos[0],
                'client': 'Hasheky Inc.',
                'date': 'Aug 6, 2025',
                'website_url': 'https://wofa.app'
            },
            {
                'slug': 'kirana-connect',
                'hero_image_url': apple_images[1],
                'logo_url': apple_logos[1],
                'client': 'Local Retail Co.',
                'date': 'Jul 15, 2025',
                'website_url': 'https://kiranaconnect.com'
            },
            {
                'slug': 'startup-mvp',
                'hero_image_url': apple_images[2],
                'logo_url': apple_logos[0],
                'client': 'Tech Startup',
                'date': 'Jun 20, 2025',
                'website_url': 'https://startup-mvp.com'
            }
        ]

        for project_data in projects_data:
            try:
                project = Project.objects.get(slug=project_data['slug'])
                project.hero_image_url = project_data['hero_image_url']
                project.logo_url = project_data['logo_url']
                project.client = project_data['client']
                project.date = project_data['date']
                project.website_url = project_data['website_url']
                project.save()
                
                self.stdout.write(
                    self.style.SUCCESS(f'Updated {project.title} with placeholder data')
                )
            except Project.DoesNotExist:
                self.stdout.write(
                    self.style.WARNING(f'Project {project_data["slug"]} not found')
                )

        # Add placeholder images to sections
        sections_with_images = ProjectSection.objects.filter(
            type__in=['image', 'gallery', 'feature']
        ).exclude(image_url__isnull=False)

        for i, section in enumerate(sections_with_images):
            section.image_url = apple_images[i % len(apple_images)]
            section.save()

        self.stdout.write(
            self.style.SUCCESS(f'Updated {len(sections_with_images)} sections with placeholder images')
        )

        self.stdout.write(
            self.style.SUCCESS('Apple placeholder images added successfully!')
        )
