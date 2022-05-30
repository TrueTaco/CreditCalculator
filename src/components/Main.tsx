import { createStyles, makeStyles } from "@mui/styles";
import {useEffect, useState} from "react";
import {Box, Button, listItemAvatarClasses, Typography} from "@mui/material";

import Info from "./Info";
import Header from "./Header";
import Control from "./Control";
import Charts from "./Charts";

const useStyles = makeStyles({
    root: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        width: "100%",
        height: "100vh",
        backgroundColor:"#F0F0F0"
    },
    button:{
        color:"white",
        backgroundColor:"#F0F0F0",
    }

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
    const [darlehen, setNewDarlehen] = useState<number>(50000);
    const [zins, setNewZins] = useState<number>(1.0);
    const [anfangsTilgung, setNewAnfangsTilgung] = useState<number>(20.0);

    const [endlaufzeitMonate, setEndlaufzeitMonate] = useState<number>(0);
    const [bezahlteZinsenGesamt, setBezahlteZinsenGesamt] = useState<number>(0);



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

        monatsAnnuität = (darlehen*(zins+anfangsTilgung))/1200;
        restSchuld = darlehen;

        while(restSchuld>0.0){

            monatsZins = (restSchuld*zins)/1200;
            monatsTilgung = monatsAnnuität - monatsZins;

            if(monat%12 == 0){
                console.log(monatsZins)
                console.log(monatsTilgung)
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
            <Control setDarlehen={setDarlehen} setZins={setZins} setTilgung={setTilgung}></Control>
            <Button className={classes.button} variant="contained" onClick={fillValueArray}>Berechnen</Button>
            <Charts schuldenArray={schuldenArray} zinsArray={monatsZinsArray} tilgungsArray={monatsTilgungArray} labels={labels}></Charts>
            <Info laufzeitMonate={endlaufzeitMonate} bezahlteZinsen={bezahlteZinsenGesamt}></Info>
        </Box>
    );
};

export default Main;
