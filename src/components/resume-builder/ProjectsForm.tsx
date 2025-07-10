
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, ExternalLink, Github } from "lucide-react";
import { ResumeData, Project } from "@/types/resume";

interface ProjectsFormProps {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, updateData }) => {
  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      url: '',
      github: '',
    };

    updateData({
      ...data,
      projects: [...data.projects, newProject],
    });
  };

  const removeProject = (id: string) => {
    updateData({
      ...data,
      projects: data.projects.filter((project) => project.id !== id),
    });
  };

  const updateProject = (id: string, field: string, value: any) => {
    updateData({
      ...data,
      projects: data.projects.map((project) =>
        project.id === id ? { ...project, [field]: value } : project
      ),
    });
  };

  const updateTechnologies = (id: string, techString: string) => {
    const technologies = techString.split(',').map(tech => tech.trim()).filter(tech => tech);
    updateProject(id, 'technologies', technologies);
  };

  return (
    <div className="space-y-6">
      {data.projects.map((project) => (
        <Card key={project.id} className="p-4 border-2 border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Project</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeProject(project.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`name-${project.id}`}>Project Name *</Label>
              <Input
                id={`name-${project.id}`}
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                placeholder="E-commerce Website"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${project.id}`}>Description *</Label>
              <Textarea
                id={`description-${project.id}`}
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                placeholder="Built a full-stack e-commerce platform with user authentication, payment processing, and admin dashboard..."
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`technologies-${project.id}`}>Technologies Used</Label>
              <Input
                id={`technologies-${project.id}`}
                value={project.technologies.join(', ')}
                onChange={(e) => updateTechnologies(project.id, e.target.value)}
                placeholder="React, Node.js, MongoDB, Stripe"
              />
              <p className="text-sm text-gray-600">Separate technologies with commas</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`url-${project.id}`}>
                  <ExternalLink className="inline h-4 w-4 mr-1" />
                  Live Demo URL
                </Label>
                <Input
                  id={`url-${project.id}`}
                  value={project.url || ''}
                  onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                  placeholder="https://myproject.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`github-${project.id}`}>
                  <Github className="inline h-4 w-4 mr-1" />
                  GitHub Repository
                </Label>
                <Input
                  id={`github-${project.id}`}
                  value={project.github || ''}
                  onChange={(e) => updateProject(project.id, 'github', e.target.value)}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addProject}
        className="w-full border-dashed border-2 border-gray-300 hover:border-primary hover:text-primary"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Project
      </Button>
    </div>
  );
};

export default ProjectsForm;
