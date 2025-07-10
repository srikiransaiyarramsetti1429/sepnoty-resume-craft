
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Plus, Trash2, X } from "lucide-react";
import { ResumeData, Project } from "@/types/resume";
import { useState } from "react";

interface ProjectsFormProps {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, updateData }) => {
  const [newTech, setNewTech] = useState<{[key: string]: string}>({});

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

  const addTechnology = (projectId: string) => {
    const tech = newTech[projectId]?.trim();
    if (tech) {
      const project = data.projects.find((p) => p.id === projectId);
      if (project && !project.technologies.includes(tech)) {
        updateProject(projectId, 'technologies', [...project.technologies, tech]);
        setNewTech({ ...newTech, [projectId]: '' });
      }
    }
  };

  const removeTechnology = (projectId: string, techToRemove: string) => {
    const project = data.projects.find((p) => p.id === projectId);
    if (project) {
      updateProject(projectId, 'technologies', project.technologies.filter((tech) => tech !== techToRemove));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, projectId: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology(projectId);
    }
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor={`projectName-${project.id}`}>Project Name *</Label>
              <Input
                id={`projectName-${project.id}`}
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                placeholder="E-commerce Web Application"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`projectUrl-${project.id}`}>Live URL</Label>
              <Input
                id={`projectUrl-${project.id}`}
                value={project.url || ''}
                onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                placeholder="https://myproject.com"
              />
            </div>
          </div>

          <div className="mb-4 space-y-2">
            <Label htmlFor={`projectGithub-${project.id}`}>GitHub Repository</Label>
            <Input
              id={`projectGithub-${project.id}`}
              value={project.github || ''}
              onChange={(e) => updateProject(project.id, 'github', e.target.value)}
              placeholder="https://github.com/username/project"
            />
          </div>

          <div className="mb-4 space-y-2">
            <Label htmlFor={`projectDescription-${project.id}`}>Description *</Label>
            <Textarea
              id={`projectDescription-${project.id}`}
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
              placeholder="Built a full-stack e-commerce platform with user authentication, payment processing, and admin dashboard. Implemented responsive design and optimized for performance."
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Technologies Used</Label>
              <div className="flex gap-2">
                <Input
                  value={newTech[project.id] || ''}
                  onChange={(e) => setNewTech({ ...newTech, [project.id]: e.target.value })}
                  onKeyPress={(e) => handleKeyPress(e, project.id)}
                  placeholder="React, Node.js, MongoDB"
                />
                <Button
                  type="button"
                  onClick={() => addTechnology(project.id)}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="px-3 py-1 bg-primary/10 text-primary hover:bg-primary/20"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(project.id, tech)}
                      className="ml-2 hover:text-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
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

      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Include both personal and professional projects</li>
          <li>• Focus on projects relevant to your target role</li>
          <li>• Mention the problem your project solved</li>
          <li>• Include links to live demos and source code when possible</li>
        </ul>
      </div>
    </div>
  );
};

export default ProjectsForm;
