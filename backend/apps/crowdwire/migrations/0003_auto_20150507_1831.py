# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('crowdwire', '0002_auto_20150507_1828'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='caption',
            field=models.CharField(max_length=300, blank=True),
        ),
        migrations.AddField(
            model_name='event',
            name='latitude',
            field=models.DecimalField(default=0.0, max_digits=18, decimal_places=15),
        ),
        migrations.AddField(
            model_name='event',
            name='longitude',
            field=models.DecimalField(default=0.0, max_digits=18, decimal_places=15),
        ),
        migrations.AddField(
            model_name='event',
            name='picture',
            field=models.ImageField(null=True, upload_to=b'photos', blank=True),
        ),
        migrations.AddField(
            model_name='event',
            name='submitted_date_time',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name=b'date submitted'),
        ),
        migrations.AddField(
            model_name='event',
            name='tags',
            field=models.ManyToManyField(to='crowdwire.Tag'),
        ),
    ]
