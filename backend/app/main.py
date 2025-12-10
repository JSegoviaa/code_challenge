from fastapi import FastAPI, Depends, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from datetime import datetime
from . import models, schemas, crud
from .database import SessionLocal, engine
from sqlalchemy.orm import Session
from .schemas import Campaign

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Campaign Analytics API")

@app.get("/")
def read_root():
    return {"message": "Welcome to Campaign Analytics API"}

@app.get("/health")
def health_check():
    return {"status": "ok"}


# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with actual frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

from typing import Dict, Any

@app.get("/campaigns/", response_model=Dict[str, Any])
def read_campaigns(
    skip: int = Query(0, ge=0),
    limit: int = Query(5, ge=1, le=100),
    tipo_campania: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    db: Session = Depends(get_db)
):
 
    """
    Get all campaigns with pagination and optional filtering by campaign type.
    """
    if start_date and end_date:
        if start_date > end_date:
            raise HTTPException(
                status_code=400,
                detail="Start date must be before end date"
            )
    
    total = crud.count_campaigns(db, tipo_campania, start_date=start_date, end_date=end_date)
    campaigns = crud.get_campaigns(db, skip=skip, limit=limit, tipo_campania=tipo_campania, start_date=start_date, end_date=end_date)
 
    campaigns_serialized = [
        Campaign.model_validate(c)  
        for c in campaigns
    ]

    return {
        "data": campaigns_serialized,
        "total": total,
        "page": skip // limit,
        "pageSize": limit
    }

@app.get("/campaigns/{campaign_id}", response_model=schemas.CampaignDetail)
def read_campaign(campaign_id: str, db: Session = Depends(get_db)):
    """
    Get detailed information for a specific campaign.
    """
 
    campaign = crud.get_campaign(db, campaign_id)
    if campaign is None:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign

