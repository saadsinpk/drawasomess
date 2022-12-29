export const range = (endIndex) => {
    const arr = [];
    for (let i = 1; i <= endIndex; i++) {
      arr.push(i);
    }
    return arr;
  };
  export const paginate = (items, pageSize, currentPage) => {
    // console.log(items, pageSize, currentPage)
    return items.slice((currentPage - 1) * pageSize, pageSize * currentPage);
  };
  