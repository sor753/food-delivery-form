const getRenderCount = () => {
  let count = 0;

  return () => {
    count++;
    // console.log('count', count);
    return <div>Render count : {count / 2}</div>;
  };
};

export default getRenderCount;
