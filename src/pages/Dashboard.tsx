import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DocumentUpload } from '@/components/DocumentUpload';
import { useDocuments } from '@/context/DocumentContext';
import { Trash2, Eye, EyeOff, Plus } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Document } from '@/lib/mockData';

export function Dashboard() {
  const { documents, deleteDocument, toggleDocumentActive } = useDocuments();
  const [showUpload, setShowUpload] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Document | null>(null);

  const stats = [
    { label: 'Total documents', value: documents.length },
    { label: 'Active', value: documents.filter((d) => d.isActive).length },
    { label: 'Total views', value: documents.reduce((sum, doc) => sum + doc.clicks, 0) },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your documents and links</p>
        </div>

        <Button onClick={() => setShowUpload(true)} className="gap-2 font-semibold">
          <Plus aria-hidden="true" className="h-4 w-4" />
          Add document
        </Button>
      </div>

      {/* Stats */}
      <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="flex flex-col-reverse gap-1 p-6">
            <dt className="text-xs text-muted-foreground">{stat.label}</dt>
            <dd className="text-2xl font-semibold tabular-nums">{stat.value.toLocaleString()}</dd>
          </Card>
        ))}
      </dl>

      {/* Documents list */}
      <Card>
        <CardHeader>
          <CardTitle>
            <h2>Your documents</h2>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">No documents yet. Add your first one!</p>
          ) : (
            <ul role="list" className="space-y-2">
              {documents.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center justify-between gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate font-semibold">{doc.title}</h3>
                    <p className="truncate text-sm text-muted-foreground">{doc.description}</p>
                    <p className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{doc.clicks.toLocaleString()} views</span>
                      <span>{doc.type}</span>
                      <span className={doc.isActive ? 'text-success' : undefined}>
                        {doc.isActive ? 'Active' : 'Hidden'}
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleDocumentActive(doc.id)}
                    >
                      {doc.isActive ? (
                        <EyeOff aria-hidden="true" className="h-4 w-4" />
                      ) : (
                        <Eye aria-hidden="true" className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {doc.isActive ? 'Hide' : 'Show'} {doc.title}
                      </span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setPendingDelete(doc)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 aria-hidden="true" className="h-4 w-4" />
                      <span className="sr-only">Delete {doc.title}</span>
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Upload dialog */}
      <Dialog open={showUpload} onOpenChange={setShowUpload}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new document</DialogTitle>
            <DialogDescription>Share a link to a file, page or design.</DialogDescription>
          </DialogHeader>
          <DocumentUpload onComplete={() => setShowUpload(false)} />
        </DialogContent>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!pendingDelete} onOpenChange={(open) => !open && setPendingDelete(null)}>
        <DialogContent role="alertdialog">
          <DialogHeader>
            <DialogTitle>Delete “{pendingDelete?.title}”?</DialogTitle>
            <DialogDescription>This removes it from your profile. You can’t undo this.</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={() => {
                if (pendingDelete) deleteDocument(pendingDelete.id);
                setPendingDelete(null);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
