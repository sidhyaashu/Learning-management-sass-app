function ChapterList({ course }) {
    const CHAPTERS = course?.courseLayout?.chapters;

    return (
        <div className="mt-10">
            <h2 className="text-3xl font-extrabold text-gray-100 text-center mb-8">Chapters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {CHAPTERS?.map((chapter, index) => (
                    <div
                        key={index}
                        className="bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
                    >
                        <h2 className="text-xl font-semibold text-gray-100 mb-2">
                            {chapter?.chapterEmoji} {chapter?.chapterTitle}
                        </h2>
                        <p className="text-sm text-gray-400">{chapter?.chapterSummary}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChapterList;
