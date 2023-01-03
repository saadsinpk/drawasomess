// export  const Datelists = () => {
//     const now = new Date();
//   const date = new Date();
//   function getAllDaysInMonth(year, month) {
//     const date = new Date(year, month, 1);
  
//     const dates = [];
  
//     while (date.getMonth() === month) {
//       dates.push(new Date(date));
//       date.setDate(date.getDate() + 1);
//     }
  
//     return dates;
//   }
//   var arry = [];
//   var a = getAllDaysInMonth(now.getFullYear(), now.getMonth())
//   for (let index in a) {
//     arry.push(`${a[index].getMonth()-1}-${a[index].getFullYear()}`)
//   }
//   };