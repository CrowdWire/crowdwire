from rest_framework import serializers
from models import *


class Base64ImageField(serializers.ImageField):
    def to_internal_value(self, data):
        from django.core.files.base import ContentFile
        import base64
        import six
        import uuid

        # Check if this is a base64 string
        if isinstance(data, six.string_types):
            # Check if the base64 string is in the "data:" format
            if 'data:' in data and ';base64,' in data:  # Break out the header from the base64 content
                header, data = data.split(';base64,')

    # Try to decode the file. Return validation error if it fails.
            try:
                decoded_file = base64.b64decode(data)
            except TypeError:
                self.fail('invalid_image')

                # Generate file name:
            file_name = str(uuid.uuid4())[:12]  # 12 characters are more than enough.  # Get the file name extension:
            file_extension = self.get_file_extension(file_name, decoded_file)

            complete_file_name = "%s.%s" % (file_name, file_extension, )

            data = ContentFile(decoded_file, name=complete_file_name)

        return super(Base64ImageField, self).to_internal_value(data)

    def get_file_extension(self, file_name, decoded_file):
        import imghdr

        extension = imghdr.what(file_name, decoded_file)
        extension = "jpg" if extension == "jpeg" else extension

        return extension


class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag


class EventSerializer(serializers.ModelSerializer):
    tags = TagsSerializer(many=True)
    # So that we don't get an encoding error, we need to serialize the image file:
    picture = Base64ImageField(max_length=None, use_url=True)

    class Meta:
        model = Event

    def create(self, validated_data):
        hashtags = validated_data.pop('tags')
        event = Event.objects.create(**validated_data)
        for tag in hashtags:
            tag, created = Tag.objects.get_or_create(name=tag['name'])
            event.tags.add(tag)
        return event


    def update(self, instance, validated_data):
        hashtags = validated_data.pop('tags')
        instance.name = validated_data.get('name', instance.name)  # Basically, rename the tag name
        instance.caption = validated_data.get('caption', instance.caption)
        instance.location = validated_data.get('location', instance.location)
        instance.picture = validated_data.get('picture', instance.picture)

        tags_list = []
        for tag in hashtags:
            tag, created = Tag.objects.get_or_create(name=tag["name"])
            # Try to get tag object from DB...if it doesn't exist, create it and append it to the tag list
            tags_list.append(tag)
        instance.tags = tags_list
        instance.save()
        return instance