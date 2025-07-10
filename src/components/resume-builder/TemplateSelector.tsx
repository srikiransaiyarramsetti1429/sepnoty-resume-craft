
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import { ResumeData, ResumeTemplate } from "@/types/resume";

interface TemplateSelectorProps {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
  selectedTemplate: ResumeTemplate;
  setSelectedTemplate: (template: ResumeTemplate) => void;
}

const templates = [
  {
    id: 'modern' as ResumeTemplate,
    name: 'Modern',
    description: 'Clean and contemporary design with subtle colors',
    preview: 'bg-gradient-to-br from-blue-50 to-white',
  },
  {
    id: 'classic' as ResumeTemplate,
    name: 'Classic',
    description: 'Traditional format preferred by conservative industries',
    preview: 'bg-gradient-to-br from-gray-50 to-white',
  },
  {
    id: 'creative' as ResumeTemplate,
    name: 'Creative',
    description: 'Bold design for creative and design roles',
    preview: 'bg-gradient-to-br from-purple-50 to-pink-50',
  },
  {
    id: 'minimal' as ResumeTemplate,
    name: 'Minimal',
    description: 'Simple and clean with focus on content',
    preview: 'bg-white border-2 border-gray-200',
  },
  {
    id: 'professional' as ResumeTemplate,
    name: 'Professional',
    description: 'Corporate-friendly with excellent ATS compatibility',
    preview: 'bg-gradient-to-br from-slate-50 to-white',
  },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ 
  selectedTemplate, 
  setSelectedTemplate 
}) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Template</h2>
        <p className="text-gray-600">Select a resume template that matches your industry and personal style</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedTemplate === template.id
                ? 'ring-2 ring-primary border-primary shadow-lg'
                : 'border-gray-200 hover:border-primary'
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            <div className="relative">
              {selectedTemplate === template.id && (
                <div className="absolute top-2 right-2 text-primary">
                  <CheckCircle className="h-5 w-5" />
                </div>
              )}
              
              <div className={`h-32 w-full rounded-lg mb-3 ${template.preview} flex items-center justify-center`}>
                <div className="text-center">
                  <div className="h-2 w-16 bg-gray-300 rounded mb-2 mx-auto"></div>
                  <div className="h-1 w-12 bg-gray-200 rounded mb-1 mx-auto"></div>
                  <div className="h-1 w-14 bg-gray-200 rounded mb-1 mx-auto"></div>
                  <div className="h-1 w-10 bg-gray-200 rounded mx-auto"></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-lg font-semibold text-gray-900">
                  {template.name}
                </Label>
                <p className="text-sm text-gray-600">
                  {template.description}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h4 className="font-medium text-green-900 mb-2">✅ All Templates Include</h4>
        <ul className="text-sm text-green-800 space-y-1">
          <li>• ATS-compatible formatting</li>
          <li>• Professional typography</li>
          <li>• Mobile-responsive design</li>
          <li>• PDF and DOCX export</li>
        </ul>
      </div>
    </div>
  );
};

export default TemplateSelector;
