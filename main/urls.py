from django.conf.urls import include, url
from django.conf import settings
from views import EventList, EventDetail, AddEvent

urlpatterns = [
    url('^events/$', EventList.as_view(), name='event-list'),
    url('^events/(?P<pk>[0-9]+)/$', EventDetail.as_view(), name='event-detail'),
    url('^add-event$', AddEvent.as_view(), name='add-event'),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
]