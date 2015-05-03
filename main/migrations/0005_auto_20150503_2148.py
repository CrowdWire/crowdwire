# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_event_submitted_on'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='submitted_on',
            new_name='submitted_date_time',
        ),
    ]
