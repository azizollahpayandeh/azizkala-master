from rest_framework import serializers

from .models import Rating


class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ['product', 'user', 'score', 'created_at']

    def validate(self, attrs):
        user = self.context['request'].user
        product = attrs.get('product')
        if Rating.objects.filter(user=user, product=product).exists():
            raise ValidationError("You have already rated this product.")
        return attrs
