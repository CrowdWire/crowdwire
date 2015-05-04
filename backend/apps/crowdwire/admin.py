from django.contrib import admin

from backend.apps.crowdwire.models import Tag, Event


admin.site.register(Tag)
admin.site.register(Event)
