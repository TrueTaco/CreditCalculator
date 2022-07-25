import { makeStyles } from "@mui/styles";
import {Box, TextField} from "@mui/material";

const styles = {
    root: {
        display: "flex",
        flexDirection:"row",
        gap:"10px",
        color:"#FFA566"
    },
    textfield:{
        gap:"19px",
        color:"#FFA566"
    }
};

interface Props {
    setDarlehen: (amount:number) => void;
    setZins: (amount:number) => void;
    setTilgung: (amount:number) => void;
}

const Control: React.FC<Props> = ({setDarlehen,setZins,setTilgung}) => {


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
        <Box sx={styles.root}>
            <TextField sx={styles.textfield} color='primary' type="number" defaultValue="50000" label="Darlehen" variant="outlined"  onChange={handleDarlehen}/>
            <TextField sx={styles.textfield} color='primary' type="number" defaultValue="1.0" label="Zinssatz" variant="outlined" onChange={handleZins}/>
            <TextField sx={styles.textfield} color='primary' type="number" defaultValue="20.0" label="Tilgung" variant="outlined" onChange={handleTilgung}/>
        </Box>
    );
};

export default Control;
