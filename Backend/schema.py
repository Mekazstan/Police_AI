from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class ContactCreate(BaseModel):
    name: str = Field(..., min_length=1, description="Contact person's name")
    country: str = Field(..., min_length=1, description="Country of origin")
    message: str = Field(..., min_length=1, description="Contact message content")

class ContactResponse(BaseModel):
    id: int
    name: str
    country: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class InvestigationResponse(BaseModel):
    id: int
    person_name: str
    email: str
    country: str
    document_id: Optional[int] = None
    document_filename: Optional[str] = None
    created_at: datetime
    
    class Config:
        from_attributes = True
        
        