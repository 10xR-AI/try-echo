import { create } from 'zustand';

interface CampaignStore {
  testEmails: string[];
  setTestEmails: (emails: string[]) => void;
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  testEmails: [],
  setTestEmails: (emails) => set({ testEmails: emails }),
}));