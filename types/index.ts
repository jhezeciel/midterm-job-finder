export interface Job {
    id: string;
    title: string;
    company: string;
    salary: string;
  }
  
  export interface ApplicationFormData {
    name: string;
    email: string;
    contactNumber: string;
    reason: string;
  }
  
  // utils/validations.ts
  export const validateForm = (data: ApplicationFormData): string | null => {
    if (!data.name.trim()) return 'Name is required';
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) return 'Valid email is required';
    if (!data.contactNumber.trim() || !/^\d{10}$/.test(data.contactNumber)) return 'Valid 10-digit contact number is required';
    if (!data.reason.trim()) return 'Reason is required';
    return null;
  };
  