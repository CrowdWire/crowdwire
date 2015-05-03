from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Event(models.Model):
    location = models.CharField(max_length=200)
    picture = models.ImageField(upload_to='photos', blank=True, null=True)
    caption = models.CharField(max_length=300)
    date_time = models.CharField(max_length=30)
    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.caption[:20]


