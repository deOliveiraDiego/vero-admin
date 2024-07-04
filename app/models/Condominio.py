from sqlalchemy import Column, Integer, String, Sequence
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from db.init import get_engine

Base = declarative_base()

class Condominio(Base):
    __tablename__ = 'condominio'
    id = Column(Integer, Sequence('condominio_id_seq'), primary_key=True)
    nome = Column(String(50))
    tipo = Column(String(50))

engine = get_engine()

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)