from models.Condominio import Condominio, Session

def index():
    session = Session()
    try:
        return session.query(Condominio).order_by(Condominio.id.asc()).limit(25).all()
    finally:
        session.close()
        
def show(id):
    session = Session()
    try:
        return session.query(Condominio).filter(Condominio.id == id).first()
    finally:
        session.close()
        
def update(condominio):
    session = Session()
    saved_condominio = session.query(Condominio).filter(Condominio.id == condominio.id).first()
    if saved_condominio:
        saved_condominio.nome = condominio.nome
        saved_condominio.tipo = condominio.tipo
        session.commit()
    return saved_condominio

def create(condominio):
    session = Session()
    try:
        session.add(condominio)
        session.commit()
        session.refresh(condominio)
        return condominio
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()