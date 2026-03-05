export type RiskLevel = 'Low' | 'Medium' | 'High';
export type UserRole = 'Member' | 'Leader' | 'HealthWorker' | 'Volunteer';

export interface DiseaseRisk {
  id: string;
  name: string;
  level: RiskLevel;
  trend: 'up' | 'down' | 'stable';
  description: string;
  lastUpdated: string;
}

export interface PreventionStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Household' | 'Community' | 'Personal';
}

export interface CommunityAction {
  id: string;
  task: string;
  assignedTo: string;
  status: 'Pending' | 'In Progress' | 'Completed';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  importance: string;
  steps: string[];
  priority: 'Low' | 'Medium' | 'High';
  status: 'Active' | 'Completed';
  category: 'Household' | 'Community' | 'Health' | 'Emergency';
  icon: string;
  assignedBy?: string;
  dueDate?: string;
}

export interface UserProfile {
  role: UserRole;
  language: string;
  village: string;
  hasCleanWater: boolean;
  communitySize: 'Small' | 'Medium' | 'Large';
  onboardingComplete: boolean;
}
