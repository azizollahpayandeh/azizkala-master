from rest_framework import serializers

from .models import Ticket, Comment, Attachment

from accounts.models import User


class TicketSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    phone_number = serializers.CharField(write_only=True)

    class Meta:
        model = Ticket
        fields = ['username', 'email', 'phone_number', 'title', 'description']
        read_only_fields = ['user']

    def create(self, validated_data):
        username = validated_data.pop('username')
        email = validated_data.pop('email')
        phone_number = validated_data.pop('phone_number')

        user, created = User.objects.get_or_create(email=email, defaults={
            'username': username,
            'phone_number': phone_number,
        })

        validated_data['user'] = user
        return super().create(validated_data)


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class AttachmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attachment
        fields = '__all__'
