import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header({ toggleSidebar }) {
    const { logout } = useAuth();
    const [openMenu, setOpenMenu] = useState(false);

    return (
        <header className="bg-white shadow h-16 flex items-center px-4 justify-between">
            <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded hover:bg-gray-100"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>

            <h1 className="text-xl font-semibold"> </h1>

            <div className="relative">
                <button
                    onClick={() => setOpenMenu(!openMenu)}
                    className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded"
                >
                    <img
                        src="/assets/admin-logo.webp"
                        alt="avatar"
                        className="w-9 h-9 rounded-full"
                    />
                </button>

                {openMenu && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-md py-2">
                        <button
                            onClick={() => {
                                logout();
                                window.location.href = "/login";
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}