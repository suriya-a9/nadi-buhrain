import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
    const linkClasses = ({ isActive }) =>
        `flex items-center p-3 rounded-lg transition font-medium
        ${isActive
            ? "bg-brandGreen text-white shadow-md"
            : "text-gray-700 hover:bg-gray-200"
        }`;

    return (
        <>
            {isOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                />
            )}
            <aside
                className={`
                    fixed left-0 top-0 h-full bg-white shadow-lg z-40 w-64 
                    transform transition-transform duration-300
                    ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                `}
            >
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold text-textGreen">Nadi Buhrain</h2>
                </div>

                <nav className="p-4 space-y-2">

                    <NavLink to="/" className={linkClasses}>
                        Dashboard
                    </NavLink>

                    <NavLink to="/services" className={linkClasses}>
                        Services
                    </NavLink>

                </nav>
            </aside>
        </>
    );
}