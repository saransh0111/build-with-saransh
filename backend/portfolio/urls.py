from django.urls import path
from .views import ProjectViewSet, ProjectDetailView

urlpatterns = [
    path('projects/', ProjectViewSet.as_view({'get': 'list'})),
    path('projects/<slug:slug>/', ProjectDetailView.as_view()),
]
