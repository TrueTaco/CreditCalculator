import { makeStyles } from "@mui/styles";
import {Box, TextField} from "@mui/material";

const useStyles = makeStyles({
    root: {
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-evenly",
        borderRadius: "10px",
        margin:"10px",
        gap:"5px",
        backgroundColor: "white"
    },
    textfield:{
        backgroundColor: "white",
        color:"white"
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
            <TextField  className={classes.textfield} type="number" defaultValue="50000" label="Darlehen" variant="filled"  onChange={handleDarlehen}/>
            <TextField  className={classes.textfield} type="number" defaultValue="1.0" label="Zinssatz" variant="filled" onChange={handleZins}/>
            <TextField  className={classes.textfield} type="number" defaultValue="20.0" label="Tilgung" variant="filled" onChange={handleTilgung}/>
        </Box>
    );
};

export default Control;
