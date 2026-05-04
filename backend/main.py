from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models
from database import engine, get_db

# Esto crea las tablas en la BD si no existen
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
def leer_raiz():
    return {"mensaje": "¡Hola Mundo! FastAPI y Docker se están comunicando."}

# Una ruta de prueba para verificar que la BD responde
@app.get("/db-test")
def probar_db(db: Session = Depends(get_db)):
    # Intentamos hacer una consulta simple
    usuarios = db.query(models.Usuario).all()
    return {"status": "Conexión exitosa a PostgreSQL", "usuarios_registrados": len(usuarios)}