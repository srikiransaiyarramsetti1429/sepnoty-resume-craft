
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { ResumeData } from "@/types/resume";
import { useState } from "react";

interface SkillsFormProps {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, updateData }) => {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !data.skills.includes(newSkill.trim())) {
      updateData({
        ...data,
        skills: [...data.skills, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    updateData({
      ...data,
      skills: data.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="newSkill">Add Skills</Label>
            <Input
              id="newSkill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="e.g., JavaScript, React, Node.js"
            />
          </div>
          <Button
            type="button"
            onClick={addSkill}
            className="mt-6 bg-primary hover:bg-primary/90"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-sm text-gray-600">
          Add technical skills, programming languages, frameworks, and tools relevant to your target role.
        </p>
      </div>

      {data.skills.length > 0 && (
        <div className="space-y-3">
          <Label>Current Skills</Label>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 hover:text-red-600"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>
      )}

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Include both technical and soft skills relevant to your target role</li>
          <li>• Use keywords from job descriptions you're targeting</li>
          <li>• Be specific (e.g., "React.js" instead of just "JavaScript")</li>
          <li>• Include proficiency levels if relevant</li>
        </ul>
      </div>
    </div>
  );
};

export default SkillsForm;
