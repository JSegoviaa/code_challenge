import { useState, useEffect } from 'react';
import { CampaignTable } from './components/CampaignTable';
import { DateRangeForm } from './components/DateRangeForm';
import { Campaign } from './types/campaign';
import { getCampaigns } from './api/campaigns';

function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize] = useState(5);
  const [tipoCampania, setTipoCampania] = useState<string | undefined>();
  const [total, setTotal] = useState(0);
  const [clearRange, setClearRange] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    loadCampaigns();
  }, [page, pageSize, tipoCampania, clearRange, startDate, endDate]);

  const loadCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getCampaigns(
        page,
        pageSize,
        tipoCampania,
        startDate,
        endDate
      );
      if (Array.isArray(response.data)) {
        setCampaigns(response.data);
        setTotal(response.total);
      } else {
        console.error('Invalid response format:', response);
        setError('Invalid data format received from server');
      }
    } catch (err) {
      console.error('Error in loadCampaigns:', err);
      setError(err instanceof Error ? err.message : 'Error loading campaigns');
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTipoCampaniaChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setTipoCampania(value === '' ? undefined : value);
    setPage(0);
  };

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="app-container container">
      <h1 className="app-title">Campaign Analytics</h1>

      <div className="section">
        <h2 className="section-title">Search by Date Range</h2>
        <DateRangeForm
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setClearRange={setClearRange}
        />
      </div>

      <div className='relative'>
        <label
          className="block mb-2.5 text-sm font-medium"
          htmlFor="tipoCampania"
        >
          Campaign Type
        </label>
        <select
          id="tipoCampania"
          value={tipoCampania || ''}
          onChange={handleTipoCampaniaChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm appearance-none transition-all ease-in-out"
        >
          <option value="">All Types</option>
          <option value="mensual">Mensual</option>
          <option value="catorcenal">Catorcenal</option>
        </select>
        <div className="pointer-events-none absolute bottom-2 right-0 flex items-center pr-3">
          ▼
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <CampaignTable data={campaigns} />

          <div className="mt-4 flex justify-between">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
               className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ease-in-out"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={(page + 1) * pageSize >= total}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ease-in-out"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
