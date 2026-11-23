import { useState } from 'react';
import { Eye, Calendar, ExternalLink } from 'lucide-react';
import { useDocuments } from '@/context/DocumentContext';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { iconMap } from '@/components/DocumentCard';
import { Document } from '@/lib/mockData';
import { safeHref } from '@/lib/utils';

const dateFormat = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' });

export function Gallery() {
  const { documents } = useDocuments();
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Gallery</h1>
        <p className="text-muted-foreground">Browse all your shared documents</p>
      </div>

      {documents.length === 0 ? (
        <p className="py-12 text-center text-2xl font-semibold text-muted-foreground">
          No documents to display
        </p>
      ) : (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => {
            const Icon = iconMap[doc.type];
            return (
              <li key={doc.id}>
                {/* Clicking the card opens a preview (an action, not navigation),
                    so the stretched control is a <button>. */}
                <article className="card group h-full overflow-hidden rounded-lg bg-card text-card-foreground shadow-lg transition-shadow hover:shadow-2xl motion-safe:transition-[box-shadow,scale] motion-safe:duration-300 motion-safe:hover:scale-[1.02]">
                  <div className="relative overflow-hidden">
                    {doc.thumbnail ? (
                      <img
                        src={doc.thumbnail}
                        alt=""
                        width={400}
                        height={300}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[4/3] h-48 w-full object-cover motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-48 w-full items-center justify-center bg-muted">
                        <Icon aria-hidden="true" className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}

                    <span className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                      {doc.type}
                    </span>

                    {!doc.isActive && (
                      <span className="absolute bottom-2 left-2 rounded bg-yellow-400 px-2 py-1 text-xs font-semibold text-black">
                        Hidden
                      </span>
                    )}
                  </div>

                  <div className="space-y-3 p-4">
                    <div className="space-y-1">
                      <h2 className="line-clamp-2 font-semibold">
                        <button
                          type="button"
                          onClick={() => setSelectedDoc(doc)}
                          className="card-link text-start"
                        >
                          {doc.title}
                        </button>
                      </h2>
                      <p className="line-clamp-2 text-sm text-muted-foreground">{doc.description}</p>
                    </div>

                    <div className="flex items-center justify-between border-t pt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye aria-hidden="true" className="h-3 w-3" />
                        {doc.clicks.toLocaleString()} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar aria-hidden="true" className="h-3 w-3" />
                        <time dateTime={doc.uploadDate}>{dateFormat.format(new Date(doc.uploadDate))}</time>
                      </span>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}

      {/* Preview dialog */}
      <Dialog open={!!selectedDoc} onOpenChange={(open) => !open && setSelectedDoc(null)}>
        <DialogContent className="max-w-2xl">
          {selectedDoc && (
            <div className="space-y-6">
              <div className="space-y-2">
                <DialogTitle className="text-2xl font-bold">{selectedDoc.title}</DialogTitle>
                <DialogDescription>{selectedDoc.description}</DialogDescription>
              </div>

              {selectedDoc.thumbnail && (
                <img
                  src={selectedDoc.thumbnail}
                  alt=""
                  width={400}
                  height={300}
                  className="aspect-[4/3] h-auto w-full rounded-lg object-cover"
                />
              )}

              <dl className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <dt className="text-xs text-muted-foreground">Views</dt>
                  <dd className="text-2xl font-bold">{selectedDoc.clicks.toLocaleString()}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-xs text-muted-foreground">Type</dt>
                  <dd className="text-2xl font-bold capitalize">{selectedDoc.type}</dd>
                </div>
                <div className="space-y-1">
                  <dt className="text-xs text-muted-foreground">Status</dt>
                  <dd className="text-lg font-bold">{selectedDoc.isActive ? 'Active' : 'Hidden'}</dd>
                </div>
              </dl>

              {/* A real link (not window.open) so it can't hand the new tab control of this page. */}
              <a
                href={safeHref(selectedDoc.url)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-4 text-sm font-medium text-white hover:from-blue-700 hover:to-purple-700"
              >
                <ExternalLink aria-hidden="true" className="h-4 w-4" />
                Open document
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
