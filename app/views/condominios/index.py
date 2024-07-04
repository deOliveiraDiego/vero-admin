import time
import streamlit as st
from controllers import condominios as CondominiosController
import pandas as pd
import views.condominios.edit as EditCondominio

def app():
    st.title("Condomínios")
    params = st.query_params
    condominio_id = params.get('condominio_id', None)
    
    if condominio_id:
        EditCondominio.app()
    else: 
        show_condominios()
    
def show_condominios():
    if st.button('Criar novo condomínio'):
        st.query_params['condominio_id'] = 'new'

        with st.spinner('Carregando'):
            time.sleep(1)
            st.rerun()
    
    header_cols = st.columns([1, 1, 1, 2])
    header_cols[0].write("ID")
    header_cols[1].write("Nome")
    header_cols[2].write("Tipo")
    header_cols[3].write("Ações")        

    condominios = CondominiosController.index()

    if condominios:
        df = pd.DataFrame([condominio.__dict__ for condominio in condominios])
        df = df.drop('_sa_instance_state', axis=1)  # Remove a coluna _sa_instance_state
        for i, c in df.iterrows():
            cols = st.columns([1, 1, 1, 1, 1])
            id = c['id']
            nome = c['nome']
            tipo = c['tipo']
            
            cols[0].write(id)
            cols[1].write(nome)
            cols[2].write(tipo)
            if cols[3].button('Editar', key=f"edit_button_{id}"):
                st.query_params['condominio_id'] = id
                with st.spinner('Carregando'):
                    time.sleep(1)
                st.rerun()
            if cols[4].button('Excluir', key=f"delete_button_{id}"):
                st.success('Vamos excluir esse condomínio!')
        
    else:
        st.write("Nenhum condomínio encontrado.")