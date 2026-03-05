import { DiseaseRisk, PreventionStep, Task } from '../types';

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

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Clear Standing Water',
    description: 'Remove all stagnant water around your home where mosquitoes can breed.',
    importance: 'Stagnant water is where mosquitoes lay eggs. Clearing it reduces the number of mosquitoes that carry Malaria.',
    steps: [
      'Check around your house for old tires, buckets, or tins.',
      'Empty any water found in these containers.',
      'Turn containers upside down so they don\'t collect rain.',
      'Fill in small puddles with dirt or sand.'
    ],
    priority: 'High',
    status: 'Active',
    category: 'Household',
    icon: 'Droplets',
    dueDate: 'Today'
  },
  {
    id: 't2',
    title: 'Boil Drinking Water',
    description: 'Ensure all water used for drinking and cooking is boiled to kill germs.',
    importance: 'Boiling water kills the bacteria that causes Cholera and other stomach illnesses.',
    steps: [
      'Fill a clean pot with water.',
      'Bring the water to a rolling boil.',
      'Keep it boiling for at least 1 minute.',
      'Store in a clean, covered container.'
    ],
    priority: 'High',
    status: 'Active',
    category: 'Household',
    icon: 'Flame',
    dueDate: 'Ongoing'
  },
  {
    id: 't3',
    title: 'Community Well Cleaning',
    description: 'Join the group to clean and disinfect the main community well.',
    importance: 'A clean well prevents the spread of water-borne diseases to the whole village.',
    steps: [
      'Meet at the central well at 8:00 AM.',
      'Help remove debris from the surrounding area.',
      'Assist the health worker with chlorination.',
      'Inform neighbors not to use the well for 2 hours after treatment.'
    ],
    priority: 'Medium',
    status: 'Active',
    category: 'Community',
    icon: 'Users',
    assignedBy: 'Village Leader',
    dueDate: 'Tomorrow'
  }
];
