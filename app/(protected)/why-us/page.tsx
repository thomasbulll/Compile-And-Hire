import Link from "next/link";

const WhyUsPage = () => {

    return (
        <div className="space-y-6">
            <section className="container mx-auto py-20">
                <h2 className="text-3xl font-bold text-center mb-8">Why Choose Compile & Hire?</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                    <h3 className="text-2xl font-semibold mb-4">For Students and Aspiring Engineers</h3>
                    <ul className="list-disc space-y-2">
                        <li className="text-gray-700">
                            <strong>Launch Your Career Faster: </strong> 
                            Break the entry-level experience catch-22! Gain valuable hands-on experience by working on real-world projects for businesses. 
                            Build a strong portfolio showcasing your skills in practical application, making you a highly desirable candidate for potential employers.
                        </li>
                        <li className="text-gray-700">
                            <strong>Learn from the Best: </strong>
                            Get mentored by seasoned professionals in the software development industry. Gain invaluable insights and guidance that accelerate your learning curve. Ask questions, receive feedback,
                            and learn from the expertise of those who have been there and done that.
                        </li>
                        <li className="text-gray-700">
                            <strong>Stand Out from the Crowd: </strong>
                            Don't let your resume get lost in the pile. Showcase the project experience you gain on Compile & Hire. 
                            Highlight your capabilities in tackling real-world problems and using your knowledge to deliver results. 
                            Make a lasting impression on potential employers and land your dream job.
                        </li>
                    </ul>
                    </div>
                    <div>
                    <h3 className="text-2xl font-semibold mb-4">For Businesses</h3>
                    <ul className="list-disc space-y-2">
                        <li className="text-gray-700">
                            <strong>Leverage a Top-Tier Talent Pool:  </strong>
                            Find promising computer science students and aspiring engineers ready to contribute to your projects. 
                            We curate a talented pool of individuals, saving you time and resources on recruitment. 
                            Leverage our network to find the perfect fit for your specific needs and skill requirements.
                        </li>
                        <li className="text-gray-700">
                            <strong>Cost-Effective Solutions: </strong>
                            Hire talent for specific projects without the commitment of a full-time employee. This allows you to scale your development team efficiently 
                            and manage project budgets effectively. Need help with a short-term development task or a specific feature? Find the right talent on Compile & Hire 
                            for a cost-effective solution.
                        </li>
                        <li className="text-gray-700">
                            <strong>Fresh Perspectives and Innovation: </strong>
                            Tap into the energy, creativity, and latest skillsets of the next generation of developers. 
                            Gain access to new ideas and approaches that can benefit your projects. Compile & Hire connects you with young minds eager to learn and contribute, 
                            bringing innovative solutions and fresh perspectives to your development efforts.
                        </li>
                    </ul>
                    </div>
                </div>

                <div className="text-center text-gray-700 mt-8">
                    <p>Together, We Make a Difference: Compile & Hire fosters a thriving community where aspiring developers gain the practical experience they need to launch successful careers, and businesses find the talented individuals they seek to take their projects to the next level. We bridge the gap between education and opportunity, empowering both sides to achieve their goals.</p>
                    <p className="mt-2">Join Compile & Hire today and unlock the potential of the future workforce!</p>
                </div>
                <div className="text-center flex items-center justify-center pt-5">
                    <Link href="/" className=" px-4 py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700">
                        Join Compile & Hire Today!
                    </Link>
                </div >
            </section>
        </div>
    );
};

export default WhyUsPage;
