import DashboardHeader from "@/app/dashboard/_components/DashBoardHeader";

function CourseViewLayout({children}) {
    return (
        <div>
            <DashboardHeader title="Dashboard" />
            <div>
                {children}
            </div>
        </div>
    )
}

export default CourseViewLayout;

