import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Shield, 
  Users, 
  Activity, 
  Settings, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle2, 
  Droplets, 
  Thermometer, 
  ArrowLeft, 
  Plus, 
  FileText, 
  Globe,
  MapPin,
  Map as MapIcon,
  Volume2,
  Wifi,
  WifiOff,
  User,
  Home,
  Check,
  Info,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MOCK_RISKS, PREVENTION_STEPS } from './data/mockData';
import { DiseaseRisk, PreventionStep, CommunityAction, UserProfile, UserRole } from './types';

// --- Components ---

const MobileFrame = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center justify-center min-h-screen bg-stone-100 p-4 font-sans">
    <div className="w-full max-w-[400px] h-[800px] bg-white rounded-[3rem] shadow-2xl border-8 border-stone-800 overflow-hidden relative flex flex-col">
      {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-stone-800 rounded-b-2xl z-50"></div>
      {children}
    </div>
  </div>
);

const RiskCard = ({ risk, onClick }: { risk: DiseaseRisk, onClick: () => void, key?: string }) => {
  const colorMap = {
    High: 'bg-red-50 border-red-200 text-red-700',
    Medium: 'bg-orange-50 border-orange-200 text-orange-700',
    Low: 'bg-emerald-50 border-emerald-200 text-emerald-700'
  };

  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`p-4 rounded-2xl border mb-3 cursor-pointer ${colorMap[risk.level]}`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg">{risk.name}</h3>
        <span className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-white/50">
          {risk.level} Risk
        </span>
      </div>
      <p className="text-sm opacity-90 line-clamp-2">{risk.description}</p>
      <div className="mt-3 flex items-center text-xs font-medium">
        <Activity className="w-3 h-3 mr-1" />
        Trend: {risk.trend === 'up' ? 'Increasing' : risk.trend === 'down' ? 'Decreasing' : 'Stable'}
        <span className="mx-2">•</span>
        {risk.lastUpdated}
      </div>
    </motion.div>
  );
};

// --- Onboarding Screens ---

const WelcomeScreen = ({ onNext }: { onNext: () => void }) => (
  <div className="flex-1 flex flex-col items-center justify-center bg-emerald-600 text-white p-8 text-center">
    <motion.div 
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mb-6 shadow-xl"
    >
      <Shield className="w-12 h-12 text-emerald-600" />
    </motion.div>
    <h1 className="text-3xl font-bold mb-2">VillageGuard</h1>
    <p className="text-emerald-100 mb-8">Protecting our community from disease outbreaks.</p>
    
    <div className="bg-white/10 p-4 rounded-2xl mb-12 text-left">
      <div className="flex items-center mb-2">
        <Volume2 className="w-5 h-5 mr-2" />
        <span className="text-sm font-bold">Voice Help Available</span>
      </div>
      <p className="text-xs text-emerald-50">Tap the speaker icon on any screen to hear instructions.</p>
    </div>

    <button 
      onClick={onNext}
      className="w-full py-4 bg-white text-emerald-700 font-bold rounded-2xl shadow-lg"
    >
      Start Setup
    </button>
  </div>
);

const LanguageSelection = ({ onSelect }: { onSelect: (lang: string) => void }) => (
  <div className="flex-1 flex flex-col p-6 bg-white">
    <div className="mt-12 mb-8">
      <h2 className="text-2xl font-bold mb-2">Choose Language</h2>
      <p className="text-stone-500">Pick the language you speak best.</p>
    </div>
    <div className="space-y-4">
      {['English'].map((lang) => (
        <button 
          key={lang}
          onClick={() => onSelect(lang)}
          className="w-full p-5 text-left border-2 border-stone-100 rounded-2xl flex justify-between items-center hover:border-emerald-500 hover:bg-emerald-50 transition-all"
        >
          <span className="font-semibold text-lg">{lang}</span>
          <Globe className="w-5 h-5 text-stone-400" />
        </button>
      ))}
    </div>
  </div>
);

