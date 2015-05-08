# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crowdwire', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='caption',
        ),
        migrations.RemoveField(
            model_name='event',
            name='latitude',
        ),
        migrations.RemoveField(
            model_name='event',
            name='longitude',
        ),
        migrations.RemoveField(
            model_name='event',
            name='picture',
        ),
        migrations.RemoveField(
            model_name='event',
            name='submitted_date_time',
        ),
        migrations.RemoveField(
            model_name='event',
            name='tags',
        ),
    ]
