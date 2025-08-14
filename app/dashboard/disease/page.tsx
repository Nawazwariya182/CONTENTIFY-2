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

  // NEW: reset form helper
  const clearForm = () => {
    setPatientData({
      age: 0,
      gender: "",
      symptoms: [],
      duration: "",
      medicalHistory: [],
      lifestyle: [],
    })
    setPrediction(null)
    setError("")
  }

  // NEW: probability parser
  const getProbNum = (p: string) => {
    const n = Number(p.replace(/[^0-9.]/g, ""))
    return isNaN(n) ? 0 : Math.min(100, Math.max(0, n))
  }

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
    <div className="relative">
      {/* Modern subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-background via-muted/40 to-background" />
      <div className="relative container mx-auto max-w-6xl py-10 px-4 space-y-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">AI Disease Prediction</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Enter patient context to generate differential possibilities, tests, and guidance.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={clearForm}
              disabled={isLoading}
              className="hover:border-prim hover:text-prim transition-colors"
              style={{ cursor: "url(/poin.png), auto" }}
            >
              Clear Form
            </Button>
            {/* (Optional) Back button can be re-enabled if desired */}
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-2 shadow-sm animate-in fade-in">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: Form */}
          <Card className="h-fit border border-border/60 backdrop-blur-sm bg-card/90 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Demographics Section */}
                <div className="space-y-4 rounded-lg border border-border/60 bg-background/40 p-4">
                  <h3 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                    Demographics
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                </div>

                {/* Symptoms */}
                <div className="space-y-4 rounded-lg border border-border/60 bg-background/40 p-4">
                  <h3 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                    Symptoms
                  </h3>
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
                  <div className="flex flex-wrap gap-2">
                    {patientData.symptoms.length > 0 ? (
                      patientData.symptoms.map((symptom, index) => (
                        <span
                          key={index}
                          className="group inline-flex items-center gap-1 rounded-full bg-second/70 px-3 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-border hover:bg-second transition-colors"
                          style={{ cursor: "url(/poin.png), auto" }}
                        >
                          {symptom}
                          <button
                            type="button"
                            onClick={() => removeSymptom(index)}
                            className="opacity-70 group-hover:opacity-100 hover:text-destructive transition"
                            style={{ cursor: "url(/poin.png), auto" }}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground">No symptoms added yet</p>
                    )}
                  </div>
                </div>

                {/* Medical History */}
                <div className="space-y-4 rounded-lg border border-border/60 bg-background/40 p-4">
                  <h3 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                    Medical History
                  </h3>
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
                  <div className="flex flex-wrap gap-2">
                    {patientData.medicalHistory.length > 0 ? (
                      patientData.medicalHistory.map((item, index) => (
                        <span
                          key={index}
                          className="group inline-flex items-center gap-1 rounded-full bg-second/70 px-3 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-border hover:bg-second transition-colors"
                          style={{ cursor: "url(/poin.png), auto" }}
                        >
                          {item}
                          <button
                            type="button"
                            onClick={() => removeMedicalHistory(index)}
                            className="opacity-70 group-hover:opacity-100 hover:text-destructive transition"
                            style={{ cursor: "url(/poin.png), auto" }}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground">No history items yet</p>
                    )}
                  </div>
                </div>

                {/* Lifestyle */}
                <div className="space-y-4 rounded-lg border border-border/60 bg-background/40 p-4">
                  <h3 className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
                    Lifestyle Factors
                  </h3>
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
                  <div className="flex flex-wrap gap-2">
                    {patientData.lifestyle.length > 0 ? (
                      patientData.lifestyle.map((item, index) => (
                        <span
                          key={index}
                          className="group inline-flex items-center gap-1 rounded-full bg-second/70 px-3 py-1 text-xs font-medium text-secondary-foreground ring-1 ring-inset ring-border hover:bg-second transition-colors"
                          style={{ cursor: "url(/poin.png), auto" }}
                        >
                          {item}
                          <button
                            type="button"
                            onClick={() => removeLifestyle(index)}
                            className="opacity-70 group-hover:opacity-100 hover:text-destructive transition"
                            style={{ cursor: "url(/poin.png), auto" }}
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-muted-foreground">No lifestyle factors yet</p>
                    )}
                  </div>
                </div>

                <div className="pt-2">
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
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Right: Prediction */}
          <Card className="h-full border border-border/60 backdrop-blur-sm bg-card/90 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl">Prediction Results</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-6 animate-in fade-in">
                  <div className="space-y-3">
                    <div className="h-4 w-48 rounded bg-muted animate-pulse" />
                    <div className="h-3 w-full rounded bg-muted animate-pulse" />
                    <div className="h-3 w-5/6 rounded bg-muted animate-pulse" />
                  </div>
                  <div className="grid gap-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="space-y-3 rounded-lg border border-border/60 p-4">
                        <div className="flex justify-between">
                          <div className="h-4 w-32 rounded bg-muted animate-pulse" />
                          <div className="h-4 w-12 rounded bg-muted animate-pulse" />
                        </div>
                        <div className="h-2 w-full rounded bg-muted animate-pulse" />
                        <div className="h-2 w-5/6 rounded bg-muted animate-pulse" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : prediction ? (
                <div className="animate-in fade-in slide-in-from-bottom-2 space-y-6">
                  <Tabs defaultValue="diseases" className="w-full">
                    {/* ...existing code... TabsList & Triggers ... */}
                    <TabsList className="grid w-full grid-cols-3 rounded-lg bg-muted/40 backdrop-blur">
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
                    <TabsContent value="diseases" className="mt-6 space-y-5">
                      <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                        Possible Diseases
                      </h3>
                      <ul className="space-y-5">
                        {prediction.possibleDiseases.map((disease, index) => {
                          const p = getProbNum(disease.probability)
                          return (
                            <li
                              key={index}
                              className="group relative rounded-lg border border-border/60 p-4 hover:border-prim/60 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <div className="space-y-1">
                                  <p className="font-medium text-lg leading-tight">{disease.name}</p>
                                  <p className="text-sm text-muted-foreground">{disease.description}</p>
                                </div>
                                <span className="shrink-0 rounded-full bg-second px-3 py-1 text-xs font-medium text-secondary-foreground">
                                  {disease.probability}
                                </span>
                              </div>
                              <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-prim via-prim to-acc transition-all duration-500"
                                  style={{ width: `${p}%` }}
                                />
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    </TabsContent>
                    <TabsContent value="tests" className="mt-6 space-y-4">
                      <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                        Recommended Tests
                      </h3>
                      <ul className="grid gap-3">
                        {prediction.recommendedTests.map((test, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 rounded-lg border border-border/60 bg-background/40 px-4 py-3"
                          >
                            <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-prim" />
                            <span className="text-sm">{test}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                    <TabsContent value="advice" className="mt-6 space-y-4">
                      <h3 className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">
                        General Advice
                      </h3>
                      <div className="rounded-lg border border-border/60 bg-gradient-to-br from-second/30 to-background p-5 text-sm leading-relaxed">
                        {prediction.generalAdvice}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="flex h-64 flex-col items-center justify-center text-center">
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
