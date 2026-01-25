export interface TripFormData {
  city: string
  start_date: string
  end_date: string
  travel_days: number
  transportation: string
  accommodation: string
  preferences: string[]
  free_text_input: string
}

export interface User {
  name: string
  id: number
  email: string
}

export interface User {
  name: string
  id: number
  email: string
}

export interface TripPlanResponse {
  success: boolean
  message: string
  data?: User[]
}
