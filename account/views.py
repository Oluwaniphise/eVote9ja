from django.http.request import HttpRequest
from django.http.response import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404, HttpResponseRedirect, reverse
from django.contrib import messages
from .forms import SignUpForm, UpdateProfileForm
from .models import Course, Profile, Choice, Question, candidate_results, user_names
from django.contrib.auth import login, authenticate
from django.http import JsonResponse
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
# from json import dumps
from django.core.paginator import Paginator, EmptyPage
from rest_framework.viewsets import ModelViewSet
from .serializers import  QuestionSerializer



class VotersViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    

class GeneralCourseListView(ListView):
    model = Question
    template_name = 'general.html'
    context_object_name = 'question'
   


class GeneralCourseDetailView(DetailView):
    model = Question
    template_name = 'individual.html'
    context_object_name = 'question'



def landing(request):
    
    

    return render(request, 'new-vote.html')

def save_vote(request, pk):
    
    try:
        question = Question.objects.get(pk=pk)
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
        print(question.choice_set.all())
    except (KeyError, Choice.DoesNotExist):
        return render(request, 'details.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.vote += 1
        selected_choice.save()
        return HttpResponseRedirect(reverse('result', 
        args=(question.id,
        )))
        # return HttpResponse("You have successfully voted")
    
    
def result(request):
    question = Question.objects.all()
    context = {
        'question':question
    }
    return render(request, 'result.html', context)
    


def save_quiz(request):


    if request.is_ajax():
        questions = []
        data = request.POST
        new_data = dict(data.lists())
        new_data.pop('csrfmiddlewaretoken')
        for k in new_data.keys():
            
            question = Question.objects.get(question_post=k)
            questions.append(question)
        # print(questions)

        user = request.user
        results = []
        user_voter_par = user_names.objects.create(user=user)
        user_voter_par.save()

        for q in questions:
            candidate_selected = request.POST.get(q.question_post)
            # print("selected ", candidate_selected)

            if candidate_selected != "":
                candidates = Choice.objects.filter(question_post=q)
                for c in candidates:
                    if candidate_selected == c.choice_field:
                        c.vote += 1
                        c.save()
                result = candidate_results.objects.create(user=user_voter_par, question_post=q, choice_field=candidate_selected )
                result.save()



            results.append({q:candidate_selected})
        print(results)
       

                # print(candidates)


    return JsonResponse({"results":str(results)})

def vote(request):
    # print(type(request.user))
    
    questions = Question.objects.all()
    context = {'questions':questions,
    }
    return render(request, 'vote.html', context)
    
    

    
 
    




def register(request):
    user = request.user
    form = SignUpForm()
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            user.refresh_from_db()  # load the profile instance created by the signal
            user.profile.mat_no = form.cleaned_data.get('mat_no')
            user.profile.dept = form.cleaned_data.get('dept')
            # user.profile.level = form.
            user.save()
        
            messages.success(request, 'Your account has been successfully created.')
            return redirect('login')
    else:
        form = SignUpForm()

    context = {
        'form':form, 'user':user
    }

    
    return render(request, 'account/register.html', context)


def login(request):
    # form = SignUpForm()
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        # print(username)
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return redirect('dashboard')
        else:
            messages.info(request, 'username of password incorrect')
            # print('username or password incorrect')
    context = {
        # 'form':form

    }

    return HttpResponse("HEllo")


# def profile(request):
#     user_profile = Profile.objects.get(user=request.user)
#     if request.method == 'POST':
#         profile_form = UpdateProfileForm(request.POST, request.FILES, instance=user)
#         if profile_form.is_valid():
#             profile_form.save()
#             messages.success(request, 'Your profile is updated successfully')
#             return redirect(to='dashboard')
#     else:
#         profile_form = UpdateProfileForm(instance=user_)
#     context = {
#         'profile_form': profile_form
#     }
#     return render(request, 'dashboard.html', context)



def dashboard(request):
    user_profile = Profile.objects.get(user=request.user)
    course = Course.objects.all()
    # profile = Profile.objects.all()
    context = {
        'user_profile':user_profile, 'course':course
        # 'profile':profile 
    }
    return render(request, 'dashboard.html', context)


