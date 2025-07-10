
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Linkedin, Github, Globe, ExternalLink } from "lucide-react";
import { ResumeData, ResumeTemplate } from "@/types/resume";

interface ResumePreviewProps {
  data: ResumeData;
  template: ResumeTemplate;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-white border rounded-lg p-6 max-h-[600px] overflow-y-auto text-sm">
      <div className="space-y-4">
        {/* Header */}
        <div className="text-center border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            {data.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-3 mt-2 text-gray-600">
            {data.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span className="text-xs">{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span className="text-xs">{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                <span className="text-xs">{data.personalInfo.location}</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {data.personalInfo.linkedin && (
              <div className="flex items-center gap-1 text-primary">
                <Linkedin className="h-3 w-3" />
                <span className="text-xs">LinkedIn</span>
              </div>
            )}
            {data.personalInfo.github && (
              <div className="flex items-center gap-1 text-primary">
                <Github className="h-3 w-3" />
                <span className="text-xs">GitHub</span>
              </div>
            )}
            {data.personalInfo.website && (
              <div className="flex items-center gap-1 text-primary">
                <Globe className="h-3 w-3" />
                <span className="text-xs">Website</span>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {data.summary && (
          <div>
            <h2 className="font-semibold text-gray-900 mb-2">Professional Summary</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">Experience</h2>
            <div className="space-y-3">
              {data.experience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-gray-200 pl-3">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-medium text-gray-900">{exp.position || 'Position'}</h3>
                      <p className="text-gray-700">{exp.company || 'Company'}</p>
                    </div>
                    <div className="text-right text-xs text-gray-600">
                      <p>{formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}</p>
                      {exp.location && <p>{exp.location}</p>}
                    </div>
                  </div>
                  {exp.responsibilities.some(r => r.trim()) && (
                    <ul className="list-disc list-inside text-xs text-gray-700 space-y-1 mt-2">
                      {exp.responsibilities.filter(r => r.trim()).map((responsibility, index) => (
                        <li key={index}>{responsibility}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">Education</h2>
            <div className="space-y-2">
              {data.education.map((edu) => (
                <div key={edu.id} className="border-l-2 border-gray-200 pl-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {edu.degree || 'Degree'} {edu.field && `in ${edu.field}`}
                      </h3>
                      <p className="text-gray-700 text-sm">{edu.institution || 'Institution'}</p>
                      {edu.gpa && <p className="text-xs text-gray-600">GPA: {edu.gpa}</p>}
                    </div>
                    <div className="text-right text-xs text-gray-600">
                      <p>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">Projects</h2>
            <div className="space-y-3">
              {data.projects.map((project) => (
                <div key={project.id} className="border-l-2 border-gray-200 pl-3">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-medium text-gray-900">{project.name || 'Project Name'}</h3>
                    <div className="flex gap-2">
                      {project.url && (
                        <ExternalLink className="h-3 w-3 text-primary" />
                      )}
                      {project.github && (
                        <Github className="h-3 w-3 text-primary" />
                      )}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-xs text-gray-700 mb-2">{project.description}</p>
                  )}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">Certifications</h2>
            <div className="space-y-2">
              {data.certifications.map((cert) => (
                <div key={cert.id} className="border-l-2 border-gray-200 pl-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{cert.name || 'Certification'}</h3>
                      <p className="text-gray-700 text-sm">{cert.issuer || 'Issuer'}</p>
                    </div>
                    <div className="text-right text-xs text-gray-600">
                      <p>{formatDate(cert.date)}</p>
                      {cert.expiryDate && <p>Expires: {formatDate(cert.expiryDate)}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <div>
            <h2 className="font-semibold text-gray-900 mb-3">Languages</h2>
            <div className="space-y-1">
              {data.languages.map((lang) => (
                <div key={lang.id} className="flex justify-between items-center">
                  <span className="text-gray-900">{lang.language || 'Language'}</span>
                  <Badge variant="outline" className="text-xs">
                    {lang.proficiency}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
