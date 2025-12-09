import { useEffect, useState } from "react";
import api from "../services/api";
import Table from "../components/Table";

export default function Technicians() {
    const [technicians, setTechnicians] = useState([]);

    const loadTechnicians = async () => {
        const token = localStorage.getItem("token");
        console.log("token", token)
        const res = await api.post(
            "/technician/list",
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        setTechnicians(res.data.data);
    };
    console.log('data:', technicians)
    useEffect(() => {
        loadTechnicians();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Technicians List</h2>
            <Table
                columns={[
                    { title: "First Name", key: "firstName" },
                    { title: "Last Name", key: "lastName" },
                    { title: "Mobile", key: "mobile" },
                    { title: "Email", key: "email" },
                    { title: "Gender", key: "gender" },
                    { title: "Role", key: "role.skill" }
                ]}
                data={technicians}
            />
        </div>
    );
}