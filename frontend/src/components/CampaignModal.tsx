import { FC } from 'react';
import Modal from 'react-modal';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useGetCampaignDetail } from '../hooks/useGetCampaignDetail';
import { PieGraph } from './PieChart';
import {
  AGE_COLORS,
  GENDER_COLORS,
  NSE_COLORS,
} from '../constants/graph-colors';

interface Props {
  isModalOpen: boolean;
  campaignName: string;
  onCloseModal: () => void;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>;
  selectedTab: string;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    height: '700px',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: '#00009009',
  },
};

const CampaignModal: FC<Props> = ({
  isModalOpen,
  onCloseModal,
  campaignName,
  selectedTab,
  setSelectedTab,
}) => {
  const { campaignDetail, isLoading } = useGetCampaignDetail(campaignName);

  const pieGenderChartData = [
    { name: 'Hombres', value: campaignDetail?.hombres },
    { name: 'Mujeres', value: campaignDetail?.mujeres },
  ];

  const pieAgeChartData = [
    { name: '0 a 14', value: campaignDetail?.edad_0a14 },
    { name: '15 a 19', value: campaignDetail?.edad_15a19 },
    { name: '20 a 24', value: campaignDetail?.edad_20a24 },
    { name: '25 a 34', value: campaignDetail?.edad_25a34 },
    { name: '35 a 44', value: campaignDetail?.edad_35a44 },
    { name: '45 a 64', value: campaignDetail?.edad_45a64 },
    { name: '65 o más', value: campaignDetail?.edad_65mas },
  ];

  const pieNseChartData = [
    { name: 'Nivel socioeconómico AB', value: campaignDetail?.nse_ab },
    { name: 'Nivel socioeconómico C', value: campaignDetail?.nse_c },
    { name: 'Nivel socioeconómico C+', value: campaignDetail?.nse_cmas },
    { name: 'Nivel socioeconómico D', value: campaignDetail?.nse_d },
    { name: 'Nivel socioeconómico D+', value: campaignDetail?.nse_dmas },
    { name: 'Nivel socioeconómico E', value: campaignDetail?.nse_e },
  ];

  const sitesData = campaignDetail?.sites.map((s) => ({
    codigo: s.codigo_del_sitio,
    impactos: s.impactos_mensuales,
  }));

  return (
    <Modal isOpen={isModalOpen} style={customStyles} ariaHideApp={false}>
      <div
        className="sticky text-right top-0 right-0 text-2xl font-bold cursor-pointer hover:text-indigo-500 transition-colors ease-in-out z-20"
        onClick={onCloseModal}
      >
        X
      </div>
      {isLoading ? (
        'Cargando'
      ) : (
        <>
          <div className="section-title">Resumen general</div>
          <div className="flex lg:gap-14 lg:flex-row flex-col gap-4">
            <div className="flex gap-4 flex-col">
              <div className="flex gap-2 items-center">
                <div className="block text-md font-medium">Campaña:</div>
                <div> {campaignDetail?.name}</div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="block text-md font-medium">
                  Tipo de campaña:
                </div>
                <div> {campaignDetail?.tipo_campania}</div>
              </div>
            </div>
            <div className="flex gap-4 flex-col">
              <div className="flex gap-2 items-center">
                <div className="block text-md font-medium">
                  Fecha de inicio:
                </div>
                <div> {campaignDetail?.fecha_inicio}</div>
              </div>
              <div className="flex gap-2 items-center">
                <div className="block text-md font-medium">
                  Fecha de finalización:
                </div>
                <div> {campaignDetail?.fecha_fin}</div>
              </div>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium text-center text-body border-b border-default">
              <div className="flex flex-wrap py-4 rounded-md gap-2">
                <button
                  className={`bg-indigo-200 rounded-md hover:bg-indigo-300 transition-colors ease-in-out flex-1 ${
                    selectedTab === 'site' ? '!bg-indigo-400' : ''
                  }`}
                >
                  <div onClick={() => setSelectedTab('site')}>
                    Site overview
                  </div>
                </button>
                <button
                  className={`bg-indigo-200 rounded-md hover:bg-indigo-300 transition-colors ease-in-out flex-1 ${
                    selectedTab === 'period' ? '!bg-indigo-400' : ''
                  }`}
                >
                  <div onClick={() => setSelectedTab('period')}>
                    Period overview
                  </div>
                </button>
                <button
                  className={`bg-indigo-200 rounded-md hover:bg-indigo-300 transition-colors ease-in-out flex-1 ${
                    selectedTab === 'campaing' ? '!bg-indigo-400' : ''
                  }`}
                >
                  <div onClick={() => setSelectedTab('campaing')}>
                    Campaign Summary
                  </div>
                </button>
              </div>
            </div>
            <ResponsiveContainer
              width="100%"
              height={600}
              className="mt-4 lg:overflow-y-hidden overflow-scroll"
            >
              {selectedTab === 'site' && (
                <PieGraph data={pieAgeChartData} colors={AGE_COLORS} />
              )}
              {selectedTab === 'period' && (
                <div className="flex lg:flex-row flex-col">
                  <PieGraph data={pieGenderChartData} colors={GENDER_COLORS} />

                  <PieGraph data={pieNseChartData} colors={NSE_COLORS} />
                </div>
              )}
              {selectedTab === 'campaing' && (
                <BarChart data={sitesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="codigo" type="category" width={260} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="impactos" fill="#FF8042" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </>
      )}
    </Modal>
  );
};

export default CampaignModal;
