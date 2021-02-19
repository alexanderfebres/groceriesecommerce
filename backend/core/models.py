from django.db import models
from authentication.models import CustomUser

PRODUCT_AVAILABILITY = (
    ('IS', 'In Stock'),
    ('UA', 'Unavailable'),
)

PRODUCT_SIZE = (
    ('LG', 'Large'),
    ('MD', 'Medium'),
    ('SM', 'Small'),
    ('TY', 'Tiny')
)

class Customer(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone = models.CharField(max_length=15)
    email = models.EmailField()

    def __str__(self):
        return self.first_name + " " + self.last_name

class Category(models.Model):
    name = models.CharField(max_length=50)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=50)
    price = models.IntegerField()
    discount_price = models.IntegerField(blank=True, null=True)
    description = models.CharField(max_length=300)
    availability = models.CharField(choices=PRODUCT_AVAILABILITY, max_length=2, default=PRODUCT_AVAILABILITY[0][0])
    weight = models.CharField(max_length=5)
    size = models.CharField(choices=PRODUCT_SIZE, max_length=2, blank=True, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = models.ImageField()
    featured = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
    def get_price(self):
        if self.discount_price:
            return self.discount_price
        else:
            return self.price

    def set_to_featured(self):
        if self.featured:
            self.featured=False
        else:
            self.featured=True

class OrderProduct(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    ordered = models.BooleanField(default=False)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return self.product.name
    

class Order(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    items = models.ManyToManyField(OrderProduct)
    completed = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    ref_code = models.CharField(max_length=50, blank=True, null=True)
    coupon = models.ForeignKey('Coupon', on_delete=models.SET_NULL, blank=True, null=True)
    address = models.ForeignKey('Address', on_delete=models.SET_NULL, blank=True, null=True)
    customer = models.ForeignKey('Customer', on_delete=models.SET_NULL, blank=True, null=True)
    payment = models.ForeignKey('Payment', on_delete=models.SET_NULL, blank=True, null=True)
    delivery_notes =  models.CharField(max_length=250, blank=True, null=True, default="ship to billing address")

    def get_total_price(self):
        total = 0
        for item in self.items.all():
            total += item.quantity * item.product.get_price()
        if self.coupon:
            total -= self.coupon.amount 
        return total

class Coupon(models.Model):
    code = models.CharField(max_length=25, unique=True)
    amount = models.IntegerField()

    def __str__(self):
        return self.code

class Address(models.Model):
    country = models.CharField(max_length=30)
    state = models.CharField(max_length=30)
    city = models.CharField(max_length=50)
    street_address = models.CharField(max_length=200)
    zip_code =  models.CharField(max_length=10)
    
    class Meta:
        verbose_name_plural = 'Addresses'

    def __str__(self):
        return self.country + "-" + self.state

class Payment(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    charge_id = models.CharField(max_length=100)
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.charge_id
