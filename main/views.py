from rest_framework import generics
from serializers import *



class EventList(generics.ListAPIView):
    serializer_class = EventSerializer
    queryset = Event.objects.all()
