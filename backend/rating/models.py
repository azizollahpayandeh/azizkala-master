from django.db import models
from accounts.models import User
from products.models import ProductVariation


class Rating(models.Model):
    product = models.ForeignKey(
        ProductVariation, on_delete=models.CASCADE, related_name='ratings')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    filled_rating = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')
