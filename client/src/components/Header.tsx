import {Box, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


const styles = {
    root_pc: {
        margin:"8px",
        paddingTop:"20px"
    },
    root_mobile: {
        backgroundColor:"#58545B",
        padding:"16px",
        width:"100%",
        marginBottom:"16px",
        color:"#F6F2F6",
    },
};

interface Props {
}

const Header: React.FC<Props> = ({}) => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    return (

        <Box sx={matches ? styles.root_pc : styles.root_mobile}>
            <Typography variant={"h4"} align={"center"}>Credit calculator</Typography>
        </Box>
    );
};

export default Header;
