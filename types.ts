
export interface CandidateProfile {
  yearsExperience: string;
  roleType: string;
  teamSize: string;
  keyMetricRPA: string;
  migrationSuccess: string;
  initiatives: string;
  certifications: string[];
  awards: string[];
}

export interface ReframeAnalysis {
  strategicLeadership: string;
  teamDevelopment: string;
  businessImpact: string;
  changeManagement: string;
  innovation: string;
  executiveSummary: string;
  elevatorPitch: string;
}

export enum TabType {
  STRATEGIC = 'STRATEGIC',
  METRICS = 'METRICS',
  INTERVIEW = 'INTERVIEW'
}
