from django.shortcuts import render
from rest_framework import viewsets
from .models import Inquiry
from .serializers import InquirySerializer

# Create your views here.

class InquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all().order_by('-created_at')
    serializer_class = InquirySerializer
