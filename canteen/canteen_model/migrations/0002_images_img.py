# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-12-13 11:38
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('canteen_model', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='images',
            name='img',
            field=models.ImageField(default=0, upload_to='img'),
            preserve_default=False,
        ),
    ]