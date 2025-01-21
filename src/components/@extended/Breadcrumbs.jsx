import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

// project import
import MainCard from 'components/MainCard';

export default function Breadcrumbs({ navigation, title, ...others }) {
  const location = useLocation();
  const { id } = useParams(); // Extract the id from the URL using useParams
  const [main, setMain] = useState();
  const [item, setItem] = useState();

  // Function to match dynamic route paths
  const matchPath = (url) => {
    const regex = /\/hotelForm\/([^/]+)/;
    return regex.test(location.pathname) || location.pathname === url;
  };

  // Set active item state
  const getCollapse = (menu) => {
    if (menu.children) {
      menu.children.forEach((collapse) => {
        if (collapse.type === 'collapse') {
          getCollapse(collapse);
        } else if (collapse.type === 'item') {
          if (matchPath(collapse.url)) {
            setMain(menu);
            setItem(collapse);
          }
        }
      });
    }
  };

  useEffect(() => {
    navigation?.items?.forEach((menu) => {
      if (menu.type === 'group') {
        getCollapse(menu);
      }
    });
  }, [location.pathname]); // Re-run effect on location change

  // Dynamic Title Based on URL
  let breadcrumbTitle = '';
  if (id === 'add') {
    breadcrumbTitle = 'Create Hotel';
  } else if (id) {
    breadcrumbTitle = 'Update Hotel';
  }

  let mainContent;
  let itemContent;
  let breadcrumbContent = <Typography />;
  let itemTitle = '';

  // Collapse item
  if (main && main.type === 'collapse') {
    mainContent = (
      <Typography component={Link} to={document.location.pathname} variant="h6" sx={{ textDecoration: 'none' }} color="textSecondary">
        {main.title}
      </Typography>
    );
  }

  // Item
  if (item && item.type === 'item') {
    itemTitle = item.title;
    itemContent = (
      <Typography variant="subtitle1" color="textPrimary">
        {itemTitle}
      </Typography>
    );

    // Breadcrumb main component
    if (item.breadcrumbs !== false) {
      breadcrumbContent = (
        <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} {...others} content={false}>
          <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
            <Grid item>
              <MuiBreadcrumbs aria-label="breadcrumb">
                <Typography component={Link} to="/" color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
                  Home
                </Typography>
                {mainContent}
                <Typography variant="subtitle1" color="textPrimary">
                  {breadcrumbTitle} {/* Display dynamic title */}
                </Typography>
              </MuiBreadcrumbs>
            </Grid>
            {title && (
              <Grid item sx={{ mt: 2 }}>
                <Typography variant="h5">{breadcrumbTitle}</Typography> {/* Display dynamic title */}
              </Grid>
            )}
          </Grid>
        </MainCard>
      );
    }
  }

  return breadcrumbContent;
}

Breadcrumbs.propTypes = {
  card: PropTypes.bool,
  custom: PropTypes.bool,
  divider: PropTypes.bool,
  heading: PropTypes.string,
  icon: PropTypes.bool,
  icons: PropTypes.bool,
  links: PropTypes.array,
  maxItems: PropTypes.number,
  rightAlign: PropTypes.bool,
  separator: PropTypes.any,
  title: PropTypes.bool,
  titleBottom: PropTypes.bool,
  sx: PropTypes.any,
  others: PropTypes.any
};






























// import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// // material-ui
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

// // project import
// import MainCard from 'components/MainCard';

// export default function Breadcrumbs({ navigation, title, ...others }) {
//   const location = useLocation();
//   const [main, setMain] = useState();
//   const [item, setItem] = useState();

//   // Function to match dynamic route paths
//   const matchPath = (url) => {
//     // Match the hotelForm/:id pattern
//     const regex = /\/hotelForm\/([^/]+)/;
//     return regex.test(location.pathname) || location.pathname === url;
//   };

//   // Set active item state
//   const getCollapse = (menu) => {
//     if (menu.children) {
//       menu.children.forEach((collapse) => {
//         if (collapse.type === 'collapse') {
//           getCollapse(collapse);
//         } else if (collapse.type === 'item') {
//           // Check if URL matches either static or dynamic paths
//           if (matchPath(collapse.url)) {
//             setMain(menu);
//             setItem(collapse);
//           }
//         }
//       });
//     }
//   };

//   useEffect(() => {
//     navigation?.items?.forEach((menu) => {
//       if (menu.type === 'group') {
//         getCollapse(menu);
//       }
//     });
//   }, [location.pathname]); // Re-run effect on location change

//   let mainContent;
//   let itemContent;
//   let breadcrumbContent = <Typography />;
//   let itemTitle = '';

//   // Collapse item
//   if (main && main.type === 'collapse') {
//     mainContent = (
//       <Typography component={Link} to={document.location.pathname} variant="h6" sx={{ textDecoration: 'none' }} color="textSecondary">
//         {main.title}
//       </Typography>
//     );
//   }

