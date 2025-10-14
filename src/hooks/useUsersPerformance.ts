import { useState, useEffect } from 'react';
import { rdStationService, UserPerformance } from '../services/rdStation';

export function useUsersPerformance() {
  const [users, setUsers] = useState<UserPerformance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        const data = await rdStationService.getUsersPerformance();
        setUsers(data);
      } catch (err) {
        setError('Erro ao carregar usuários');
        console.error('Erro ao carregar usuários:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  return { users, loading, error };
}

