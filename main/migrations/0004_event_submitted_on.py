# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_remove_event_date_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='submitted_on',
            field=models.DateTimeField(default=datetime.datetime(2015, 5, 3, 21, 46, 57, 703321, tzinfo=utc), verbose_name=b'date submitted'),
            preserve_default=False,
        ),
    ]
