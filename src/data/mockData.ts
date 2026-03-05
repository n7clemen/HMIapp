import { DiseaseRisk, PreventionStep } from '../types';

export const MOCK_RISKS: DiseaseRisk[] = [
  {
    id: 'malaria',
    name: 'Malaria',
    level: 'High',
    trend: 'up',
    description: 'Increased mosquito breeding due to recent heavy rainfall and stagnant water.',
    lastUpdated: '2 hours ago'
  },
  {
    id: 'cholera',
    name: 'Cholera',
    level: 'Medium',
    trend: 'stable',
    description: 'Minor flooding reported near water sources. Monitor water clarity.',
    lastUpdated: '5 hours ago'
  }
];

export const PREVENTION_STEPS: Record<string, PreventionStep[]> = {
  malaria: [
    { id: 'm1', title: 'Sleep under nets', description: 'Ensure all family members use treated mosquito nets.', icon: 'Bed', category: 'Household' },
    { id: 'm2', title: 'Clear stagnant water', description: 'Empty containers and fill puddles around the house.', icon: 'Droplets', category: 'Community' },
    { id: 'm3', title: 'Wear long sleeves', description: 'Cover skin during dawn and dusk when mosquitoes are active.', icon: 'Shirt', category: 'Personal' }
  ],
  cholera: [
    { id: 'c1', title: 'Boil water', description: 'Always boil or treat water before drinking or cooking.', icon: 'Flame', category: 'Household' },
    { id: 'c2', title: 'Wash hands', description: 'Use soap and clean water after using latrines and before eating.', icon: 'Hand', category: 'Personal' },
    { id: 'c3', title: 'Safe food prep', description: 'Cook food thoroughly and keep it covered from flies.', icon: 'Utensils', category: 'Household' }
  ]
};
