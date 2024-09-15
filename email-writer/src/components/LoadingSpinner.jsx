
const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 flex items-end justify-center bg-opacity-75 z-50 pb-16">
            <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-red-400"></div>
        </div>
    );
};

export default LoadingSpinner;
