from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from .serializers import *
from .models import User, Otp
import random


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny, )
    serializer_class = RegisterSerializer


class ChangePasswordView(generics.UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = (IsAuthenticated, )
    serializer_class = ChangePasswordSerializer


class LogoutView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordView(APIView):
    permission_classes = (AllowAny,)

    def post(self, request, format=None):
        if not 'phone_number' in request.data:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'detail': {'phone_number': 'required'}})

        user = None
        user = get_object_or_404(
            User, phone_number=request.data['phone_number'])

        # mail_subject = 'Reset Your Password'
        code = random.randint(1000, 9999)
        Otp.objects.create(
            phone_number=request.data['phone_number'], code=code)
        name = user.username if user.username else 'کاربر گرامی سایت فلان'
        to_phone_number = user.phone_number

        message = f'Hi {name},\nthis is your confirmation code:\n{code}'
        print(message)

        # EmailMessage(mail_subject, message, to=[to_email]).send()
        request.session['otp'] = code
        request.session['user'] = user.username
        return Response(status=status.HTTP_200_OK, data={'detail': "sent"})


class ValidateCodeAndResetPasswordView(APIView):
    permission_classes = (AllowAny,)

    def put(self, request, format=None):
        # _session = request.session               <------------------
        # _request_data = request.data

        if 'otp' not in request.session and 'user' not in request.session:
            return Response(
                status=status.HTTP_404_NOT_FOUND,
                data={'detail': 'session-not-found'})

        if 'otp' not in request.data:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'detail': {"otp": "required"}})

        if not int(request.data['otp']) == int(request.session['otp']):
            return Response(
                status=status.HTTP_403_FORBIDDEN,
                data={'detail': 'wrong-code'})

        # username = request.session['user']
        # return Response(
        #     status=status.HTTP_200_OK,
        #     data={'pk': get_object_or_404(User, username=username).pk})

        user = get_object_or_404(User, username=request.session['user'])
        # if user.pk != pk:
        #     return Response(
        #         status=status.HTTP_401_UNAUTHORIZED,
        #         data={"detail": "unauthorized"})

        if not 'new_password' and 'again' in request.data:
            return Response(
                status=status.HTTP_400_BAD_REQUEST,
                data={'detail': {"new_password": "required", 'again': 'required'}})

        if request.data['new_password'] != request.data['again']:
            return Response(
                status=status.HTTP_404_NOT_FOUND,
                data={'detail': 'not-matched'})

        user.set_password(request.data['new_password'])
        user.save()
        otp = Otp.objects.filter(
            phone_number__exact=request.data['phone_number'])
        if otp:
            for i in otp:
                i.delete()

        # if otp: [i.delete() for i in otp]

        return Response(status=status.HTTP_200_OK, data={'detail': 'done'})

# ===========


class IsDesigner(BasePermission):
    def has_permission(self, request, view):
        # Allow access only for designers
        return request.user.is_authenticated and request.user.is_designer


class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # Only designers are allowed access
    permission_classes = [IsDesigner]


class UserDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    # Only designers are allowed access
    permission_classes = [IsDesigner]


class IPAddressListCreateView(generics.ListCreateAPIView):
    queryset = IPAddress.objects.all()
    serializer_class = IPAddressSerializer

    def get_queryset(self):
        return IPAddress.objects.all()

    def perform_create(self, serializer):
        serializer.save()
