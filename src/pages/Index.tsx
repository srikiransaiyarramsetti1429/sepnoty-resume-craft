
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bot, FileCheck, FileText, Sparkles, Download, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Content",
      description: "Get intelligent suggestions for bullet points, phrasing, and professional language using advanced AI."
    },
    {
      icon: FileCheck,
      title: "ATS Optimization", 
      description: "Ensure your resume passes through Applicant Tracking Systems with our scoring algorithm."
    },
    {
      icon: Sparkles,
      title: "Real-time Suggestions",
      description: "Receive instant feedback and improvements as you build your resume."
    },
    {
      icon: FileText,
      title: "Multiple Templates",
      description: "Choose from professional, ATS-compatible templates designed for modern job markets."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Create & Check Resumes
            <span className="block text-primary mt-2">Powered by AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
            ATS-optimized. Job-ready. No sign-up needed.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/resume-builder')}
            >
              <FileText className="mr-2 h-5 w-5" />
              Start Resume Builder
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/resume-checker')}
            >
              <FileCheck className="mr-2 h-5 w-5" />
              Check My Resume
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-dark py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 shadow-lg group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300 mb-4">
                    <feature.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Download & Share Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-accent">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join thousands of job seekers who have improved their resumes with our AI-powered platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => navigate('/resume-builder')}
            >
              <Download className="mr-2 h-5 w-5" />
              Build Resume Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-6 text-lg font-semibold rounded-lg transition-all duration-300"
              onClick={() => navigate('/resume-checker')}
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Check Existing Resume
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
