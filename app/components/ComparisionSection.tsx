export default function ComparisonSection() {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <h2 className="text-3xl md:text-4xl font-bold text-rich-black text-center mb-12 md:mb-16">
            Traditional Learning vs Echo Experience
          </h2>
  
          {/* Comparison Grid */}
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {/* Traditional Way */}
            <div className="bg-gray-100 p-8 md:p-12 rounded-lg">
              <h3 className="text-2xl font-bold text-rich-black mb-6 text-center">Traditional Way</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-lg text-rich-black">One-way lectures with limited interaction</span>
                </li>
                <li className="flex items-start">
                  <span className="text-lg text-rich-black">Students hesitate to ask questions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-lg text-rich-black">Fixed content delivery</span>
                </li>
                <li className="flex items-start">
                  <span className="text-lg text-rich-black">Manual assessment process</span>
                </li>
                <li className="flex items-start">
                  <span className="text-lg text-rich-black">Limited feedback loops</span>
                </li>
              </ul>
            </div>
  
            {/* Echo Way */}
            <div className="bg-gray-100 p-8 md:p-12 rounded-lg">
              <h3 className="text-2xl font-bold text-rich-black mb-6 text-center">Echo Way</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-lg text-rich-black">Interactive AI-powered conversations</span>
                </li>
                <li className="flex items-start">
                  <span className="text-lg text-rich-black">Natural voice-based Q&A anytime</span>
                </li>
                <li className="flex items-start">
                  <span className="text-lg text-rich-black">Adaptive learning paths</span>
                </li>
                <li className="flex items-start">
                  <span className="text-lg text-rich-black">Automated real-time assessment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-lg text-rich-black">Continuous improvement feedback</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  