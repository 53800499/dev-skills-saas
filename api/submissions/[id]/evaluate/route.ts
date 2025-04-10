import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../../auth/[...nextauth]/route"

// Évaluer une soumission
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.accessToken) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est un recruteur ou un admin
    if (!["recruiter", "admin"].includes(session.user.role)) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    const submissionId = params.id
    const evaluationData = await req.json()

    const response = await fetch(`${process.env.BACKEND_API_URL}/submissions/${submissionId}/evaluate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(evaluationData),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Erreur lors de l'évaluation de la soumission" },
        { status: response.status },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erreur API évaluation:", error)
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 })
  }
}

