import { ApplicationFormData } from "../types";

export const validateForm = (data: ApplicationFormData): string | null => {
    if (!data.name.trim()) return 'Name is required';
    if (!data.email.trim() || !/^[\w._%+-]+@gmail\.com$/.test(data.email)) return 'Valid Gmail address is required';
    if (!data.contactNumber.trim() || !/^\d{11}$/.test(data.contactNumber)) return 'Valid 11-digit contact number is required';
    if (!data.reason.trim()) return 'Reason is required';
    return null;
};
