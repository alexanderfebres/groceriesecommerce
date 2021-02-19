from rest_framework import serializers

from ..models import Category, Product, OrderProduct, Order, Coupon, Customer, Address, Payment

class ProductSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(read_only=True, slug_field='name')

    class Meta:
        model = Product
        fields = ('id', 
                  'name', 
                  'description', 
                  'availability', 
                  'weight', 
                  'image', 
                  'category', 
                  'price', 
                  'discount_price', 
                  'size',
                  'featured'
                )


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')

class OrderProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderProduct
        fields = ('id', 'product', 'quantity')

class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = "__all__"

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields= '__all__'


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields= '__all__'

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    items = OrderProductSerializer(many=True, read_only=True)
    coupon = CouponSerializer()
    address = AddressSerializer()
    customer = CustomerSerializer()
    payment = PaymentSerializer()

    class Meta:
        model = Order
        fields = ('id', 'items', 'coupon', 'address', 'customer', 'payment')
