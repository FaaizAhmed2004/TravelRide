import { Hero } from "@/component/HeroSection/Herosection"
import { SearchForm } from "@/component/Search-form/search-form"
import { PlanYourTrip } from "@/component/plan-your-trip/plan-your-trip"
import { FlightsHotelsSection } from "../component/flight-hostel-section/flight-section"
import { ReviewsSection } from "@/component/review-section/review-section"
import { Newsletter } from "@/component/news-letter/news-letter"

export default function HomePage() {
  return (
    <div className="bg-white">
      <Hero />
      <SearchForm />
      <PlanYourTrip />
      <FlightsHotelsSection />
      <ReviewsSection />
      <Newsletter />
    </div>
  )
}