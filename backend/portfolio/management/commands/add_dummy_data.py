from django.core.management.base import BaseCommand
from portfolio.models import Project, ProjectSection
from blog.models import BlogPost

class Command(BaseCommand):
    help = 'Add dummy data for portfolio and blog'

    def handle(self, *args, **options):
        # Clear existing sections for WOFA project to avoid duplicates
        wofa_project = Project.objects.filter(slug='wofa').first()
        if wofa_project:
            wofa_project.sections.all().delete()
            
            # Add proper sections for WOFA
            sections_data = [
                {
                    'type': 'hero-text',
                    'order': 1,
                    'content': 'Designing for discovery, trust, and modern flexibility. Creating WOFA meant building a platform where design meets real utility. With a focus on hyperlocal discovery, curated spaces, and smooth booking flows, the app makes flexible work feel stylish and efficient.'
                },
                {
                    'type': 'challenge',
                    'order': 2,
                    'content': 'How do you make flexible workspaces discoverable, trustworthy, and easy to book for India\'s startup generation? The challenge was creating a professional-grade experience without sacrificing simplicity.',
                    'extra': {
                        'title': 'Hyperlocal search meets seamless UX'
                    }
                },
                {
                    'type': 'design-philosophy',
                    'order': 3,
                    'content': 'Every screen in WOFA is designed to create focus — no distractions, no clutter. From our black-on-white palette to carefully spaced card layouts, the UI celebrates clarity and confidence. Inspired by the creative class and tailored for the hustle of India\'s startup generation.',
                    'extra': {
                        'title': 'Design for the modern worker — minimalist, modular, mobile-first'
                    }
                },
                {
                    'type': 'features',
                    'order': 4,
                    'content': 'Key features that make WOFA stand out',
                    'extra': {
                        'features': [
                            {
                                'title': 'Hyperlocal Discovery',
                                'desc': 'Find coworking spaces, cafés, and meeting rooms based on real-time location and preferences.'
                            },
                            {
                                'title': 'Instant Booking',
                                'desc': 'Book by the hour or day with verified spaces and trusted reviews.'
                            },
                            {
                                'title': 'Curated Spaces',
                                'desc': 'Only the best, most reliable spaces make it into our platform.'
                            }
                        ]
                    }
                },
                {
                    'type': 'results',
                    'order': 5,
                    'content': 'WOFA launched to 1000+ users in the first month, with a 95% satisfaction rate and glowing feedback from the startup community.',
                    'extra': {
                        'title': 'Impact & Results',
                        'metrics': [
                            {'label': 'Active Users', 'value': '1000+'},
                            {'label': 'Satisfaction Rate', 'value': '95%'},
                            {'label': 'Spaces Listed', 'value': '200+'}
                        ]
                    }
                }
            ]
            
            for section_data in sections_data:
                ProjectSection.objects.create(
                    project=wofa_project,
                    **section_data
                )
            
            self.stdout.write(
                self.style.SUCCESS(f'Successfully updated {len(sections_data)} sections for WOFA project')
            )

        # Create additional dummy projects if needed
        if Project.objects.count() < 3:
            # Kirana Connect Project
            kirana, created = Project.objects.get_or_create(
                slug='kirana-connect',
                defaults={
                    'title': 'Kirana Connect',
                    'short_description': 'A comprehensive e-commerce platform connecting local kirana stores with customers, featuring real-time inventory management and seamless ordering.',
                    'industry': 'E-commerce, Retail Tech',
                    # Note: You'll need to add actual images to media folder
                }
            )
            
            if created:
                # Add sections for Kirana Connect
                kirana_sections = [
                    {
                        'type': 'hero-text',
                        'order': 1,
                        'content': 'Bridging the gap between traditional kirana stores and modern e-commerce. Kirana Connect empowers local retailers with digital tools while providing customers with convenient access to neighborhood stores.'
                    },
                    {
                        'type': 'challenge',
                        'order': 2,
                        'content': 'Local kirana stores were losing customers to large e-commerce platforms. Our solution needed to digitize these traditional stores while maintaining their personal touch and community connection.',
                        'extra': {'title': 'Digitizing Traditional Retail'}
                    }
                ]
                
                for section_data in kirana_sections:
                    ProjectSection.objects.create(project=kirana, **section_data)
                
                self.stdout.write(self.style.SUCCESS('Created Kirana Connect project'))

            # Startup MVP Project
            mvp, created = Project.objects.get_or_create(
                slug='startup-mvp',
                defaults={
                    'title': 'Startup MVP Platform',
                    'short_description': 'A rapid prototyping platform that helps startups build and validate their MVPs with integrated user feedback and analytics.',
                    'industry': 'SaaS, Startup Tools',
                }
            )
            
            if created:
                mvp_sections = [
                    {
                        'type': 'hero-text',
                        'order': 1,
                        'content': 'From idea to validation in weeks, not months. Our MVP platform provides startups with the tools they need to build, test, and iterate quickly.'
                    }
                ]
                
                for section_data in mvp_sections:
                    ProjectSection.objects.create(project=mvp, **section_data)
                
                self.stdout.write(self.style.SUCCESS('Created Startup MVP project'))

        # Add dummy blog posts
        if BlogPost.objects.count() == 0:
            blog_posts = [
                {
                    'title': 'Why storytelling matters in web design',
                    'slug': 'storytelling-web-design',
                    'excerpt': 'How narrative shapes user experience and drives engagement in modern web design.',
                    'content': '<p>Great web design isn\'t just about aesthetics—it\'s about telling a story that resonates with your users. In this post, we explore how narrative techniques can transform your digital experiences.</p><p>Storytelling in design creates emotional connections, guides user journeys, and makes complex information digestible. When users feel connected to your story, they\'re more likely to engage with your product.</p>',
                    'tags': 'design, storytelling, UX',
                    'estimated_read_time': '5 min read'
                },
                {
                    'title': 'Crafting user-first experiences',
                    'slug': 'user-first-experiences',
                    'excerpt': 'Principles for designing with empathy and putting users at the center of every decision.',
                    'content': '<p>User-first design isn\'t just a buzzword—it\'s a fundamental approach that puts real people at the heart of every design decision. Here\'s how to implement it effectively.</p><p>Start with user research, validate assumptions early, and iterate based on real feedback. The best products are built by teams that truly understand their users\' needs, frustrations, and goals.</p>',
                    'tags': 'UX, design thinking, user research',
                    'estimated_read_time': '7 min read'
                },
                {
                    'title': '5 tools that improved my workflow',
                    'slug': 'workflow-tools',
                    'excerpt': 'A look at the apps and frameworks that made the biggest difference in my daily work.',
                    'content': '<p>After years of experimenting with different tools and workflows, I\'ve settled on a stack that maximizes productivity while minimizing friction. Here are the five tools that made the biggest impact.</p><p>From design to development to project management, the right tools can transform how you work. But remember—tools are only as good as the processes you build around them.</p>',
                    'tags': 'productivity, tools, workflow',
                    'estimated_read_time': '6 min read'
                }
            ]
            
            for blog_data in blog_posts:
                BlogPost.objects.create(**blog_data)
            
            self.stdout.write(self.style.SUCCESS(f'Created {len(blog_posts)} blog posts'))

        self.stdout.write(
            self.style.SUCCESS('Dummy data setup complete! Your portfolio now has proper content.')
        )
