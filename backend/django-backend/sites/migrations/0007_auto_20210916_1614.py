# Generated by Django 3.2.7 on 2021-09-16 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sites', '0006_auto_20210902_1651'),
    ]

    operations = [
        migrations.AlterField(
            model_name='site',
            name='full_result',
            field=models.CharField(default='', max_length=255, verbose_name='前回完全更新結果'),
        ),
        migrations.AlterField(
            model_name='site',
            name='result',
            field=models.CharField(default='', max_length=255, verbose_name='前回更新結果'),
        ),
    ]
