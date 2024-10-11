import React from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { Tooltip as ReactTooltip } from 'react-tooltip';

// TODO : Change with actual data, this is currently estimated data, because the author only releases his
// TODO: data to "reasonable" requests - so I didnt even bother to ask

// Register the required components
ChartJS.register(ArcElement, BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const FilterComponent = ({ onChange }) => (
    <select onChange={onChange}>
        <option value="all">Alle</option>
        <option value="Domestic Cats">Hauskatzen</option>
        <option value="Red Foxes">Rotfüchse</option>
        <option value="Red-tailed Hawks">Rotschwanzbussarde</option>
        <option value="Virginia Opossums">Virginia-Opossums</option>
    </select>
);

const CatHuntingImpact = () => {
    const [filter, setFilter] = React.useState('all');

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    // Data based on the provided summary
    const data = {
        labels: ['Säugetiere', 'Vögel', 'Reptilien', 'Andere'],
        datasets: [{
            label: 'Domestic Cats',
            data: [54, 8, 1, 12], // Exact numbers from the summary
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40']
        }, {
            label: 'Red Foxes',
            data: [8, 1, 0, 6],
            backgroundColor: ['#4BC0C0', '#9966FF', '#FFCD56', '#C9CBCF']
        }, {
            label: 'Red-tailed Hawks',
            data: [1, 2, 1, 0],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FF9F40']
        }, {
            label: 'Virginia Opossums',
            data: [2, 0, 0, 1],
            backgroundColor: ['#4BC0C0', '#9966FF', '#FFCD56', '#C9CBCF']
        }]
    };

    const filteredData = {
        ...data,
        datasets: data.datasets.filter(dataset => filter === 'all' || dataset.label === filter)
    };

    return (
        <div className="chart-container">
            <h1>Der Einfluss von Raubtieren auf die Tierwelt in Washington, D.C.</h1>
            <p>Wie beeinflussen verschiedene Raubtiere die lokalen Wildtierpopulationen basierend auf dokumentierten Beutefängen</p>
            <FilterComponent onChange={handleFilterChange} />
            <Pie data={filteredData} />
            <Bar data={filteredData} />
            <ReactTooltip id="tooltip" place="top" effect="solid">
                <span>Mehr Infos</span>
            </ReactTooltip>
            <p>Quelle: <a href="https://urbanxnaturelab.com/publications/herrera_etal_2022_BiolCon.pdf" target="_blank" rel="noopener noreferrer">Herrera et al. (2022)</a></p>
        </div>
    );
};

export default CatHuntingImpact;

