import React from 'react'

const analyticsTools = [
    {
        name: 'Recommendation System',
        description: "Collaborative Filtering is a method used by recommender systems to make predictions about the interest of a specific user by collecting taste or preference information from many other users. .Get personalizeed product recommendation using collaborative filtering approach, based on your sales data.",
        route: "/advanced-analytics/recommendation",
        bg: "bg-gradient-to-r from-purple-500 to-indigo-600"
    },
    {
        name: "Sales Forecasting",
        description: "Predict future sales using time series analytics and historical data trends",
        route: "/advanced-analytics/forecasting",
        bg: "bg-gradient-to-r from-green-500 to-teal-600"
    },
    {
        name: "Customer Clustering",
        description: "Segment your customers using unsupervised learning to better target you marketing",
        route: "/advanced-analytics/clustering",
        bg: "bg-gradient-to-r from-green-500 to-teal-600"
    },
];

export default function AdvancedAnalytics() {
    return(
        <div className='flex flex-col items-center w-full bg-gray-100 min-h-screen'>
            <header className='text-center py-12 px-6'>
                <h1 className='text-4xl font-bold mb-4'>Advanced Analytics Tools</h1>
                <p className='text-lg text-gray-700 max-w-3xl mx-auto'>
                    Explore a suite of AI-powered tools designed to enhance your business descisions with intellient data-dirven insights.
                </p>
            </header>

            <main className='w-full space-y-12'>
                {analyticsTools.map((tool, index) => (
                    <section key={index} className={`${tool.bg} text-white py-16 px-6 md:px-20 rounded-lg shadow-lg mx-4 md:mx-20 `}>
                        <div className='max-w-4xl mx-auto text-center'>
                            <h2 className='text-3xl font-semibold mb-4'>{tool.name}</h2>
                            <p className='text-lg mb-6'>{tool.description}</p>
                            <a href={tool.route}>
                                Try Now
                            </a>
                        </div>
                    </section>
                ))}
            </main>
        </div>
    );
}