from django.conf.urls import include, url
from views import EventList

urlpatterns = [
    url('^events/$', EventList.as_view(), name='event-list'),
]