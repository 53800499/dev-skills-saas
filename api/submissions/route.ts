import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"

// Récupérer toutes les soumissions
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.accessToken) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const searchParams = req.nextUrl.searchParams
    const testId = searchParams.get("testId")
    const candidateId = searchParams.get("candidateId")
    const page = searchParams.get("page") || "1"
    const limit = searchParams.get("limit") || "10"

    let url = `${process.env.BACKEND_API_URL}/submissions?page=${page}&limit=${limit}`

    if (testId) {
      url += `&testId=${testId}`
    }

    if (candidateId) {
      url += `&candidateId=${candidateId}`
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
        { error: data.message || "Erreur lors de la récupération des soumissions" },
        { status: response.status },
      )
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Erreur API soumissions:", error)
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 })
  }
}

// Soumettre un test
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user.accessToken) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const submissionData = await req.json()

    const response = await fetch(`${process.env.BACKEND_API_URL}/submissions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submissionData),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Erreur lors de la soumission du test" },
        { status: response.status },
      )
    }

    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    console.error("Erreur API soumission de test:", error)
    return NextResponse.json({ error: "Erreur serveur interne" }, { status: 500 })
  }
}

