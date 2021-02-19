from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    path('api/', include('core.api.urls')),
    path('api/blog/', include('blog.api.urls')),
    path('marketing/', include('marketing.urls')),
    path('djrichtextfield/', include('djrichtextfield.urls')),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)