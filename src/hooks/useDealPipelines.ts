import { useState, useEffect } from 'react';
import { rdStationService, DealPipeline } from '../services/rdStation';

interface UseDealPipelinesReturn {
  pipelines: DealPipeline[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDealPipelines(): UseDealPipelinesReturn {
  const [pipelines, setPipelines] = useState<DealPipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPipelines = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await rdStationService.getDealPipelines();
      setPipelines(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      console.error('Erro ao buscar funis de venda:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPipelines();
  }, []);

  return {
    pipelines,
    loading,
    error,
    refetch: fetchPipelines
  };
}
