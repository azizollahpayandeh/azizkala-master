from rest_framework import serializers
from .models import User
from django.core.validators import RegexValidator
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class RegisterSerializer(serializers.ModelSerializer):
    phone_number = serializers.CharField(
        label='شماره تلفن',
        required=True,
        max_length=11,
        validators=[RegexValidator(regex=r'^09\d{9}$', message='Enter a valid 11 digit number starts with 09')])

    # _password = serializers.CharField(source='password', label='پسورد')

    class Meta:
        model = User
        fields = ('phone_number', 'username', 'password')

        # extra_kwargs = {
        #     'phone': {'required': True},
        # }

    # def validate(self, attrs):
    #     if attrs['password1'] != attrs['password2']:
    #         raise serializers.ValidationError(
    #             {'password1': "password field dont match !"})
    #
    #     return attrs

    def create(self, validated_data):
        user = User.objects.create(
            phone=validated_data['phone_number'],
            username=validated_data['username'],
        )

        user.set_password(validated_data['password'])
        # profile = Profile.objects.create(user=user)
        #
        # profile.save()
        user.save()

        return user


class ChangePasswordSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])

    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('old_password', 'password1', 'password2')

    def validate(self, attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError(
                {'password1': "password fields dont match !"})

        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError(
                {"old_password": "Old password is not correct !"})

        return value

    def update(self, instance, validated_data):
        user = self.context['request'].user
        if user.pk != instance.pk:
            raise serializers.ValidationError(
                {"authorize": "You dont have permission for this user !"})

        instance.set_password(validated_data['password1'])
        instance.save()

        return instance


