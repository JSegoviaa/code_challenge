import { FC } from 'react';
import { Cell, Pie, PieChart  } from 'recharts';

interface Props {
  data: { name: string; value: number | undefined}[];
  colors: string[]
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  outerRadius,
  percent,
  name,
}: any) => {
  if (cx == null || cy == null || outerRadius == null) return null;

  const RADIAN = Math.PI / 180;
  const separation = 25; // distancia extra fuera del pastel

  const x =
    cx + (outerRadius + separation) * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y =
    cy + (outerRadius + separation) * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#333"
      className='lg:text-2xl text-sm'
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


export const PieGraph: FC<Props> = ({ data, colors }) => {
  return (

    <PieChart
      style={{
        aspectRatio: 1,
      }}
      className='lg:w-full !w-[700px]'
      responsive
    >
      <Pie
        data={data}
        labelLine
        label={renderCustomizedLabel}
        dataKey="value"
        isAnimationActive
      >
        {data.map((entry, index) => (
          <Cell
            key={`cell-${entry.name}`}
            fill={colors[index % colors.length]}
          />
        ))}
      </Pie>
    </PieChart>
  );
};

