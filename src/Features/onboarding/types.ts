export interface BaseScreenProps {
  onBack: () => void;
  onContinue: () => void;
}

export interface FileUploadProps {
  label: string;
  value: {
    file: File | null;
    fileName: string;
    uploadStatus: "idle" | "uploading" | "completed" | "error";
  };
  onChange: (value: {
    file: File | null;
    fileName: string;
    uploadStatus: "idle" | "uploading" | "completed" | "error";
  }) => void;
}

export interface FormInputProps {
  //   label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}

export interface NavigationButtonsProps {
  onBack?: () => void;
  onContinue: () => void;
  showBack?: boolean;
}

export interface OptionCardProps {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export interface SectionProgressBarProps {
  sections: Record<Section["id"], Section>;
  currentSection: Section["id"];
}

export interface CitizenshipStatusScreenProps {
  value: string;
  dualCitizenship: string;
  onChange: (value: string, dualValue?: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

// RadioGroup types
export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

// Screen-specific types
export interface DependentsData {
  hasDependents: string;
  numberOfDependents: string;
  agesOfDependents: string;
}

export interface DependentsScreenProps extends BaseScreenProps {
  value: DependentsData;
  onChange: (value: DependentsData) => void;
}

export interface MaritalStatusScreenProps extends BaseScreenProps {
  value: string;
  onChange: (value: string) => void;
}

export interface OccupationScreenProps extends BaseScreenProps {
  value: string;
  onChange: (value: string) => void;
}

export interface IdentificationDocument {
  type: string;
  file: File | null;
  fileName: string;
  uploadStatus: "idle" | "uploading" | "completed" | "error";
}

export interface IdentificationScreenProps extends BaseScreenProps {
  value: IdentificationDocument;
  onChange: (value: IdentificationDocument) => void;
}

export interface OptionsScreenProps extends BaseScreenProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export interface Section {
  id: "personal" | "financial" | "goals" | "risk";
  title: string;
  totalSteps: number;
  currentStep: number;
  isCompleted: boolean;
  isActive: boolean;
}

export interface OnboardingState {
  currentSection: Section["id"];
  sections: Record<Section["id"], Section>;
}

// PersonalInfo form data type
export interface PersonalInfoFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  citizenship: string;
  dualCitizenship: string;
  dependents: DependentsData;
  maritalStatus: string;
  occupation: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  identification: IdentificationDocument;
  options: string[];
}
