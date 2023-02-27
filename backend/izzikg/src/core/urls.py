from typing import Tuple

from django.contrib import admin
from django.urls import path, include

from .settings import DEBUG, MEDIA_URL, MEDIA_ROOT
from .yasg import urlpatterns as doc_urls


urlpatterns: Tuple = (
    path('jet/', include('jet.urls', 'jet')),
    path(route='admin/', view=admin.site.urls),
    path(route='silk/', view=include(arg='silk.urls')),
    path(route='api/v1/', view=include(arg='common.urls')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
)

urlpatterns += doc_urls  # swagger docs

if DEBUG:
    from debug_toolbar import urls
    from django.conf.urls.static import static

    urlpatterns += (
        path(route='__debug__/', view=include(arg=urls)),
    )
    urlpatterns += tuple(
        static(prefix=MEDIA_URL, document_root=MEDIA_ROOT)
    )
