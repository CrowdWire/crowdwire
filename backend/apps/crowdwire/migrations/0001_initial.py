# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('latitude', models.DecimalField(max_digits=13, decimal_places=10)),
                ('longitude', models.DecimalField(max_digits=13, decimal_places=10)),
                ('picture', models.ImageField(null=True, upload_to=b'photos', blank=True)),
                ('caption', models.CharField(max_length=300)),
                ('submitted_date_time', models.DateTimeField(default=django.utils.timezone.now, verbose_name=b'date submitted')),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.AddField(
            model_name='event',
            name='tags',
            field=models.ManyToManyField(to='crowdwire.Tag'),
        ),
    ]
