
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend 
} from 'recharts';
import { 
  Users, TrendingUp, Zap, Settings, ShieldCheck, Award, 
  ChevronRight, BrainCircuit, Target, Briefcase, FileText,
  Loader2, Sparkles, AlertCircle
} from 'lucide-react';
import { CandidateProfile, ReframeAnalysis, TabType } from './types';
import { INITIAL_CANDIDATE, SYSTEM_PROMPT } from './constants';

const App: React.FC = () => {
  const [profile] = useState<CandidateProfile>(INITIAL_CANDIDATE);
  const [analysis, setAnalysis] = useState<ReframeAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>(TabType.STRATEGIC);

  const performAnalysis = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze this candidate profile for Director readiness: ${JSON.stringify(profile)}`,
        config: {
          systemInstruction: SYSTEM_PROMPT,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              strategicLeadership: { type: Type.STRING },
              teamDevelopment: { type: Type.STRING },
              businessImpact: { type: Type.STRING },
              changeManagement: { type: Type.STRING },
              innovation: { type: Type.STRING },
              executiveSummary: { type: Type.STRING },
              elevatorPitch: { type: Type.STRING }
            },
            required: ["strategicLeadership", "teamDevelopment", "businessImpact", "changeManagement", "innovation", "executiveSummary", "elevatorPitch"]
          }
        }
      });

      const data = JSON.parse(response.text);
      setAnalysis(data);
    } catch (err) {
      console.error("Analysis failed:", err);
      setError("Failed to generate strategic analysis. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [profile]);

  useEffect(() => {
    performAnalysis();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const radarData = [
    { subject: 'Strategic Leadership', A: 95, fullMark: 100 },
    { subject: 'Team Dev', A: 90, fullMark: 100 },
    { subject: 'Business Impact', A: 98, fullMark: 100 },
    { subject: 'Change Mgmt', A: 92, fullMark: 100 },
    { subject: 'Innovation', A: 97, fullMark: 100 },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar - Candidate Info */}
      <aside className="w-full lg:w-96 bg-slate-900 text-white p-6 overflow-y-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <Users className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">Talent Profiler</h1>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Core Profile</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Briefcase className="w-4 h-4 text-indigo-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-200">{profile.yearsExperience}</p>
              </div>
              <div className="flex items-start gap-3">
                <Target className="w-4 h-4 text-indigo-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-200">{profile.roleType}</p>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="w-4 h-4 text-indigo-400 mt-1 flex-shrink-0" />
                <p className="text-sm text-slate-200">Scale: {profile.teamSize}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Technical Benchmarks</h2>
            <div className="space-y-2">
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <p className="text-xs text-slate-400 mb-1 font-medium">Process Optimization</p>
                <p className="text-sm font-bold text-emerald-400">{profile.keyMetricRPA}</p>
              </div>
              <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                <p className="text-xs text-slate-400 mb-1 font-medium">ERP Transformation</p>
                <p className="text-sm font-bold text-blue-400">{profile.migrationSuccess}</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Credentials</h2>
            <div className="flex flex-wrap gap-2">
              {profile.certifications.map(cert => (
                <span key={cert} className="px-2 py-1 bg-indigo-900/40 text-indigo-300 rounded text-[11px] border border-indigo-500/30">
                  {cert}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Recognitions</h2>
            <div className="space-y-2">
              {profile.awards.map(award => (
                <div key={award} className="flex items-center gap-2 text-sm text-slate-300">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>{award}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800">
          <button 
            onClick={performAnalysis}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-colors rounded-xl font-bold text-sm shadow-lg shadow-indigo-600/20"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            Refresh Strategy Analysis
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-12 space-y-8">
        {/* Header Summary */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Director Candidate Status: Ready
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900">Leadership Analysis</h1>
            <p className="text-slate-500 max-w-2xl text-lg">
              {analysis?.executiveSummary || "Analyzing potential for strategic operational leadership..."}
            </p>
          </div>
          
          <div className="hidden md:block w-48 h-48">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 0 }} />
                <Radar name="Candidate" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="flex items-center border-b border-slate-200">
          {[
            { id: TabType.STRATEGIC, label: 'Strategic Reframing', icon: BrainCircuit },
            { id: TabType.METRICS, label: 'Value Translation', icon: TrendingUp },
            { id: TabType.INTERVIEW, label: 'Elevator Pitch', icon: Target }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold transition-all border-b-2 ${
                activeTab === tab.id 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Dynamic Content */}
        <div className="grid gap-6">
          {error && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 space-y-4">
              <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
              <p className="text-slate-500 animate-pulse font-medium">Recruiter AI is synthesising the leadership narrative...</p>
            </div>
          ) : (
            <>
              {activeTab === TabType.STRATEGIC && (
                <div className="grid md:grid-cols-2 gap-6">
                  <AnalysisCard 
                    title="Strategic Leadership" 
                    icon={<Target className="w-5 h-5 text-indigo-600" />}
                    content={analysis?.strategicLeadership}
                  />
                  <AnalysisCard 
                    title="Change Management" 
                    icon={<ShieldCheck className="w-5 h-5 text-indigo-600" />}
                    content={analysis?.changeManagement}
                  />
                  <AnalysisCard 
                    title="Team Development" 
                    icon={<Users className="w-5 h-5 text-indigo-600" />}
                    content={analysis?.teamDevelopment}
                  />
                  <AnalysisCard 
                    title="Future Innovation" 
                    icon={<Zap className="w-5 h-5 text-indigo-600" />}
                    content={analysis?.innovation}
                  />
                </div>
              )}

              {activeTab === TabType.METRICS && (
                <div className="space-y-6">
                  <div className="p-8 bg-white rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-indigo-600" />
                      From Technical Success to Business Value
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <MetricItem 
                          label="RPA Efficiency (99.8%)"
                          from="Managed the implementation of RPA to cut order processing from 2 days to 5 minutes."
                          to="Drove exponential scalability by engineering a hyper-automated O2C framework, reducing capital freeze time by 99% and enabling same-day revenue recognition."
                        />
                        <MetricItem 
                          label="SAP Migration (98.7%)"
                          from="Led a team during an SAP S/4HANA migration with a high success rate."
                          to="Orchestrated a global enterprise digital transformation, ensuring seamless business continuity and data integrity for multi-billion dollar order volumes."
                        />
                      </div>
                      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                        <h4 className="text-sm font-bold text-slate-900 mb-4">Competency Intensity Index</h4>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={radarData}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} />
                              <XAxis dataKey="subject" fontSize={10} axisLine={false} tickLine={false} />
                              <YAxis hide />
                              <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                              <Bar dataKey="A" fill="#4f46e5" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                        <p className="mt-4 text-[11px] text-slate-400 text-center uppercase tracking-widest font-bold">
                          Director Potential Benchmarking
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === TabType.INTERVIEW && (
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="p-10 bg-indigo-900 text-white rounded-3xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-10">
                      <Sparkles className="w-32 h-32" />
                    </div>
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <BrainCircuit className="w-6 h-6 text-indigo-400" />
                      Executive Elevator Pitch
                    </h3>
                    <p className="text-xl leading-relaxed font-serif italic text-indigo-100">
                      &quot;{analysis?.elevatorPitch || "Loading your pitch..."}&quot;
                    </p>
                    <div className="mt-8 flex items-center gap-4">
                      <button className="px-6 py-2 bg-indigo-500 hover:bg-indigo-400 rounded-full text-sm font-bold transition-all shadow-lg">
                        Copy to LinkedIn
                      </button>
                      <button className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-bold transition-all">
                        Voice Preview
                      </button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white rounded-2xl border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-indigo-600" />
                        The &quot;Why Hire&quot; Hook
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Positioned as a bridge between technical automation and P&L performance. The candidate doesn't just manage processes; they engineer business competitive advantages through scale and agility.
                      </p>
                    </div>
                    <div className="p-6 bg-white rounded-2xl border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Settings className="w-4 h-4 text-indigo-600" />
                        Key Value Proposition
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Expertise in high-stakes SAP transformations and hyper-automation makes them an ideal candidate for VP of Ops or Global Process Owner roles where legacy migration is a priority.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

// Sub-components defined outside for cleaner rendering
interface AnalysisCardProps {
  title: string;
  icon: React.ReactNode;
  content?: string;
}

const AnalysisCard: React.FC<AnalysisCardProps> = ({ title, icon, content }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-indigo-50 rounded-xl">
        {icon}
      </div>
      <h3 className="font-bold text-slate-900">{title}</h3>
    </div>
    <p className="text-slate-600 text-sm leading-relaxed">
      {content || "Generating strategic insights..."}
    </p>
  </div>
);

interface MetricItemProps {
  label: string;
  from: string;
  to: string;
}

const MetricItem: React.FC<MetricItemProps> = ({ label, from, to }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-1.5 rounded-full bg-indigo-600"></div>
      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{label}</h4>
    </div>
    <div className="grid gap-3">
      <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
        <div className="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded border border-slate-200 uppercase mt-0.5">Manager</div>
        <p className="text-xs text-slate-500 italic">"{from}"</p>
      </div>
      <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100 flex items-start gap-3">
        <div className="text-[10px] font-bold text-indigo-600 bg-white px-2 py-0.5 rounded border border-indigo-200 uppercase mt-0.5">Director</div>
        <p className="text-sm text-slate-700 font-medium leading-relaxed">{to}</p>
      </div>
    </div>
  </div>
);

export default App;
