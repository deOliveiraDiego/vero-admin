import streamlit as st
from controllers import usuarios as queries
import pandas as pd

def app():
    st.title("Contatos")
    usuarios = queries.usuarios()
    print(usuarios.size)
    if usuarios.empty:
        st.write("Nenhum contato encontrado.")
    else:
        col1, col2, col3, col4, col5, col6 = st.columns(6)
        
        col1.write('ID')
        col2.write('Nome')
        col3.write('Email')
        col4.write('Telefone')
        col5.write('Editar')
        col6.write('Excluir')
        

        for i, c in usuarios.iterrows():
            col1.write(c['id'])
            col2.write(c['nome'])
            col3.write(c['email'])
            col4.write(c['celular'])
            if col5.button('Editar', key=f"EditButton{str(c['id'])}"):
                st.success(f"Vamos editar o contato")
            if col6.button('Excluir', key=f"DeleteButton{str(c['id'])}"):
                st.success(f"Vamos excluir o contato")