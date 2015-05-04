from django.conf.urls import include, url
from django.contrib import admin

# URL endpoints for the Django admin, and the project's main backend root directory
urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url('^', include('main.urls')),
]