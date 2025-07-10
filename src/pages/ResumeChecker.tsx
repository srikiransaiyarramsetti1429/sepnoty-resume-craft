
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  TrendingUp, 
  Download,
  Home,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ResumeAnalysis } from "@/types/resume";
import { toast } from "sonner";

const ResumeChecker = () => {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // This would typically use pdf2text.js or mammoth.js to extract text
      toast.success(`File "${file.name}" uploaded successfully! This is a demo - in production this would extract text from the file.`);
      setResumeText("This is placeholder text from your uploaded resume. In production, this would be the actual extracted text from your PDF/DOCX file.");
    }
  };

  const analyzeResume = async () => {
    if (!resumeText.trim()) {
      toast.error("Please upload a resume file or paste your resume text.");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis: ResumeAnalysis = {
        atsScore: 78,
        grammarScore: 92,
        keywordScore: 65,
        readabilityScore: 85,
        formattingScore: 88,
        suggestions: [
          "Add more quantifiable achievements with specific numbers and percentages",
          "Include more industry-specific keywords from the job description",
          "Use stronger action verbs to begin bullet points",
          "Consider adding a skills section with relevant technical competencies"
        ],
        missingKeywords: [
          "JavaScript", "React", "Node.js", "AWS", "Agile", "Git", "API", "Database"
        ],
        issues: [
          {
            type: 'keyword',
            message: 'Missing important keywords from job description',
            suggestion: 'Include "JavaScript", "React", and "AWS" in your skills or experience'
          },
          {
            type: 'formatting',
            message: 'Inconsistent date formatting',
            suggestion: 'Use consistent MM/YYYY format for all dates'
          },
          {
            type: 'grammar',
            message: 'Some bullet points use passive voice',
            suggestion: 'Start bullet points with strong action verbs like "Developed", "Implemented", "Led"'
          }
        ]
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
      toast.success("Resume analysis complete!");
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  const applyAIFix = () => {
    toast.success("AI suggestions applied! This is a demo - in production this would generate an improved version of your resume.");
  };

  const downloadImprovedResume = () => {
    toast.success("Improved resume download started! This is a demo - in production this would generate an enhanced PDF/DOCX file.");
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
            <h1 className="text-2xl font-bold text-gray-900">AI Resume Checker</h1>
            <div className="w-24"></div> {/* Spacer for center alignment */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Upload Your Resume</h2>
              
              {/* File Upload */}
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-4">Upload your resume (PDF or DOCX)</p>
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="outline" className="cursor-pointer">
                      <FileText className="mr-2 h-4 w-4" />
                      Choose File
                    </Button>
                  </label>
                </div>

                <div className="text-center text-gray-500">
                  <span>or</span>
                </div>

                {/* Text Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Paste Your Resume Text
                  </label>
                  <Textarea
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    placeholder="Paste your resume content here..."
                    rows={8}
                    className="resize-none"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Job Description (Optional)
              </h3>
              <div className="space-y-2">
                <Textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here for better keyword analysis..."
                  rows={6}
                  className="resize-none"
                />
                <p className="text-sm text-gray-600">
                  Adding a job description helps us provide more targeted feedback.
                </p>
              </div>
            </Card>

            <Button
              onClick={analyzeResume}
              disabled={isAnalyzing}
              className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg"
            >
              {isAnalyzing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing Resume...
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Analyze My Resume
                </>
              )}
            </Button>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {analysis ? (
              <>
                <Card className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Analysis Results</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {[
                      { label: 'ATS Score', score: analysis.atsScore },
                      { label: 'Grammar', score: analysis.grammarScore },
                      { label: 'Keywords', score: analysis.keywordScore },
                      { label: 'Readability', score: analysis.readabilityScore },
                      { label: 'Formatting', score: analysis.formattingScore },
                    ].map((item, index) => (
                      <div key={index} className={`p-4 rounded-lg ${getScoreBg(item.score)}`}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-900">{item.label}</span>
                          <span className={`font-bold text-lg ${getScoreColor(item.score)}`}>
                            {item.score}%
                          </span>
                        </div>
                        <Progress value={item.score} className="h-2" />
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={applyAIFix}
                      className="flex-1 bg-accent hover:bg-accent/90 text-white"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Apply AI Fixes
                    </Button>
                    <Button
                      onClick={downloadImprovedResume}
                      variant="outline"
                      className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Missing Keywords
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {analysis.missingKeywords.map((keyword, index) => (
                      <Badge key={index} variant="outline" className="text-red-600 border-red-600">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Consider adding these keywords to improve your ATS score.
                  </p>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    AI Suggestions
                  </h3>
                  <div className="space-y-3">
                    {analysis.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-900">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Issues Found
                  </h3>
                  <div className="space-y-3">
                    {analysis.issues.map((issue, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-yellow-900">{issue.message}</p>
                          <p className="text-sm text-yellow-800 mt-1">{issue.suggestion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-8 text-center">
                <CheckCircle className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ready to Analyze
                </h3>
                <p className="text-gray-600">
                  Upload or paste your resume to get detailed AI-powered feedback and suggestions.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeChecker;
