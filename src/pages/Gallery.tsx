import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDocuments } from '@/context/DocumentContext';
import { FileText, ExternalLink, Image, Video, Figma, FileIcon, Eye, Calendar } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Document } from '@/lib/mockData';
import { getSafeUrl, openSafeUrl } from '@/lib/safeUrl';

const iconMap = {
  pdf: FileText,
  link: ExternalLink,
  image: Image,
  video: Video,
  figma: Figma,
  notion: FileIcon,
  doc: FileText,
};

export function Gallery() {
  const { documents } = useDocuments();
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">
            Gallery
          </h1>
          <p className="text-muted-foreground">
            Browse all your shared documents
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => {
            const Icon = iconMap[doc.type];
            
            return (
              <Card
                key={doc.id}
                onClick={() => setSelectedDoc(doc)}
                className="group cursor-pointer overflow-hidden border-0 bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <CardContent className="p-0">
                  {/* Thumbnail */}
                  <div className="relative h-48 bg-gradient-to-br overflow-hidden">
                    {doc.thumbnail ? (
                      <img
                        src={doc.thumbnail}
                        alt={doc.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <Icon className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" />
                    
                    {/* Type badge */}
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-semibold px-2 py-1 rounded">
                      {doc.type}
                    </div>
                    
                    {/* Active indicator */}
                    {!doc.isActive && (
                      <div className="absolute bottom-2 left-2 bg-yellow-500/90 text-black text-xs font-semibold px-2 py-1 rounded">
                        Hidden
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4 space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-semibold line-clamp-2">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {doc.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {doc.clicks.toLocaleString()} views
                      </div>

                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(doc.uploadDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {documents.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <div className="text-2xl font-semibold text-muted-foreground">
              No documents to display
            </div>
          </div>
        )}

        {/* Preview Dialog */}
        <Dialog open={!!selectedDoc} onOpenChange={() => setSelectedDoc(null)}>
          <DialogContent className="max-w-2xl">
            {selectedDoc && (
              <div className="space-y-6">
                {/* Header */}
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">
                    {selectedDoc.title}
                  </h2>

                  <p className="text-muted-foreground">
                    {selectedDoc.description}
                  </p>
                </div>

                {/* Thumbnail */}
                {selectedDoc.thumbnail && (
                  <div className="rounded-lg overflow-hidden">
                    <img
                      src={selectedDoc.thumbnail}
                      alt={selectedDoc.title}
                      className="w-full h-auto"
                    />
                  </div>
                )}

                {/* Stats */}
                <div className="grid gap-4 grid-cols-3">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">
                      {selectedDoc.clicks}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Views
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-2xl font-bold capitalize">
                      {selectedDoc.type}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Type
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-lg font-bold">
                      {selectedDoc.isActive ? 'Active' : 'Hidden'}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Status
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <Button
                  onClick={() => openSafeUrl(selectedDoc.url)}
                  disabled={!getSafeUrl(selectedDoc.url)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Document
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
