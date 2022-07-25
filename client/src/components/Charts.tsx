import { useTheme } from '@mui/material/styles';
import {useEffect} from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {Box} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const styles = {
    chart_pc: {
        padding:"10px",
        width:"50%",
        backgroundColor: "white",
        borderRadius: "10px",
    },
    chart_mobile: {
        padding:"10px",
        width:"100%",
        backgroundColor: "white",
        borderRadius: "10px",
    },
};

interface Props {
    schuldenArray: number[],
    zinsArray: number[],
    tilgungsArray: number[],
    labels: any[]
}

const Charts: React.FC<Props> = ({schuldenArray,zinsArray,tilgungsArray,labels }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    useEffect(() => {
    },[schuldenArray,zinsArray,tilgungsArray,labels]);

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Restschulden pro Jahr',
            },
        },
        responsive: true,
    };

    const options2 = {
        plugins: {
            title: {
                display: true,
                text: 'Monatliche Zinsen und Tilgung pro Jahr',
            },
        },
        responsive: true,
    };

    const dataSchulden = {
        labels,
        datasets:[
            {
                label:"Schulden",
                data: schuldenArray,
                backgroundColor: 'rgb(183, 167, 174, 0.9)',
            }
        ]
    };
    const dataZinsenTilgung = {
        labels,
        datasets:[
            {
                label: 'Zinsen',
                data: zinsArray,
                backgroundColor: 'rgb(88, 84, 91, 0.9)',
            },
            {
                label: 'Tilgung',
                data: tilgungsArray,
                backgroundColor: 'rgb(28, 37, 44, 0.9)',
            }
        ]
    };

    return (
            <Box sx={matches ? styles.chart_pc : styles.chart_mobile}>
                <Bar  options={options} data={dataSchulden} />
                <Bar  options={options2} data={dataZinsenTilgung} />
            </Box>
    );
};

export default Charts;
