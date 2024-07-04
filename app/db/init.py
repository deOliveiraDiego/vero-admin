from sqlalchemy import create_engine

def get_engine():
    engine = create_engine(
        'postgresql+psycopg2://postgres.dxrbzlvolcsuiibeqjrp:A!CEY#%(e8jnb)s@aws-0-sa-east-1.pooler.supabase.com/postgres'
    )
    return engine