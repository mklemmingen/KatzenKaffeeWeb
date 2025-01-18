import React, {useEffect, useState} from 'react';
import {Cell, Legend, Pie, PieChart, ResponsiveContainer, Sector} from 'recharts';
import Image from 'next/image';
import "../globals.css";
import "../_styles/CatHuntingImpact.css";

// Data with image paths
const data = [
    {name: 'Hauskatzen', value: 75, icon: '/assets/cat.png'},
    {name: 'Rotfüchse', value: 15, icon: '/assets/fox.png'},
    {name: 'Rotschwanzbussarde', value: 4, icon: '/assets/hawk.png'},
    {name: 'Virginia-Opossums', value: 3, icon: '/assets/opossum.png'}
];

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40'];

const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index, activeIndex}) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    // Scale up the image if active
    const size = outerRadius * (index === activeIndex ? 0.7 : 0.2);

    return (
        <foreignObject x={x - size / 2} y={y - size / 2} width={size} height={size}>
            <Image src={data[index].icon} alt={data[index].name} width={size} height={size}/>
        </foreignObject>
    );
};

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value} = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius + 10}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
        </g>
    );
};

const CatHuntingImpact = () => {
    const [isClient, setIsClient] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    };

    if (!isClient) {
        return null;
    }

    return (
        <div className="chart-container">
            <h2 className="pre-titel">Der Einfluss von Raubtieren auf die Tierwelt</h2>
            <div className="chart-content">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            activeIndex={activeIndex}
                            activeShape={renderActiveShape}
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(props) => renderCustomizedLabel({...props, activeIndex})}
                            outerRadius="80%"
                            fill="#8884d8"
                            dataKey="value"
                            onMouseEnter={onPieEnter}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="chart-legend">
                    <Legend/>
                    <p className="title">Welches Tier jagt am meisten?</p>
                    <p className="description">Es wurde jeweils die gleiche Anzahl an Raubtieren
                        je Gattung verfolgt, um die Anzahl an erfolgreichen
                        Jagden zu vergleichen.
                    </p>
                    <p className="description">
                        Standort: Washington D.C., USA
                    </p>
                    <p className="source">Quelle: Herrera et al. (2022) The impact of predators on bird populations. Nature Communications, 3(1), 1-10.</p>
                </div>
            </div>
        </div>
    );
};

export default CatHuntingImpact;