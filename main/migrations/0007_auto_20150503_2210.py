# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0006_auto_20150503_2202'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='submitted_date_time',
            field=models.DateTimeField(verbose_name=b'date submitted'),
        ),
    ]
