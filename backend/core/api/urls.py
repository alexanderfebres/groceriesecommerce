from django.urls import path

from .views import( 
    CategoryListView, 
    ProductListView, 
    ProductDetailView, 
    AddToCartView, 
    DeleteFromCartView,
    OrderSummaryView,
    DeleteOrderProductView, 
    AddCouponView,
    CheckoutView,
    PaymentView,
    SetProductToFeaturedView,
)

urlpatterns = [
    path('product-list/', ProductListView.as_view(), name='product-list' ),
    path('category-list/', CategoryListView.as_view(), name='category-list' ),
    path('product/<pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('add-to-cart/', AddToCartView.as_view(), name='add-to-cart' ),
    path('remove-from-cart/', DeleteFromCartView.as_view(), name='delete-from-cart' ),
    path('delete-product-from-cart/<pk>/', DeleteOrderProductView.as_view(), name='delete-order-product' ),
    path('order-summary/', OrderSummaryView.as_view(), name="order-summary"),
    path('add-coupon/', AddCouponView.as_view(), name='add-coupon'),
    path('checkout/', CheckoutView.as_view(), name='checkout'),
    path('payment/', PaymentView.as_view(), name='payment'),
    path('set-to-featured/', SetProductToFeaturedView.as_view(), name='set-to-featured'),
]