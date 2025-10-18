import { Link } from "react-router-dom";

function Button({ children, disabled, to, type }) {
    const base = "focus:ring-off text-xs inline-block rounded-full bg-yellow-500 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowe ";
    const styles ={
        primary: base + "px-4 py-3 md:px-6 md:py-4",
        small : base + "px-4 py-2 md:px-5 md:py2.5 text-xs",
        secondary : "focus:ring-off text-xs inline-block rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-500 transition-colors duration-300 hover:bg-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowe px-4 py-2.5 md:px-6 md:py-3.5",
    }
    
    if (to) {
        return <Link to={to} className={styles[type]}>{children}</Link>
    }
    return (
        <button
            disabled={disabled}
            className={styles[type]}
        >
            {children}
        </button>

    )
}

export default Button;