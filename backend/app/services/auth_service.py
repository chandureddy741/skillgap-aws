from __future__ import annotations

import base64
import hashlib
import hmac
import json
import os
import time
from datetime import timedelta

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.config.settings import settings
from app.database.connection import get_db
from app.models.user_model import User

bearer_scheme = HTTPBearer()


def _b64(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode().rstrip("=")


def _unb64(data: str) -> bytes:
    return base64.urlsafe_b64decode(data + "=" * (-len(data) % 4))


def hash_password(password: str) -> str:
    salt = os.urandom(16)
    digest = hashlib.scrypt(password.encode(), salt=salt, n=2**14, r=8, p=1, dklen=32)
    return f"scrypt${_b64(salt)}${_b64(digest)}"


def verify_password(plain: str, hashed: str) -> bool:
    try:
        scheme, salt_b64, digest_b64 = hashed.split("$", 2)
        if scheme != "scrypt":
            return False
        salt = _unb64(salt_b64)
        expected = _unb64(digest_b64)
        actual = hashlib.scrypt(plain.encode(), salt=salt, n=2**14, r=8, p=1, dklen=len(expected))
        return hmac.compare_digest(actual, expected)
    except Exception:
        return False


def create_access_token(user_id: int) -> str:
    exp = int(time.time()) + int(settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60)
    payload = _b64(json.dumps({"sub": str(user_id), "exp": exp}, separators=(",", ":")).encode())
    sig = hmac.new(settings.JWT_SECRET_KEY.encode(), payload.encode(), hashlib.sha256).digest()
    return f"{payload}.{_b64(sig)}"


def _decode_token(token: str) -> int:
    try:
        payload_b64, sig_b64 = token.split(".", 1)
        expected_sig = hmac.new(settings.JWT_SECRET_KEY.encode(), payload_b64.encode(), hashlib.sha256).digest()
        if not hmac.compare_digest(expected_sig, _unb64(sig_b64)):
            raise ValueError("bad signature")
        payload = json.loads(_unb64(payload_b64))
        if int(payload.get("exp", 0)) < int(time.time()):
            raise ValueError("expired")
        return int(payload["sub"])
    except Exception as exc:
        raise ValueError("invalid token") from exc


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    exc = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        user_id = _decode_token(credentials.credentials)
    except ValueError:
        raise exc
    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise exc
    return user
