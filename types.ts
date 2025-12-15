export enum DocumentStatus {
  UPLOADING = 'Uploading',
  PROCESSING_OCR = 'Processing OCR',
  CATEGORIZED = 'Categorized',
  REQUIRES_VERIFICATION = 'Requires Verification',
  APPROVED = 'Approved',
  PENDING_REVIEW = 'Pending Review'
}

export enum AccessLevel {
  ADMIN = 'Admin',
  LAWYER = 'Lawyer',
  PARALEGAL = 'Paralegal'
}

export interface DocumentItem {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  status: DocumentStatus;
  size: string;
  uploadedBy: string;
  accessLevel: AccessLevel;
}

export interface WorkflowItem {
  id: string;
  title: string;
  initiator: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  dueDate: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum TemplateType {
  NDA = 'Non-Disclosure Agreement',
  EMPLOYMENT = 'Employment Contract',
  SERVICE_AGREEMENT = 'Service Agreement',
  POWER_OF_ATTORNEY = 'Power of Attorney',
  LEASE_AGREEMENT = 'Commercial Lease'
}