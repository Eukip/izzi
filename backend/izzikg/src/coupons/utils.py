import os
import re

from slugify import slugify
from django.utils import timezone


def _slugify_camelcase(string: str, sep: str = "-") -> str:
    """
    Converts camelcase string to lowercase string
    divided with given separator
    """
    repl = r"\1{}\2".format(sep)
    s1 = re.sub("(.)([A-Z][a-z]+)", repl, string)
    return re.sub("([a-z0-9])([A-Z])", repl, s1).lower()


def generate_file_path(instance, filename: str) -> str:
    """Transliterates a filename for a model's instance"""

    name, ext = os.path.splitext(filename)
    model_name = _slugify_camelcase(instance._meta.model.__name__, "_")
    strftime = timezone.datetime.now().strftime("%Y/%m/%d")
    transliterated = slugify(name)
    return f"{model_name}/{strftime}/{transliterated}{ext}"
