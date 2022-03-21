from django.contrib import admin
from .models import Profile, Course, Choice, Question, user_names, candidate_results



admin.site.register(Profile)
admin.site.register(Course)
# admin.site.register(user_name)
# admin.site.register(candidate_result)


class ResultInline(admin.TabularInline):
    model = candidate_results


@admin.register(user_names)
class user_nameAdmin(admin.ModelAdmin):
    inlines = [ResultInline]


class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 2


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    inlines = [ChoiceInline]
# Register your models here.


