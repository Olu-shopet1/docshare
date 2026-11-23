import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDocuments } from '@/context/DocumentContext';
import { GripVertical, Eye, Settings, Palette, Save } from 'lucide-react';

type Section = {
  id: string;
  type: 'hero' | 'documents' | 'about' | 'contact';
  enabled: boolean;
};

export function PageBuilder() {
  const { user } = useDocuments();
  const [sections, setSections] = useState<Section[]>([
    { id: '1', type: 'hero', enabled: true },
    { id: '2', type: 'documents', enabled: true },
    { id: '3', type: 'about', enabled: true },
    { id: '4', type: 'contact', enabled: false },
  ]);

  const [theme, setTheme] = useState({
    primaryColor: '#6366f1',
    secondaryColor: '#ec4899',
    backgroundColor: '#ffffff',
  });

  const [previewMode, setPreviewMode] = useState(false);

  const toggleSection = (id: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === id ? { ...section, enabled: !section.enabled } : section
      )
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">
              Page Builder
            </h1>
            <p className="text-muted-foreground">
              Customize your profile page layout
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setPreviewMode(!previewMode)}
              variant="outline"
              aria-pressed={previewMode}
            >
              <Eye aria-hidden="true" className="h-4 w-4" />
              Preview
            </Button>
            <Button className="gap-2">
              <Save aria-hidden="true" className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* Settings Panel */}
          {!previewMode && (
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>
                    <h2 className="flex items-center gap-2">
                      <Settings aria-hidden="true" className="h-4 w-4" />
                      Settings
                    </h2>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="sections" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="sections">
                        Sections
                      </TabsTrigger>
                      <TabsTrigger value="theme">
                        Theme
                      </TabsTrigger>
                    </TabsList>

                    {/* Sections Tab */}
                    <TabsContent value="sections" className="space-y-4 mt-4">
                      {sections.map((section) => (
                        <div key={section.id} className="flex items-center justify-between gap-2 p-3 border rounded-lg">
                          <div className="flex items-center gap-3 flex-1">
                            <GripVertical aria-hidden="true" className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="font-semibold capitalize">
                                {section.type}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {section.enabled ? 'Visible' : 'Hidden'}
                              </p>
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSection(section.id)}
                          >
                            {section.enabled ? 'Hide' : 'Show'}
                            <span className="sr-only"> {section.type} section</span>
                          </Button>
                        </div>
                      ))}
                    </TabsContent>

                    {/* Theme Tab */}
                    <TabsContent value="theme" className="space-y-4 mt-4">
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="primaryColor">Primary Color</Label>
                          <Input
                            id="primaryColor"
                            type="color"
                            value={theme.primaryColor}
                            onChange={(e) =>
                              setTheme(prev => ({ ...prev, primaryColor: e.target.value }))
                            }
                            className="h-12 cursor-pointer"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="secondaryColor">Secondary Color</Label>
                          <Input
                            id="secondaryColor"
                            type="color"
                            value={theme.secondaryColor}
                            onChange={(e) =>
                              setTheme(prev => ({ ...prev, secondaryColor: e.target.value }))
                            }
                            className="h-12 cursor-pointer"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="backgroundColor">Background Color</Label>
                          <Input
                            id="backgroundColor"
                            type="color"
                            value={theme.backgroundColor}
                            onChange={(e) =>
                              setTheme(prev => ({ ...prev, backgroundColor: e.target.value }))
                            }
                            className="h-12 cursor-pointer"
                          />
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm font-medium">Preview</p>
                          <div
                            aria-hidden="true"
                            className="w-full h-32 rounded-lg border"
                            style={{
                              backgroundColor: theme.backgroundColor,
                            }}
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Preview Panel */}
          <div className={previewMode ? 'lg:col-span-3' : 'lg:col-span-2'}>
            <Card>
              <CardHeader>
                <CardTitle>
                  <h2 className="flex items-center gap-2">
                    <Eye aria-hidden="true" className="h-4 w-4" />
                    Live Preview
                  </h2>
                </CardTitle>
              </CardHeader>
              <CardContent
                style={{
                  backgroundColor: theme.backgroundColor,
                }}
                className="rounded-lg space-y-8 p-6 text-neutral-950 [color-scheme:light]"
              >
                {/* Hero Section */}
                {sections.find(s => s.type === 'hero')?.enabled && (
                  <div className="flex flex-col items-center gap-4 py-8">
                    <div
                      aria-hidden="true"
                      className="w-24 h-24 rounded-full"
                      style={{ backgroundColor: theme.primaryColor }}
                    />

                    <div className="text-center space-y-2">
                      <p className="text-3xl font-bold">
                        {user.name}
                      </p>
                      <p className="text-neutral-600">
                        {user.bio}
                      </p>
                    </div>
                  </div>
                )}

                {/* Documents Section */}
                {sections.find(s => s.type === 'documents')?.enabled && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">My Links</h3>
                    <div className="grid gap-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="p-4 rounded-lg"
                          style={{ backgroundColor: theme.secondaryColor }}
                        >
                          <p className="font-semibold">Sample Document {i}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* About Section */}
                {sections.find(s => s.type === 'about')?.enabled && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">About</h3>
                    <div className="p-4 border rounded-lg">
                      <p className="text-neutral-600">
                        This is a customizable about section where you can share more details about yourself, your work, or your interests.
                      </p>
                    </div>
                  </div>
                )}

                {/* Contact Section */}
                {sections.find(s => s.type === 'contact')?.enabled && (
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Get in Touch</h3>
                    <div className="p-4 border rounded-lg">
                      <p className="text-neutral-600">
                        Contact form would go here
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
