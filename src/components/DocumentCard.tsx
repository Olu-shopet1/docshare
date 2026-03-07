import { Card, CardContent } from '@/components/ui/card';
import { FileText, ExternalLink, Image, Video, Figma, FileIcon, Eye } from 'lucide-react';
import { Document } from '@/lib/mockData';

interface DocumentCardProps {
  document: Document;
  onClick?: () => void;
  showStats?: boolean;
}

const iconMap = {
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

export function DocumentCard({ document, onClick, showStats = false }: DocumentCardProps) {
  const Icon = iconMap[document.type];
  const gradient = gradientMap[document.type];

  return (
    <Card
      onClick={onClick}
      className="group cursor-pointer overflow-hidden border-0 bg-gradient-to-br shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
    >
      <CardContent className="p-0">
        <div className="relative h-32 bg-gradient-to-br overflow-hidden flex items-center justify-center">
          {/* Icon */}
          <div
            className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className="h-12 w-12 text-white opacity-80" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 p-4 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
            <h3 className="font-semibold text-white">
              {document.title}
            </h3>

            <p className="text-sm text-white/80">
              {document.description}
            </p>

            {showStats && (
              <div className="flex items-center gap-1 mt-2 text-white/70">
                <Eye className="h-3 w-3" />
                {document.clicks.toLocaleString()} views
              </div>
            )}
          </div>

          {/* Arrow indicator */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ExternalLink className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Bottom shine effect */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
      </CardContent>
    </Card>
  );
}
