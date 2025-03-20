from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from db import Base

class Investigation(Base):
    __tablename__ = "investigations"
    
    id = Column(Integer, primary_key=True, index=True)
    person_name = Column(String, index=True)
    additional_info = Column(Text, nullable=True)
    email = Column(String)
    country = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    documents = relationship("Document", back_populates="investigation")

class Document(Base):
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    file_path = Column(String)
    investigation_id = Column(Integer, ForeignKey("investigations.id"))
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    
    investigation = relationship("Investigation", back_populates="documents")

class Contact(Base):
    __tablename__ = "contacts"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    country = Column(String)
    message = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    