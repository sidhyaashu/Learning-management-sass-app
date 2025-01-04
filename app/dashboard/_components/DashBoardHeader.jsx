import { UserButton } from "@clerk/nextjs";

function DashboardHeader({ title, extraContent }) {
    return (
        <header
            className="p-4 shadow-md bg-white flex justify-between items-center"
            aria-label="Dashboard Header"
        >
            {/* Left Section: Title */}
            <div className="flex items-center">
                {title && <h1 className="text-lg font-semibold">{title}</h1>}
            </div>

            {/* Right Section: Extra Content & User Button */}
            <div className="flex items-center space-x-4">
                {extraContent && <div>{extraContent}</div>}
                <UserButton />
            </div>
        </header>
    );
}


export default DashboardHeader;
