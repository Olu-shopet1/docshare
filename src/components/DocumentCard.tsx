import { FileText, ExternalLink, Image, Video, Figma, FileIcon, Eye } from 'lucide-react';
import { Document } from '@/lib/mockData';
import { safeHref } from '@/lib/utils';

interface DocumentCardProps {
  document: Document;
  showStats?: boolean;
}

export const iconMap = {
  pdf: FileText,
  link: ExternalLink,
  image: Image,
  video: Video,
  figma: Figma,
  notion: FileIcon,
  doc: FileText,
};

const gradientMap = {
  pdf: 'from-red-500 to-rose-600',
  link: 'from-blue-500 to-cyan-600',
  image: 'from-purple-500 to-pink-600',
  video: 'from-orange-500 to-red-600',
  figma: 'from-violet-500 to-purple-600',
  notion: 'from-gray-700 to-gray-900',
  doc: 'from-indigo-500 to-blue-600',
};

/**
 * A single-destination card: the heading link opens the document and is
 * stretched over the whole card, so the entire card is clickable while
 * staying a real, keyboard-reachable link.
 */
export function DocumentCard({ document, showStats = false }: DocumentCardProps) {
  const Icon = iconMap[document.type];
  const gradient = gradientMap[document.type];

  return (
    <article className="card group overflow-hidden rounded-lg bg-card text-card-foreground shadow-lg transition-shadow hover:shadow-xl motion-safe:transition-[box-shadow,scale] motion-safe:duration-300 motion-safe:hover:scale-105">
      <div
        aria-hidden="true"
        className={`flex h-32 items-center justify-center bg-gradient-to-br ${gradient}`}
      >
        <Icon className="h-12 w-12 text-white opacity-80 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110" />
      </div>

      <div className="space-y-1 p-4">
        <h3 className="font-semibold">
          <a
            href={safeHref(document.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="card-link inline-flex items-center gap-1.5"
          >
            {document.title}
            <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </h3>

        {document.description && (
          <p className="text-sm text-muted-foreground">{document.description}</p>
        )}

        {showStats && (
          <p className="flex items-center gap-1 pt-1 text-xs text-muted-foreground">
            <Eye aria-hidden="true" className="h-3 w-3" />
            {document.clicks.toLocaleString()} views
          </p>
        )}
      </div>
    </article>
  );
}
