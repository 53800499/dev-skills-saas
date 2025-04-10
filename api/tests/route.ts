import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

// Récupérer tous les tests
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.accessToken) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const page = searchParams.get("page") || "1"
    const limit = searchParams.get("limit") || "10"

    const response = await fetch(`${process.env.BACKEND_API_URL}/tests?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Erreur lors de la récupération des tests" },
        { status: response.status },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erreur API tests:", error)
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 })
  }
}

// Créer un nouveau test
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.accessToken) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est un recruteur ou un admin
    if (!["recruiter", "admin"].includes(session.user.role)) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    const testData = await req.json()

    const response = await fetch(`${process.env.BACKEND_API_URL}/tests`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Erreur lors de la création du test" },
        { status: response.status },
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Erreur API création de test:", error)
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 })
  }
}

