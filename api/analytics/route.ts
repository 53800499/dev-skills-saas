import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

// Récupérer les données analytiques
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.accessToken) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est un recruteur ou un admin
    if (!["recruiter", "admin"].includes(session.user.role)) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    const searchParams = req.nextUrl.searchParams
    const period = searchParams.get("period") || "month"
    const testId = searchParams.get("testId")

    let url = `${process.env.BACKEND_API_URL}/analytics?period=${period}`

    if (testId) {
      url += `&testId=${testId}`
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Erreur lors de la récupération des données analytiques" },
        { status: response.status },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erreur API analytics:", error)
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 })
  }
}

