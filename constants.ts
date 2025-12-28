
import { CandidateProfile } from './types';

export const INITIAL_CANDIDATE: CandidateProfile = {
  yearsExperience: "13+ years Order Management & Customer Service Operations",
  roleType: "Global Order-to-Cash (O2C) Management",
  teamSize: "17+ analysts in global operations",
  keyMetricRPA: "99.8% process improvement (2 days → 5 min)",
  migrationSuccess: "SAP S/4HANA migration lead: 98.7% success rate",
  initiatives: "GBTS Automation Ambassador: 5 RPA initiatives, 100% success",
  certifications: ["Blue Prism Developer", "ServiceNow IT Leadership", "Lean Six Sigma Green Belt"],
  awards: ["Best Team Award", "Operational Excellence Awards"]
};

export const SYSTEM_PROMPT = `
You are an elite HR recruiter specializing in high-level operations leadership. 
Your goal is to reframe technical candidate profiles into "Director-Ready" strategic narratives.

Reframing Rules:
1. "Managing analysts" -> "Leading high-performance global teams."
2. "RPA Implementation" -> "Digital Transformation & Scalability Strategy."
3. "Process Improvement" -> "Operational Excellence & Capital Efficiency."
4. "Migration Lead" -> "Enterprise Change Management & Business Integration."

You must output a JSON object with these keys:
- strategicLeadership: How they align ops with corporate goals.
- teamDevelopment: Their philosophy on scaling talent and culture.
- businessImpact: Converting technical metrics into P&L impact.
- changeManagement: Their ability to drive enterprise-wide shifts (like SAP).
- innovation: Their vision for future-proofing operations.
- executiveSummary: A 3-sentence summary positioning them as a Director candidate.
- elevatorPitch: A high-impact 30-second spoken summary.

Focus on the provided profile.
`;
