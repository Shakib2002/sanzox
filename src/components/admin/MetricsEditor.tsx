import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Metric {
  label: string;
  value: string;
}

interface MetricsEditorProps {
  value: Metric[];
  onChange: (metrics: Metric[]) => void;
  className?: string;
}

export function MetricsEditor({ value = [], onChange, className }: MetricsEditorProps) {
  const addMetric = () => {
    onChange([...value, { label: '', value: '' }]);
  };

  const updateMetric = (index: number, field: 'label' | 'value', newValue: string) => {
    const updated = value.map((metric, i) =>
      i === index ? { ...metric, [field]: newValue } : metric
    );
    onChange(updated);
  };

  const removeMetric = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className={className}>
      <div className="space-y-3">
        {value.map((metric, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              placeholder="Label (e.g., ROI)"
              value={metric.label}
              onChange={(e) => updateMetric(index, 'label', e.target.value)}
              className="flex-1"
            />
            <Input
              placeholder="Value (e.g., +250%)"
              value={metric.value}
              onChange={(e) => updateMetric(index, 'value', e.target.value)}
              className="flex-1"
            />
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => removeMetric(index)}
              className="shrink-0 text-muted-foreground hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={addMetric}
        className="mt-3 w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Metric
      </Button>

      {value.length === 0 && (
        <p className="text-xs text-muted-foreground mt-2 text-center">
          No metrics added. Click above to add key results.
        </p>
      )}
    </div>
  );
}
