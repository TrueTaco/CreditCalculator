import { makeStyles } from "@mui/styles";
import {Box, Typography} from "@mui/material";

const useStyles = makeStyles({
    root: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        backgroundColor: "white",
        margin:"10px",
        padding:"10px",
        borderStyle:"solid",
        borderRadius: "10px",
        borderColor:"lightgrey",
        marginTop:"10px"
    }
});

interface Props {
    laufzeitMonate: number;
    bezahlteZinsen: number;
    monatlicheRaten: number;
}

const Info: React.FC<Props> = ({laufzeitMonate, bezahlteZinsen, monatlicheRaten }) => {
    const classes = useStyles();

    return (
            <Box className={classes.root}>
                <Typography variant={"h6"} align={"center"}>Laufzeit:</Typography>
                <Typography variant={"body2"} align={"center"}> Jahre: {Math.trunc(laufzeitMonate/12)} Monate: {laufzeitMonate%12}</Typography>
                <Typography variant={"body2"} align={"center"}>Monatliche Raten: {monatlicheRaten.toFixed(2)}</Typography>
                <Typography variant={"body2"} align={"center"}>Bezahlte Zinsen: {bezahlteZinsen.toFixed(2)}</Typography>
            </Box>
    );
};

export default Info;
