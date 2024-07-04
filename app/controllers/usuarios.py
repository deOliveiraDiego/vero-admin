from db.init import get_engine
import pandas as pd

def get_usuarios():
    connection = get_engine()
    query = "SELECT * FROM usuario LIMIT 25"
    usuarios = pd.read_sql_query(query, connection)
    print(usuarios)

    return usuarios