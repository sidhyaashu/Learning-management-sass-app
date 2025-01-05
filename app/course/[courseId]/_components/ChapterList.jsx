function ChapterList({ course }) {
    const CHAPTERS = course?.courseLayout?.chapters;

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold text-center mb-5">Chapters</h2>
            <div className="grid grid-cols-1 gap-5">
                {CHAPTERS?.map((chapter, index) => (
                    <div key={index} className="bg-white bg-opacity-20 p-5 rounded-lg shadow-lg">
                        <h2 className="text-lg font-bold text-white mb-2">{chapter?.chapterEmoji} {chapter?.chapterTitle}</h2>
                        <p className="text-sm">{chapter?.chapterSummary}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChapterList;