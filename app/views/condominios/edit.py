import time
import streamlit as st
from controllers import condominios as CondominiosController
from views.condominios import index as CondominiosIndex
from models.Condominio import Condominio

def app():
    params = st.query_params
    condominio_id = params.get('condominio_id', None)
    if condominio_id == 'new':
        new_condominio()
    elif condominio_id:
        edit_condominio(condominio_id)
    else: 
        CondominiosIndex.app()
        
        
def new_condominio():
    st.subheader('Novo condomínio')
    index()
    
    with st.form('condominio_form'):
        nome = st.text_input('Nome do condomínio:')
        tipo = st.selectbox('Tipo de condomínio:', ['Prédio', 'Horizontal'])
        submitted = st.form_submit_button("Criar condomínio")
        if submitted:
            condominio = Condominio(nome=nome, tipo=tipo)
            result = CondominiosController.create(condominio)
            st.success(f'Condomínio {result.nome} criado com sucesso!')
            with st.spinner('Carregando'):
                st.query_params['condominio_id'] = result.id
                time.sleep(2)
            st.rerun()
        
def edit_condominio(condominio_id):
    condominio = CondominiosController.show(condominio_id)
    
    if condominio is None:
        with st.spinner('Carregando'):
            st.error('Nenhum condomínio encontrado!')
            st.query_params.clear()
            time.sleep(3)
            st.rerun()
            
    st.subheader(f'{condominio.nome}')
    index()
    
    with st.form('condominio_form'):
        nome = st.text_input('Nome do condomínio:', condominio.nome)
        tipo = st.selectbox('Tipo de condomínio:', ['Prédio', 'Horizontal'])
        if st.form_submit_button("Salvar condomínio"):
            condominio.nome = nome
            condominio.tipo = tipo
            CondominiosController.update(condominio)
            with st.spinner('Carregando'):
                st.success('Condomínio atualizado com sucesso!')
                st.query_params.clear()
                time.sleep(1)
                st.rerun()
                
                
def index():
    if st.button('Lista de condomínios'):
        with st.spinner('Carregando'):
            st.query_params.clear()
            time.sleep(1)
            st.rerun()