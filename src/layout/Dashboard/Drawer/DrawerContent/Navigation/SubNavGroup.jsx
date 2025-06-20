import PropTypes from 'prop-types';
import React from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

// project import
import NavItem from './NavItem';
import { useGetMenuMaster } from 'api/menu';
import { has } from 'lodash';


export default function SubNavGroup({ item, level }) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(false);
  const { menuMaster } = useGetMenuMaster(); // Fixed destructuring
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  const handleClick = () => {
    setOpen(!open);
  };

  // Check if any child is selected
  const hasSelectedChild = item.children?.some(child => {
    return matchPath({ path: child.url, end: true }, pathname);
  });

  const textColor = '#fff';
  const iconSelectedColor = '#fff';
  const bgSelectedColor = "#1AC3BE8C";

  const navCollapse = item.children?.map((menuItemm, index) => {
    switch (menuItemm.type) {
      case 'item':
        return <NavItem key={`${menuItemm.id}-${index}`} item={menuItemm} level={1} />;
      default:
        return (
          <Typography key={`default-${index}`} variant="h6" color="error" align="center">
            Fix - Sub Group Collapse
          </Typography>
        );
    }
  });

  return (
    <List component="div" disablePadding sx={{ p: 0 }}>
      <ListItemButton
        onClick={handleClick}
        selected={hasSelectedChild}
        sx={{
          borderRadius: "30px",
          mx: 1,
          p: 0,
          pl: drawerOpen ? `${level * 28}px` : 3,
          py: !drawerOpen && level === 2 ? 2 : 1,
          color: hasSelectedChild ? iconSelectedColor : textColor,
          bgcolor: hasSelectedChild ? bgSelectedColor : 'transparent', // Changed from bgColor to bgcolor
          '&:hover': {
            bgcolor: '#fff',
            color: 'black',
            '& .MuiListItemIcon-root': {
              color: '#C0A65C'
            }
          },
          '&.Mui-selected': {
            bgcolor: bgSelectedColor,
            borderRight: `2px solid #0D6A84`,
            color:"#fff",
            '&:hover': {
              bgcolor: bgSelectedColor,
            }
          }
        }}
      >
        <ListItemIcon sx={{
          color: hasSelectedChild ? iconSelectedColor : "#C0A65C",
          transition: 'color 0.3s ease',
         
        }}>
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
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {navCollapse}
        </List>
      </Collapse>
    </List>
  );
}


SubNavGroup.propTypes = {
  item: PropTypes.object.isRequired,
};






























// import PropTypes from 'prop-types';
// // material-ui
// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Collapse from '@mui/material/Collapse';
// import { ExpandLess, ExpandMore } from '@mui/icons-material';

// // project import
// import NavItem from './NavItem';
// import React from 'react';
// import { useGetMenuMaster } from 'api/menu';

// export default function SubNavGroup({ item, level }) {
//   const [open, setOpen] = React.useState(false);
//   const drawerOpen = useGetMenuMaster.isDashboardDrawerOpened;

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   const textColor = 'text.primary';
//   const iconSelectedColor = 'primary.main';


//   const navCollapse = item.children?.map((menuItem) => {
//     switch (menuItem.type) {
//       case 'item':
//         return <NavItem key={menuItem.id} item={menuItem} level={2} />;
//       default:
//         return (
//           <Typography key={menuItem.id} variant="h6" color="error" align="center">
//             Fix - Sub Group Collapse
//           </Typography>
//         )
//     }
//   });

//   return (
//     <List component="div" disablePadding
//     sx={{
//       pl: drawerOpen ? `${level * 28}px` : 1.5,
//       py: !drawerOpen && level === 2 ? 2 : 1,
//     }}
//     >
//       <ListItemButton onClick={handleClick} sx={{ zIndex: 1201, '&:hover': { backgroundColor: 'transparent' } }}>
//         <ListItemIcon>
//           {item.icon && <item.icon />}
//         </ListItemIcon>
//         <ListItemText primary={item.title} />
//         {open ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={open} timeout="auto" unmountOnExit sx={{p:0}}>
//         <List component="div" disablePadding  sx={{p:0}}>
//           {navCollapse}
//         </List>
//       </Collapse>
//     </List>
//   );
// }

// SubNavGroup.propTypes = {
//   item: PropTypes.object.isRequired
// };























// my last modified code 

// import PropTypes from 'prop-types';
// // material-ui
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';

