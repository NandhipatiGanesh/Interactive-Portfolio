
import { CheckCircle2, Star, Sparkles } from "lucide-react";

export default function HealthcareHero() {





  return (
    <>
      {/* Next Section - for scroll demonstration */}
      <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="w-full max-w-[1300px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience healthcare that puts you first with our comprehensive
              platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle2,
                title: "24/7 Availability",
                desc: "Access medical care anytime, anywhere with our around-the-clock service",
              },
              {
                icon: Sparkles,
                title: "Expert Doctors",
                desc: "Connect with board-certified physicians across all specialties",
              },
              {
                icon: Star,
                title: "Secure & Private",
                desc: "Your health data is protected with enterprise-grade security",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
