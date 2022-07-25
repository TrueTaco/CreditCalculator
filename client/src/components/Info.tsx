import { makeStyles } from "@mui/styles";
import {Box, Typography} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const styles = {
    root_pc: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        alignItems:"center",
        backgroundColor: "white",
        margin:"10px",
        padding:"10px",
        borderRadius: "10px",
        marginTop:"10px",
        gap:"10px",
        width:"50%"
    },
    root_mobile: {
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-evenly",
      alignItems:"center",
      backgroundColor: "white",
      padding:"10px",
      borderRadius: "10px",
      marginTop:"10px",
      gap:"10px",
      width: "100%",
    }
};

interface Props {
    laufzeitMonate: number;
    bezahlteZinsen: number;
    monatlicheRaten: number;
}

const Info: React.FC<Props> = ({laufzeitMonate, bezahlteZinsen, monatlicheRaten }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

    return (
            <Box sx={matches ? styles.root_pc : styles.root_mobile}>
                <Typography variant={"h5"} align={"center"}>Laufzeit:</Typography>
                <Typography variant={"body1"} align={"center"}> {Math.trunc(laufzeitMonate/12)}  Jahre und {laufzeitMonate%12} Monate </Typography>
                <Typography variant={"body1"} align={"center"}>Monatliche Raten: {monatlicheRaten.toFixed(2)}</Typography>
                <Typography variant={"body1"} align={"center"}>Bezahlte Zinsen: {bezahlteZinsen.toFixed(2)}</Typography>
            </Box>
    );
};

export default Info;
