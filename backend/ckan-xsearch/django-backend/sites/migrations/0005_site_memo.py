# Generated by Django 3.2.5 on 2021-07-02 13:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sites', '0004_auto_20210702_2146'),
    ]

    operations = [
        migrations.AddField(
            model_name='site',
            name='memo',
            field=models.TextField(blank=True, verbose_name='メモ'),
        ),
    ]
