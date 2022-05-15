import { createStyles, makeStyles } from "@mui/styles";
import {Box, Typography} from "@mui/material";


const useStyles = makeStyles({
    root: {
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-evenly",
        backgroundColor:"white",
        borderRadius: "10px",
        margin:"10px",
        top: 0,
        left:0,
        right: 0,
    }
});

interface Props {
}

const Header: React.FC<Props> = ({}) => {
    const classes = useStyles();

    return (

        <Box className={classes.root}>
            <Typography variant={"h4"} align={"center"}>Credit calculator</Typography>
        </Box>
    );
};

export default Header;
