
function Index() {
  return (
    <div>
        <div className="animate-pulse">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="bg-gray-200 rounded mt-2 h-10"></div>
                </div>
                <div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="bg-gray-200 rounded mt-2 h-10"></div>
                </div>
            </div>
            <div className="h-10 bg-gray-200 rounded-lg w-full sm:w-auto"></div>
        </div>
    </div>
  )
}

export default Index