from sqlalchemy.orm import Session
from sqlalchemy import and_
from datetime import datetime
from typing import Optional
from . import models


def count_campaigns(
    db: Session,
    tipo_campania: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
):
    query = db.query(models.Campaign)

    if tipo_campania:
        query = query.filter(models.Campaign.tipo_campania == tipo_campania)
    
    if start_date and end_date:
        query = query.filter(
            and_(
                models.Campaign.fecha_inicio <= end_date,
                models.Campaign.fecha_fin >= start_date
            )
        )

    return query.count()


def get_campaigns(
    db: Session,
    skip: int = 0,
    limit: int = 5,
    tipo_campania: Optional[str] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
):
  
    query = db.query(models.Campaign)
    
    if tipo_campania:
        query = query.filter(models.Campaign.tipo_campania == tipo_campania)
   
   
    if start_date and end_date:
        query = query.filter(
            and_(
                models.Campaign.fecha_inicio <= end_date,
                models.Campaign.fecha_fin >= start_date
            )
        )
   
    return query.offset(skip).limit(limit).all()

def get_campaign(db: Session, campaign_id: str):
    query = db.query(models.Campaign).filter(models.Campaign.name == campaign_id).first()
    return query

def search_campaigns_by_date(
    db: Session,
    start_date: datetime,
    end_date: datetime,
    skip: int = 0,
    limit: int = 10
):
    return db.query(models.Campaign).filter(
        and_(
            models.Campaign.fecha_inicio <= end_date,
            models.Campaign.fecha_fin >= start_date
        )
    ).offset(skip).limit(limit).all()


def count_campaigns_by_date(
    db: Session,
    start_date: datetime,
    end_date: datetime
):
    return db.query(models.Campaign).filter(
        and_(
            models.Campaign.fecha_inicio <= end_date,
            models.Campaign.fecha_fin >= start_date
        )
    ).count()