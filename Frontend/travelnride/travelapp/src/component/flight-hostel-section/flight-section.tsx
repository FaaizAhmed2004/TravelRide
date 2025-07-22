import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function FlightsHotelsSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="relative overflow-hidden h-80">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
          <Image
            src="/assets/Airport_Terminal.jpg"
            alt="Airport terminal"
            fill
            className="object-cover"
          />
          <CardContent className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
            <h3 className="text-3xl font-bold mb-2">Flights</h3>
            <p className="mb-4 opacity-90">Search Flights & Places Hire to our most popular destinations</p>
            <Button className="bg-[#65b599] hover:bg-[#65b599]/90 w-fit">Show Flights</Button>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden h-80">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
          <Image src="/assets/burjkhalifa.jpg" alt="Luxury hotel" fill className="object-cover" />
          <CardContent className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
            <h3 className="text-3xl font-bold mb-2">Hotels</h3>
            <p className="mb-4 opacity-90">Search hotels & Places hire to our most popular destinations</p>
            <Button className="bg-[#65b599] hover:bg-[#65b599]/90 w-fit">Show Hotels</Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
export default FlightsHotelsSection