import { useEffect, useState } from "react";
import api from "../services/api";
import Table from "../components/Table";

export default function User() {
    const [users, setUsers] = useState([]);

    const loadUsers = async () => {
        const res = await api.get("/account-verify/all-user-list");
        setUsers(res.data.data);
        console.log(users);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Users List</h2>
            <Table
                columns={[
                    { title: "Full Name", key: "basicInfo.fullName" },
                    { title: "Mobile", key: "basicInfo.mobileNumber" },
                    { title: "Email", key: "basicInfo.email" },
                    { title: "Account Type", key: "accountTypeId.name" },
                    { title: "Status", key: "accountVerification" }
                ]}
                data={users}
            />
        </div>
    );
}