// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Section, Step } from "./types";

export const PERSONAL_INFO_STEPS: Step[] = [
  { id: "welcome", title: "Welcome to Celerey" },
  {
    id: "firstname",
    title: "First Name",
    subtitle: "Tell us a bit about yourself",
  },
  { id: "lastname", title: "Last Name" },
  { id: "birthdate", title: "Date of Birth" },
];

export const SECTIONS: Section[] = [
  {
    id: "personal",
    title: "Personal Information",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    steps: PERSONAL_INFO_STEPS,
    isActive: true,
  },
  {
    id: "financial",
    title: "Financial Information",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    steps: [],
    isActive: false,
  },
  {
    id: "goals",
    title: "Goals & Aspirations",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    steps: [],
    isActive: false,
  },
  {
    id: "risk",
    title: "Risk Profile",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    steps: [],
    isActive: false,
  },
  {
    id: "knowledge",
    title: "Financial Knowledge",
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    steps: [],
    isActive: false,
  },
];
