from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from .models import User, Student, Teacher, Profile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

# Sérialiseur pour l'utilisateur
class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

# Sérialiseur pour l'étudiant
class StudentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Student
        fields = ['user']

# Sérialiseur pour l'enseignant
class TeacherSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Teacher
        fields = ['user', 'specialization', 'department']

# Sérialiseur pour le profil utilisateur
class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = ['user', 'full_name', 'photo', 'bio', 'phone_number', 'location', 'birth_date']

# Sérialiseur pour l'obtention du token JWT
class MyTOPS(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Utilisez l'e-mail comme identifiant
        attrs['email'] = attrs.get('email', attrs.get('username'))
        return super().validate(attrs)
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['full_name'] = user.profile.full_name
        token['username'] = user.username
        token['email'] = user.email
        token['photo'] = user.profile.photo
        token['bio'] = user.profile.bio
        token['phone_number'] = user.profile.phone_number
        token['location'] = user.profile.location
        token['birth_date'] = user.profile.birth_date
        token['role'] = 'Student' if hasattr(user, 'student') else 'Teacher' if hasattr(user, 'teacher') else 'User'
        return token

# Sérialiseur pour l'inscription
class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=255)
    password = serializers.CharField(max_length=128, write_only=True)
    confirm_password = serializers.CharField(max_length=128, write_only=True)
    role = serializers.ChoiceField(choices=['Student', 'Teacher'])

    def validate_password(self, value):
        validate_password(value)
        return value

    def validate(self, data):
        """
        Vérifie si les mots de passe correspondent.
        """
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"confirm_password": "Les mots de passe ne correspondent pas."})
        return data

    def create(self, validated_data):
        """
        Crée l'utilisateur en fonction du rôle sélectionné (Student ou Teacher).
        """
        validated_data.pop('confirm_password')
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            is_student=validated_data['role'] == 'Student',
            is_teacher=validated_data['role'] == 'Teacher'
        )
        return user