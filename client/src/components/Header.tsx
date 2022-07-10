import {Box, Typography} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


const styles = {
    root_pc: {
        margin:"8px",
    },
    root_mobile: {
        backgroundColor:"lightgrey",
        borderRadius: "10px",
        margin:"8px",
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
