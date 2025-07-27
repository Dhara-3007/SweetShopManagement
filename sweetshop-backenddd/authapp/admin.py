from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Sweet, Category, CustomUser, SweetOrder  


@admin.register(SweetOrder)
class SweetOrderAdmin(admin.ModelAdmin):
    list_display = ('user', 'sweet', 'quantity', 'created_at')

@admin.register(Sweet)
class SweetAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price', 'quantity')

admin.site.register(Category)
admin.site.register(CustomUser, UserAdmin)
