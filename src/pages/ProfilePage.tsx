import { ProfileHeader } from '@/components/ProfileHeader';
import { DocumentCard } from '@/components/DocumentCard';
import { useDocuments } from '@/context/DocumentContext';
import { Terrain } from '@lucasmarkes/hairline/react';

export function ProfilePage() {
  const { documents, user } = useDocuments();
  const activeDocuments = documents.filter(doc => doc.isActive);

  const handleDocumentClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-8">
        {/* Profile Header */}
        <div className="w-full">
          <ProfileHeader {...user} />
        </div>

        {/* Documents Grid */}
        <div className="w-full">
          {activeDocuments.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
              <div className="text-2xl font-semibold text-muted-foreground">
                No documents shared yet.
              </div>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {activeDocuments.map((document) => (
                <DocumentCard
                  key={document.id}
                  document={document}
                  onClick={() => handleDocumentClick(document.url)}
                  showStats={false}
                />
              ))}
            </div>
          )}
        </div>

        {/* Hairline figure */}
        <div className="w-full max-w-xl">
          <Terrain play />
        </div>

        {/* Footer */}
        <div className="w-full border-t border-border pt-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="h-5 w-5 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600" />
            <p className="text-sm text-muted-foreground">
              Created with DocShare
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
