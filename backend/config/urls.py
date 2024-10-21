from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),
    # YOUR PATTERNS
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    # Optional UI:
    path("api/schema/swagger-ui/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/schema/redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),

    # PATH FOR agents urls
    path("api/agents/", include("agents.urls", namespace="agents")),

    # Router AboutCentre
    path("api/communications/", include("communications.urls", namespace="communications")),
    # Router news
    path("api/news/", include("news.urls", namespace="news")),
    # PATH FOR users urls
    path("api/", include("users.urls", namespace="users")),
    # PATH FOR school urls
    path("api/school/", include("school_page.urls", namespace="school")),
    # PATH FOR workshop urls
    path("api/workshop/", include("workshop.urls", namespace="workshop")),
    
    # Router srv
    path("api/srv/", include("srv.urls", namespace="srv")),
    # Router sun_projects
    path("api/sun_projects/", include("sun_projects.urls", namespace="sun_projects")),
    # Router kindergarten
    path("api/kindergarten/", include("kindergarten.urls", namespace="kindergarten")),
    # PATH FOR reports urls

    path("api/reports/", include("reports.urls", namespace="reports")),
    # PATH FOR basket urls
    path("api/basket/", include("basket.urls", namespace="basket")),
    # PATH FOR territory_of_success urls
    path("api/territory_of_success/", include("territory_of_success.urls", namespace="territory_of_success")),
    # PATH FOR payment urls
    path("api/payment/", include("payment.urls", namespace="payment")),


]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
