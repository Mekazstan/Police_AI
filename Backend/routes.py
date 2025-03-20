from fastapi import APIRouter, HTTPException, UploadFile, Form, Depends
from datetime import datetime
from typing import Optional
import os
from models import Investigation, Document, Contact
from schema import ContactCreate, ContactResponse, InvestigationResponse
from db import get_db
from sqlalchemy.orm import Session

router = APIRouter()

UPLOAD_DIR = "./uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/api/investigations", response_model=InvestigationResponse, 
         description="Submit a new investigation with optional file upload")
async def create_investigation(
    personName: str = Form(..., min_length=1),
    additionalInfo: str = Form(""),
    email: str = Form(...),
    country: str = Form(..., min_length=1),
    file: Optional[UploadFile] = None,
    db: Session = Depends(get_db)
):
    if "@" not in email or "." not in email:
        raise HTTPException(status_code=422, detail="Invalid email format")
    
    db_investigation = Investigation(
        person_name=personName,
        additional_info=additionalInfo,
        email=email,
        country=country
    )
    db.add(db_investigation)
    db.commit()
    db.refresh(db_investigation)
    
    document_id = None
    document_filename = None
    
    if file:
        try:
            file_extension = os.path.splitext(file.filename)[1]
            unique_filename = f"{db_investigation.id}_{datetime.now().strftime('%Y%m%d%H%M%S')}{file_extension}"
            file_path = os.path.join(UPLOAD_DIR, unique_filename)
            
            with open(file_path, "wb") as buffer:
                contents = await file.read()
                buffer.write(contents)
            
            db_document = Document(
                filename=file.filename,
                file_path=file_path,
                investigation_id=db_investigation.id
            )
            db.add(db_document)
            db.commit()
            db.refresh(db_document)
            
            document_id = db_document.id
            document_filename = file.filename
            
        except Exception as e:
            print(f"Error uploading file: {str(e)}")
    
    return {
        "id": db_investigation.id,
        "person_name": db_investigation.person_name,
        "email": db_investigation.email,
        "country": db_investigation.country,
        "document_id": document_id,
        "document_filename": document_filename,
        "created_at": db_investigation.created_at
    }

@router.post("/api/contacts", response_model=ContactResponse, 
         description="Submit a contact message")
def create_contact(contact: ContactCreate, db: Session = Depends(get_db)):
    db_contact = Contact(
        name=contact.name,
        country=contact.country,
        message=contact.message
    )
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

@router.get("/api/health", description="Health check endpoint")
def health_check():
    return {"status": "ok", "message": "API is running"}

