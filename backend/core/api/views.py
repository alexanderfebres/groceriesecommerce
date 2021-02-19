import os
import stripe
import string
import random

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework import generics
from rest_framework import permissions

from django.db.models import Q
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from django.http import Http404

from .serializers import CategorySerializer, ProductSerializer, OrderSerializer, OrderProductSerializer, CustomerSerializer, AddressSerializer
from ..models import Category, Product, OrderProduct, Order, Coupon, Customer, Address, Payment

# stripe.api_key = "sk_test_51HCp0mChr0ND5qAmWLBr2ozJd496T087Zv5xTaovouiPTUpREvd6Ov5qJpSf0Rdbu3pZB7XEYy7qIqZobgnhtWp000ulFOXM0p"
stripe.api_key = os.environ.get("STRIPE")

def create_ref_code():
    '''Create Reference code for completed orders'''
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=20))

class ProductDetailView(generics.RetrieveAPIView):
    '''Provide detailed data for a single product'''
    permission_classes = [ permissions.AllowAny ]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryListView(generics.ListAPIView):
    '''Provide full list of product categories '''
    permission_classes = [ permissions.AllowAny ]
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class DeleteOrderProductView(generics.DestroyAPIView):
    '''Delete product from the order, no matter quantity'''
    permission_classes = [ permissions.AllowAny]
    serializer_class = OrderProductSerializer
    queryset = OrderProduct.objects.all()

