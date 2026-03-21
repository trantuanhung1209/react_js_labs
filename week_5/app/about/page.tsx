export default function About() {
  return (
    <div className="space-y-12">
      <h1 className="text-4xl font-light text-gray-900 mb-8">Về tôi</h1>

      <section className="bg-white rounded-3xl p-12" style={{
        boxShadow: '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff'
      }}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Giới thiệu chung</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          Tôi là một lập trình viên React/Next.js với 2+ năm kinh nghiệm trong phát triển ứng dụng web.
          Tôi đam mê học hỏi và luôn tìm tòi những công nghệ mới để cải thiện kỹ năng của mình.
        </p>
      </section>

      <section className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8" style={{
          boxShadow: '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff'
        }}>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Học vấn</h3>
          <ul className="space-y-4 text-gray-700">
            <li>
              <div className="font-semibold text-gray-900">Đại học Công Nghệ Thông Tin</div>
              <div className="text-gray-600 text-sm mt-1">Chuyên ngành: Công nghệ Phần mềm</div>
            </li>
            <li>
              <div className="font-semibold text-gray-900">Khóa đào tạo React Advanced</div>
              <div className="text-gray-600 text-sm mt-1">2023 - 2024</div>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-3xl p-8" style={{
          boxShadow: '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff'
        }}>
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Kinh nghiệm</h3>
          <ul className="space-y-4 text-gray-700">
            <li>
              <div className="font-semibold text-gray-900">Full Stack Developer</div>
              <div className="text-gray-600 text-sm mt-1">2022 - Hiện tại</div>
            </li>
            <li>
              <div className="font-semibold text-gray-900">Frontend Developer Intern</div>
              <div className="text-gray-600 text-sm mt-1">2021 - 2022</div>
            </li>
          </ul>
        </div>
      </section>

      <section className="bg-white rounded-3xl p-12" style={{
        boxShadow: '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff'
      }}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-8">Kỹ năng kỹ thuật</h2>
        <div className="space-y-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Frontend</h4>
            <div className="flex flex-wrap gap-3">
              <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm">React</span>
              <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm">Next.js</span>
              <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm">TypeScript</span>
              <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm">Tailwind CSS</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Backend</h4>
            <div className="flex flex-wrap gap-3">
              <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm">Node.js</span>
              <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm">Express</span>
              <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm">MongoDB</span>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Công cụ & Khác</h4>
            <div className="flex flex-wrap gap-3">
              <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm">Git</span>
              <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm">Docker</span>
              <span className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm">REST API</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-3xl p-12" style={{
        boxShadow: '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff'
      }}>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Sở thích & Hoạt động</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="text-base">Tham gia các cộng đồng lập trình viên trực tuyến</li>
          <li className="text-base">Viết blog về công nghệ và lập trình</li>
          <li className="text-base">Đóng góp cho các dự án open source</li>
          <li className="text-base">Tham gia hackathon và các cuộc thi lập trình</li>
        </ul>
      </section>
    </div>
  );
}
