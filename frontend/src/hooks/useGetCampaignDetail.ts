import { useEffect, useState } from 'react';
import { CampaignDetail } from '../types/campaign';
import { getCampaignDetail } from '../api/campaigns';

export const useGetCampaignDetail = (name: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaignDetail, setCampaignDetail] = useState<CampaignDetail>();
  const [errors, setErrors] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    const getCampaign = async (): Promise<void> => {
      try {
        setErrors(null);
        setIsLoading(true);
        const response = await getCampaignDetail(name);
        setCampaignDetail(response);
      } catch (err) {
        console.error('Error in loadCampaigns:', err);
        setErrors(
          err instanceof Error ? err.message : 'Error loading campaigns'
        );
        setCampaignDetail(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    getCampaign();
  }, [name]);

  return {
    isLoading,
    campaignDetail,
    errors,
  };
};
