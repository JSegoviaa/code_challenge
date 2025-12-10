import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format } from 'date-fns';

import { Campaign } from '../types/campaign';
import { useState } from 'react';
import CampaignModal from './CampaignModal';

const columnHelper = createColumnHelper<Campaign>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Nombre',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('tipo_campania', {
    header: 'Tipo',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('fecha_inicio', {
    header: 'Fecha Inicio',
    cell: (info) => format(new Date(info.getValue()), 'dd/MM/yyyy'),
  }),
  columnHelper.accessor('fecha_fin', {
    header: 'Fecha Fin',
    cell: (info) => format(new Date(info.getValue()), 'dd/MM/yyyy'),
  }),
  columnHelper.accessor('impactos_personas', {
    header: 'Impactos (Personas)',
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor('impactos_vehiculos', {
    header: 'Impactos (Vehículos)',
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor('alcance', {
    header: 'Alcance',
    cell: (info) => info.getValue().toLocaleString(),
  }),
];

interface CampaignTableProps {
  data: Campaign[];
}

export const CampaignTable: React.FC<CampaignTableProps> = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const [selectedTab, setSelectedTab] = useState('site');

  const onOpenModal = (campaignName: string): void => {
    setIsModalOpen((prev) => !prev);
    setCampaignName(campaignName);
  };

  const onCloseModal = (): void => {
    setIsModalOpen((prev) => !prev);
    setCampaignName('');
    setSelectedTab('site');
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            ))}
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-100 cursor-pointer border-b border-border"
                onClick={() => onOpenModal(row.getValue('name'))}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CampaignModal
        isModalOpen={isModalOpen}
        campaignName={campaignName}
        onCloseModal={onCloseModal}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
    </>
  );
};
