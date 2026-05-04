import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

# IMPORTANTE: En Docker, el host no es "localhost", es el nombre del servicio ("db")
SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+psycopg://mi_usuario:mi_password@db:5432/mi_base_datos",
)

# Creamos el motor de conexión
engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)

# Creamos una fábrica de sesiones para hablar con la BD
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Clase base de la que heredarán todos nuestros modelos
class Base(DeclarativeBase):
    pass

# Dependencia para inyectar la sesión en nuestras rutas de FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()