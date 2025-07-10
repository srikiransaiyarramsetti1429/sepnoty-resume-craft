
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ResumeData, ResumeTemplate } from "@/types/resume";
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Calendar, ExternalLink } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
  template: ResumeTemplate;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template }) => {
  const getTemplateStyles = () => {
    switch (template) {
      case 'modern':
        return {
          container: 'bg-white border border-gray-200',
          header: 'bg-gradient-to-r from-primary to-accent text-white',
          section: 'border-b border-gray-200',
          text: 'text-gray-800',
        };
      case 'classic':
        return {
          container: 'bg-white border border-gray-300',
          header: 'bg-gray-800 text-white',
          section: 'border-b border-gray-300',
          text: 'text-gray-900',
        };
      case 'creative':
        return {
          container: 'bg-white border border-purple-200',
          header: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
          section: 'border-b border-purple-200',
          text: 'text-gray-800',
        };
      case 'minimal':
        return {
          container: 'bg-white border border-gray-100',
          header: 'bg-white text-gray-900 border-b border-gray-200',
          section: 'border-b border-gray-100',
          text: 'text-gray-900',
        };
      default:
        return {
          container: 'bg-white border border-gray-200',
          header: 'bg-slate-800 text-white',
          section: 'border-b border-gray-200',
          text: 'text-gray-800',
        };
    }
  };

  const styles = getTemplateStyles();

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month] = dateStr.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto overflow-hidden ${styles.container}`}>
      {/* Header */}
      <div className={`p-6 ${styles.header}`}>
        <h1 className="text-3xl font-bold mb-2">
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className="flex flex-wrap gap-4 text-sm">
          {data.personalInfo.email && (
            <div className="flex items-center gap-1">
              <Mail className="h-4 w-4" />
              {data.personalInfo.email}
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center gap-1">
              <Phone className="h-4 w-4" />
              {data.personalInfo.phone}
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {data.personalInfo.location}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4 text-sm mt-2">
          {data.personalInfo.linkedin && (
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4" />
              {data.personalInfo.linkedin}
            </div>
          )}
          {data.personalInfo.github && (
            <div className="flex items-center gap-1">
              <Github className="h-4 w-4" />
              {data.personalInfo.github}
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4" />
              {data.personalInfo.website}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary */}
        {data.summary && (
          <div className={`pb-4 ${styles.section}`}>
            <h2 className="text-lg font-semibold mb-2">Professional Summary</h2>
            <p className={`text-sm leading-relaxed ${styles.text}`}>{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div className={`pb-4 ${styles.section}`}>
            <h2 className="text-lg font-semibold mb-3">Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-medium">{exp.position}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside text-sm space-y-1 ml-4">
                    {exp.responsibilities.filter(r => r.trim()).map((responsibility, index) => (
                      <li key={index} className={styles.text}>{responsibility}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div className={`pb-4 ${styles.section}`}>
            <h2 className="text-lg font-semibold mb-3">Education</h2>
            <div className="space-y-3">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{edu.degree} in {edu.field}</h3>
                    <p className="text-primary">{edu.institution}</p>
                    {edu.honors && <p className="text-sm text-gray-600">{edu.honors}</p>}
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                    {edu.gpa && <p>GPA: {edu.gpa}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div className={`pb-4 ${styles.section}`}>
            <h2 className="text-lg font-semibold mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div className={`pb-4 ${styles.section}`}>
            <h2 className="text-lg font-semibold mb-3">Projects</h2>
            <div className="space-y-3">
              {data.projects.map((project) => (
                <div key={project.id}>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{project.name}</h3>
                    {project.url && (
                      <ExternalLink className="h-4 w-4 text-primary" />
                    )}
                    {project.github && (
                      <Github className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <p className={`text-sm mb-2 ${styles.text}`}>{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div className={`pb-4 ${styles.section}`}>
            <h2 className="text-lg font-semibold mb-3">Certifications</h2>
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{cert.name}</h3>
                    <p className="text-primary text-sm">{cert.issuer}</p>
                  </div>
                  <div className="text-right text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(cert.date)}
                    </div>
                    {cert.expiryDate && (
                      <p className="text-xs">Expires: {formatDate(cert.expiryDate)}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Languages</h2>
            <div className="grid grid-cols-2 gap-2">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between">
                  <span className="font-medium">{lang.language}</span>
                  <span className="text-sm text-gray-600">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ResumePreview;
