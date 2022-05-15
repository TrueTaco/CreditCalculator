import { createStyles, makeStyles } from "@mui/styles";
import {useEffect, useState} from "react";
import {Box, Typography} from "@mui/material";
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
import Info from "./Info";
import Header from "./Header";
import Control from "./Control";

const useStyles = makeStyles({
    root: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        width: "100%",
        height: "100vh",
        backgroundColor:"#F0F0F0"
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
    text?: string;
}

const Main: React.FC<Props> = ({ text = "Click" }) => {
    const classes = useStyles();
    const [schuldenArray, setSchulden] = useState<any[]>([]);
    const [monatsZinsArray, setMonatsZinsArray] = useState<number[]>([]);
    const [monatsTilgungArray, setMonatsTilgungArray] = useState<number[]>([]);
    const [labels, setLabels] = useState<any[]>([]);
    const darlehen: number = 55000;
    const zins: number = 1.0;
    const anfangsTilgung: number = 4.0;

    const [endlaufzeitMonate, setEndlaufzeitMonate] = useState<number>(0);
    const [bezahlteZinsenGesamt, setBezahlteZinsenGesamt] = useState<number>(0);

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
                data: monatsZinsArray,
                //borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                stack: 'Stack 1',
            },
            {
                label: 'Tilgung',
                data: monatsTilgungArray,
                //borderColor: 'rgb(153, 62, 235)',
                backgroundColor: 'rgba(153, 62, 235, 0.5)',
                stack: 'Stack 2',
            }
        ]
    };

    const options = {
        plugins: {
            title: {
                display: true,
                text: 'Chart.js Bar Chart - Stacked',
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

    useEffect(() => {
        fillValueArray();
    },[]);


    const fillValueArray = () => {
        let monatsZins: number = 0.0;
        let monatsTilgung: number = 0.0;
        let bezahlteZinsen: number = 0.0;
        let restSchuld: number = 0.0;
        let monatsAnnuität: number = 0.0

        let monat:number = 0;

        monatsAnnuität = (darlehen*(zins*anfangsTilgung))/1200;
        restSchuld = darlehen;

        while(restSchuld>0.0){
            monatsZins = (restSchuld*zins)/1200;
            monatsTilgung = monatsAnnuität - monatsZins;
            if(monat%12 == 0){
                let temp = schuldenArray;
                temp.push(restSchuld);
                setSchulden(temp);

                temp = monatsZinsArray;
                temp.push(monatsZins);
                setMonatsZinsArray(temp);

                temp = monatsTilgungArray;
                temp.push(monatsTilgung)
                setMonatsTilgungArray(temp);
            }

            restSchuld = restSchuld - monatsTilgung;
            bezahlteZinsen = bezahlteZinsen + monatsZins;
            monat++;

            if((restSchuld+(restSchuld*zins)/1200)<monatsAnnuität){
                monatsZins = (restSchuld*zins)/1200;
                bezahlteZinsen += monatsZins;
                restSchuld = 0.0;
                monat++;
            }
        }
        setEndlaufzeitMonate(monat)
        setBezahlteZinsenGesamt(bezahlteZinsen)
        const labelsArray = new Array(Math.round(monat/12)).fill(null).map((_, i) => "Jahr "+(i+1));
        setLabels(labelsArray);
        console.log(`Laufzeit: Jahre: ${monat/12}   Monate: ${monat%12}  bezahlte Zins: ${bezahlteZinsen}`)
    }

    return (

        <Box className={classes.root}>
            <Header></Header>
            <Control></Control>
            <Bar  className={classes.chart} options={options} data={dataSchulden} />
            <Bar  className={classes.chart} options={options} data={dataZinsenTilgung} />
            <Info laufzeitMonate={endlaufzeitMonate} bezahlteZinsen={bezahlteZinsenGesamt}></Info>

        </Box>
    );
};

export default Main;
