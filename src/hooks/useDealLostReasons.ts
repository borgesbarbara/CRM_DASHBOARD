import { useState, useEffect } from 'react';
import { rdStationService, DealLostReason } from '../services/rdStation';

interface UseDealLostReasonsReturn {
  reasons: DealLostReason[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDealLostReasons(): UseDealLostReasonsReturn {
  const [reasons, setReasons] = useState<DealLostReason[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReasons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await rdStationService.getDealLostReasons();
      setReasons(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      console.error('Erro ao buscar motivos de perda:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReasons();
  }, []);

  return {
    reasons,
    loading,
    error,
    refetch: fetchReasons
  };
}