// // project import
// import NavItem from './NavItem';
// // import { useGetMenuMaster } from 'api/menu';
// import { Collapse } from '@mui/material';
// import React from 'react';

// export default function SubNavGroup({ item }) {
//   // const { menuMaster } = useGetMenuMaster();
//   // const drawerOpen = menuMaster.isDashboardDrawerOpened;

//   const navCollapse = item.children?.map((menuItem) => {
//     switch (menuItem.type) {
//       case 'item':
//         return <NavItem key={menuItem.id} item={menuItem} level={1} />;
//       default:
//         return (
//           <Typography key={menuItem.id} variant="h6" color="error" align="center">
//             Fix - Group Collapse or Items
//           </Typography>
//         );
//     }
//   });
  
//   const [open, setOpen] = React.useState(true);

//   const handleClick = () => {
//     setOpen(!open);
//   };

//   return (
//     <List component="div">
//       <ListItemButton onClick={handleClick}>
//         <ListItemIcon>
//           <InboxIcon />
//         </ListItemIcon>
//         <ListItemText primary={item.title} />
//         {/* drop arrow */}
//       </ListItemButton>
//       <Collapse in={open} timeout="auto" unmountOnExit sx={{ p:0, '&:hover': {backgroundColor:'#fff'}}}>
//         <List component="div" disablePadding sx={{'&:hover': {backgroundColor:'none !important' }}}>
//           <ListItemButton sx={{ p:0 }}>
//             <ListItemText primary={navCollapse} />
//           </ListItemButton>
//         </List>
//       </Collapse>
//     </List>
//   );
// }

// SubNavGroup.propTypes = { item: PropTypes.array };




// // my collapse

// import PropTypes from 'prop-types';
// import { forwardRef, useEffect } from 'react';
// import { Link, useLocation, matchPath } from 'react-router-dom';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import Avatar from '@mui/material/Avatar';
// import Chip from '@mui/material/Chip';
// // material-ui
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';

// // project import
// import NavItem from './NavItem';
// import { useGetMenuMaster } from 'api/menu';
// import { Collapse } from '@mui/material';
// import React from 'react';

// export default function SubNavGroup({ item }) {
//   const { menuMaster } = useGetMenuMaster();
//   const drawerOpen = menuMaster.isDashboardDrawerOpened;

//   const navCollapse = item.children?.map((menuItem) => {
//     switch (menuItem.type) {
//       case 'item':
//         return <NavItem key={menuItem.id} item={menuItem} level={1} />;
//       default:
//         return (
//           <Typography key={menuItem.id} variant="h6" color="error" align="center">
//             Fix - Group Collapse or Items
//           </Typography>
//         );
//     }
//   });

//   const [open, setOpen] = React.useState(true);
//   const handleClick = () => {
//     setOpen(!open);
//   };



//   const theme = useTheme();

//   const openItem = menuMaster.openedItem;

//   // let itemTarget = '_self';
//   // if (item.target) {
//   //   itemTarget = '_blank';
//   // }
//   // let listItemProps = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />) };
//   // if (item?.external) {
//   //   listItemProps = { component: 'a', href: item.url, target: itemTarget };
//   // }

//   const Icon = item.icon;
//   const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;

//   const { pathname } = useLocation();
//   // const isSelected = !!matchPath({ path: item.url, end: false }, pathname) || openItem === item.id;
//   const isSelected = item.url ? !!matchPath({ path: item.url, end: false }, pathname) || openItem === item.id : false;


//   // active menu item on page load
//   useEffect(() => {
//     if (pathname === item.url) handlerActiveItem(item.id);
//     // eslint-disable-next-line
//   }, [pathname]);

