import { UserButton } from "@clerk/nextjs";

function DashboardHeader({ title, extraContent }) {
    return (
        <header
            className="p-4 shadow-md bg-gradient-to-r from-purple-500 to-blue-500 text-white flex justify-between items-center rounded-b-lg"
            aria-label="Dashboard Header"
        >
            {/* Left Section: Title */}
            <div className="flex items-center">
                {title && <h1 className="text-xl font-bold tracking-wide">{title}</h1>}
            </div>

            {/* Right Section: Extra Content & User Button */}
            <div className="flex items-center space-x-4">
                {extraContent && <div className="hidden sm:block">{extraContent}</div>}
                <UserButton />
            </div>
        </header>
    );
}

export default DashboardHeader;
