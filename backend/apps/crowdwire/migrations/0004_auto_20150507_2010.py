# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('crowdwire', '0003_auto_20150507_1831'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='latitude',
            field=models.DecimalField(default=0.0, max_digits=17, decimal_places=14),
        ),
        migrations.AlterField(
            model_name='event',
            name='longitude',
            field=models.DecimalField(default=0.0, max_digits=17, decimal_places=14),
        ),
    ]
