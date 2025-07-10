
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, Sparkles } from "lucide-react";
import { ResumeData, Experience } from "@/types/resume";
import { toast } from "sonner";

interface ExperienceFormProps {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, updateData }) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: [''],
    };

    updateData({
      ...data,
      experience: [...data.experience, newExperience],
    });
  };

  const removeExperience = (id: string) => {
    updateData({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  const updateExperience = (id: string, field: string, value: any) => {
    updateData({
      ...data,
      experience: data.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      ),
    });
  };

  const addResponsibility = (id: string) => {
    const experience = data.experience.find((exp) => exp.id === id);
    if (experience) {
      updateExperience(id, 'responsibilities', [...experience.responsibilities, '']);
    }
  };

  const updateResponsibility = (id: string, index: number, value: string) => {
    const experience = data.experience.find((exp) => exp.id === id);
    if (experience) {
      const newResponsibilities = [...experience.responsibilities];
      newResponsibilities[index] = value;
      updateExperience(id, 'responsibilities', newResponsibilities);
    }
  };

  const removeResponsibility = (id: string, index: number) => {
    const experience = data.experience.find((exp) => exp.id === id);
    if (experience && experience.responsibilities.length > 1) {
      const newResponsibilities = experience.responsibilities.filter((_, i) => i !== index);
      updateExperience(id, 'responsibilities', newResponsibilities);
    }
  };

  const enhanceWithAI = () => {
    toast.success("AI enhancement applied! This is a demo - in production this would use GPT-4 to improve your bullet points.");
  };

  return (
    <div className="space-y-6">
      {data.experience.map((experience) => (
        <Card key={experience.id} className="p-4 border-2 border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Work Experience</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeExperience(experience.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`company-${experience.id}`}>Company *</Label>
              <Input
                id={`company-${experience.id}`}
                value={experience.company}
                onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                placeholder="Google Inc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`position-${experience.id}`}>Position *</Label>
              <Input
                id={`position-${experience.id}`}
                value={experience.position}
                onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                placeholder="Software Engineer"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`location-${experience.id}`}>Location *</Label>
              <Input
                id={`location-${experience.id}`}
                value={experience.location}
                onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`startDate-${experience.id}`}>Start Date *</Label>
              <Input
                id={`startDate-${experience.id}`}
                type="month"
                value={experience.startDate}
                onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-4">
            <Checkbox
              id={`current-${experience.id}`}
              checked={experience.current}
              onCheckedChange={(checked) => updateExperience(experience.id, 'current', checked)}
            />
            <Label htmlFor={`current-${experience.id}`}>I currently work here</Label>
          </div>

          {!experience.current && (
            <div className="mb-4 space-y-2">
              <Label htmlFor={`endDate-${experience.id}`}>End Date *</Label>
              <Input
                id={`endDate-${experience.id}`}
                type="month"
                value={experience.endDate}
                onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
              />
            </div>
          )}

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Key Responsibilities & Achievements</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={enhanceWithAI}
                className="text-accent border-accent hover:bg-accent hover:text-white"
              >
                <Sparkles className="mr-2 h-3 w-3" />
                Enhance with AI
              </Button>
            </div>
            {experience.responsibilities.map((responsibility, index) => (
              <div key={index} className="flex gap-2">
                <Textarea
                  value={responsibility}
                  onChange={(e) => updateResponsibility(experience.id, index, e.target.value)}
                  placeholder="• Developed and maintained web applications using React and Node.js, resulting in 30% improved performance"
                  rows={2}
                  className="flex-1 resize-none"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => removeResponsibility(experience.id, index)}
                  disabled={experience.responsibilities.length === 1}
                  className="mt-1"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => addResponsibility(experience.id)}
              className="text-primary border-primary hover:bg-primary hover:text-white"
            >
              <Plus className="mr-2 h-3 w-3" />
              Add Responsibility
            </Button>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addExperience}
        className="w-full border-dashed border-2 border-gray-300 hover:border-primary hover:text-primary"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Work Experience
      </Button>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Start bullet points with strong action verbs (Developed, Led, Implemented)</li>
          <li>• Include quantifiable results when possible (increased by 30%, managed team of 5)</li>
          <li>• Focus on achievements, not just responsibilities</li>
          <li>• Use keywords relevant to your target role</li>
        </ul>
      </div>
    </div>
  );
};

export default ExperienceForm;
