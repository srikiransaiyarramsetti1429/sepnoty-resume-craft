
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Download, FileText, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ResumeData, ResumeTemplate } from "@/types/resume";
import PersonalInfoForm from "@/components/resume-builder/PersonalInfoForm";
import EducationForm from "@/components/resume-builder/EducationForm";
import ExperienceForm from "@/components/resume-builder/ExperienceForm";
import SkillsForm from "@/components/resume-builder/SkillsForm";
import ProjectsForm from "@/components/resume-builder/ProjectsForm";
import CertificationsForm from "@/components/resume-builder/CertificationsForm";
import LanguagesForm from "@/components/resume-builder/LanguagesForm";
import ResumePreview from "@/components/resume-builder/ResumePreview";
import TemplateSelector from "@/components/resume-builder/TemplateSelector";
import { toast } from "sonner";

const steps = [
  { id: 'personal', title: 'Personal Info', component: PersonalInfoForm },
  { id: 'education', title: 'Education', component: EducationForm },
  { id: 'experience', title: 'Experience', component: ExperienceForm },
  { id: 'skills', title: 'Skills', component: SkillsForm },
  { id: 'projects', title: 'Projects', component: ProjectsForm },
  { id: 'certifications', title: 'Certifications', component: CertificationsForm },
  { id: 'languages', title: 'Languages', component: LanguagesForm },
  { id: 'template', title: 'Template', component: TemplateSelector },
];

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>('modern');
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
      website: '',
    },
    summary: '',
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: [],
    languages: [],
  });

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleDownloadPDF = () => {
    toast.success("PDF download started! This is a demo - in production this would generate a real PDF.");
  };

  const handleDownloadDOCX = () => {
    toast.success("DOCX download started! This is a demo - in production this would generate a real DOCX file.");
  };

  const CurrentStepComponent = currentStepData.component;

  const renderCurrentStep = () => {
    if (currentStepData.id === 'template') {
      return (
        <TemplateSelector
          data={resumeData}
          updateData={setResumeData}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
      );
    }
    
    return (
      <CurrentStepComponent
        data={resumeData}
        updateData={setResumeData}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-primary"
            >
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
              <p className="text-sm text-gray-600">Step {currentStep + 1} of {steps.length}</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleDownloadPDF}
                className="text-primary border-primary hover:bg-primary hover:text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button
                variant="outline"
                onClick={handleDownloadDOCX}
                className="text-accent border-accent hover:bg-accent hover:text-white"
              >
                <FileText className="mr-2 h-4 w-4" />
                DOCX
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">{currentStepData.title}</span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">{currentStepData.title}</h2>
              {renderCurrentStep()}
            </Card>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
                className="bg-primary hover:bg-primary/90 text-white flex items-center"
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
              <ResumePreview data={resumeData} template={selectedTemplate} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