//   const textColor = 'text.primary';
//   const iconSelectedColor = 'primary.main';




  
//   return (
//     <List component="div">
//       <ListItemButton onClick={handleClick}>
//         <ListItemIcon>
//           <InboxIcon />
//         </ListItemIcon>
//         <ListItemText primary={item.title} />
//         <InboxIcon />
//       </ListItemButton>
//       <Collapse in={open} timeout="auto" unmountOnExit sx={{ p: 0 }}>
//         <List component="div" disablePadding>
//           <ListItemButton
//             disabled={item.disabled}
//             onClick={() => handlerActiveItem(item.id)}
//             selected={isSelected}
//             sx={{
//               zIndex: 1201,
//               // pl: drawerOpen ? `${level * 28}px` : 1.5,
//               // py: !drawerOpen && level === 1 ? 1.25 : 1,
//               ...(drawerOpen && {
//                 '&:hover': {
//                   bgcolor: 'primary.lighter'
//                 },
//                 '&.Mui-selected': {
//                   bgcolor: 'primary.lighter',
//                   borderRight: `2px solid ${theme.palette.primary.main}`,
//                   color: iconSelectedColor,
//                   '&:hover': {
//                     color: iconSelectedColor,
//                     bgcolor: 'primary.lighter'
//                   }
//                 }
//               }),
//               ...(!drawerOpen && {
//                 '&:hover': {
//                   bgcolor: 'transparent'
//                 },
//                 '&.Mui-selected': {
//                   '&:hover': {
//                     bgcolor: 'transparent'
//                   },
//                   bgcolor: 'transparent'
//                 }
//               })
//             }}
//           >
//             {itemIcon && (
//               <ListItemIcon
//                 sx={{
//                   minWidth: 28,
//                   color: isSelected ? iconSelectedColor : textColor,
//                   ...(!drawerOpen && {
//                     borderRadius: 1.5,
//                     width: 36,
//                     height: 36,
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     '&:hover': {
//                       bgcolor: 'secondary.lighter'
//                     }
//                   }),
//                   ...(!drawerOpen &&
//                     isSelected && {
//                       bgcolor: 'primary.lighter',
//                       '&:hover': {
//                         bgcolor: 'primary.lighter'
//                       }
//                     })
//                 }}
//               >
//                 {itemIcon}
//               </ListItemIcon>
//             )}
//             {(drawerOpen || (!drawerOpen !== 1)) && (
//               <ListItemText
//                 primary={
//                   <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
//                     {item.title}
//                   </Typography>
//                 }
//               />
//             )}
//             {(drawerOpen || (!drawerOpen !== 1)) && item.chip && (
//               <Chip
//                 color={item.chip.color}
//                 variant={item.chip.variant}
//                 size={item.chip.size}
//                 label={item.chip.label}
//                 avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
//               />
//             )}
//           </ListItemButton>
//         </List>
//       </Collapse>
//     </List>
//   );
// }

// SubNavGroup.propTypes = { item: PropTypes.object };


























// my collapse with css

// import PropTypes from 'prop-types';
// import React, { forwardRef, useEffect } from 'react';
// import { Link, useLocation, matchPath } from 'react-router-dom';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import Avatar from '@mui/material/Avatar';
// import Chip from '@mui/material/Chip';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import Typography from '@mui/material/Typography';

// // project import
// import { handlerActiveItem, useGetMenuMaster } from 'api/menu';
// import NavItem from './NavItem';

// export default function SubNavGroup({ item, level }) {
  




//   const { menuMaster } = useGetMenuMaster();
//   const drawerOpen = menuMaster.isDashboardDrawerOpened;

//   const navCollapse = item.children?.map((menuItem) => {
//     switch (menuItem.type) {
//       case 'item':
//         return <NavItem key={menuItem.id} item={menuItem} level={1} />;
//       default:
//         return (
//           <Typography key={menuItem.id} variant="h6" color="error" align="center">
//             Fix - Group Collapse or Items
//           </Typography>
//         );
//     }
//   });

//   const [open, setOpen] = React.useState(true);

//   const handleClick = (id) => {
//     setOpen(!open);
//     handlerActiveItem(id)
//   };
  
  
  
  
  
  
  
  
//   const theme = useTheme();

//   // const { menuMaster } = useGetMenuMaster();
//   // const drawerOpen = menuMaster.isDashboardDrawerOpened;
//   const openItem = menuMaster.openedItem;

//   let itemTarget = '_self';
//   if (item.target) {
//     itemTarget = '_blank';
//   }
//   let listItemProps = { component: forwardRef((props, ref) => <Link ref={ref} {...props} to={item.url} target={itemTarget} />) };
//   if (item?.external) {
//     listItemProps = { component: 'a', href: item.url, target: itemTarget };
//   }

//   const Icon = item.icon;
//   const itemIcon = item.icon ? <Icon style={{ fontSize: drawerOpen ? '1rem' : '1.25rem' }} /> : false;

//   const { pathname } = useLocation();
//   const isSelected = !!matchPath({ path: item.url, end: false }, pathname) || openItem === item.id;

//   // active menu item on page load
//   useEffect(() => {
//     if (pathname === item.url) handlerActiveItem(item.id);
//     // eslint-disable-next-line
//   }, [pathname]);

//   const textColor = 'text.primary';
//   const iconSelectedColor = 'primary.main';

//   return (
//     <List>
//       <ListItemButton
//         {...listItemProps}
//         disabled={item.disabled}
//         onClick={() => handleClick(item.id)}
//         selected={isSelected}
//         sx={{
//           zIndex: 1201,
//           pl: drawerOpen ? `${level * 28}px` : 1.5,
//           py: !drawerOpen && level === 1 ? 1.25 : 1,
//           ...(drawerOpen && {
//             '&:hover': {
//               bgcolor: 'primary.lighter'
//             },
//             '&.Mui-selected': {
//               bgcolor: 'primary.lighter',
//               borderRight: `2px solid ${theme.palette.primary.main}`,
//               color: iconSelectedColor,
//               '&:hover': {
//                 color: iconSelectedColor,
//                 bgcolor: 'primary.lighter'
//               }
//             }
//           }),
//           ...(!drawerOpen && {
//             '&:hover': {
//               bgcolor: 'transparent'
//             },
//             '&.Mui-selected': {
//               '&:hover': {
//                 bgcolor: 'transparent'
//               },
//               bgcolor: 'transparent'
//             }
//           })
//         }}
//       >
//         {itemIcon && (
//           <ListItemIcon
//             sx={{
//               minWidth: 28,
//               color: isSelected ? iconSelectedColor : textColor,
//               ...(!drawerOpen && {
//                 borderRadius: 1.5,
//                 width: 36,
//                 height: 36,
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 '&:hover': {
//                   bgcolor: 'secondary.lighter'
//                 }
//               }),
//               ...(!drawerOpen &&
//                 isSelected && {
//                 bgcolor: 'primary.lighter',
//                 '&:hover': {
//                   bgcolor: 'primary.lighter'
//                 }
//               })
//             }}
//           >
//             {itemIcon}
//           </ListItemIcon>
//         )}
//         {(drawerOpen || (!drawerOpen && level !== 1)) && (
//           <ListItemText
//             primary={
//               <Typography variant="h6" sx={{ color: isSelected ? iconSelectedColor : textColor }}>
//                 {item.title}
//               </Typography>
//             }
//           />
//         )}
//         {(drawerOpen || (!drawerOpen && level !== 1)) && item.chip && (
//           <Chip
//             color={item.chip.color}
//             variant={item.chip.variant}
//             size={item.chip.size}
//             label={item.chip.label}
//             avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
//           />
//         )}
//       </ListItemButton>
//       <Collapse in={open} timeout="auto" unmountOnExit sx={{ p: 0 }}>
//         <List component="div" disablePadding>
//           <ListItemButton sx={{ p: 0 }}>
//             <ListItemText primary={navCollapse} />
//           </ListItemButton>
//         </List>
//       </Collapse>
//     </List>
//   );
// }

// SubNavGroup.propTypes = { item: PropTypes.object, level: PropTypes.number };
















//none








// import PropTypes from 'prop-types';
// // material-ui
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import Box from '@mui/material/Box';

// // project import
// import NavItem from './NavItem';
// import { useGetMenuMaster } from 'api/menu';

// export default function SubNavGroup({ item }) {
//   const { menuMaster } = useGetMenuMaster();
//   const drawerOpen = menuMaster.isDashboardDrawerOpened;

//   const navCollapse = item.children?.map((menuItem) => {
//     switch (menuItem.type) {
//       case 'item':
//         return <NavItem key={menuItem.id} item={menuItem} level={1} />;
//       default:
//         return (
//           <Typography key={menuItem.id} variant="h6" color="error" align="center">
//             Fix - Group Collapse or Items
//           </Typography>
//         );
//     }
//   });

//   return (
//     <List
//       subheader={
//         item.title &&
//         drawerOpen && (
//           <Box sx={{ pl: 3, mb: 1.5 }}>
//             <Typography variant="subtitle2" color="textSecondary">
//               {item.title}
//             </Typography>
//             {/* only available in paid version */}
//           </Box>
//         )
//       }
//       sx={{ mb: drawerOpen ? 1.5 : 0, py: 0, zIndex: 0 }}
//     >
//       {navCollapse}
//     </List>
//   );
// }

// SubNavGroup.propTypes = { item: PropTypes.array };
