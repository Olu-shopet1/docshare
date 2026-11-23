import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, AlertCircle } from 'lucide-react';
import { useDocuments } from '@/context/DocumentContext';
import { Document } from '@/lib/mockData';

/**
 * Keeps aria-invalid / aria-describedby in step with the CSS :user-invalid
 * state, so screen readers hear the same error that sighted users see.
 */
function syncValidity(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
  const invalid = el.matches(':user-invalid');
  el.setAttribute('aria-invalid', String(invalid));
  const errorId = el.dataset.error;
  if (!errorId) return;
  const ids = (el.getAttribute('aria-describedby') ?? '').split(/\s+/).filter((id) => id && id !== errorId);
  if (invalid) ids.push(errorId);
  if (ids.length) el.setAttribute('aria-describedby', ids.join(' '));
  else el.removeAttribute('aria-describedby');
}

const validityHandlers = {
  'aria-invalid': false,
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => syncValidity(e.currentTarget),
  onInvalid: (e: React.FormEvent<HTMLInputElement>) => syncValidity(e.currentTarget),
  onInput: (e: React.FormEvent<HTMLInputElement>) => {
    if (e.currentTarget.getAttribute('aria-invalid') === 'true') syncValidity(e.currentTarget);
  },
} as const;

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} className="error-msg items-center gap-1.5 text-sm text-destructive">
      <AlertCircle role="img" aria-label="Error" className="h-4 w-4 shrink-0" />
      {children}
    </p>
  );
}

export function DocumentUpload({ onComplete }: { onComplete?: () => void }) {
  const { addDocument } = useDocuments();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [type, setType] = useState<Document['type']>('link');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDocument({ title, description, url, type, isActive: true });
    setTitle('');
    setDescription('');
    setUrl('');
    onComplete?.();
  };

  return (
    // The browser checks required fields and the URL format before this submits.
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="e.g. My resume"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          data-error="title-error"
          {...validityHandlers}
        />
        <FieldError id="title-error">Enter a title for your document.</FieldError>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="field-sizing-content max-h-[10lh] min-h-[3lh]"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="type">Document type</Label>
        <select
          id="type"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value as Document['type'])}
          className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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

      <div className="space-y-2">
        <Label htmlFor="url">Web address</Label>
        <p id="url-hint" className="text-xs text-muted-foreground">
          Starts with https://
        </p>
        <Input
          id="url"
          name="url"
          type="url"
          inputMode="url"
          placeholder="https://example.com"
          pattern="https?://.+"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          aria-describedby="url-hint"
          data-error="url-error"
          {...validityHandlers}
        />
        <FieldError id="url-error">Enter a web address that starts with https://, for example https://example.com.</FieldError>
      </div>

      <Button type="submit" className="w-full">
        <Plus aria-hidden="true" className="h-4 w-4" />
        Add document
      </Button>
    </form>
  );
}
