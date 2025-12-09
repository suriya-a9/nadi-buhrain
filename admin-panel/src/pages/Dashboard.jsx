export default function Dashboard() {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Welcome Back 👋</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-white rounded shadow">
                    <h3 className="font-semibold text-lg">Total Users</h3>
                    <p className="text-3xl mt-3 font-bold">120</p>
                </div>

                <div className="p-6 bg-white rounded shadow">
                    <h3 className="font-semibold text-lg">Orders</h3>
                    <p className="text-3xl mt-3 font-bold">320</p>
                </div>

                <div className="p-6 bg-white rounded shadow">
                    <h3 className="font-semibold text-lg">Revenue</h3>
                    <p className="text-3xl mt-3 font-bold">$12,300</p>
                </div>
            </div>
        </div>
    );
}