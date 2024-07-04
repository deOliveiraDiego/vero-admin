import streamlit as st
from views.usuarios import index

def app():
    st.title("Vero - Admin")

    st.write('Seja bem vinda ao Vero Admin.')
    st.write('Aqui, será possível administrar todos os contatos, condomínios e endereços da base da Vero.')