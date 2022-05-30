import { createStyles, makeStyles } from "@mui/styles";
import {useEffect, useState} from "react";
import {Box, TextField, Typography} from "@mui/material";

const useStyles = makeStyles({
    root: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        borderRadius: "10px",
        margin:"10px",
        gap:"5px"
    },
    textfield:{
        backgroundColor: "white",
    }
});

interface Props {
    setDarlehen: (amount:number) => void;
    setZins: (amount:number) => void;
    setTilgung: (amount:number) => void;
}

const Control: React.FC<Props> = ({setDarlehen,setZins,setTilgung}) => {
    const classes = useStyles();



    const handleDarlehen = (event: React.ChangeEvent<{ value: unknown }>) => {
        if (event.target.value as number) {
            setDarlehen(event.target.value as number);
        }
    };

    const handleZins = (event: React.ChangeEvent<{ value: unknown }>) => {
        if (event.target.value as number) {
            setZins(event.target.value as number);
        }
    };

    const handleTilgung = (event: React.ChangeEvent<{ value: unknown }>) => {
        if (event.target.value as number) {
            setTilgung(event.target.value as number);
        }
    };

    return (

        <Box className={classes.root}>
            <TextField  className={classes.textfield} type="number" label="Darlehen" variant="outlined"  onChange={handleDarlehen}/>
            <TextField  className={classes.textfield} type="number" label="Zinssatz" variant="outlined" onChange={handleZins}/>
            <TextField  className={classes.textfield} type="number" label="Tilgung" variant="outlined" onChange={handleTilgung}/>
        </Box>
    );
};

export default Control;
