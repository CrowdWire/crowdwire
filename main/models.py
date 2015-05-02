from django.db import models

# Create your models here.

class Tag(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name


class Event(models.Model):
    location = models.CharField(max_length=200)
    picture = models.ImageField(upload_to='photos', blank=False, null=False)
    caption = models.CharField(max_length=300)
    date_time = models.CharField(max_length=30)
    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.caption[:20]