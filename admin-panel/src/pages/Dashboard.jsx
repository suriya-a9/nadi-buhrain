import { useEffect, useState } from "react";
import Table from "../components/Table";
import api from "../services/api";

export default function Dashboard() {
    const [counts, setCounts] = useState({
        technicianCounts: 0,
        userAccountCounts: 0,
        userServiceCounts: 0
    });
    const [loading, setLoading] = useState(false);

    const loadCounts = async () => {
        setLoading(true);
        try {
            const res = await api.get("/dashboard/counts");
            setCounts(res.data || {});
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCounts();
    }, []);
    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold mb-4">Welcome Back 👋</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-white rounded shadow">
                    <h3 className="font-semibold text-lg">Total Technicians</h3>
                    <p className="text-5xl mt-3 font-bold">{counts.technicianCounts}</p>
                </div>
                <div className="p-6 bg-white rounded shadow">
                    <h3 className="font-semibold text-lg">Total Verified Users</h3>
                    <p className="text-5xl mt-3 font-bold">{counts.userAccountCounts}</p>
                </div>
                <div className="p-6 bg-white rounded shadow">
                    <h3 className="font-semibold text-lg">Total Service Requests</h3>
                    <p className="text-5xl mt-3 font-bold">{counts.userServiceCounts}</p>
                </div>
            </div>
        </div>
    )
}