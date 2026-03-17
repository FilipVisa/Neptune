import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'

  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-xl border border-teal-DEFAULT/15",
        "bg-gradient-to-b from-navy/80 to-navy-dark/60",
        "p-4 text-start sm:p-6",
        "hover:border-teal-DEFAULT/30 hover:from-navy/90",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-colors duration-300",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-sm font-semibold leading-none text-white">
            {author.name}
          </h3>
          <p className="text-xs text-teal-DEFAULT mt-1">
            {author.handle}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-white/60 leading-relaxed">
        {text}
      </p>
    </Card>
  )
}
