import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const recentAwards = [
  { creator: 'Emma Smith', username: '@emmasmith', award: 'Best Dance Performance', category: 'Dance', date: '2023-06-15', avatar: '/placeholder.svg?height=40&width=40' },
  { creator: 'Liam Johnson', username: '@liamj', award: 'Most Innovative Effect', category: 'Visual Effects', date: '2023-06-14', avatar: '/placeholder.svg?height=40&width=40' },
  { creator: 'Sophia Lee', username: '@sophialee', award: 'Best Comedy Skit', category: 'Comedy', date: '2023-06-13', avatar: '/placeholder.svg?height=40&width=40' },
  { creator: 'Noah Brown', username: '@noahb', award: 'Most Viral Challenge', category: 'Challenges', date: '2023-06-12', avatar: '/placeholder.svg?height=40&width=40' },
  { creator: 'Olivia Davis', username: '@oliviad', award: 'Best Original Song', category: 'Music', date: '2023-06-11', avatar: '/placeholder.svg?height=40&width=40' },
]

export default function RecentAwards() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Awards</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentAwards.map((award, index) => (
            <div key={index} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={award.avatar} alt={award.creator} />
                <AvatarFallback>{award.creator.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">{award.creator}</p>
                <p className="text-sm text-gray-500">{award.username}</p>
                <p className="text-sm">{award.award}</p>
              </div>
              <div className="text-right">
                <Badge>{award.category}</Badge>
                <p className="text-sm text-gray-500 mt-1">{award.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

