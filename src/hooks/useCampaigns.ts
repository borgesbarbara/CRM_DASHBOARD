import { useState, useEffect } from 'react';
import { rdStationService, Campaign } from '../services/rdStation';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        setLoading(true);
        setError(null);
        const data = await rdStationService.getCampaigns();
        setCampaigns(data);
      } catch (err) {
        setError('Erro ao carregar campanhas');
        console.error('Erro ao carregar campanhas:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaigns();
  }, []);

  return { campaigns, loading, error };
}

