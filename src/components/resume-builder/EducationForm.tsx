
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { ResumeData, Education } from "@/types/resume";

interface EducationFormProps {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
}

const EducationForm: React.FC<EducationFormProps> = ({ data, updateData }) => {
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      gpa: '',
      honors: '',
    };

    updateData({
      ...data,
      education: [...data.education, newEducation],
    });
  };

  const removeEducation = (id: string) => {
    updateData({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    updateData({
      ...data,
      education: data.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  return (
    <div className="space-y-6">
      {data.education.map((education) => (
        <Card key={education.id} className="p-4 border-2 border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Education Entry</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeEducation(education.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`institution-${education.id}`}>Institution *</Label>
              <Input
                id={`institution-${education.id}`}
                value={education.institution}
                onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                placeholder="University of California, Berkeley"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`degree-${education.id}`}>Degree *</Label>
              <Input
                id={`degree-${education.id}`}
                value={education.degree}
                onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                placeholder="Bachelor of Science"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`field-${education.id}`}>Field of Study *</Label>
              <Input
                id={`field-${education.id}`}
                value={education.field}
                onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                placeholder="Computer Science"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`gpa-${education.id}`}>GPA</Label>
              <Input
                id={`gpa-${education.id}`}
                value={education.gpa || ''}
                onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                placeholder="3.8/4.0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`startDate-${education.id}`}>Start Date</Label>
              <Input
                id={`startDate-${education.id}`}
                type="month"
                value={education.startDate}
                onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`endDate-${education.id}`}>End Date</Label>
              <Input
                id={`endDate-${education.id}`}
                type="month"
                value={education.endDate}
                onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
              />
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addEducation}
        className="w-full border-dashed border-2 border-gray-300 hover:border-primary hover:text-primary"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Education
      </Button>
    </div>
  );
};

export default EducationForm;
