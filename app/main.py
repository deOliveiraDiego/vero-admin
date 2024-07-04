import streamlit as st
from views import index as Home
import views.usuarios.index as UsuariosIndex
import views.condominios.index as CondominiosIndex

st.set_page_config(layout="wide")

PAGES = {
    'Home': Home,
    'Contatos': UsuariosIndex,
    'Condominios': CondominiosIndex
}

if 'page' not in st.session_state:
    st.session_state.page = 'Home'

def navbar():
    cols = st.columns(len(PAGES))
    for i, page_name in enumerate(PAGES.keys()):
        if cols[i].button(page_name, key=page_name):
            st.session_state.page = page_name

def app():
    navbar()
    page = PAGES[st.session_state.page]
    page.app()

app()