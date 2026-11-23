import { ProfileHeader } from '@/components/ProfileHeader';
import { DocumentCard } from '@/components/DocumentCard';
import { useDocuments } from '@/context/DocumentContext';

export function ProfilePage() {
  const { documents, user } = useDocuments();
  const activeDocuments = documents.filter((doc) => doc.isActive);

  return (
    <div className="flex flex-col items-center gap-8">
      <ProfileHeader {...user} />

      <section aria-labelledby="shared-heading" className="w-full">
        <h2 id="shared-heading" className="sr-only">
          Shared documents
        </h2>
        {activeDocuments.length === 0 ? (
          <p className="py-12 text-center text-2xl font-semibold text-muted-foreground">
            No documents shared yet.
          </p>
        ) : (
          <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeDocuments.map((document) => (
              <li key={document.id}>
                <DocumentCard document={document} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <footer className="w-full border-t border-border pt-8 text-center">
        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span aria-hidden="true" className="h-5 w-5 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600" />
          Created with DocShare
        </p>
      </footer>
    </div>
  );
}