//   // Item
//   if (item && item.type === 'item') {
//     itemTitle = item.title;
//     itemContent = (
//       <Typography variant="subtitle1" color="textPrimary">
//         {itemTitle}
//       </Typography>
//     );

//     // Breadcrumb main component
//     if (item.breadcrumbs !== false) {
//       breadcrumbContent = (
//         <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} {...others} content={false}>
//           <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
//             <Grid item>
//               <MuiBreadcrumbs aria-label="breadcrumb">
//                 <Typography component={Link} to="/" color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
//                   Home
//                 </Typography>
//                 {mainContent}
//                 {itemContent}
//               </MuiBreadcrumbs>
//             </Grid>
//             {title && (
//               <Grid item sx={{ mt: 2 }}>
//                 <Typography variant="h5">{item.title}</Typography>
//               </Grid>
//             )}
//           </Grid>
//         </MainCard>
//       );
//     }
//   }

//   return breadcrumbContent;
// }

// Breadcrumbs.propTypes = {
//   card: PropTypes.bool,
//   custom: PropTypes.bool,
//   divider: PropTypes.bool,
//   heading: PropTypes.string,
//   icon: PropTypes.bool,
//   icons: PropTypes.bool,
//   links: PropTypes.array,
//   maxItems: PropTypes.number,
//   rightAlign: PropTypes.bool,
//   separator: PropTypes.any,
//   title: PropTypes.bool,
//   titleBottom: PropTypes.bool,
//   sx: PropTypes.any,
//   others: PropTypes.any
// };

























// import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// // material-ui
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import MuiBreadcrumbs from '@mui/material/Breadcrumbs';

// // project import
// import MainCard from 'components/MainCard';

// export default function Breadcrumbs({ navigation, title, ...others }) {
//   const location = useLocation();
//   const [main, setMain] = useState();
//   const [item, setItem] = useState();

//   // set active item state
//   const getCollapse = (menu) => {
//     if (menu.children) {
//       menu.children.filter((collapse) => {
//         if (collapse.type && collapse.type === 'collapse') {
//           getCollapse(collapse);
//         } else if (collapse.type && collapse.type === 'item') {
//           if (location.pathname === collapse.url) {
//             setMain(menu);
//             setItem(collapse);
//           }
//         }
//         return false;
//       });
//     }
//   };

//   useEffect(() => {
//     navigation?.items?.map((menu) => {
//       if (menu.type && menu.type === 'group') {
//         getCollapse(menu);
//       }
//       return false;
//     });
//   });

//   // only used for component demo breadcrumbs
//   if (location.pathname === '/breadcrumbs') {
//     location.pathname = '/dashboard/analytics';
//   }

//   let mainContent;
//   let itemContent;
//   let breadcrumbContent = <Typography />;
//   let itemTitle = '';

//   // collapse item
//   if (main && main.type === 'collapse') {
//     mainContent = (
//       <Typography component={Link} to={document.location.pathname} variant="h6" sx={{ textDecoration: 'none' }} color="textSecondary">
//         {main.title}
//       </Typography>
//     );
//   }

//   // items
//   if (item && item.type === 'item') {
//     itemTitle = item.title;
//     itemContent = (
//       <Typography variant="subtitle1" color="textPrimary">
//         {itemTitle}
//       </Typography>
//     );

//     // main
//     if (item.breadcrumbs !== false) {
//       breadcrumbContent = (
//         <MainCard border={false} sx={{ mb: 3, bgcolor: 'transparent' }} {...others} content={false}>
//           <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start" spacing={1}>
//             <Grid item>
//               <MuiBreadcrumbs aria-label="breadcrumb">
//                 <Typography component={Link} to="/" color="textSecondary" variant="h6" sx={{ textDecoration: 'none' }}>
//                   Home
//                 </Typography>
//                 {mainContent}
//                 {itemContent}
//               </MuiBreadcrumbs>
//             </Grid>
//             {title && (
//               <Grid item sx={{ mt: 2 }}>
//                 <Typography variant="h5">{item.title}</Typography>
//               </Grid>
//             )}
//           </Grid>
//         </MainCard>
//       );
//     }
//   }

//   return breadcrumbContent;
// }

// Breadcrumbs.propTypes = {
//   card: PropTypes.bool,
//   custom: PropTypes.bool,
//   divider: PropTypes.bool,
//   heading: PropTypes.string,
//   icon: PropTypes.bool,
//   icons: PropTypes.bool,
//   links: PropTypes.array,
//   maxItems: PropTypes.number,
//   rightAlign: PropTypes.bool,
//   separator: PropTypes.any,
//   title: PropTypes.bool,
//   titleBottom: PropTypes.bool,
//   sx: PropTypes.any,
//   others: PropTypes.any
// };
