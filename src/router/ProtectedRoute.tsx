// import React from 'react';
// import { Route, Redirect } from 'react-router-dom';

// const ProtectedRoute = React.memo(
//   ({
//     component: Component,
//     authenticated,
//     userRole,
//     sortedRoutes,
//     ...rest
//   }) => {
//     const filteredRoutes = sortedRoutes.filter((route) => {
//       if (authenticated && userRole === 'admin') {
//         return true;
//       } else if (authenticated && route.roles.includes(userRole)) {
//         return true;
//       } else {
//         return false;
//       }
//     });

//     console.log('FILTER ROUTES ', filteredRoutes);

//     return (
//       <Route
//         {...rest}
//         render={(props) =>
//           authenticated ? (
//             <Component {...props} sortedRoutes={filteredRoutes} />
//           ) : (
//             <Redirect
//               to={{
//                 pathname: '/',
//                 state: { from: props.location },
//               }}
//             />
//           )
//         }
//       />
//     );
//   }
// );

// export default ProtectedRoute;

export {};
