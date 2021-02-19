from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import CustomUser

class UserAdminConfig(UserAdmin):
    ordering = ('-start_date',)
    search_fields = ('email', 'username', 'first_name')
    list_display = ('email', 'username', 'first_name', 'is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'username', 'first_name',)}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )

admin.site.register(CustomUser, UserAdminConfig)