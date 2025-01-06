import DashboardHeader from "@/app/dashboard/_components/DashBoardHeader";

function CourseViewLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-900 text-gray-300">
            <DashboardHeader title="Dashboard" />
            <div className="p-6">{children}</div>
        </div>
    );
}

export default CourseViewLayout;