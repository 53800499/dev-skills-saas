import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const tests = [
  {
    id: "TEST-1234",
    name: "Algorithmes et structures de données",
    date: "2023-11-15",
    score: 92,
    status: "completed",
  },
  {
    id: "TEST-1235",
    name: "Développement Web Frontend",
    date: "2023-11-10",
    score: 85,
    status: "completed",
  },
  {
    id: "TEST-1236",
    name: "API REST et Backend",
    date: "2023-11-05",
    score: 78,
    status: "completed",
  },
  {
    id: "TEST-1237",
    name: "DevOps et CI/CD",
    date: "2023-10-28",
    score: 88,
    status: "completed",
  },
  {
    id: "TEST-1238",
    name: "Sécurité Web",
    date: "2023-10-20",
    score: 75,
    status: "completed",
  },
]

export function RecentTests() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Test</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Statut</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tests.map((test) => (
          <TableRow key={test.id}>
            <TableCell className="font-medium">{test.name}</TableCell>
            <TableCell>{test.date}</TableCell>
            <TableCell>{test.score}%</TableCell>
            <TableCell>
              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                Complété
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

