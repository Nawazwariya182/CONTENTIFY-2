/*
  Copyright © 2025 Nawaz & Tabish All rights reserved.
  Project: Contentify (Proprietary Software)
  
  This code is the exclusive property of the copyright holder.
  Unauthorized copying, modification, redistribution, or use of any part
  of this codebase — including the name “Contentify” — is strictly prohibited.

  This software is confidential and proprietary. By accessing or using this code,
  you agree to comply with the terms set forth in the LICENSE file.
*/
"use client"

import type React from "react"
import { useState } from "react"
import { getDiseasePrediction, validatePatientData, type PatientData, type DiseasePrediction } from "@/utils/disease"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, Loader2, Plus, X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function DiseasePredictionUI() {
  const [patientData, setPatientData] = useState<PatientData>({
    age: 0,
    gender: "",
    symptoms: [],
    duration: "",
    medicalHistory: [],
    lifestyle: [],
  })
  const [newSymptom, setNewSymptom] = useState("")
  const [newMedicalHistory, setNewMedicalHistory] = useState("")
  const [newLifestyle, setNewLifestyle] = useState("")
  const [prediction, setPrediction] = useState<DiseasePrediction | null>(null)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validationError = validatePatientData(patientData)
    if (validationError) {
      setError(validationError)
      return
    }
    setError("")
    setPrediction(null)
    setIsLoading(true)
    try {
      const result = await getDiseasePrediction(patientData)
      if (result.error) {
        setError(result.error)
      } else {
        setPrediction(result)
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const addSymptom = () => {
    if (newSymptom.trim() !== "") {
      setPatientData((prev) => ({
        ...prev,
        symptoms: [...prev.symptoms, newSymptom.trim()],
      }))
      setNewSymptom("")
    }
  }

  const removeSymptom = (index: number) => {
    setPatientData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.filter((_, i) => i !== index),
    }))
  }

  const addMedicalHistory = () => {
    if (newMedicalHistory.trim() !== "") {
      setPatientData((prev) => ({
        ...prev,
        medicalHistory: [...prev.medicalHistory, newMedicalHistory.trim()],
      }))
      setNewMedicalHistory("")
    }
  }

  const removeMedicalHistory = (index: number) => {
    setPatientData((prev) => ({
      ...prev,
      medicalHistory: prev.medicalHistory.filter((_, i) => i !== index),
    }))
  }

  const addLifestyle = () => {
    if (newLifestyle.trim() !== "") {
      setPatientData((prev) => ({
        ...prev,
        lifestyle: [...prev.lifestyle, newLifestyle.trim()],
      }))
      setNewLifestyle("")
    }
  }

  const removeLifestyle = (index: number) => {
    setPatientData((prev) => ({
      ...prev,
      lifestyle: prev.lifestyle.filter((_, i) => i !== index),
    }))
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center mb-6">
        {/* <Link href="/dashboard">
          <Button
            className="bg-prim hover:bg-back hover:text-acc hover:border-2 hover:border-prim transition-all"
            style={{ cursor: "url(/poin.png), auto" }}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
        </Link> */}
        <h1 className="text-3xl font-bold ml-4">AI Disease Prediction</h1>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form (Left Side) */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Patient Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    value={patientData.age || ""}
                    onChange={(e) =>
                      setPatientData((prev) => ({
                        ...prev,
                        age: Number.parseInt(e.target.value) || 0,
                      }))
                    }
                    required
                    style={{ cursor: "url(/type.png), auto" }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select
                    onValueChange={(value) => setPatientData((prev) => ({ ...prev, gender: value }))}
                    value={patientData.gender}
                  >
                    <SelectTrigger style={{ cursor: "url(/poin.png), auto" }}>
                      <SelectValue placeholder="Select gender" style={{ cursor: "url(/poin.png), auto" }} />
                    </SelectTrigger>
                    <SelectContent style={{ cursor: "url(/poin.png), auto" }}>
                      <SelectItem value="male" style={{ cursor: "url(/poin.png), auto" }}>
                        Male
                      </SelectItem>
                      <SelectItem value="female" style={{ cursor: "url(/poin.png), auto" }}>
                        Female
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration of Symptoms</Label>
                <Input
                  id="duration"
                  value={patientData.duration}
                  onChange={(e) =>
                    setPatientData((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  placeholder="e.g., 2 weeks"
                  required
                  style={{ cursor: "url(/type.png), auto" }}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="symptoms">Symptoms</Label>
                <div className="flex space-x-2">
                  <Input
                    id="symptoms"
                    value={newSymptom}
                    onChange={(e) => setNewSymptom(e.target.value)}
                    placeholder="Enter a symptom"
                    style={{ cursor: "url(/type.png), auto" }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addSymptom()
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={addSymptom}
                    size="icon"
                    className="bg-prim hover:bg-acc"
                    style={{ cursor: "url(/poin.png), auto" }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 max-h-24 overflow-y-auto">
                  {patientData.symptoms.length > 0 ? (
                    <ul className="space-y-1">
                      {patientData.symptoms.map((symptom, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between bg-second text-secondary-foreground rounded-md px-2 py-1"
                          style={{ cursor: "url(/poin.png), auto" }}
                        >
                          <span>{symptom}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSymptom(index)}
                            style={{ cursor: "url(/poin.png), auto" }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No symptoms added yet</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medical-history">Medical History</Label>
                <div className="flex space-x-2">
                  <Input
                    id="medical-history"
                    value={newMedicalHistory}
                    onChange={(e) => setNewMedicalHistory(e.target.value)}
                    placeholder="Enter medical history"
                    style={{ cursor: "url(/type.png), auto" }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addMedicalHistory()
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={addMedicalHistory}
                    size="icon"
                    className="bg-prim hover:bg-acc"
                    style={{ cursor: "url(/poin.png), auto" }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 max-h-24 overflow-y-auto">
                  {patientData.medicalHistory.length > 0 ? (
                    <ul className="space-y-1">
                      {patientData.medicalHistory.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between bg-second text-secondary-foreground rounded-md px-2 py-1"
                          style={{ cursor: "url(/poin.png), auto" }}
                        >
                          <span>{item}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMedicalHistory(index)}
                            style={{ cursor: "url(/poin.png), auto" }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No medical history added yet</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lifestyle">Lifestyle Factors</Label>
                <div className="flex space-x-2">
                  <Input
                    id="lifestyle"
                    value={newLifestyle}
                    onChange={(e) => setNewLifestyle(e.target.value)}
                    placeholder="Enter lifestyle factor"
                    style={{ cursor: "url(/type.png), auto" }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addLifestyle()
                      }
                    }}
                  />
                  <Button
                    type="button"
                    onClick={addLifestyle}
                    size="icon"
                    className="bg-prim hover:bg-acc"
                    style={{ cursor: "url(/poin.png), auto" }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 max-h-24 overflow-y-auto">
                  {patientData.lifestyle.length > 0 ? (
                    <ul className="space-y-1">
                      {patientData.lifestyle.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between bg-second text-secondary-foreground rounded-md px-2 py-1"
                          style={{ cursor: "url(/poin.png), auto" }}
                        >
                          <span>{item}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLifestyle(index)}
                            style={{ cursor: "url(/poin.png), auto" }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No lifestyle factors added yet</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-prim hover:bg-acc"
                style={{ cursor: "url(/poin.png), auto" }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Prediction...
                  </>
                ) : (
                  "Get Disease Prediction"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Output Display (Right Side) */}
        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-64">
                  <Loader2 className="h-12 w-12 animate-spin text-prim mb-4" />
                  <p className="text-muted-foreground">Analyzing patient data...</p>
                </div>
              ) : prediction ? (
                <Tabs defaultValue="diseases" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="diseases" style={{ cursor: "url(/poin.png), auto" }}>
                      Possible Diseases
                    </TabsTrigger>
                    <TabsTrigger value="tests" style={{ cursor: "url(/poin.png), auto" }}>
                      Recommended Tests
                    </TabsTrigger>
                    <TabsTrigger value="advice" style={{ cursor: "url(/poin.png), auto" }}>
                      General Advice
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="diseases" className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Possible Diseases:</h3>
                    <ul className="space-y-4">
                      {prediction.possibleDiseases.map((disease, index) => (
                        <li key={index} className="border-b pb-4">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-medium text-lg">{disease.name}</p>
                            <span className="bg-second text-secondary-foreground px-2 py-1 rounded-full text-sm">
                              {disease.probability}
                            </span>
                          </div>
                          <p className="text-muted-foreground">{disease.description}</p>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="tests" className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Recommended Tests:</h3>
                    <ul className="space-y-2">
                      {prediction.recommendedTests.map((test, index) => (
                        <li key={index} className="flex items-start">
                          <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-prim"></div>
                          <span>{test}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="advice" className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">General Advice:</h3>
                    <div className="p-4 bg-muted rounded-lg">
                      <p>{prediction.generalAdvice}</p>
                    </div>
                  </TabsContent>
                </Tabs>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <AlertCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No Prediction Yet</h3>
                  <p className="text-muted-foreground max-w-md">
                    Fill out the patient information form on the left and click "Get Disease Prediction" to see results
                    here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
