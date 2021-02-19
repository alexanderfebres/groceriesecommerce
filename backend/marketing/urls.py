from django.urls import path
from .views import LeaveMessageView

urlpatterns = [
    path('send-mail/', LeaveMessageView.as_view(), name='send-mail')
]