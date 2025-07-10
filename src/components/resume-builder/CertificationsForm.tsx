
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { ResumeData, Certification } from "@/types/resume";

interface CertificationsFormProps {
  data: ResumeData;
  updateData: (data: ResumeData) => void;
}

const CertificationsForm: React.FC<CertificationsFormProps> = ({ data, updateData }) => {
  const addCertification = () => {
    const newCertification: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialId: '',
    };

    updateData({
      ...data,
      certifications: [...data.certifications, newCertification],
    });
  };

  const removeCertification = (id: string) => {
    updateData({
      ...data,
      certifications: data.certifications.filter((cert) => cert.id !== id),
    });
  };

  const updateCertification = (id: string, field: string, value: string) => {
    updateData({
      ...data,
      certifications: data.certifications.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      ),
    });
  };

  return (
    <div className="space-y-6">
      {data.certifications.map((certification) => (
        <Card key={certification.id} className="p-4 border-2 border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Certification</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeCertification(certification.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor={`name-${certification.id}`}>Certification Name *</Label>
              <Input
                id={`name-${certification.id}`}
                value={certification.name}
                onChange={(e) => updateCertification(certification.id, 'name', e.target.value)}
                placeholder="AWS Certified Solutions Architect"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`issuer-${certification.id}`}>Issuing Organization *</Label>
              <Input
                id={`issuer-${certification.id}`}
                value={certification.issuer}
                onChange={(e) => updateCertification(certification.id, 'issuer', e.target.value)}
                placeholder="Amazon Web Services"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`date-${certification.id}`}>Issue Date</Label>
              <Input
                id={`date-${certification.id}`}
                type="month"
                value={certification.date}
                onChange={(e) => updateCertification(certification.id, 'date', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`expiryDate-${certification.id}`}>Expiry Date</Label>
              <Input
                id={`expiryDate-${certification.id}`}
                type="month"
                value={certification.expiryDate || ''}
                onChange={(e) => updateCertification(certification.id, 'expiryDate', e.target.value)}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor={`credentialId-${certification.id}`}>Credential ID</Label>
              <Input
                id={`credentialId-${certification.id}`}
                value={certification.credentialId || ''}
                onChange={(e) => updateCertification(certification.id, 'credentialId', e.target.value)}
                placeholder="ABC123XYZ789"
              />
            </div>
          </div>
        </Card>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addCertification}
        className="w-full border-dashed border-2 border-gray-300 hover:border-primary hover:text-primary"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Certification
      </Button>
    </div>
  );
};

export default CertificationsForm;
