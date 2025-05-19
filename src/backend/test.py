from src.database import Base, engine
from src.models import User

Base.metadata.drop_all(bind=engine)  # ❌ WARNING: This deletes all data!
Base.metadata.create_all(bind=engine)