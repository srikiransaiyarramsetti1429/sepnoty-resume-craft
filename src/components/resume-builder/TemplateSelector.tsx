
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { ResumeTemplate } from "@/types/resume";

interface TemplateSelectorProps {
  selectedTemplate: ResumeTemplate;
  setSelectedTemplate: (template: ResumeTemplate) => void;
}

const templates = [
  {
    id: 'modern' as ResumeTemplate,
    name: 'Modern',
    description: 'Clean and contemporary design with subtle accents',
    preview: 'Perfect for tech and creative roles',
  },
  {
    id: 'classic' as ResumeTemplate,
    name: 'Classic',
    description: 'Traditional layout with professional styling',
    preview: 'Ideal for corporate and finance positions',
  },
  {
    id: 'creative' as ResumeTemplate,
    name: 'Creative',
    description: 'Eye-catching design with modern elements',
    preview: 'Great for design and marketing roles',
  },
  {
    id: 'minimal' as ResumeTemplate,
    name: 'Minimal',
    description: 'Simple and clean with focus on content',
    preview: 'Works well for any industry',
  },
  {
    id: 'professional' as ResumeTemplate,
    name: 'Professional',
    description: 'Formal layout optimized for ATS systems',
    preview: 'Best for government and traditional roles',
  },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  setSelectedTemplate,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-semibold">Choose Your Resume Template</Label>
        <p className="text-gray-600 mt-2">
          Select a template that best fits your industry and personal style. All templates are ATS-compatible.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.id
                ? 'border-2 border-primary bg-primary/5'
                : 'border-2 border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <Badge 
                  variant="secondary" 
                  className="mt-1 bg-accent/10 text-accent"
                >
                  ATS-Optimized
                </Badge>
              </div>
              {selectedTemplate === template.id && (
                <div className="bg-primary text-white rounded-full p-1">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
            
            <p className="text-gray-600 mb-2">{template.description}</p>
            <p className="text-sm text-gray-500 italic">{template.preview}</p>
            
            {/* Template Preview Placeholder */}
            <div className="mt-4 bg-gray-100 h-32 rounded-lg flex items-center justify-center">
              <span className="text-gray-500 text-sm">Template Preview</span>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Template Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• All templates are designed to pass ATS (Applicant Tracking System) scans</li>
          <li>• You can always switch templates later without losing your content</li>
          <li>• Choose based on your industry: Creative for design roles, Professional for corporate</li>
          <li>• Modern and Minimal work well for most tech positions</li>
        </ul>
      </div>
    </div>
  );
};

export default TemplateSelector;
