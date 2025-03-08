from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (MyTOPS,RegisterSerializer,UserSerializer,TeacherSerializer,StudentSerializer,RegisterSerializer)
from .models import User, Student, Teacher

# Create your views here.
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTOPS
    

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        #creer un utilisateur
        user_data = serializer.validated_data

        user = User.objects.create_user(
            email=user_data['email'],
            username=user_data['username'],
            password=user_data['password']
        )
        # En fonction du rôle, créer un profil Student ou Teacher
        if user_data['role'] == 'Student':
            Student.objects.create(user=user)
        elif user_data['role'] == 'Teacher':
            Teacher.objects.create(user=user)

        # Retourner une réponse de succès avec les données de l'utilisateur
        return Response({
            'status': 'User created successfully',
            'user': {
                'email': user.email,
                'username': user.username,
                'role': user_data['role']
            }
        }, status=201)
    
class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]  # Seuls les utilisateurs authentifiés peuvent accéder

    def get(self, request, *args, **kwargs):
        """
        Retourne les informations du profil de l'utilisateur connecté.
        """
        user = request.user
        profile = user.profile  # On accède au profil lié à l'utilisateur
        
        user_data = {
            'username': user.username,
            'email': user.email,
            'full_name': profile.full_name,
            'photo': profile.photo.url if profile.photo else None,
            'bio': profile.bio,
            'phone_number': profile.phone_number,
            'location': profile.location,
            'birth_date': profile.birth_date,
        }

        return Response(user_data, status=200)