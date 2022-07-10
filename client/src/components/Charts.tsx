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
    root_mobile: {
        display:"flex",
        flexDirection:"column",
        width: "95%",
        margin:"auto",
        borderStyle:"solid",
        borderRadius: "10px",
        borderColor:"lightgrey",
        //marginTop:"10px"
    },
    root_pc: {
        display:"flex",
        justifyContent:"space-evenly",
        width: "40%",

    },
    chart: {
        backgroundColor: "white",
        borderRadius: "10px",
        margin:"10px"
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
                text: 'Ergebnisse',
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
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    };
    const dataZinsenTilgung = {
        labels,
        datasets:[
            {
                label: 'Zinsen',
                data: zinsArray,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: 'Tilgung',
                data: tilgungsArray,
                backgroundColor: 'rgba(153, 62, 235, 0.5)',
            }
        ]
    };

    return (
        <Box sx={matches ? styles.root_pc : styles.root_mobile}>
            <Bar  options={options} data={dataSchulden} />
            <Bar  options={options} data={dataZinsenTilgung} />
        </Box>
    );
};

export default Charts;
