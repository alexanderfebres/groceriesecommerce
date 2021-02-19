from django.shortcuts import render
from django.core.mail import send_mail

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from src.settings.base import EMAIL_HOST_USER

class LeaveMessageView(APIView):
    ''' 
    Get name, email, and message.
    Send welcome message to newly subscribed user
    Send recommendation message to staff email
    '''
    def post(self, request):
        # Get data
        name = request.data.get("name", None)
        to_email = request.data.get("email", None)
        message = request.data.get("message", None)
        
        # Check data validity
        if name and to_email and message is not None:
            try:
                # create welcome and hello messages
                # add user info to recommendation message
                welcome_message = "Welcome to our family"
                hello_message = f"Hello {name} thank you for your message, well work to make thing better for you!"
                message += f"\n\n User: {name} \n Email: {to_email}"
                
                # Welcome mail for new subscribed user
                send_mail(
                    welcome_message,
                    hello_message,
                    EMAIL_HOST_USER,
                    [to_email],
                    fail_silently=False,
                )
                
                # Recommendation message from user to staff
                send_mail(
                    "User Recommendation",
                    message,
                    EMAIL_HOST_USER,
                    [EMAIL_HOST_USER],
                    fail_silently=False,
                )
                
                return Response(status=status.HTTP_200_OK)
            except Exception as e:
                return Response(status=status.HTTP_400_BAD_REQUEST)


    
            
