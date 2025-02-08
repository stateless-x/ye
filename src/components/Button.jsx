export const Button = ({ children, onClick }) => {
    return (
        <button
        onClick={onClick}
        className="bg-transparent border border-white px-4 py-2 mt-4 rounded-3xl shadow-md 
                    hover:bg-white hover:text-[#242424] hover:scale-110 
                    transition delay-150 duration-150 ease-in-out mt-5"
        >
        {children}
        </button>
    );
    };
