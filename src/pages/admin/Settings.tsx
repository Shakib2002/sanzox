import { useState, useEffect } from 'react';
import { Upload, Video, Loader2, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useHeroSettings, useUpdateHeroSettings } from '@/hooks/useHeroSettings';
import { supabase } from '@/integrations/supabase/client';

export default function AdminSettings() {
  const { data: settings, isLoading } = useHeroSettings();
  const updateSettings = useUpdateHeroSettings();
  
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (settings) {
      setVideoEnabled(settings.video_enabled);
      setVideoUrl(settings.video_url);
    }
  }, [settings]);

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      toast.error('Please upload a video file');
      return;
    }

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast.error('Video must be less than 50MB');
      return;
    }

    setUploading(true);

    try {
      const fileName = `hero-video-${Date.now()}.${file.name.split('.').pop()}`;
      
      const { error: uploadError } = await supabase.storage
        .from('services')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from('services')
        .getPublicUrl(fileName);

      setVideoUrl(urlData.publicUrl);
      toast.success('Video uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload video');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveVideo = () => {
    setVideoUrl(null);
  };

  const handleSave = async () => {
    try {
      await updateSettings.mutateAsync({
        video_enabled: videoEnabled,
        video_url: videoUrl,
      });
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
        <p className="text-muted-foreground">Configure your website appearance and behavior.</p>
      </div>

      {/* Hero Section Settings */}
      <GlassCard>
        <div className="flex items-center gap-3 mb-6">
          <Video className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Hero Section</h2>
        </div>

        <div className="space-y-6">
          {/* Video Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="video-toggle">Video Background</Label>
              <p className="text-sm text-muted-foreground">
                Enable a video background for the hero section
              </p>
            </div>
            <Switch
              id="video-toggle"
              checked={videoEnabled}
              onCheckedChange={setVideoEnabled}
            />
          </div>

          {/* Video Upload */}
          <div className="space-y-3">
            <Label>Hero Video</Label>
            
            {videoUrl ? (
              <div className="space-y-3">
                <div className="relative rounded-lg overflow-hidden bg-secondary aspect-video max-w-md">
                  <video 
                    src={videoUrl} 
                    className="w-full h-full object-cover"
                    controls
                    muted
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveVideo}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                  <label className="cursor-pointer">
                    <Button variant="outline" size="sm" asChild>
                      <span>
                        <Upload className="w-4 h-4 mr-2" />
                        Replace
                      </span>
                    </Button>
                    <Input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={handleVideoUpload}
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>
            ) : (
              <label className="cursor-pointer block">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                  {uploading ? (
                    <div className="flex flex-col items-center gap-2">
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      <p className="text-sm text-muted-foreground">Uploading...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload a video (max 50MB)
                      </p>
                      <p className="text-xs text-muted-foreground">
                        MP4, WebM, or MOV recommended
                      </p>
                    </div>
                  )}
                </div>
                <Input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleVideoUpload}
                  disabled={uploading}
                />
              </label>
            )}
          </div>

          {/* Preview Note */}
          {videoEnabled && !videoUrl && (
            <p className="text-sm text-warning bg-warning/10 border border-warning/20 rounded-lg px-4 py-3">
              ⚠️ Video background is enabled but no video is uploaded. The default image will be shown.
            </p>
          )}
        </div>
      </GlassCard>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSave}
          disabled={updateSettings.isPending}
          className="px-8"
        >
          {updateSettings.isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Settings'
          )}
        </Button>
      </div>
    </div>
  );
}
