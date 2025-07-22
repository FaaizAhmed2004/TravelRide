import { Button } from "@/components/ui/button"
import { DestinationCard } from "../destination-card/destination-card"

const destinations = [
  {
    name: "Istanbul, Turkey",
    type: "Flights • Hotels • Resorts",
    image: "/assets/istanbul-turkey.jpg",
  },
  {
    name: "Sydney, Australia",
    type: "Flights • Hotels • Resorts",
    image: "/assets/sydney-aus.jpg",
  },
  {
    name: "Baku, Azerbaijan",
    type: "Flights • Hotels • Resorts",
    image: "/assets/azarbaijan.jpg",
  },
  {
    name: "Malé, Maldives",
    type: "Flights • Hotels • Resorts",
    image: "/assests/maldives.jpg",
  },
  {
    name: "Paris, France",
    type: "Flights • Hotels • Resorts",
    image: "/assets/paris.jpg",
  },
  {
    name: "New York, US",
    type: "Flights • Hotels • Resorts",
    image: "/assets/times-square.jpg",
  },
  {
    name: "London, UK",
    type: "Flights • Hotels • Resorts",
    image: "/assets/london.jpg",
  },
  {
    name: "Tokyo, Japan",
    type: "Flights • Hotels • Resorts",
    image: "/assets/tokyo.jpg",
  },
  {
    name: "Dubai, UAE",
    type: "Flights • Hotels • Resorts",
    image: "/assets/dubai.jpg",
  },
]

export function PlanYourTrip() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Plan your perfect trip</h2>
            <p className="text-gray-600">Search Flights & Places Hire to our most popular destinations</p>
          </div>
          <Button variant="ghost" className="text-[#65b599]">
            See more places
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <DestinationCard key={index} name={destination.name} type={destination.type} image={destination.image} />
          ))}
        </div>
      </div>
    </section>
  )
}
export default PlanYourTrip