import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from 'chart.js';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import "../globals.css";

ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

const CatHuntingImpact = () => {
    const data = {
        labels: ['Hauskatzen', 'Rotfüchse', 'Rotschwanzbussarde', 'Virginia-Opossums'],
        datasets: [{
            label: 'Säugetiere',
            data: [54, 8, 1, 2],
            backgroundColor: '#FF6384'
        }, {
            label: 'Vögel',
            data: [8, 1, 2, 0],
            backgroundColor: '#36A2EB'
        }, {
            label: 'Reptilien',
            data: [1, 0, 1, 0],
            backgroundColor: '#FFCE56'
        }, {
            label: 'Andere',
            data: [12, 6, 0, 1],
            backgroundColor: '#FF9F40'
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += context.parsed.y;
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
                beginAtZero: true,
                ticks: {
                    stepSize: 5,
                    min: 0,
                    max: 60,
                    font: {
                        size: 10
                    },
                    padding: 10,
                    tickLength: 100
                },
                title: {
                    display: true,
                    text: 'Anzahl getöteter Tiere'
                }
            }
        }
    };

    return (
        <div className="chart-container">
            <h1>Der Einfluss von Raubtieren auf die Tierwelt in Washington, D.C.</h1>
            <p>
                Welches Tier jagt welche Arten am Meisten?
                Es wurde jeweils die gleiche Anzahl an Raubtieren je Gattung verfolgt. <br/>
            </p>
            <div className="diagram">
                <Bar data={data} options={options} />
            </div>
            <p>Quelle: <a href="https://urbanxnaturelab.com/publications/herrera_etal_2022_BiolCon.pdf" target="_blank" rel="noopener noreferrer">Herrera et al. (2022)</a></p>
        </div>
    );
};

export default CatHuntingImpact;
