const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
        <div className="absolute top-0 left-0 h-16 w-16 border-t-4 border-b-4 border-transparent animate-spin-slow rounded-full border-l-indigo-500"></div>
      </div>
    </div>
  );
};

export default Spinner;
