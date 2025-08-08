from django.core.management.base import BaseCommand
from portfolio.models import (
    Project,
    ProjectSection,
    SectionFeature,
    SectionMetric,
    SectionTile,
    SectionSpec,
    SectionFAQ,
    SectionMediaTab,
)
from blog.models import BlogPost

class Command(BaseCommand):
    help = 'Add dummy data for portfolio and blog'

    def handle(self, *args, **options):
        # Clear existing sections for WOFA project to avoid duplicates
        wofa_project = Project.objects.filter(slug='wofa').first()
        if wofa_project:
            wofa_project.sections.all().delete()
            
            # Add proper sections for WOFA (using new section types)
            para1 = ProjectSection.objects.create(
                project=wofa_project,
                type='paragraph',
                order=1,
                content='Designing for discovery, trust, and modern flexibility. Creating WOFA meant building a platform where design meets real utility. With a focus on hyperlocal discovery, curated spaces, and smooth booking flows, the app makes flexible work feel stylish and efficient.'
            )

            para2 = ProjectSection.objects.create(
                project=wofa_project,
                type='paragraph',
                order=2,
                content='How do you make flexible workspaces discoverable, trustworthy, and easy to book for India\'s startup generation? The challenge was creating a professional-grade experience without sacrificing simplicity.',
                extra={'title': 'Hyperlocal search meets seamless UX'}
            )

            para3 = ProjectSection.objects.create(
                project=wofa_project,
                type='paragraph',
                order=3,
                content='Every screen in WOFA is designed to create focus — no distractions, no clutter. From our black-on-white palette to carefully spaced card layouts, the UI celebrates clarity and confidence. Inspired by the creative class and tailored for the hustle of India\'s startup generation.',
                extra={'title': 'Design for the modern worker — minimalist, modular, mobile-first'}
            )

            features_section = ProjectSection.objects.create(
                project=wofa_project,
                type='features',
                order=4,
                content='Key features that make WOFA stand out'
            )
            SectionFeature.objects.bulk_create([
                SectionFeature(section=features_section, order=1, title='Hyperlocal Discovery', description='Find coworking spaces, cafés, and meeting rooms based on real-time location and preferences.', icon_text='📍'),
                SectionFeature(section=features_section, order=2, title='Instant Booking', description='Book by the hour or day with verified spaces and trusted reviews.', icon_text='⚡️'),
                SectionFeature(section=features_section, order=3, title='Curated Spaces', description='Only the best, most reliable spaces make it into our platform.', icon_text='🏆'),
            ])

            metrics_section = ProjectSection.objects.create(
                project=wofa_project,
                type='metrics',
                order=5,
                content='Impact & Results'
            )
            SectionMetric.objects.bulk_create([
                SectionMetric(section=metrics_section, order=1, label='Active Users', value='1000+'),
                SectionMetric(section=metrics_section, order=2, label='Satisfaction Rate', value='95%'),
                SectionMetric(section=metrics_section, order=3, label='Spaces Listed', value='200+'),
            ])

            self.stdout.write(self.style.SUCCESS('Successfully updated sections for WOFA project'))

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
                ProjectSection.objects.create(
                    project=kirana,
                    type='paragraph',
                    order=1,
                    content='Bridging the gap between traditional kirana stores and modern e-commerce. Kirana Connect empowers local retailers with digital tools while providing customers with convenient access to neighborhood stores.'
                )
                ProjectSection.objects.create(
                    project=kirana,
                    type='paragraph',
                    order=2,
                    content='Local kirana stores were losing customers to large e-commerce platforms. Our solution needed to digitize these traditional stores while maintaining their personal touch and community connection.',
                    extra={'title': 'Digitizing Traditional Retail'}
                )
                
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
                ProjectSection.objects.create(
                    project=mvp,
                    type='paragraph',
                    order=1,
                    content='From idea to validation in weeks, not months. Our MVP platform provides startups with the tools they need to build, test, and iterate quickly.'
                )
                
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

        # Create Apple-style iPhone project with multiple sections
        iphone, _ = Project.objects.get_or_create(
            slug='iphone',
            defaults={
                'title': 'iPhone',
                'short_description': 'Designed to be loved.',
                'industry': 'Product Design, iOS',
                'client': 'Apple',
                'date': '2025',
                'website_url': 'https://www.apple.com/iphone/'
            }
        )

        # Rebuild iPhone sections every time so you get the full set
        iphone.sections.all().delete()
        if iphone.sections.count() == 0:
            # 1) Hero heading
            ProjectSection.objects.create(
                project=iphone,
                type='heading',
                order=1,
                title='iPhone',
                subtitle='Designed to be loved.',
                theme='dark'
            )

            # 2) Hero image
            ProjectSection.objects.create(
                project=iphone,
                type='image',
                order=2,
                image_url='https://www.apple.com/newsroom/images/product/iphone/standard/Apple_announce-iphone12pro_10132020.jpg.og.jpg'
            )

            # 3) Get to know iPhone (feature cards with modals)
            features = ProjectSection.objects.create(
                project=iphone,
                type='features',
                order=3,
                content='Get to know iPhone.'
            )

            SectionFeature.objects.bulk_create([
                SectionFeature(
                    section=features,
                    order=1,
                    title='Apple Intelligence',
                    description='AI‑opening possibilities.',
                    icon_text='',
                    modal_title='Apple Intelligence',
                    modal_description='Personal intelligence system that helps you write and get things done effortlessly.',
                    modal_content='<p>Writing Tools, Genmoji, new Siri, and privacy protections.</p><img src="https://www.apple.com/iphone/home/images/overview/apple_intelligence__f4wxm9n3qsea_large.jpg" style="width:100%;border-radius:16px;" />'
                ),
                SectionFeature(
                    section=features,
                    order=2,
                    title='Cutting-Edge Cameras',
                    description='Picture your best photos and videos.',
                    icon_text='📷',
                    modal_title='Cutting-Edge Cameras',
                    modal_description='Advanced cameras automatically capture phenomenal photos with great detail and color.',
                    modal_content='<img src="https://www.apple.com/iphone/home/images/overview/camera__d9b2b8fxx2i6_large.jpg" style="width:100%;border-radius:16px;" />'
                ),
                SectionFeature(
                    section=features,
                    order=3,
                    title='Chip and Battery Life',
                    description='Fast that lasts.',
                    icon_text='⚡️',
                    modal_title='Fast that lasts.',
                    modal_description='A18 Pro chip performance and long-lasting battery.',
                    modal_content='<img src="https://www.apple.com/iphone/home/images/overview/chip__b8z6y7b4x3uq_large.jpg" style="width:100%;border-radius:16px;" />'
                ),
                SectionFeature(
                    section=features,
                    order=4,
                    title='Innovation',
                    description='Beautiful and durable, by design.',
                    icon_text='✨',
                    modal_title='Beautiful and durable, by design.',
                    modal_description='Titanium, Ceramic Shield, Dynamic Island.',
                ),
            ])

            # 4) Explore iPhone (Square feature cards to compare styles)
            square_features = ProjectSection.objects.create(
                project=iphone,
                type='features',
                order=4,
                content='Explore iPhone (Square cards)'
            )
            SectionFeature.objects.bulk_create([
                SectionFeature(section=square_features, order=1, title='Privacy built in', description='Your data stays yours.', icon_text='🔒', style='square', background_image_url='https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80', text_color='#ffffff'),
                SectionFeature(section=square_features, order=2, title='MagSafe accessories', description='Snap on a charger or wallet.', icon_text='🧲', style='square', background_image_url='https://images.unsplash.com/photo-1616348436168-de43ad6d9a3f?auto=format&fit=crop&w=1200&q=80', text_color='#ffffff'),
                SectionFeature(section=square_features, order=3, title='iOS updates', description='New features for years.', icon_text='⬆️', style='square', background_image_url='https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', text_color='#ffffff'),
            ])

            # 5) Why Apple is the best place to buy iPhone (tiles)
            tiles_sec = ProjectSection.objects.create(
                project=iphone,
                type='paragraph',
                order=5,
                title='Why Apple is the best place to buy iPhone.',
                subtitle='',
                theme='light'
            )
            SectionTile.objects.bulk_create([
                SectionTile(section=tiles_sec, order=1, icon_text='📱', title='Save with Apple Trade In.', body='Get credit when you trade in your current phone.', action_text='Shop iPhone', action_url='https://www.apple.com/iphone/'),
                SectionTile(section=tiles_sec, order=2, icon_text='💳', title='Pay over time, interest‑free.', body='With Apple Card Monthly Installments.', action_text='Learn more', action_url='https://www.apple.com/apple-card/'),
                SectionTile(section=tiles_sec, order=3, icon_text='📶', title='Carrier deals.', body='Get incredible carrier deals.', action_text='See offers', action_url='https://www.apple.com/shop/buy-iphone'),
            ])

            # 6) Chip and Battery Life (specs)
            spec_sec = ProjectSection.objects.create(
                project=iphone,
                type='paragraph',
                order=6,
                title='Chip and Battery Life',
                subtitle='Fast that lasts.',
                theme='dark'
            )
            SectionSpec.objects.bulk_create([
                SectionSpec(section=spec_sec, order=1, label='Chip', value='A18 Pro'),
                SectionSpec(section=spec_sec, order=2, label='Battery Life', value='Up to 33 hrs'),
                SectionSpec(section=spec_sec, order=3, label='Connectivity', value='5G'),
                SectionSpec(section=spec_sec, order=4, label='Charging', value='USB‑C'),
            ])

            # 7) Gallery (innovation images)
            ProjectSection.objects.create(
                project=iphone,
                type='gallery',
                order=7,
                extra={
                    'images': [
                        'https://www.apple.com/iphone/home/images/overview/innovation__f8r0l8n2xv2a_large.jpg',
                        'https://www.apple.com/iphone/home/images/overview/durability__fdw2w1t7t2u2_large.jpg'
                    ]
                }
            )

            # 8) FAQs
            faq_sec = ProjectSection.objects.create(
                project=iphone,
                type='list',
                order=8,
                title='Frequently asked questions'
            )
            SectionFAQ.objects.bulk_create([
                SectionFAQ(section=faq_sec, order=1, question='Is iPhone fast for everyday tasks?', answer='Yes. iPhone chips are designed for efficiency and performance across apps and games.'),
                SectionFAQ(section=faq_sec, order=2, question='Can I charge iPhone with USB‑C?', answer='Yes. iPhone 15 and later support USB‑C for charging.'),
            ])

            # 9) Trade In band with imagery
            ProjectSection.objects.create(
                project=iphone,
                type='paragraph',
                order=9,
                title='Apple Trade In',
                subtitle='Get credit toward iPhone when you trade in an eligible smartphone.',
                theme='light',
                cta_text='See how it works',
                cta_url='https://www.apple.com/shop/trade-in'
            )
            ProjectSection.objects.create(
                project=iphone,
                type='image',
                order=10,
                image_url='https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80'
            )

            # 10) Long camera reel (gallery)
            ProjectSection.objects.create(
                project=iphone,
                type='gallery',
                order=11,
                extra={
                    'images': [
                        'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1600&q=80',
                        'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1600&q=80',
                        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
                        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80',
                        'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?auto=format&fit=crop&w=1600&q=80',
                        'https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?auto=format&fit=crop&w=1600&q=80'
                    ]
                }
            )

            # 11) Environment intro
            env_intro = ProjectSection.objects.create(
                project=iphone,
                type='paragraph',
                order=12,
                title='Environment',
                subtitle='Recycle. Reuse. Repeat.',
                theme='dark'
            )
            SectionTile.objects.bulk_create([
                SectionTile(section=env_intro, order=1, icon_text='♻️', title='Innovation in conservation.', body='Recover crucial materials from recycled iPhone devices.'),
                SectionTile(section=env_intro, order=2, icon_text='🔋', title='More recycled content? Naturally.', body='Expanding use of recycled metals in batteries and magnets.'),
            ])

            # 12) Environment gallery
            ProjectSection.objects.create(
                project=iphone,
                type='gallery',
                order=13,
                extra={
                    'images': [
                        'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=80',
                        'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1600&q=80'
                    ]
                }
            )

            # 13) Continuity: Media Tabs demo
            cont = ProjectSection.objects.create(
                project=iphone,
                type='media_tabs',
                order=14,
                title='iPhone works with all your Apple devices',
                subtitle='Continuity features make everything you do seamless.'
            )
            SectionMediaTab.objects.bulk_create([
                SectionMediaTab(section=cont, order=1, title='iPhone and Mac', subtitle='iPhone Mirroring', description='View and control your iPhone from your Mac.', image_url='https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1400&q=80'),
                SectionMediaTab(section=cont, order=2, title='iPhone and Apple Watch', subtitle='Unlock and control', description='Unlock your Mac, ping your iPhone, and much more.', image_url='https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&w=1400&q=80'),
                SectionMediaTab(section=cont, order=3, title='iPhone and AirPods', subtitle='Adaptive Audio', description='A more personal listening experience across devices.', image_url='https://images.unsplash.com/photo-1595433707802-6b2626ef1c86?auto=format&fit=crop&w=1400&q=80'),
            ])

            self.stdout.write(self.style.SUCCESS('Created iPhone demo project with 7+ sections'))
