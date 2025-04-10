import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"

// Récupérer un test spécifique
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.accessToken) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const testId = params.id

    const response = await fetch(`${process.env.BACKEND_API_URL}/tests/${testId}`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Erreur lors de la récupération du test" },
        { status: response.status },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erreur API test:", error)
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 })
  }
}

// Mettre à jour un test
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.accessToken) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est un recruteur ou un admin
    if (!["recruiter", "admin"].includes(session.user.role)) {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    const testId = params.id
    const testData = await req.json()

    const response = await fetch(`${process.env.BACKEND_API_URL}/tests/${testId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Erreur lors de la mise à jour du test" },
        { status: response.status },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erreur API mise à jour de test:", error)
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 })
  }
}

// Supprimer un test
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.accessToken) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Vérifier si l'utilisateur est un admin
    if (session.user.role !== "admin") {
      return NextResponse.json({ error: "Accès refusé" }, { status: 403 })
    }

    const testId = params.id

    const response = await fetch(`${process.env.BACKEND_API_URL}/tests/${testId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const data = await response.json()
      return NextResponse.json(
        { error: data.message || "Erreur lors de la suppression du test" },
        { status: response.status },
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error("Erreur API suppression de test:", error)
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 })
  }
}

