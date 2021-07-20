import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from '@material-ui/core/Grid';
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { NavLink } from "react-router-dom";
import { connect } from "react-redux"
import Avatar from '@material-ui/core/Avatar';
import { history } from '../history';

import { 
    logout,
} from "../redux/actions/authen/index"

const useStyles = makeStyles((theme) => ({
      
    appBar: {
        backgroundColor:"WHITE",
        color:"BLACK",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("lg")]: {
            display: "none"
        }
    },
    icon: {
        '&:hover': {
            cursor: "pointer"
        }
    },
    customWidth: {
        '& div': {
            width: '400px',
        }
    }
}));

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

const StyledMenuItem = withStyles((theme) => ({
    root: {
      '&:focus': {
        backgroundColor: theme.palette.primary.main,
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
          color: theme.palette.common.white,
        },
      },
    },
}))(MenuItem);

function Navibar(props) {
    const classes = useStyles();
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    useEffect(() => {
    },[] )

    const logout = async(event) => {
        event.preventDefault();
        await props.logout((result) => {
        })
    }

    const handleClickUser = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUser = () => {
        setAnchorElUser(null);
    };

    return (
        <div>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={props.handleDrawerToggle}
                        className={classes.menuButton}
                        xs={1}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        xs={1} md={12}
                    >
                        <Hidden mdDown >
                            <Grid
                                item
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                xs={12}
                            >   
                                <Grid item xs={1}>
                                    <NavLink to="/" style={{ textDecoration: 'none' }}>
                                        <ListItem button style={{borderRadius:10}} >
                                            <Typography style={{color:"BLACK",fontSize:"2em",fontWeight:"bold"}}>
                                                Book
                                            </Typography>
                                        </ListItem>
                                    </NavLink>
                                </Grid>
                            </Grid>
                        </Hidden>
                    </Grid>
                    <Grid
                        item
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        lg={2}
                    >

                        {
                            props.authen.token? (
                                <>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.icon} onClick={handleClickUser}/>
                                    <StyledMenu
                                        id="customized-menu"
                                        anchorEl={anchorElUser}
                                        keepMounted
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUser}
                                        PaperProps={{  
                                            style: {  
                                                width: 250,  
                                            },  
                                            }} 
                                    >
                                        <NavLink to={"/store"} style={{ textDecoration: 'none' }}>
                                            <StyledMenuItem onClick={handleCloseUser}>
                                                    <ListItemText primary="คลังสินค้าของฉัน" />
                                            </StyledMenuItem>
                                        </NavLink>
                                        <StyledMenuItem onClick={handleCloseUser}>
                                                <ListItemText primary="ลงชื่อออก" onClick={logout}/>
                                        </StyledMenuItem>
                                    </StyledMenu>
                                </>
                            ) : (
                                <NavLink to="/login" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary"  style={{padding:"10px 25px 10px 25px"}}>
                                        ลงชื่อเข้าใช้
                                    </Button>
                                </NavLink>
                            )
                        }
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authen: state.authen.authen
    }
}
  
export default connect(mapStateToProps, { logout })(Navibar);