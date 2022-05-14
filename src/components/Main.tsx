import { createStyles, makeStyles } from "@mui/styles";
import {useEffect, useState} from "react";
import {Box} from "@mui/material";

const useStyles = makeStyles({
    root: {
        //margin:"6pt",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        width: "100vw"
    },
    navBar:{
        width:"100%"
    },
    box:{
        //borderRadius: "40px",
        backgroundColor:"white",
        position:"fixed",
        bottom: 0,
        left:0,
        right: 0
    }
});

interface Props {
    text?: string;
}

const Main: React.FC<Props> = ({ text = "Click" }) => {
    const classes = useStyles();
    const [value, setValue] = useState('Home');
    const [schuldenArray, setSchulden] = useState<number[]>([]);
    const [monatsZinsArray, setMonatsZinsArray] = useState<number[]>([]);
    const [monatsTilgungArray, setMonatsTilgungArray] = useState<number[]>([]);
    const darlehen: number = 55000;
    const zins: number = 1.0;
    const anfangsTilgung: number = 20.0;

    useEffect(() => {
        console.log("Test")
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
            if (monat%12 == 0){
                setSchulden((schuldenArray:any) => [...schuldenArray,restSchuld]);
                setMonatsZinsArray((monatsZinsArray:any) => [...monatsZinsArray,monatsZins])
                setMonatsTilgungArray((monatsTilgungArray:any) => [...monatsTilgungArray,monatsTilgung])
            }
            restSchuld = restSchuld - monatsTilgung;
            bezahlteZinsen = bezahlteZinsen + monatsZins;

            if((restSchuld+(restSchuld*zins)/1200)<monatsAnnuität){
                monatsZins = (restSchuld*zins)/1200;
                bezahlteZinsen += monatsZins;
                restSchuld = 0.0;
                monat++;
            }
        }
        console.log(`Laufzeit: Jahre: ${monat/12}   Monate: ${monat%12}  bezahlte Zins: ${bezahlteZinsen}`)
    }

    useEffect(() => {
        console.log(value)
    },[value]);

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box className={classes.root}>
        </Box>
    );
};

export default Main;
