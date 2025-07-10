
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { ResumeData, Language } from "@/types/resume";

interface LanguagesFormProps {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
}

const LanguagesForm: React.FC<LanguagesFormProps> = ({ data, updateData }) => {
  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      language: '',
      proficiency: 'Intermediate',
    };

    updateData({
      ...data,
      languages: [...data.languages, newLanguage],
    });
  };

  const removeLanguage = (id: string) => {
    updateData({
      ...data,
      languages: data.languages.filter((lang) => lang.id !== id),
    });
  };

  const updateLanguage = (id: string, field: string, value: any) => {
    updateData({
      ...data,
      languages: data.languages.map((lang) =>
        lang.id === id ? { ...lang, [field]: value } : lang
      ),
    });
  };

  return (
    <div className="space-y-6">
      {data.languages.map((language) => (
        <Card key={language.id} className="p-4 border-2 border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Language</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeLanguage(language.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`language-${language.id}`}>Language *</Label>
              <Input
                id={`language-${language.id}`}
                value={language.language}
                onChange={(e) => updateLanguage(language.id, 'language', e.target.value)}
                placeholder="Spanish"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`proficiency-${language.id}`}>Proficiency Level *</Label>
              <Select
                value={language.proficiency}
                onValueChange={(value) => updateLanguage(language.id, 'proficiency', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Native">Native</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addLanguage}
        className="w-full border-dashed border-2 border-gray-300 hover:border-primary hover:text-primary"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Language
      </Button>
    </div>
  );
};

export default LanguagesForm;
