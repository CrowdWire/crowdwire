# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_auto_20150503_2210'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='submitted_date_time',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name=b'date submitted'),
        ),
    ]
