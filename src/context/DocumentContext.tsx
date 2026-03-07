import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Document, UserProfile, mockDocuments, mockUser } from '@/lib/mockData';

interface DocumentContextType {
  documents: Document[];
  user: UserProfile;
  addDocument: (document: Omit<Document, 'id' | 'clicks' | 'uploadDate'>) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  toggleDocumentActive: (id: string) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export function DocumentProvider({ children }: { children: ReactNode }) {
  const [documents, setDocuments] = useState(mockDocuments);
  const [user] = useState(mockUser);

  const addDocument = (document: Omit<Document, 'id' | 'clicks' | 'uploadDate'>) => {
    const newDoc: Document = {
      ...document,
      id: Date.now().toString(),
      clicks: 0,
      uploadDate: new Date().toISOString(),
    };
    setDocuments(prev => [newDoc, ...prev]);
  };

  const updateDocument = (id: string, updates: Partial<Document>) => {
    setDocuments(prev =>
      prev.map(doc => (doc.id === id ? { ...doc, ...updates } : doc))
    );
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const toggleDocumentActive = (id: string) => {
    setDocuments(prev =>
      prev.map(doc => (doc.id === id ? { ...doc, isActive: !doc.isActive } : doc))
    );
  };

  return (
    <DocumentContext.Provider value={{ documents, user, addDocument, updateDocument, deleteDocument, toggleDocumentActive }}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments must be used within DocumentProvider');
  }
  return context;
}