const LocationSetup = ({ onNext }: { onNext: (village: string) => void }) => {
  const [detecting, setDetecting] = useState(false);
  const [village, setVillage] = useState('');
  const [mode, setMode] = useState<'initial' | 'manual'>('initial');
  const [manualStep, setManualStep] = useState<'country' | 'region' | 'district' | 'village'>('country');
  const [selections, setSelections] = useState({
    country: '',
    region: '',
    district: '',
    village: ''
  });

  const handleDetect = () => {
    setDetecting(true);
    // Simulate GPS failure/success
    setTimeout(() => {
      const success = True; // 70% success rate for demo
      if (success) {
        setVillage('Kennesaw, GA');
        setDetecting(false);
      } else {
        setDetecting(false);
        // Show failure prompt implicitly by staying on screen or showing error
      }
    }, 1500);
  };

  const countries = [
    { name: 'Zambia'},
    { name: 'Tanzania'},
    { name: 'Uganda'},
    { name: 'Malawi'}
  ];

  const regions = ['Central', 'Rift Valley', 'Coast', 'Eastern', 'Western'];
  const districts = ['District A', 'District B', 'District C', 'District D'];
  const villages = ['Village 1', 'Village 2', 'Village 3', 'Village 4'];

  if (mode === 'manual') {
    return (
      <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto">
        <div className="mt-12 mb-6 flex items-center">
          <button onClick={() => setMode('initial')} className="mr-4 p-2 hover:bg-stone-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold">Enter Location</h2>
        </div>

        <div className="flex gap-1 mb-8">
          {['country', 'region', 'district', 'village'].map((s, i) => (
            <div 
              key={s} 
              className={`h-1.5 flex-1 rounded-full ${
                ['country', 'region', 'district', 'village'].indexOf(manualStep) >= i ? 'bg-emerald-500' : 'bg-stone-100'
              }`} 
            />
          ))}
        </div>

        {manualStep === 'country' && (
          <div className="space-y-3">
            <p className="font-bold mb-4">Select Country</p>
            {countries.map(c => (
              <button 
                key={c.name}
                onClick={() => { setSelections({...selections, country: c.name}); setManualStep('region'); }}
                className="w-full p-5 text-left border-2 border-stone-100 rounded-2xl flex items-center hover:border-emerald-500 hover:bg-emerald-50 transition-all"
              >
                <span className="text-2xl mr-4">{c.flag}</span>
                <span className="font-bold text-lg">{c.name}</span>
              </button>
            ))}
          </div>
        )}

        {manualStep === 'region' && (
          <div className="space-y-3">
            <p className="font-bold mb-4">Select Region</p>
            {regions.map(r => (
              <button 
                key={r}
                onClick={() => { setSelections({...selections, region: r}); setManualStep('district'); }}
                className="w-full p-5 text-left border-2 border-stone-100 rounded-2xl flex items-center hover:border-emerald-500 hover:bg-emerald-50 transition-all"
              >
                <MapPin className="w-5 h-5 mr-4 text-stone-400" />
                <span className="font-bold text-lg">{r}</span>
              </button>
            ))}
          </div>
        )}

        {manualStep === 'district' && (
          <div className="space-y-3">
            <p className="font-bold mb-4">Select District</p>
            {districts.map(d => (
              <button 
                key={d}
                onClick={() => { setSelections({...selections, district: d}); setManualStep('village'); }}
                className="w-full p-5 text-left border-2 border-stone-100 rounded-2xl flex items-center hover:border-emerald-500 hover:bg-emerald-50 transition-all"
              >
                <MapPin className="w-5 h-5 mr-4 text-stone-400" />
                <span className="font-bold text-lg">{d}</span>
              </button>
            ))}
          </div>
        )}

        {manualStep === 'village' && (
          <div className="space-y-3">
            <p className="font-bold mb-4">Select Village</p>
            <div className="mb-4">
              <input 
                type="text" 
                placeholder="Search village..." 
                className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl outline-none"
                onChange={(e) => setVillage(e.target.value)}
              />
            </div>
            {villages.map(v => (
              <button 
                key={v}
                onClick={() => { setSelections({...selections, village: v}); setVillage(v); }}
                className={`w-full p-5 text-left border-2 rounded-2xl flex items-center transition-all ${village === v ? 'border-emerald-500 bg-emerald-50' : 'border-stone-100'}`}
              >
                <Home className="w-5 h-5 mr-4 text-stone-400" />
                <span className="font-bold text-lg">{v}</span>
              </button>
            ))}
            <button 
              onClick={() => onNext(`${selections.district}, ${village}`)}
              disabled={!village}
              className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg mt-8 disabled:opacity-50"
            >
              Confirm Location
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-6 bg-white">
      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-2">Where are you?</h2>
        <p className="text-stone-500">We need your location to send local alerts.</p>
      </div>

      <button 
        onClick={handleDetect}
        disabled={detecting}
        className="w-full p-8 border-2 border-dashed border-emerald-200 rounded-[2rem] flex flex-col items-center justify-center mb-6 bg-emerald-50/30 transition-all active:scale-95"
      >
        <MapPin className={`w-12 h-12 mb-3 ${detecting ? 'animate-bounce text-emerald-400' : 'text-emerald-600'}`} />
        <span className="font-bold text-lg text-emerald-700">
          {detecting ? 'Finding you...' : village || 'Find My Village (GPS)'}
        </span>
      </button>

      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-stone-100"></div>
        <span className="px-4 text-xs font-bold text-stone-400 uppercase">Or</span>
        <div className="flex-1 h-px bg-stone-100"></div>
      </div>

      <button 
        onClick={() => setMode('manual')}
        className="w-full p-5 border-2 border-stone-100 rounded-2xl flex items-center justify-between hover:border-emerald-500 hover:bg-emerald-50 transition-all"
      >
        <div className="flex items-center">
          <Globe className="w-6 h-6 text-stone-400 mr-4" />
          <span className="font-bold text-stone-700">Enter Manually</span>
        </div>
        <ChevronRight className="w-5 h-5 text-stone-300" />
      </button>

      <div className="mt-auto">
        {village && (
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 mb-6 flex items-center">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 mr-3" />
            <span className="text-sm font-bold text-emerald-800">Found: {village}</span>
          </div>
        )}
        <button 
          onClick={() => onNext(village)}
          disabled={!village && !detecting}
          className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

const CommunityProfile = ({ onNext }: { onNext: (data: { hasCleanWater: boolean, communitySize: 'Small' | 'Medium' | 'Large' }) => void }) => {
  const [hasCleanWater, setHasCleanWater] = useState<boolean | null>(null);
  const [size, setSize] = useState<'Small' | 'Medium' | 'Large' | null>(null);

  return (
    <div className="flex-1 flex flex-col p-6 bg-white">
      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-2">Community Info</h2>
        <p className="text-stone-500">This helps us understand your risk levels.</p>
      </div>

      <div className="mb-8">
        <p className="font-bold mb-4">Do you have access to clean water?</p>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setHasCleanWater(true)}
            className={`p-4 rounded-2xl border-2 flex flex-col items-center ${hasCleanWater === true ? 'border-emerald-500 bg-emerald-50' : 'border-stone-100'}`}
          >
            <Droplets className="w-6 h-6 mb-2 text-blue-500" />
            <span className="font-bold">Yes</span>
          </button>
          <button 
            onClick={() => setHasCleanWater(false)}
            className={`p-4 rounded-2xl border-2 flex flex-col items-center ${hasCleanWater === false ? 'border-emerald-500 bg-emerald-50' : 'border-stone-100'}`}
          >
            <AlertTriangle className="w-6 h-6 mb-2 text-orange-500" />
            <span className="font-bold">No</span>
          </button>
        </div>
      </div>

      <div className="mb-auto">
        <p className="font-bold mb-4">How big is your community?</p>
        <div className="space-y-3">
          {(['Small', 'Medium', 'Large'] as const).map(s => (
            <button 
              key={s}
              onClick={() => setSize(s)}
              className={`w-full p-4 rounded-xl border-2 text-left font-bold flex justify-between items-center ${size === s ? 'border-emerald-500 bg-emerald-50' : 'border-stone-100'}`}
            >
              {s}
              {size === s && <Check className="w-5 h-5 text-emerald-600" />}
            </button>
          ))}
        </div>
      </div>

      <button 
        onClick={() => onNext({ hasCleanWater: hasCleanWater!, communitySize: size! })}
        disabled={hasCleanWater === null || size === null}
        className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg disabled:opacity-50"
      >
        Continue
      </button>
    </div>
  );
};

const RoleSelection = ({ onSelect }: { onSelect: (role: UserRole) => void }) => {
  const roles: { id: UserRole, label: string, icon: any, desc: string }[] = [
    { id: 'Member', label: 'Resident', icon: Home, desc: 'Household health alerts' },
    { id: 'Leader', label: 'Village Leader', icon: Users, desc: 'Coordinate community action' },
    { id: 'HealthWorker', label: 'Health Worker', icon: Activity, desc: 'Report cases & monitor' },
    { id: 'Volunteer', label: 'Volunteer', icon: User, desc: 'Help with prevention tasks' },
  ];

  return (
    <div className="flex-1 flex flex-col p-6 bg-white overflow-y-auto">
      <div className="mt-12 mb-8">
        <h2 className="text-2xl font-bold mb-2">Your Role</h2>
        <p className="text-stone-500">We will tailor the tools to your needs.</p>
      </div>

      <div className="space-y-4 mb-8">
        {roles.map(r => (
          <button 
            key={r.id}
            onClick={() => onSelect(r.id)}
            className="w-full p-4 text-left border-2 border-stone-100 rounded-2xl flex items-center hover:border-emerald-500 hover:bg-emerald-50 transition-all"
          >
            <div className="w-12 h-12 bg-stone-50 rounded-xl flex items-center justify-center mr-4">
              <r.icon className="w-6 h-6 text-stone-600" />
            </div>
            <div>
              <p className="font-bold text-lg">{r.label}</p>
              <p className="text-xs text-stone-500">{r.desc}</p>
            </div>
            <ChevronRight className="w-5 h-5 ml-auto text-stone-300" />
          </button>
        ))}
      </div>
    </div>
  );
};

const OfflineSetup = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white text-center">
      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
        <Wifi className="w-10 h-10 text-blue-600" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Preparing Offline Mode</h2>
      <p className="text-stone-500 mb-8">Downloading health guides so you can use the app without internet.</p>
      
      <div className="w-full bg-stone-100 h-3 rounded-full overflow-hidden mb-4">
        <motion.div 
          className="bg-emerald-500 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs font-bold text-stone-400 mb-12">{progress}% Complete</p>

      {progress === 100 && (
        <button 
          onClick={onComplete}
          className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg"
        >
          Finish Setup
        </button>
      )}
    </div>
  );
};

// --- Dashboard & Main Screens ---

const Dashboard = ({ profile, onNavigate }: { profile: UserProfile, onNavigate: (screen: string, params?: any) => void }) => (
  <div className="flex-1 flex flex-col bg-stone-50 overflow-y-auto pb-20">
    <div className="bg-emerald-600 p-6 pt-12 text-white rounded-b-[2.5rem] shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-emerald-100 text-sm">Welcome back,</p>
          <h2 className="text-xl font-bold">{profile.role === 'Leader' ? 'Village Leader' : profile.role === 'HealthWorker' ? 'Health Worker' : 'Community Member'}</h2>
        </div>
        <button className="p-2 bg-white/20 rounded-xl">
          <Bell className="w-6 h-6" />
        </button>
      </div>
      
      <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
        <div className="flex items-center mb-2">
          <AlertTriangle className="w-5 h-5 text-orange-300 mr-2" />
          <span className="font-bold">Active Alerts</span>
        </div>
        <p className="text-sm text-emerald-50">Heavy rain expected this week in {profile.village}. High malaria risk.</p>
      </div>
    </div>

    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Current Risks</h3>
        <button className="text-emerald-600 text-sm font-bold">View Map</button>
      </div>
      
      {MOCK_RISKS.map(risk => (
        <RiskCard 
          key={risk.id} 
          risk={risk} 
          onClick={() => onNavigate('risk-details', { risk })} 
        />
      ))}

      <h3 className="font-bold text-lg mt-8 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate('prevention')}
          className="p-4 bg-white rounded-2xl border border-stone-200 flex flex-col items-center text-center shadow-sm"
        >
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-2">
            <Shield className="w-5 h-5 text-blue-600" />
          </div>
          <span className="text-xs font-bold">Prevention Guide</span>
        </button>
        
        {profile.role === 'Leader' && (
          <button 
            onClick={() => onNavigate('coordination')}
            className="p-4 bg-white rounded-2xl border border-stone-200 flex flex-col items-center text-center shadow-sm"
          >
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-2">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs font-bold">Community Plan</span>
          </button>
        )}

        {profile.role === 'HealthWorker' && (
          <button 
            onClick={() => onNavigate('report')}
            className="p-4 bg-white rounded-2xl border border-stone-200 flex flex-col items-center text-center shadow-sm"
          >
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mb-2">
              <FileText className="w-5 h-5 text-red-600" />
            </div>
            <span className="text-xs font-bold">Report Case</span>
          </button>
        )}

        {(profile.role === 'Member' || profile.role === 'Volunteer') && (
          <button 
            className="p-4 bg-white rounded-2xl border border-stone-200 flex flex-col items-center text-center shadow-sm"
          >
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-xs font-bold">My Tasks</span>
          </button>
        )}
      </div>
    </div>
  </div>
);

const RiskDetails = ({ risk, onBack, onNavigate }: { risk: DiseaseRisk, onBack: () => void, onNavigate: (s: string) => void }) => (
  <div className="flex-1 flex flex-col bg-white overflow-y-auto">
    <div className="p-6 pt-12 flex items-center border-b">
      <button onClick={onBack} className="mr-4 p-2 hover:bg-stone-100 rounded-full">
        <ArrowLeft className="w-6 h-6" />
      </button>
      <h2 className="text-xl font-bold">{risk.name} Risk</h2>
    </div>
    
    <div className="p-6">
      <div className={`p-6 rounded-3xl mb-6 ${risk.level === 'High' ? 'bg-red-50' : 'bg-orange-50'}`}>
        <div className="flex items-center mb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mr-4 ${risk.level === 'High' ? 'bg-red-500' : 'bg-orange-500'}`}>
            <AlertTriangle className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm opacity-70">Current Level</p>
            <p className="text-xl font-bold">{risk.level}</p>
          </div>
        </div>
        <p className="text-stone-700 leading-relaxed">{risk.description}</p>
      </div>

      <h3 className="font-bold text-lg mb-4">Environmental Signals</h3>
      <div className="space-y-3 mb-8">
        <div className="flex items-center p-4 bg-stone-50 rounded-2xl">
          <Droplets className="w-5 h-5 text-blue-500 mr-4" />
          <div className="flex-1">
            <p className="text-sm font-bold">Rainfall</p>
            <p className="text-xs text-stone-500">Above average (Last 7 days)</p>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-300" />
        </div>
        <div className="flex items-center p-4 bg-stone-50 rounded-2xl">
          <Thermometer className="w-5 h-5 text-orange-500 mr-4" />
          <div className="flex-1">
            <p className="text-sm font-bold">Temperature</p>
            <p className="text-xs text-stone-500">Stable (28°C - 32°C)</p>
          </div>
          <ChevronRight className="w-4 h-4 text-stone-300" />
        </div>
      </div>

      <button 
        onClick={() => onNavigate('prevention')}
        className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg"
      >
        See Prevention Steps
      </button>
    </div>
  </div>
);

const PreventionScreen = ({ onBack }: { onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'malaria' | 'cholera'>('malaria');

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <div className="p-6 pt-12 flex items-center border-b">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-stone-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">Prevention Guide</h2>
      </div>

      <div className="flex p-4 gap-2">
        <button 
          onClick={() => setActiveTab('malaria')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === 'malaria' ? 'bg-emerald-600 text-white shadow-md' : 'bg-stone-100 text-stone-500'}`}
        >
          Malaria
        </button>
        <button 
          onClick={() => setActiveTab('cholera')}
          className={`flex-1 py-3 rounded-xl font-bold transition-all ${activeTab === 'cholera' ? 'bg-emerald-600 text-white shadow-md' : 'bg-stone-100 text-stone-500'}`}
        >
          Cholera
        </button>
      </div>

      <div className="p-6 space-y-6">
        {PREVENTION_STEPS[activeTab].map((step, idx) => (
          <div key={step.id} className="flex items-start">
            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mr-4 shrink-0">
              <span className="text-emerald-600 font-bold">{idx + 1}</span>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-1">{step.title}</h4>
              <p className="text-stone-600 text-sm leading-relaxed">{step.description}</p>
              <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-widest text-stone-400 bg-stone-100 px-2 py-1 rounded">
                {step.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CoordinationScreen = ({ onBack }: { onBack: () => void }) => {
  const [tasks, setTasks] = useState<CommunityAction[]>([
    { id: '1', task: 'Distribute mosquito nets', assignedTo: 'Health Volunteers', status: 'In Progress' },
    { id: '2', task: 'Clean village drainage', assignedTo: 'Sanitation Group', status: 'Pending' },
    { id: '3', task: 'Check water well quality', assignedTo: 'Village Leader', status: 'Completed' },
  ]);

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <div className="p-6 pt-12 flex items-center border-b">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-stone-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">Community Action</h2>
      </div>

      <div className="p-6">
        <div className="bg-purple-50 p-6 rounded-3xl mb-8">
          <h3 className="font-bold text-purple-900 mb-2">Village Response Plan</h3>
          <p className="text-sm text-purple-700">Coordinate with local groups to prepare for the upcoming rainy season.</p>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Active Tasks</h3>
          <button className="p-2 bg-emerald-100 text-emerald-700 rounded-xl">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="p-4 border border-stone-100 rounded-2xl flex items-center justify-between">
              <div>
                <p className="font-bold text-stone-800">{task.task}</p>
                <p className="text-xs text-stone-500">Assigned to: {task.assignedTo}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                task.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                task.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                'bg-stone-100 text-stone-500'
              }`}>
                {task.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ReportScreen = ({ onBack }: { onBack: () => void }) => {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Report Submitted</h2>
        <p className="text-stone-500 mb-8">Thank you for reporting. This data helps protect the whole community.</p>
        <button 
          onClick={onBack}
          className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto">
      <div className="p-6 pt-12 flex items-center border-b">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-stone-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">Report New Case</h2>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <label className="block text-sm font-bold mb-2">Disease Type</label>
          <select className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl outline-none">
            <option>Malaria</option>
            <option>Cholera</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Location / Household</label>
          <input type="text" placeholder="e.g. North Village, Block B" className="w-full p-4 bg-stone-50 border border-stone-200 rounded-2xl outline-none" />
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Symptoms Observed</label>
          <div className="grid grid-cols-2 gap-2">
            {['Fever', 'Chills', 'Vomiting', 'Diarrhea'].map(s => (
              <button key={s} className="p-3 border border-stone-200 rounded-xl text-sm font-medium hover:bg-emerald-50 hover:border-emerald-200">
                {s}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={() => setSubmitted(true)}
          className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg mt-4"
        >
          Submit Report
        </button>
      </div>
    </div>
  );
};

const MapScreen = ({ onBack, onNavigate }: { onBack: () => void, onNavigate: (s: string, p?: any) => void }) => {
  const [activeLayer, setActiveLayer] = useState<'risk' | 'water' | 'clinics'>('risk');
  const [selectedZone, setSelectedZone] = useState<any>(null);

  const zones = [
    { id: 'north', name: 'North Village', risk: 'High', x: '40%', y: '25%', disease: 'Malaria' },
    { id: 'east', name: 'East Settlement', risk: 'Medium', x: '70%', y: '45%', disease: 'Cholera' },
    { id: 'south', name: 'South Valley', risk: 'Low', x: '35%', y: '70%', disease: 'None' },
    { id: 'west', name: 'West Plains', risk: 'High', x: '15%', y: '50%', disease: 'Malaria' },
  ];

  const waterSources = [
    { id: 'w1', name: 'Main Well', x: '55%', y: '55%', status: 'Safe' },
    { id: 'w2', name: 'River Access', x: '20%', y: '30%', status: 'Contaminated' },
  ];

  const clinics = [
    { id: 'c1', name: 'Central Clinic', x: '50%', y: '45%' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-stone-100 overflow-hidden relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 pt-12 flex items-center bg-white/80 backdrop-blur-md z-30 border-b border-stone-200">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-stone-100 rounded-full">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold">Risk Map</h2>
        <div className="ml-auto flex gap-2">
          <button className="p-2 bg-white border border-stone-200 rounded-xl shadow-sm">
            <Settings className="w-5 h-5 text-stone-600" />
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-[#E5E7EB] overflow-hidden">
        {/* Schematic Map Background (Simplified rural terrain) */}
        <svg className="w-full h-full opacity-30" viewBox="0 0 400 800">
          <path d="M0,100 Q100,150 200,100 T400,150" fill="none" stroke="#9CA3AF" strokeWidth="2" />
          <path d="M50,0 Q80,200 50,400 T80,800" fill="none" stroke="#9CA3AF" strokeWidth="2" />
          <circle cx="200" cy="400" r="150" fill="#D1D5DB" />
          <rect x="250" y="200" width="100" height="150" fill="#D1D5DB" rx="20" />
        </svg>

        {/* Risk Zones */}
        {activeLayer === 'risk' && zones.map(zone => (
          <motion.div
            key={zone.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{ left: zone.x, top: zone.y }}
            onClick={() => setSelectedZone(zone)}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center animate-pulse ${
              zone.risk === 'High' ? 'bg-red-500/30 border-2 border-red-500' :
              zone.risk === 'Medium' ? 'bg-orange-500/30 border-2 border-orange-500' :
              'bg-emerald-500/30 border-2 border-emerald-500'
            }`}>
              {zone.risk === 'High' && <AlertTriangle className="w-6 h-6 text-red-600" />}
              {zone.risk === 'Medium' && <Info className="w-6 h-6 text-orange-600" />}
              {zone.risk === 'Low' && <Check className="w-6 h-6 text-emerald-600" />}
            </div>
            <p className="text-[10px] font-bold text-center mt-1 bg-white/80 px-1 rounded shadow-sm">{zone.name}</p>
          </motion.div>
        ))}

        {/* Water Sources */}
        {activeLayer === 'water' && waterSources.map(w => (
          <motion.div
            key={w.id}
            style={{ left: w.x, top: w.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className={`p-2 rounded-full shadow-lg ${w.status === 'Safe' ? 'bg-blue-500' : 'bg-red-500'}`}>
              <Droplets className="w-5 h-5 text-white" />
            </div>
            <p className="text-[10px] font-bold text-center mt-1 bg-white/80 px-1 rounded">{w.name}</p>
          </motion.div>
        ))}

        {/* Clinics */}
        {activeLayer === 'clinics' && clinics.map(c => (
          <motion.div
            key={c.id}
            style={{ left: c.x, top: c.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <div className="p-2 bg-white border-2 border-emerald-500 rounded-lg shadow-lg">
              <Plus className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-[10px] font-bold text-center mt-1 bg-white/80 px-1 rounded">{c.name}</p>
          </motion.div>
        ))}

        {/* User Location */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg animate-ping absolute"></div>
          <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg relative"></div>
        </div>
      </div>

      {/* Layer Toggles */}
      <div className="absolute bottom-24 left-6 right-6 flex justify-between bg-white/90 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-stone-200 z-30">
        <button 
          onClick={() => setActiveLayer('risk')}
          className={`flex-1 py-2 rounded-xl flex flex-col items-center gap-1 transition-all ${activeLayer === 'risk' ? 'bg-emerald-600 text-white' : 'text-stone-500'}`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span className="text-[10px] font-bold">Risks</span>
        </button>
        <button 
          onClick={() => setActiveLayer('water')}
          className={`flex-1 py-2 rounded-xl flex flex-col items-center gap-1 transition-all ${activeLayer === 'water' ? 'bg-emerald-600 text-white' : 'text-stone-500'}`}
        >
          <Droplets className="w-4 h-4" />
          <span className="text-[10px] font-bold">Water</span>
        </button>
        <button 
          onClick={() => setActiveLayer('clinics')}
          className={`flex-1 py-2 rounded-xl flex flex-col items-center gap-1 transition-all ${activeLayer === 'clinics' ? 'bg-emerald-600 text-white' : 'text-stone-500'}`}
        >
          <Plus className="w-4 h-4" />
          <span className="text-[10px] font-bold">Clinics</span>
        </button>
      </div>

      {/* Selected Zone Detail Panel */}
      <AnimatePresence>
        {selectedZone && (
          <motion.div 
            initial={{ y: 300 }}
            animate={{ y: 0 }}
            exit={{ y: 300 }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] shadow-2xl p-6 pb-12 z-50 border-t border-stone-200"
          >
            <div className="w-12 h-1.5 bg-stone-200 rounded-full mx-auto mb-6" onClick={() => setSelectedZone(null)}></div>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold">{selectedZone.name}</h3>
                <p className={`text-sm font-bold ${selectedZone.risk === 'High' ? 'text-red-600' : 'text-orange-600'}`}>
                  {selectedZone.risk} Risk: {selectedZone.disease}
                </p>
              </div>
              <button onClick={() => setSelectedZone(null)} className="p-2 bg-stone-100 rounded-full">
                <X className="w-5 h-5 text-stone-500" />
              </button>
            </div>
            <p className="text-stone-600 text-sm mb-6">Increased mosquito activity reported in this area. Heavy rainfall has created stagnant pools.</p>
            <button 
              onClick={() => onNavigate('prevention')}
              className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              View Prevention Guide
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend (Floating) */}
      <div className="absolute top-32 right-6 bg-white/90 p-3 rounded-2xl shadow-lg border border-stone-200 z-20">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-[10px] font-bold">High</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <span className="text-[10px] font-bold">Medium</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          <span className="text-[10px] font-bold">Low</span>
        </div>
      </div>
    </div>
  );
};

// --- Main App Logic ---

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [screenParams, setScreenParams] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile>({
    role: 'Member',
    language: 'English',
    village: '',
    hasCleanWater: true,
    communitySize: 'Medium',
    onboardingComplete: false
  });

  const navigate = (screen: string, params?: any) => {
    setCurrentScreen(screen);
    setScreenParams(params);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const renderScreen = () => {
    switch (currentScreen) {
      // Onboarding
      case 'welcome':
        return <WelcomeScreen onNext={() => navigate('language')} />;
      case 'language':
        return <LanguageSelection onSelect={(lang) => { updateProfile({ language: lang }); navigate('location'); }} />;
      case 'location':
        return <LocationSetup onNext={(village) => { updateProfile({ village }); navigate('community'); }} />;
      case 'community':
        return <CommunityProfile onNext={(data) => { updateProfile(data); navigate('role'); }} />;
      case 'role':
        return <RoleSelection onSelect={(role) => { updateProfile({ role }); navigate('offline'); }} />;
      case 'offline':
        return <OfflineSetup onComplete={() => { updateProfile({ onboardingComplete: true }); navigate('dashboard'); }} />;
      
      // Main App
      case 'dashboard':
        return <Dashboard profile={profile} onNavigate={navigate} />;
      case 'risk-details':
        return <RiskDetails risk={screenParams?.risk} onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      case 'prevention':
        return <PreventionScreen onBack={() => navigate('dashboard')} />;
      case 'coordination':
        return <CoordinationScreen onBack={() => navigate('dashboard')} />;
      case 'report':
        return <ReportScreen onBack={() => navigate('dashboard')} />;
      case 'map':
        return <MapScreen onBack={() => navigate('dashboard')} onNavigate={navigate} />;
      default:
        return <Dashboard profile={profile} onNavigate={navigate} />;
    }
  };

  return (
    <MobileFrame>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 flex flex-col h-full"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Bar (Only shown after onboarding) */}
      {profile.onboardingComplete && ['dashboard', 'risk-details', 'prevention', 'coordination', 'report', 'map'].includes(currentScreen) && (
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-stone-100 px-6 py-4 flex justify-between items-center z-40">
          <button onClick={() => navigate('dashboard')} className={`p-2 rounded-xl ${currentScreen === 'dashboard' ? 'text-emerald-600 bg-emerald-50' : 'text-stone-400'}`}>
            <Activity className="w-6 h-6" />
          </button>
          <button onClick={() => navigate('map')} className={`p-2 rounded-xl ${currentScreen === 'map' ? 'text-emerald-600 bg-emerald-50' : 'text-stone-400'}`}>
            <MapIcon className="w-6 h-6" />
          </button>
          <button onClick={() => navigate('report')} className={`p-2 rounded-xl ${currentScreen === 'report' ? 'text-emerald-600 bg-emerald-50' : 'text-stone-400'}`}>
            <FileText className="w-6 h-6" />
          </button>
          <button onClick={() => navigate('coordination')} className={`p-2 rounded-xl ${currentScreen === 'coordination' ? 'text-emerald-600 bg-emerald-50' : 'text-stone-400'}`}>
            <Users className="w-6 h-6" />
          </button>
        </div>
      )}
    </MobileFrame>
  );
}
