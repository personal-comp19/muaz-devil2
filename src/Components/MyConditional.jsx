// import React, { useState } from 'react'

// function MyConditional(props) {
//   const [show, setShow] = useState(false);
//   // if (props.userType == 'admin'){
//   //   return (
//   //     <div>
//   //       user is admin
//   //     </div>
//   //   )
//   // } else if (props.userType == "normal") {
//   //   return (
//   //     <div>
//   //       user is normal user
//   //     </div>
//   //   )
//   // } else {
//   //   return (
//   //     <div>
//   //       not a user
//   //     </div>
//   //   )
//   // }

//   return (
//     <div>
//       {props.userType === 'admin' ? 'User is admin' : "User is normal"}

//       <div>
//         {(show || props.isLoggedIn) && <div>show</div>}
//       </div>

//       <button onClick={() => {
//         setShow(!show);
//       }}>Show</button>
//     </div>
//   )
// }

// export default MyConditional;