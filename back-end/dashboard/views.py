from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from dashboard.models import Dashboard
from dashboard.serializers import DashboardSerializer


class DashboardView(APIView):
    permission_classes = (permissions.IsAuthenticated, )

    def get(self, request, format=None):
        query = Dashboard.objects.get(user__exact=request.user)
        serializer = DashboardSerializer(query)

        return Response(status=status.HTTP_200_OK,
                        data=serializer.data)

    def post(self, request, format=None):
        serializer = DashboardSerializer(data=request.data)

        if serializer.is_valid():
            s_vd = serializer.validated_data
            Dashboard.objects.create(user=request.user,
                                     first_name=s_vd['first_name'],
                                     last_name=s_vd['last_name'],
                                     address=s_vd['address'],
                                     state=s_vd['state'],
                                     city=s_vd['city'],
                                     postalcode=s_vd['postalcode'],)

            return Response(status=status.HTTP_201_CREATED,
                            data={'detail': 'dashboard crated successfully!'})

        return Response(status=status.HTTP_400_BAD_REQUEST,
                        data=serializer.errors)

    def put(self, request, format=None):
        serializer = DashboardSerializer(data=request.data, partial=True)
        query = Dashboard.objects.filter(user__exact=request.user)

        # change phone number                           <-----------------------------------------------------

        if serializer.is_valid():
            query.update(**serializer.validated_data)

            return Response(status=status.HTTP_200_OK,
                            data={'detail': 'dashboard updated successfully!'})

        return Response(status=status.HTTP_400_BAD_REQUEST,
                        data=serializer.errors)
