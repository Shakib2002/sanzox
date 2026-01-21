import { useState, useEffect } from 'react';
import { Upload, Video, Image, Loader2, Trash2, Type, Link as LinkIcon, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSiteSettings, useUpdateSiteSettings, defaultSiteSettings, SiteSettings } from '@/hooks/useSiteSettings';
import { supabase } from '@/integrations/supabase/client';

export default function AdminSettings() {
  const { data: settings, isLoading } = useSiteSettings();
  const updateSettings = useUpdateSiteSettings();
  
  const [formData, setFormData] = useState<SiteSettings>(defaultSiteSettings);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingHeroImage, setUploadingHeroImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleChange = (field: keyof SiteSettings, value: string | boolean | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'logo_url' | 'hero_image_url' | 'hero_video_url',
    type: 'image' | 'video',
    setUploading: (val: boolean) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isVideo = type === 'video';
    const maxSize = isVideo ? 50 : 10;
    const expectedType = isVideo ? 'video/' : 'image/';

    if (!file.type.startsWith(expectedType)) {
      toast.error(`Please upload a ${type} file`);
      return;
    }

    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File must be less than ${maxSize}MB`);
      return;
    }

    setUploading(true);

    try {
      const fileName = `${field}-${Date.now()}.${file.name.split('.').pop()}`;
      
      const { error: uploadError } = await supabase.storage
        .from('services')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('services')
        .getPublicUrl(fileName);

      handleChange(field, urlData.publicUrl);
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`Failed to upload ${type}`);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateSettings.mutateAsync(formData);
      toast.success('Settings saved successfully');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save settings');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-2">Site Settings</h1>
        <p className="text-muted-foreground">Configure your website appearance and content.</p>
      </div>

      <Tabs defaultValue="branding" className="space-y-6">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        {/* Branding Tab */}
        <TabsContent value="branding">
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Branding</h2>
            </div>

            <div className="space-y-6">
              {/* Logo Upload */}
              <div className="space-y-3">
                <Label>Logo</Label>
                <p className="text-sm text-muted-foreground">
                  Upload your logo. Leave empty to use text logo.
                </p>
                
                {formData.logo_url ? (
                  <div className="space-y-3">
                    <div className="relative rounded-lg overflow-hidden bg-secondary p-4 inline-block">
                      <img 
                        src={formData.logo_url} 
                        alt="Logo preview"
                        className="h-12 w-auto object-contain"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleChange('logo_url', null)}>
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                      <label className="cursor-pointer">
                        <Button variant="outline" size="sm" asChild>
                          <span><Upload className="w-4 h-4 mr-2" />Replace</span>
                        </Button>
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileUpload(e, 'logo_url', 'image', setUploadingLogo)}
                          disabled={uploadingLogo}
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="cursor-pointer block max-w-md">
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      {uploadingLogo ? (
                        <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Click to upload logo</p>
                        </>
                      )}
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 'logo_url', 'image', setUploadingLogo)}
                      disabled={uploadingLogo}
                    />
                  </label>
                )}
              </div>

              {/* Site Name */}
              <div className="space-y-2">
                <Label>Site Name</Label>
                <Input
                  value={formData.site_name}
                  onChange={(e) => handleChange('site_name', e.target.value)}
                  placeholder="SANZOX"
                  className="max-w-md"
                />
              </div>

              {/* Tagline */}
              <div className="space-y-2">
                <Label>Tagline</Label>
                <Input
                  value={formData.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  placeholder="AI-Powered Digital Agency"
                  className="max-w-md"
                />
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Hero Section Tab */}
        <TabsContent value="hero">
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <Type className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Hero Section</h2>
            </div>

            <div className="space-y-8">
              {/* Hero Text */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Headline Prefix</Label>
                  <Input
                    value={formData.hero_headline}
                    onChange={(e) => handleChange('hero_headline', e.target.value)}
                    placeholder="Your Pro Team for"
                    className="max-w-md"
                  />
                  <p className="text-xs text-muted-foreground">
                    This appears before the animated service names
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={formData.hero_description}
                    onChange={(e) => handleChange('hero_description', e.target.value)}
                    placeholder="We specialize in..."
                    className="max-w-lg min-h-[100px]"
                  />
                </div>
              </div>

              <div className="border-t border-border pt-6">
                {/* Hero Image */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Image className="w-4 h-4 text-muted-foreground" />
                    <Label>Hero Image</Label>
                  </div>
                  
                  {formData.hero_image_url ? (
                    <div className="space-y-3">
                      <div className="relative rounded-lg overflow-hidden bg-secondary aspect-video max-w-sm">
                        <img src={formData.hero_image_url} alt="Hero preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleChange('hero_image_url', null)}>
                          <Trash2 className="w-4 h-4 mr-2" />Remove
                        </Button>
                        <label className="cursor-pointer">
                          <Button variant="outline" size="sm" asChild>
                            <span><Upload className="w-4 h-4 mr-2" />Replace</span>
                          </Button>
                          <Input type="file" accept="image/*" className="hidden"
                            onChange={(e) => handleFileUpload(e, 'hero_image_url', 'image', setUploadingHeroImage)}
                            disabled={uploadingHeroImage}
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer block max-w-sm">
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        {uploadingHeroImage ? (
                          <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Click to upload image</p>
                          </>
                        )}
                      </div>
                      <Input type="file" accept="image/*" className="hidden"
                        onChange={(e) => handleFileUpload(e, 'hero_image_url', 'image', setUploadingHeroImage)}
                        disabled={uploadingHeroImage}
                      />
                    </label>
                  )}
                </div>

                {/* Video Background */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-muted-foreground" />
                        <Label htmlFor="video-toggle">Video Background</Label>
                      </div>
                      <p className="text-sm text-muted-foreground">Use video instead of image</p>
                    </div>
                    <Switch
                      id="video-toggle"
                      checked={formData.hero_video_enabled}
                      onCheckedChange={(val) => handleChange('hero_video_enabled', val)}
                    />
                  </div>

                  {formData.hero_video_url ? (
                    <div className="space-y-3">
                      <div className="relative rounded-lg overflow-hidden bg-secondary aspect-video max-w-sm">
                        <video src={formData.hero_video_url} className="w-full h-full object-cover" controls muted />
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleChange('hero_video_url', null)}>
                          <Trash2 className="w-4 h-4 mr-2" />Remove
                        </Button>
                        <label className="cursor-pointer">
                          <Button variant="outline" size="sm" asChild>
                            <span><Upload className="w-4 h-4 mr-2" />Replace</span>
                          </Button>
                          <Input type="file" accept="video/*" className="hidden"
                            onChange={(e) => handleFileUpload(e, 'hero_video_url', 'video', setUploadingVideo)}
                            disabled={uploadingVideo}
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer block max-w-sm">
                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                        {uploadingVideo ? (
                          <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
                        ) : (
                          <>
                            <Video className="w-6 h-6 text-muted-foreground mx-auto mb-2" />
                            <p className="text-sm text-muted-foreground">Click to upload video (max 50MB)</p>
                          </>
                        )}
                      </div>
                      <Input type="file" accept="video/*" className="hidden"
                        onChange={(e) => handleFileUpload(e, 'hero_video_url', 'video', setUploadingVideo)}
                        disabled={uploadingVideo}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Social Links Tab */}
        <TabsContent value="social">
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <LinkIcon className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Social Media Links</h2>
            </div>

            <div className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label>Twitter / X</Label>
                <Input
                  value={formData.social_twitter}
                  onChange={(e) => handleChange('social_twitter', e.target.value)}
                  placeholder="https://twitter.com/yourhandle"
                />
              </div>

              <div className="space-y-2">
                <Label>LinkedIn</Label>
                <Input
                  value={formData.social_linkedin}
                  onChange={(e) => handleChange('social_linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>

              <div className="space-y-2">
                <Label>Instagram</Label>
                <Input
                  value={formData.social_instagram}
                  onChange={(e) => handleChange('social_instagram', e.target.value)}
                  placeholder="https://instagram.com/yourhandle"
                />
              </div>

              <div className="space-y-2">
                <Label>YouTube</Label>
                <Input
                  value={formData.social_youtube}
                  onChange={(e) => handleChange('social_youtube', e.target.value)}
                  placeholder="https://youtube.com/@yourchannel"
                />
              </div>
            </div>
          </GlassCard>
        </TabsContent>

        {/* Footer Tab */}
        <TabsContent value="footer">
          <GlassCard>
            <div className="flex items-center gap-3 mb-6">
              <Type className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold">Footer Content</h2>
            </div>

            <div className="space-y-4 max-w-lg">
              <div className="space-y-2">
                <Label>Footer Description</Label>
                <Textarea
                  value={formData.footer_description}
                  onChange={(e) => handleChange('footer_description', e.target.value)}
                  placeholder="Your pro team for automation-driven growth..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Contact Email</Label>
                <Input
                  value={formData.footer_email}
                  onChange={(e) => handleChange('footer_email', e.target.value)}
                  placeholder="hello@sanzox.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Location</Label>
                <Textarea
                  value={formData.footer_location}
                  onChange={(e) => handleChange('footer_location', e.target.value)}
                  placeholder="Remote-First Agency&#10;Serving clients worldwide"
                  className="min-h-[60px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Copyright Text</Label>
                <Input
                  value={formData.footer_copyright}
                  onChange={(e) => handleChange('footer_copyright', e.target.value)}
                  placeholder="SANZOX. All rights reserved."
                />
              </div>
            </div>
          </GlassCard>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={updateSettings.isPending} className="px-8">
          {updateSettings.isPending ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving...</>
          ) : (
            'Save Settings'
          )}
        </Button>
      </div>
    </div>
  );
}
