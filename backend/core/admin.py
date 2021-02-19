from django.contrib import admin

from .models import Category, Product, Order, OrderProduct, Coupon, Customer, Address

admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderProduct)
admin.site.register(Category)
admin.site.register(Coupon)
admin.site.register(Address)
admin.site.register(Customer)