class SetProductToFeaturedView(APIView):
    '''Set product to featured'''
    
    permission_classes = [ permissions.IsAuthenticated ]
    def post(self, request, *args, **kwargs):
        # Get id of product and check its validity
        product_id = request.data.get('productID', None)
        if product_id is None:
            return Response({'message': 'Invalid data were provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get desired product 
        product = get_object_or_404(Product, id=product_id)
        # Set Product to Featured
        product.set_to_featured()
        # Save
        product.save()
        
        return Response(status=status.HTTP_200_OK)

class OrderSummaryView(APIView):
    '''Provide summary of all products in the order'''
    
    permission_classes = [ permissions.IsAuthenticated ]
    def get(self, request):
        # Get User's order
        order = Order.objects.filter(user=request.user, completed=False)
        if order.exists():
            # Retrieve order if exists
            order = OrderSerializer(order, many=True).data
            return Response({'order': order[0]}, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({'message': "you do not have an active order"}, status=status.HTTP_404_NOT_FOUND)

class AddCouponView(APIView):
    '''Add discount coupon to the order'''
    
    def post(self, request, *args, **kwargs):
        # Get coupon code and check its validity
        code = request.data.get('couponCode', None)
        if code is None:
            return Response({'message': 'this coupon is not valid'}, status=status.HTTP_400_BAD_REQUEST)

        # Get Coupon
        coupon = get_object_or_404(Coupon, code=code) 
        # Get user's order   
        order = Order.objects.get(user=request.user, completed=False)

        # Add Coupon to the order
        order.coupon = coupon
        order.save()

        return Response(status=status.HTTP_200_OK)


class ProductListView(APIView):
    '''
    Provide Product list, full or filtered list depending on the filter criteria. 
    Can be filtered by title, price, tags or category
    '''
    
    serializer_class = ProductSerializer
    permission_classes = [ permissions.AllowAny ]
    def get(self, request):
        # Filter Params
        filter_criteria = request.GET.get('filterCriteria', None)
        active_tab = request.GET.get('key', None)
        min_price = request.GET.get('min', None)
        max_price = request.GET.get('max', None)
        search_filter = request.GET.get('searchFilter', None)

        # All Products --Default--
        products = Product.objects.all()
        products = ProductSerializer(products, many=True).data
        
        # All Featured Products
        featuredProducts = Product.objects.filter(featured=True)
        featuredProducts = ProductSerializer(featuredProducts, many=True).data
        
        # All Off Products
        offProducts = Product.objects.filter(discount_price__isnull=False)
        offProducts = ProductSerializer(offProducts, many=True).data

        # Default data, No Filter Param Provided
        data = {
            'products': products,
            'featuredProducts': featuredProducts,
        }
        
        # Filtering By Search Filter Criteria
        if search_filter is not None:
            # Try to parse filter into a integer. Category id were provided so it'll filter by it
            try:
                int(search_filter)
                products = Product.objects.filter(category=search_filter)
                products = ProductSerializer(products, many=True).data
                data = { 'products' : products }
                
            # Filter is not a number, a phrase were provided so it'll filter product name by it
            except :
                products = Product.objects.filter(name__icontains=search_filter)
                products = ProductSerializer(products, many=True).data
                data = { 'products' : products }
        
        # Filtering Featured Products By main Categories
        if active_tab is not None:
            # Default Tab .. All Featured Products
            if active_tab == "1":
                data = { 'products' : featuredProducts }
            
            # Filter Featured Products By category "Fresh Meat"
            if active_tab == "2":
                products = Product.objects.filter(Q(featured=True) & Q(category__name="Fresh Meat"))
                products = ProductSerializer(products, many=True).data
                data = { 'products' : products}
                
            # Filter Featured Products By Category "Vegetables"
            if active_tab == "3":
                products = Product.objects.filter(Q(featured=True) & Q(category__name="Vegetables"))
                products = ProductSerializer(products, many=True).data
                data = { 'products' : products}    
                        
            # Filter Featured Products By Category "Fast Food"
            if active_tab == "4":
                products = Product.objects.filter(Q(featured=True) & Q(category__name="Fast Food"))
                products = ProductSerializer(products, many=True).data
                data = { 'products' : products}
        
        # Filtering Products By Category or Size
        if filter_criteria is not None:
            # Length of filter criteria equals 2. Size Key was sent so it filters by it.. 
            # Size keys (LG= large, MD= medium, SM= small, TY= tiny)
            if len(filter_criteria) == 2 :
                products = Product.objects.filter(size=filter_criteria)
                products = ProductSerializer(products, many=True).data
                data = { 'products': products}
                
            # Length of filter criteria greater than 2, so this is the category name and it'll filter by it
            if len(filter_criteria) > 2:
                products = Product.objects.filter(category__name=filter_criteria)
                products = ProductSerializer(products, many=True).data
                data = { 'products': products}
        
        # Min And Max Price Values were sent so it'll filter products by price range
        if min_price and max_price is not None:
            # Parse to Integer Values
            min_price = int(min_price) 
            max_price = int(max_price)
            
            # Check boundaries
            if min_price >= 0 and max_price <= 1000:
                # Filtering on price range considering standard price or discount price
                products = Product.objects.filter(
                                # No Discount Price
                                Q(discount_price__isnull=True) &
                                Q(price__range=(min_price, max_price))
                                |
                                # Discount price
                                Q(discount_price__isnull=False) &
                                Q(discount_price__range=(min_price, max_price))
                            )
                # Serializing data
                products = ProductSerializer(products, many=True).data
                data = { 'products': products }
        
        # Add Off Products to data no matter wether full list of products or filtered list of products is sent
        data["offProducts"] = offProducts
        
        return Response(data, status=status.HTTP_200_OK)    
        

class AddToCartView(APIView):
    '''Add product to the order'''
    
    def post(self, request, *args, **kwargs):
        # Get product id and check its validity
        product_id = request.data.get('id', None)
        if product_id is None:
            return Response({'Invalid data were provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get desired product to be added
        item = get_object_or_404(Product, id=product_id)

        # Get or Create Order of roduct
        order_product, created = OrderProduct.objects.get_or_create(product=item, ordered=False)

        # Get user's order
        order = Order.objects.filter(
            user=request.user,
            completed=False
        )

        # Check if user has an active order
        if order.exists():
            order = order[0]
            # Check if This order product is allready in the order.
            # If son, incresi quantity of this product in the order
            if order.items.filter(product__id=item.id, ordered=False).exists():
                order_product.quantity += 1
                order_product.save()
                return Response(status=status.HTTP_200_OK)
            # If that is not the case, add product to the user's order
            else:
                order.items.add(order_product)
                order.save()
                return Response(status=status.HTTP_200_OK)
        # User has not an active order, one needs to be created
        else:
            order = Order.objects.create(user=request.user)
            order.items.add(order_product)
        return Response(status=status.HTTP_200_OK)

class DeleteFromCartView(APIView):
    '''Decrease product quantity from the order'''
    
    permission_classes = [ permissions.AllowAny ]
    def post(self, request, *args, **kwargs):
        # Get prouct id and check its validity
        product_id = request.data.get('id', None)
        if product_id is None:
            return Response({'message': 'invalid data were provided'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Get desired product to be added
        item = get_object_or_404(Product, id=product_id)
        # Get user's order
        order = Order.objects.filter(user=request.user, completed=False)

        # Check if user has an active order
        if order.exists():
            order = order[0]
            # Check if product is in the order
            if order.items.filter(product__id=item.id, ordered=False).exists():
                # Retrieve product from the order
                order_product = OrderProduct.objects.filter(product_id=item.id, ordered=False)[0]
                
                # Check order product quantity 
                # Decrease quantity if greater than 1
                if order_product.quantity > 1:
                    order_product.quantity -= 1
                    order_product.save()
                    
                # if not the case, remove entire product order
                else:
                    order.items.remove(order_product)
                return Response(status=status.HTTP_200_OK)
            else:
                return Response({"message": "This item was not in your cart"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "You do not have an active order"}, status=status.HTTP_400_BAD_REQUEST)

class CheckoutView(APIView):
    '''Set address and customer info for the order to be delivered'''
    
    def post(self, request, *args, **kwargs):
        # Get data billing data and check its validity
        billing_data = request.data.get('billingDetails', None)
        different_shipping_address=billing_data.get('differentAddress')
        if billing_data is None:
            return response({'message': 'Invalid data were provided'}, status=status.HTTP_200_OK)

        try:
            # Try get user's order
            order = Order.objects.get(user=request.user, completed=False)
        except ObjectDoesNotExist:
            raise Http404("you do not have an active order")
        
        # Create Customer Object
        customer = Customer.objects.create(
            first_name=billing_data.get('firstName'),
            last_name=billing_data.get('lastName'),
            phone=billing_data.get('phone'),
            email=billing_data.get('email')
        )

        # If no special notes for delivery
        if not different_shipping_address:
            # Create Address Object
            address = Address.objects.create(
                country=billing_data.get('country'),
                state=billing_data.get('state'),
                city=billing_data.get('townCity'),
                street_address=billing_data.get('streetAddress'),
                zip_code=billing_data.get('ZIP'),
            )

            # Add Address and Customer data to the order
            order.customer = customer
            order.address = address
            order.save()

            return Response(status=status.HTTP_200_OK)
        
        # If especial notes for delivery, add them to the order and it'll be the shipping address.
        # thus, no need to add address object to the order
        else:
            order.customer = customer
            delivery_notes = billing_data.get('deliveryNotes')
            order.delivery_notes =  delivery_notes
            order.save()

            return Response(status=status.HTTP_200_OK)

class PaymentView(APIView):
    '''Proccess the payment for the order to be completed'''
    
    def post(self, request, *args, **kwargs):
        try:
            # Get stripe token and check its validity
            token = request.data.get('token', None)
            if token is None:
                return Response({'message': 'invalid data were provided'}, status=status.HTTP_400_BAD_REQUEST)

            # Get user's order
            order = Order.objects.get(user=request.user, completed=False)
            # Get total amount of the order
            amount = int(order.get_total_price() * 100)

            # STRIPE API.. Create a charge
            charge = stripe.Charge.create(
                amount=amount, 
                currency="usd", 
                source=token,
            )
            
            # Create payment object
            payment = Payment.objects.create(
                user=request.user,
                charge_id=charge.id,
                amount=amount,
            )
            
            # Change order products state to ordered
            order_products = order.items.all()
            for order_product in order_products:
                order_product.ordered = True
                order_product.save()
            
            # Add payment object to the order
            # Add Ref Code to the order
            # Change order state to completed
            order.payment = payment
            order.ref_code = create_ref_code()
            order.completed = True
            order.save()

            return Response(status=status.HTTP_200_OK)

        except stripe.error.CardError as e:
        # Since it's a decline, stripe.error.CardError will be caught
            print('Status is: %s' % e.http_status)
            print('Code is: %s' % e.code)
            # param is '' in this case
            print('Param is: %s' % e.param)
            print('Message is: %s' % e.user_message)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.RateLimitError as e:
        # Too many requests made to the API too quickly
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.InvalidRequestError as e:
        # Invalid parameters were supplied to Stripe's API
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.AuthenticationError as e:
        # Authentication with Stripe's API failed
        # (maybe you changed API keys recently)
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.APIConnectionError as e:
        # Network communication with Stripe failed
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        except stripe.error.StripeError as e:
        # Display a very generic error to the user, and maybe send
        # yourself an email
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        except Exception as e:
        # Something else happened, completely unrelated to Stripe
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


