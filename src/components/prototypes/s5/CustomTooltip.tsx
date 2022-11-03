const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white rounded-lg w-44 h-22 p-5">
          <div className='text-slate-500 text-left'>
          <p className='text-medium text-slate-500'>text {payload[0].payload.nodes}</p>
          {payload[0].payload.links ? (
            <p> {payload[0].payload.links}</p>
          ) : (
            <p> {payload[0].payload.links} months</p>
          )}
          </div>
        </div>
      );
    }
  
    return null;
  };
  
  export default CustomTooltip;