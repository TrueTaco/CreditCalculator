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

const useStyles = makeStyles({
    root: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        backgroundColor: "white",
        borderRadius: "10px",
        margin:"10px"
    }
});

interface Props {
    laufzeitMonate: number;
    bezahlteZinsen: number;
}

const Info: React.FC<Props> = ({laufzeitMonate, bezahlteZinsen }) => {
    const classes = useStyles();

    return (

            <Box className={classes.root}>
                <Typography variant={"h6"} align={"center"}>Laufzeit:</Typography>
                <Typography variant={"body2"} align={"center"}> Jahre: {laufzeitMonate/12}</Typography>
                <Typography variant={"body2"} align={"center"}>Monate: {laufzeitMonate%12}</Typography>
                <Typography variant={"body2"} align={"center"}>Bezahlte Zinsen: {bezahlteZinsen}</Typography>
            </Box>
    );
};

export default Info;
