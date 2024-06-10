import Link from "next/link";

const AboutPage = () => {

    return (
        <div className="space-y-6">
            <section className="container mx-auto py-20">
                <h2 className="text-4xl font-bold text-center mb-8">About Compile & Hire: Bridging the Gap Between Talent and Opportunity</h2>

                <div className="prose text-gray-700 mb-8">
                    <h3 className="text-1xl font-semibold text-center mb-8">Compile & Hire is your one-stop platform for connecting aspiring computer science students and software engineers with businesses seeking fresh talent for their projects. We understand the challenges both sides face:</h3>
                    <ul className="list-disc space-y-2">
                    <li>Students and aspiring engineers: Finding real-world experience to build your resume and showcase your skills can be tough. Many entry-level positions require experience, creating a frustrating catch-22.</li>
                    <li>Businesses: Hiring qualified developers can be expensive and time-consuming. You might struggle to find the perfect fit, especially for smaller projects.</li>
                    </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-center pt-5">
                    <div>
                    <h3 className="text-2xl font-semibold mb-4">For Students and Aspiring Engineers</h3>
                    <ul className="list-disc space-y-2 list-inside ">
                        <li className="text-gray-700">Gain valuable experience on real-world projects.</li>
                        <li className="text-gray-700">Get mentored by experienced professionals.</li>
                        <li className="text-gray-700">Boost your resume with project experience.</li>
                    </ul>
                    </div>
                    <div>
                    <h3 className="text-2xl font-semibold mb-4">For Businesses</h3>
                    <ul className="list-disc space-y-2 list-inside ">
                        <li className="text-gray-700">Access a pool of pre-vetted talent.</li>
                        <li className="text-gray-700">Cost-effective solutions for specific projects.</li>
                        <li className="text-gray-700">Fresh perspectives and innovative ideas.</li>
                    </ul>
                    </div>
                </div>
                <p className="text-center text-gray-700 mt-8 pt-10">Together, we can build a thriving community of learners, innovators, and collaborators.</p>
                <div className="text-center flex items-center justify-center pt-5">
                    <Link href="/" className=" px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700">
                        Join Compile & Hire Today!
                    </Link>
                </div >
                </section>
        </div>
    );
};

export default AboutPage;
