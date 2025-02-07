
import ComparisionSection from "./components/ComparisionSection";
import LandingPage from "./components/LandingPage";
import Footer from "./components/Footer"
import EchoFeatures from "./components/WhyEcho";
import HowItWorks from "./components/HowItWorks";
import MetricsShowcase from "./components/MetricShowCase";
import FAQSection from "./components/FAQSection";
import UseCasesSection from "./components/UseCaseSection";


export default function Home() {
  return (
    <div>
      <LandingPage />
      <ComparisionSection />
      <EchoFeatures />
      <HowItWorks />
      <MetricsShowcase />
      <UseCasesSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
