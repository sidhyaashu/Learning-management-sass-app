function ChapterList({ course }) {
    const CHAPTERS = course?.courseLayout?.chapters;

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-100 text-center mb-5">Chapters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {CHAPTERS?.map((chapter, index) => (
                    <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-gray-100 mb-2">
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