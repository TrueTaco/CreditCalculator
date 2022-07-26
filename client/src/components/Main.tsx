import { useTheme } from '@mui/material/styles';
import {useEffect, useState} from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box, IconButton } from "@mui/material";
import CalculateIcon from '@mui/icons-material/Calculate';

import Info from "./Info";
import Header from "./Header";
import Control from "./Control";
import Charts from "./Charts";

const styles = {
    root_mobile: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        alignItems:"center",
        backgroundColor:"#E1D5D9",
    },
    root_pc: {
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-evenly",
        width: "100%",
        backgroundColor:"white",
    },
    button:{
        marginLeft:"10px",
        marginRight:"10px",
        height:"100%",
        borderRadius: "8px",
        color:"#1C252C",
        backgroundColor:"#E1D5D9",
        '&:hover': {
            backgroundColor: '#B7A7AE',
            color: '#1C252C',
        },
    },
    control_mobile:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems: "center",
        padding:"10px",
        position: "sticky",
        backgroundColor:"white",
        borderRadius:"10px",
        width:"95%"
    },
    control_pc:{
        paddingTop:"15px",
        position: "sticky",
        top: "0",
        backgroundColor:"white",
        width: "100%",
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems: "center",
        paddingBottom:"15px",
    },
    charts:{
        height:"100%",
        backgroundColor:"white",
    },
    chart_mobile: {
        display:"flex",
        flexDirection:"column",
        borderRadius: "10px",
        padding:"10px",
        width: "100%",
        gap:"15px"
    },
    chart_pc: {
        padding:"20px",
        display:"flex",
        flexDirection:"column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#E1D5D9"
    },


};

interface Props {
}

const Main: React.FC<Props> = ({ }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const [schuldenArray, setSchulden] = useState<any[]>([]);
    const [monatsZinsArray, setMonatsZinsArray] = useState<number[]>([]);
    const [monatsTilgungArray, setMonatsTilgungArray] = useState<number[]>([]);
    const [labels, setLabels] = useState<any[]>([]);
    const [darlehen, setNewDarlehen] = useState<number>(50000);
    const [zins, setNewZins] = useState<number>(1.0);
    const [anfangsTilgung, setNewAnfangsTilgung] = useState<number>(20.0);

    const [endlaufzeitMonate, setEndlaufzeitMonate] = useState<number>(0);
    const [bezahlteZinsenGesamt, setBezahlteZinsenGesamt] = useState<number>(0);
    const [monatlicheRaten, setMonatlicheRaten] = useState<number>(0);



    const setDarlehen = (amount:number) => {
        setNewDarlehen(amount);
    }

    const setZins = (amount:number) => {
        setNewZins(amount);
    }

    const setTilgung = (amount:number) => {
        setNewAnfangsTilgung(amount);
    }

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

        // @ts-ignore
        monatsAnnuität = (parseInt(darlehen)*(parseInt(zins)+parseInt(anfangsTilgung)))/1200;
        restSchuld = darlehen;

        let tempSchuldenArray = [];
        let tempMonatsZinsArray = [];
        let tempMonatsTilgungArray = [];

        while(restSchuld>0.0){

            monatsZins = (restSchuld*zins)/1200;
            monatsTilgung = monatsAnnuität - monatsZins;

            if(monat%12 == 0){
                tempSchuldenArray.push(restSchuld);
                tempMonatsZinsArray.push(monatsZins);
                tempMonatsTilgungArray.push(monatsTilgung)
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

        setSchulden(tempSchuldenArray);
        setMonatsZinsArray(tempMonatsZinsArray);
        setMonatsTilgungArray(tempMonatsTilgungArray);
        setEndlaufzeitMonate(monat)
        setBezahlteZinsenGesamt(bezahlteZinsen)
        setMonatlicheRaten(monatsZins+monatsTilgung)
        const labelsArray = new Array(Math.round(monat/12)).fill(null).map((_, i) => "Jahr "+(i+1));
        setLabels(labelsArray);
        console.log(`Laufzeit: Jahre: ${monat/12}   Monate: ${monat%12}  bezahlte Zins: ${bezahlteZinsen}`)
    }

    return (
        <Box sx={matches ? styles.root_pc : styles.root_mobile}>
            <Header></Header>
            <Box sx={matches ? styles.control_pc : styles.control_mobile}>
                <Control setDarlehen={setDarlehen} setZins={setZins} setTilgung={setTilgung}></Control>
                <IconButton sx={styles.button} aria-label="calculate" onClick={fillValueArray}>
                    <CalculateIcon sx={{ fontSize: 40 }}/>
                </IconButton>
            </Box>
            <Box sx={matches ? styles.chart_pc : styles.chart_mobile}>
                <Info laufzeitMonate={endlaufzeitMonate} bezahlteZinsen={bezahlteZinsenGesamt} monatlicheRaten={monatlicheRaten}></Info>
                <Charts schuldenArray={schuldenArray} zinsArray={monatsZinsArray} tilgungsArray={monatsTilgungArray} labels={labels}></Charts>
            </Box>

        </Box>
    );
};

export default Main;
