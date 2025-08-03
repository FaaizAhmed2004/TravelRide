import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface DestinationCardProps {
  name: string
  type: string
  image: string
}

export function DestinationCard({ name, type, image }: DestinationCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg?height=200&width=300"} alt={name} fill className="object-cover" />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600">{type}</p>
      </CardContent>
    </Card>
  )
}
export default DestinationCard
// This component can be used to display a destination card with an image, name, and type.  
// It uses the Card component from the UI library and Image from Next.js for optimized image loading.
// The card has a hover effect that increases the shadow for better visual feedback.