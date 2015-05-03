from django.db import models
from django.utils import timezone


class Tag(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Event(models.Model):
    tags = models.ManyToManyField(Tag)
    location = models.CharField(max_length=200)
    picture = models.ImageField(upload_to='photos', blank=True, null=True)
    caption = models.CharField(max_length=300)
    #  date_time = models.CharField(max_length=30)
    submitted_date_time = models.DateTimeField('date submitted', default=timezone.now)


    def __str__(self):
        return self.caption[:20]


