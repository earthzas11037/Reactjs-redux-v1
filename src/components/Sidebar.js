import React from 'react';
import '../asset/css/Sidebar.css';
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";
import HomeIcon from '@material-ui/icons/Home';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up("lg")]: {
      width: drawerWidth,
      flexShrink: 0
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:"#1b2430"
  },

}));

function Sidebar(props) {
    const { window } = props;
    const classes = useStyles();

    const drawer = (
        <div>
            <div className={classes.toolbar} style={{backgroundColor:"#232f3e"}}/>
            <Divider />
            <List>
                <NavLink to="/" style={{ textDecoration: 'none' }} onClick={props.handleDrawerToggle}>
                    <ListItem button style={{borderRadius:10}} >
                        <HomeIcon style={{marginRight:10,color:"WHITE"} }/> 
                        <ListItemText primary="หน้าหลัก" style={{color:"WHITE"}}/>
                    </ListItem>
                </NavLink>
            </List>
        </div>

        
    )

    const container = window !== undefined ? () => window().document.body : undefined;

    return(
        <div style={{backgroundColor:"#1f4068"}}>
            <nav className={classes.drawer} aria-label="mailbox folders" >
                <Hidden mdUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor='left'
                        open={props.mobileOpen}
                        onClose={props.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper
                        }}
                        ModalProps={{
                            keepMounted: true 
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>

            </nav>
            
        </div>
    );
    
    
}

export default Sidebar;