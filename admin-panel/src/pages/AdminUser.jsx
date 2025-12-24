import { useEffect, useState } from "react";
import api from "../services/api";
import Offcanvas from "../components/Offcanvas";
import toast from "react-hot-toast";

export default function AdminUser() {
    const [admins, setAdmins] = useState([]);
    const [roles, setRoles] = useState([]);
    const [openCanvas, setOpenCanvas] = useState(false);
    const [editData, setEditData] = useState(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "",
    });
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("token");

    const fetchAdmins = async () => {
        setLoading(true);
        const res = await api.get("/admin/list", {
            headers: { Authorization: `Bearer ${token}` },
        });
        setAdmins(res.data.data);
        setLoading(false);
    };

    const fetchRoles = async () => {
        const res = await api.get("/role/");
        setRoles(res.data.data);
    };

    useEffect(() => {
        fetchAdmins();
        fetchRoles();
    }, []);

    const openCreate = () => {
        setForm({
            name: "",
            email: "",
            password: "",
            role: roles[0]?._id || "",
        });
        setEditData(null);
        setOpenCanvas(true);
    };

    const openEdit = (admin) => {
        setEditData(admin);
        setForm({
            name: admin.name,
            email: admin.email,
            password: "",
            role: admin.role?._id || admin.role,
        });
        setOpenCanvas(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let res;

            if (editData) {
                res = await api.post(
                    `/admin/${editData._id}`,
                    {
                        name: form.name,
                        role: form.role,
                        ...(form.password ? { password: form.password } : {}),
                    },
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                toast.success(res.data.message);
            } else {
                res = await api.post("/admin/register", form, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                toast.success(res.data.message);
            }

            setOpenCanvas(false);
            setForm({ name: "", email: "", password: "", role: "" });
            setEditData(null);
            fetchAdmins();

        } catch (err) {
            toast.error(
                err.response?.data?.message || "Something went wrong"
            );
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Admin Users</h2>
                <button
                    onClick={openCreate}
                    className="bg-bgGreen text-white px-4 py-2 rounded"
                >
                    Add Admin User
                </button>
            </div>

            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Email</th>
                        <th className="border px-4 py-2">Role</th>
                        <th className="border px-4 py-2">Created At</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map(admin => (
                        <tr key={admin._id}>
                            <td className="border px-4 py-2">{admin.name}</td>
                            <td className="border px-4 py-2">{admin.email}</td>
                            <td className="border px-4 py-2 capitalize">
                                {admin.role?.name || ""}
                            </td>
                            <td className="border px-4 py-2">{new Date(admin.createdAt).toLocaleString()}</td>
                            <td className="border px-4 py-2">
                                <button
                                    onClick={() => openEdit(admin)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                                >
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Offcanvas
                open={openCanvas}
                onClose={() => setOpenCanvas(false)}
                title={editData ? "Edit Admin User" : "Add Admin User"}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={e => setForm({ ...form, name: e.target.value })}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Email</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={e => setForm({ ...form, email: e.target.value })}
                            className="w-full border p-2 rounded"
                            required
                            disabled={!!editData}
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Role</label>
                        <select
                            value={form.role}
                            onChange={e => setForm({ ...form, role: e.target.value })}
                            className="w-full border p-2 rounded"
                            required
                        >
                            {roles.map(r => (
                                <option key={r._id} value={r._id}>
                                    {r.name.charAt(0).toUpperCase() + r.name.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                    {!editData && (
                        <div>
                            <label className="block mb-1 font-medium">Password</label>
                            <input
                                type="password"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                className="w-full border p-2 rounded"
                                required
                            />
                        </div>
                    )}
                    {editData && (
                        <div>
                            <label className="block mb-1 font-medium">Password (leave blank to keep unchanged)</label>
                            <input
                                type="password"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    )}
                    <button className="w-full bg-bgGreen text-white py-2 rounded">
                        {editData ? "Update Admin User" : "Create Admin User"}
                    </button>
                </form>
            </Offcanvas>
        </div>
    );
}