import { useTheme } from '@mui/material/styles';
import {useEffect, useState} from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import {Box, Button} from "@mui/material";

import Info from "./Info";
import Header from "./Header";
import Control from "./Control";
import Charts from "./Charts";

const styles = {
    root_mobile: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        width: "100%",
        height: "99vh",
        backgroundColor:"white",
        margin:"auto",
    },
    root_pc: {
        margin:"auto",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-evenly",
        width: "60%",
        height: "100%",
        backgroundColor:"white",
    },
    button:{
        marginLeft:"10px",
        marginRight:"10px"
    }

};

interface Props {
    text?: string;
}

const Main: React.FC<Props> = ({ text = "Click" }) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));

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
            <Control setDarlehen={setDarlehen} setZins={setZins} setTilgung={setTilgung}></Control>
            <Button sx={styles.button} color={"inherit"} variant="contained" onClick={fillValueArray}>Berechnen</Button>
            <Charts schuldenArray={schuldenArray} zinsArray={monatsZinsArray} tilgungsArray={monatsTilgungArray} labels={labels}></Charts>
            <Info laufzeitMonate={endlaufzeitMonate} bezahlteZinsen={bezahlteZinsenGesamt} monatlicheRaten={monatlicheRaten}></Info>
        </Box>
    );
};

export default Main;
