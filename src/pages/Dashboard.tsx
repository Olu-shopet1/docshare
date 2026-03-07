import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DocumentUpload } from '@/components/DocumentUpload';
import { useDocuments } from '@/context/DocumentContext';
import { Pencil, Trash2, Eye, EyeOff, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function Dashboard() {
  const { documents, deleteDocument, toggleDocumentActive } = useDocuments();
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your documents and links
            </p>
          </div>

          <Button
            onClick={() => setShowUpload(true)}
            className="bg-white text-purple-600 hover:bg-white/90 shadow-lg font-semibold gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Document
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-900">
                {documents.length}
              </CardTitle>
              <p className="mt-1 text-xs text-blue-700">
                Total Documents
              </p>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-green-900">
                {documents.filter(d => d.isActive).length}
              </CardTitle>
              <p className="mt-1 text-xs text-green-700">
                Active
              </p>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-purple-900">
                {documents.reduce((sum, doc) => sum + doc.clicks, 0).toLocaleString()}
              </CardTitle>
              <p className="mt-1 text-xs text-purple-700">
                Total Views
              </p>
            </CardHeader>
          </Card>
        </div>

        {/* Documents List */}
        <Card>
          <CardHeader>
            <CardTitle>Your Documents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {documents.length === 0 ? (
                <div className="flex items-center justify-center gap-2 py-12 text-center">
                  <div className="text-muted-foreground">
                    No documents yet. Add your first one!
                  </div>
                </div>
              ) : (
                documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between gap-4 rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold truncate">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {doc.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>
                          {doc.clicks} views
                        </span>
                        <span>
                          {doc.type}
                        </span>
                        <span className={doc.isActive ? 'text-green-600' : 'text-gray-400'}>
                          {doc.isActive ? 'Active' : 'Hidden'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleDocumentActive(doc.id)}
                        className="hover:bg-gray-100"
                      >
                        {doc.isActive ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeOff className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteDocument(doc.id)}
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Upload Dialog */}
        <Dialog open={showUpload} onOpenChange={setShowUpload}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Document</DialogTitle>
            </DialogHeader>
            <DocumentUpload onComplete={() => setShowUpload(false)} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
