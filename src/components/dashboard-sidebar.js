import { Fragment, useEffect, useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import clone from 'lodash/clone'
import isEmpty from 'lodash/isEmpty'
import indexOf from 'lodash/indexOf'
import map from 'lodash/map'
import keys from 'lodash/keys'
import pickBy from 'lodash/pickBy'
import { Box, Divider, Drawer, List, ListItemButton, ListItemIcon, ListItem, ListItemText, Typography, useMediaQuery } from "@mui/material";
import { Selector as SelectorIcon } from "../icons/selector";
import { Logo } from "./logo";
import { userService } from "../services";
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import HubIcon from '@mui/icons-material/Hub';
import PaidIcon from '@mui/icons-material/Paid';
import LogoutIcon from '@mui/icons-material/Logout';


const items = [
  {
    href: "/",
    icon: <HomeIcon/>,
    title: "Home",
  },
  {
    submenus: [
      {
        href: "/updateCacheEsb",
        title: "Cache",
      },
      {
        href: "/updateServiceEsb",
        title: "Service",
      }
    ],
    icon: <HubIcon/>,
    title: "ESB"
  },
  {
    submenus: [
      {
        href: "/updateCacheEsb",
       // icon: <FiberManualRecordIcon />,
        title: "Coba",
      },
    ],
    icon: <PaidIcon/>,
    title: "BI-Fast"
  },

  {
    href: "/logout",
    icon: <LogoutIcon />,
    title: "Logout",
  },
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
    defaultMatches: true,
    noSsr: false,
  });
  const user = userService.userValue;

  // kode untuk membuat expand tiap menu nya 
  const subMenuIndexes = keys(pickBy(items, item => item.submenus)) // [1,2]
  const initialOpenSubmenus = map(subMenuIndexes, item => item !== '') // [true, true]
  const [openSubMenus, setOpenSubMenus] = useState(initialOpenSubmenus)

  const handleClick = (key) => () => {
    let newOpenSubMenus = clone(openSubMenus)
    const index = indexOf(subMenuIndexes, String(key))
    newOpenSubMenus[index] = !newOpenSubMenus[index];
    setOpenSubMenus(newOpenSubMenus)
  };

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }
      console.log(userService.userValue);

      // if (userService.userValue) {
      //   console.log("test");
      // }
      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );

  const listItemStyle = {
    "&$selected": {
      backgroundColor: "red",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&$selected:hover": {
      backgroundColor: "purple",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    },
    "&:hover": {
      backgroundColor: "gray",
      color: "white",
      "& .MuiListItemIcon-root": {
        color: "white"
      }
    }
  }

  const content = (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink href="/" passHref>
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42,
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                px: 3,
                py: "11px",
                borderRadius: 1,
              }}
            >
              <div>
                {user && (
                  <Typography color="inherit" variant="subtitle2">
                    {userService.userValue.data.data.sname}
                  </Typography>
                )}
                <br />
                {user && (
                  <Typography color="neutral.400" variant="body2">
                    {userService.userValue.data.data.pernr}
                  </Typography>
                )}
              </div>
              <SelectorIcon
                sx={{
                  color: "neutral.500",
                  width: 14,
                  height: 14,
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: "#2D3748",
            my: 3,
          }}
        />
        <List
          sx={{ width: '100%', maxWidth: 360 }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {map(items, (item, key) => {
            const index = indexOf(subMenuIndexes, String(key))
            
            return (
              <Fragment>
                <ListItem sx={listItemStyle}>
                  <ListItemButton href={item.href} key={key} onClick={handleClick(key)}>
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                    {!isEmpty(item.submenus) && openSubMenus[index] == true && <ExpandLess />}
                    {!isEmpty(item.submenus) && openSubMenus[index] == false && <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                {item.submenus && (
                  <Collapse in={openSubMenus[index]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {map(item.submenus, (submenu, key) =>
                        <ListItem sx={listItemStyle}>
                          <ListItemButton href={submenu.href} key={key} sx={{ pl: 4 }}>
                            <ListItemIcon>
                              {submenu.icon}
                            </ListItemIcon>
                            <ListItemText primary={submenu.title} />
                          </ListItemButton>
                        </ListItem>
                      )}
                    </List>
                  </Collapse>
                )}
              </Fragment>
            )
          })}
        </List>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.900",
            color: "#FFFFFF",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.900",
          color: "#FFFFFF",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
