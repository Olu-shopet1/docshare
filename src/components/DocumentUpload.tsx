import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X, FileText, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { useDocuments } from '@/context/DocumentContext';
import { getSafeUrl } from '@/lib/safeUrl';

const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 500;
const MAX_URL_LENGTH = 2048;

export function DocumentUpload({ onComplete }: { onComplete?: () => void }) {
  const { addDocument } = useDocuments();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<'pdf' | 'link' | 'image' | 'video' | 'figma' | 'notion' | 'doc'>('link');
  const [isDragging, setIsDragging] = useState(false);
  const [urlError, setUrlError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = title.trim().slice(0, MAX_TITLE_LENGTH);
    const cleanDescription = description.trim().slice(0, MAX_DESCRIPTION_LENGTH);
    const safeUrl = getSafeUrl(url.slice(0, MAX_URL_LENGTH));
    if (!cleanTitle) return;
    if (!safeUrl) {
      setUrlError('Please enter a full link starting with http:// or https://');
      return;
    }

    addDocument({
      title: cleanTitle,
      description: cleanDescription,
      url: safeUrl,
      type,
      isActive: true,
    });

    // Reset form
    setTitle('');
    setDescription('');
    setUrl('');
    setUrlError('');
    onComplete?.();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Handle file drop if needed
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="e.g., My Resume"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={MAX_TITLE_LENGTH}
          required
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Add a description for your document"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={MAX_DESCRIPTION_LENGTH}
        />
      </div>

      {/* Type */}
      <div className="space-y-2">
        <Label htmlFor="type">Document Type</Label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value as typeof type)}
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          <option value="pdf">PDF</option>
          <option value="link">Link</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="figma">Figma</option>
          <option value="notion">Notion</option>
          <option value="doc">Document</option>
        </select>
      </div>

      {/* URL/Link */}
      <div className="space-y-2">
        <Label htmlFor="url">URL</Label>
        <Input
          id="url"
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setUrlError('');
          }}
          maxLength={MAX_URL_LENGTH}
          aria-invalid={!!urlError}
          aria-describedby={urlError ? 'url-error' : undefined}
          required
        />
        {urlError && (
          <p id="url-error" className="text-sm text-destructive">
            {urlError}
          </p>
        )}
      </div>

      {/* Drag and Drop Area */}
      <Card
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed cursor-pointer transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-border'
        }`}
      >
        <CardContent className="flex flex-col items-center justify-center gap-2 py-8">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium">Drag and drop a file here</p>
          <p className="text-xs text-muted-foreground">or click to browse</p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button type="submit" className="w-full" disabled={!title.trim() || !url.trim()}>
        <Upload className="h-4 w-4" />
        Upload Document
      </Button>
    </form>
  );
}
