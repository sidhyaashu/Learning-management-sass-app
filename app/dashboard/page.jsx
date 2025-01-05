import WelcomeBanner from "@/app/dashboard/_components/WelcomeBanner";
import CourseList from "@/app/dashboard/_components/CourseList";


function Dashboard(){
    return (
        <div>
            <WelcomeBanner/>
            <CourseList/>
        </div>
    )
}

export default Dashboard;