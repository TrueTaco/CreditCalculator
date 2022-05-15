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

}

const Control: React.FC<Props> = ({}) => {
    const classes = useStyles();

    return (

        <Box className={classes.root}>
            <TextField  className={classes.textfield} type="number" label="Darlehen" variant="outlined" />
            <TextField  className={classes.textfield} type="number" label="Zinssatz" variant="outlined" />
            <TextField  className={classes.textfield} type="number" label="Tilgung" variant="outlined" />
        </Box>
    );
};

export default Control;
