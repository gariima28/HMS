import PropTypes from 'prop-types';
import React, { forwardRef } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

// project import
import { useGetMenuMaster } from 'api/menu';

export default function MainItem({ item, level }) {
    const theme = useTheme();
    const { pathname } = useLocation();
    const { menuMaster } = useGetMenuMaster();
    const drawerOpen = menuMaster.isDashboardDrawerOpened;

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank';
    }

    // Create the link component with forwardRef
    const LinkComponent = forwardRef((props, ref) => (
        <Link ref={ref} {...props} to={item.url} target={itemTarget} />
    ));

    let listItemProps = { component: LinkComponent };
    if (item?.external) {
        listItemProps = { component: 'a', href: item.url, target: itemTarget };
    }

    const isSelected = matchPath({ path: item.url, end: true }, pathname);
    const textColor = '#fff';
    const iconSelectedColor = '#fff';
    const bgSelectedColor = "#1AC3BE8C";

    return (
        <ListItemButton
            {...listItemProps}
            selected={isSelected}
            sx={{
                zIndex: 1201,
                borderRadius: "30px",
                mx: 1,
                pl: drawerOpen ? `${level * 28}px` : 1.5,
                py: !drawerOpen && level === 1 ? 1.25 : 1,
                ...(drawerOpen && {
                    '&:hover': {
                        //bgcolor: '#1AC3BE8C',
                        bgcolor: '#fff',
                        color: "black"
                    },
                    '&.Mui-selected': {
                        bgcolor: '#1AC3BE8C',
                        //borderRight: `2px solid #E4AB55`,
                        color: iconSelectedColor,
                        '&:hover': {
                            color: iconSelectedColor,
                            bgcolor: '#1AC3BE8C',

                        }
                    }
                }),
                ...(!drawerOpen && {
                    '&:hover': {
                        bgcolor: 'transparent'
                    },
                    '&.Mui-selected': {
                        '&:hover': {
                            bgcolor: 'transparent'
                        },
                        bgcolor: 'transparent'
                    }
                })
            }}
        >
            <ListItemIcon sx={{ color: isSelected ? '#fff' : "#C0A65C", }}>
                {item.icon && <item.icon />}
            </ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant="h6" >
                        {item.title}
                    </Typography>
                }
                sx={{ px: 1 }}
            />
        </ListItemButton >
    );
}

MainItem.propTypes = {
    item: PropTypes.object.isRequired,
    level: PropTypes.number,
};