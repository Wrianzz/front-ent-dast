import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

interface ChartData {
    name: string;
    students: number;
}

const App: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const [data, setData] = useState<ChartData[]>([]);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    useEffect(() => {
        // Fetch data from the backend API
        fetch('/api/apiService.ts') // Replace with your backend endpoint
            .then(response => response.json())
            .then((fetchedData: ChartData[]) => setData(fetchedData))
            .catch(error => console.error('Error fetching chart data:', error));
    }, []);

    const onPieEnter = (_: any, index: number) => {
        setActiveIndex(index);
    };

    return (
        <div>
            {data.length > 0 ? (
                <PieChart width={700} height={700}>
                    <Pie
                        activeIndex={activeIndex}
                        data={data}
                        dataKey="students"
                        outerRadius={250}
                        fill="green"
                        onMouseEnter={onPieEnter}
                        style={{ cursor: 'pointer', outline: 'none' }}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export {};
