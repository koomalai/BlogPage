import { AppBar, Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const HeaderTab = ({ children }: any) => {
    const [value, setValue] = useState('one');

    const handleChange = (event: React.SyntheticEvent, newValue: any) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ bgcolor: 'background.paper', width: 500 }}>
            <AppBar position="fixed" >
                <Tabs
                    value={value}
                    onChange={handleChange}
                    centered
                    textColor="inherit"
                    TabIndicatorProps={{
                        sx: {
                            backgroundColor: 'lightblue',
                            height: 3,
                        },
                    }}
                >
                    <Tab value='one' label="Blog" component={Link} to={"/"} />
                    <Tab value='two' label="Add Blog" component={Link} to={"/addBlogs"} />
                </Tabs>
            </AppBar>
            {children}
        </Box>
    );
}
export default HeaderTab;