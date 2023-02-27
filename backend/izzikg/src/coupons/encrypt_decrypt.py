import base64

from cryptography.fernet import Fernet
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes


def _get_key(password):
    digest = hashes.Hash(hashes.SHA256(), backend=default_backend())
    digest.update(password)
    return base64.urlsafe_b64encode(digest.finalize())


def encrypt(message: bytes, partner_company_id: int) -> bytes:
    key = _get_key(bytes(str(partner_company_id), encoding='utf-8'))
    return Fernet(key).encrypt(message)


def decrypt(token: bytes, partner_company_id: int) -> bytes:
    key = _get_key(bytes(str(partner_company_id), encoding='utf-8'))
    return Fernet(key).decrypt(token)
