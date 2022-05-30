import { createStyles, makeStyles } from "@mui/styles";
import {useEffect, useState} from "react";
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

const useStyles = makeStyles({
    root: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        width: "100%",
        height: "100vh",
        backgroundColor:"#F0F0F0"
    },
    textfield:{
        backgroundColor: "white",
    },
    chart: {
        height: "150%",
        border: "blue",
        backgroundColor: "white",
        borderRadius: "10px",
        margin:"10px"
    },
});

interface Props {
    schuldenArray: number[],
    zinsArray: number[],
    tilgungsArray: number[],
    labels: any[]
}

const Charts: React.FC<Props> = ({schuldenArray,zinsArray,tilgungsArray,labels }) => {
    const classes = useStyles();

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Ergebnisse',
            },
        },
        responsive: true,
        interaction: {
            mode: 'index' as const,
            intersect: false,
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const dataSchulden = {
        labels,
        datasets:[
            {
                label:"Schulden",
                data: schuldenArray,
                //borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                stack: 'Stack 0',
            }
        ]
    };
    const dataZinsenTilgung = {
        labels,
        datasets:[
            {
                label: 'Zinsen',
                data: zinsArray,
                //borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                stack: 'Stack 1',
            },
            {
                label: 'Tilgung',
                data: tilgungsArray,
                //borderColor: 'rgb(153, 62, 235)',
                backgroundColor: 'rgba(153, 62, 235, 0.5)',
                stack: 'Stack 2',
            }
        ]
    };

    return (

        <Box className={classes.root}>
            <Bar  className={classes.chart} options={options} data={dataSchulden} />
            <Bar  className={classes.chart} options={options} data={dataZinsenTilgung} />
        </Box>
    );
};

export default Charts;
