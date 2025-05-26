from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import SessionLocal
from fastapi.security import OAuth2PasswordBearer
from fastapi import status

router = APIRouter(prefix="/agents", tags=["agents"])

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Dummy user auth dependency - replace with your real auth
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    # Implement your token decoding & user retrieval here
    # For example purpose, let's say token is user email:
    user = db.query(models.User).filter(models.User.email == token).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid authentication")
    return user

@router.post("/", response_model=List[schemas.AgentOut])
def save_agents(
    agents: List[schemas.AgentCreate],
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if len(agents) != 3:
        raise HTTPException(status_code=400, detail="Exactly 3 agents must be provided")

    # Delete old agents for user
    db.query(models.Agent).filter(models.Agent.user_id == current_user.id).delete()

    new_agents = [models.Agent(user_id=current_user.id, name=a.name, character=a.character) for a in agents]
    db.add_all(new_agents)
    db.commit()

    return new_agents

@router.get("/", response_model=List[schemas.AgentOut])
def get_agents(current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    agents = db.query(models.Agent).filter(models.Agent.user_id == current_user.id).all()
    return agents
